import FormError from "components/ui/FormError.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import { useGetAllRentalPeriodsQuery } from "services/rentalPeriod.ts";
import { useGetAllRoomAmenitiesQuery } from "services/roomAmenity.ts";
import { useGetAllRoomTypesQuery } from "services/roomType.ts";
import { useGetRoomQuery, useUpdateRoomMutation } from "services/room.ts";
import { RoomEditSchema, RoomEditSchemaType } from "interfaces/zod/room.ts";
import {
    useCreateRoomVariantMutation,
    useUpdateRoomVariantMutation,
    useDeleteRoomVariantMutation,
} from "services/roomVariant.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "utils/toastShow.ts";
import AddRoomVariantPage from "pages/realtor/add/RoomVariantPage.tsx";
import UpdateRoomVariantPage from "pages/realtor/edit/RoomVariantPage.tsx";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";

interface IRoomVariantExtended extends IRoomVariant {
    isNew: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
}

const RoomPage = () => {
    useEffect(instantScrollToTop, []);
    const navigate = useNavigate();
    const numericId = Number(useParams<{ id: string }>().id);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedRentalPeriods, setSelectedRentalPeriods] = useState<number[]>([]);
    const [selectedRoomAmenities, setSelectedRoomAmenities] = useState<number[]>([]);
    const [selectedRoomVariant, setSelectedRoomVariant] = useState<IRoomVariant | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RoomEditSchemaType>({
        resolver: zodResolver(RoomEditSchema),
        defaultValues: {
            rentalPeriodIds: [],
            roomTypeId: 0,
            area: 0,
            numberOfRooms: 0,
            name: "",
            quantity: 0,
            roomAmenityIds: [],
        },
    });

    const { data: roomData, isLoading, error, refetch } = useGetRoomQuery(numericId as number);
    const { data: rentalPeriodsData } = useGetAllRentalPeriodsQuery();
    const { data: roomTypesData } = useGetAllRoomTypesQuery();
    const { data: roomAmenitiesData } = useGetAllRoomAmenitiesQuery();
    const [updateRoom, { isLoading: isCreating }] = useUpdateRoomMutation();
    const [createRoomVariant] = useCreateRoomVariantMutation();
    const [updateRoomVariant] = useUpdateRoomVariantMutation();
    const [deleteRoomVariant] = useDeleteRoomVariantMutation();
    const [roomVariants, setRoomVariants] = useState<IRoomVariantExtended[]>(() => {
        return roomData?.variants.map((variant) => ({
            ...variant,
            isNew: false,
            isUpdated: false,
            isDeleted: false,
        })) || [];
    });
    const HotelId = roomData?.hotelId || 0;

    useEffect(() => {
        if (roomData) {
            setRoomVariants(
                roomData.variants.map((variant) => ({
                    ...variant,
                    isNew: false,
                    isUpdated: false,
                    isDeleted: false,
                }))
            );
            setSelectedRentalPeriods(roomData.rentalPeriods.map((amenity) => amenity.id));
            setSelectedRoomAmenities(roomData.amenities.map(language => language.id));

            setValue("name", roomData.name);
            setValue("area", Math.round(roomData.area));
            setValue("numberOfRooms", roomData.numberOfRooms);
            setValue("quantity", roomData.quantity);
            setValue("roomTypeId", roomData.roomType.id);
            setValue("rentalPeriodIds", roomData.rentalPeriods.map(rentalPeriod => rentalPeriod.id));
            setValue("roomAmenityIds", roomData.amenities.map(amenity => amenity.id));
        }
    }, [roomData, setValue]);

    const handleQuantityChange = (delta: number) => {
        const currentValue = watch("quantity");
        const newValue = Math.min(10, Math.max(0, currentValue + delta));
        setValue("quantity", newValue);
    };

    const handleAddRoomVariant = (variant: IRoomVariant) => {
        setRoomVariants((prev) => [
            ...prev,
            { ...variant, isNew: true, isUpdated: false, isDeleted: false },
        ]);
    };

    const handleUpdateRoomVariant = (updatedVariant: IRoomVariant) => {
        setRoomVariants((prev) =>
            prev.map((variant) =>
                variant.id === updatedVariant.id
                    ? { ...updatedVariant, isNew: variant.isNew, isUpdated: true, isDeleted: false }
                    : variant
            )
        );
    };

    const handleDeleteRoomVariant = (variantId: number) => {
        setRoomVariants((prev) =>
            prev.map((variant) =>
                variant.id === variantId
                    ? { ...variant, isNew: false, isUpdated: false, isDeleted: true }
                    : variant
            )
        );
    };

    const onSubmitRoom = async (data: RoomEditSchemaType) => {
        const roomData = {
            id: numericId,
            rentalPeriodIds: selectedRentalPeriods,
            roomTypeId: Number(data.roomTypeId) || 0,
            area: data.area,
            numberOfRooms: data.numberOfRooms,
            name: data.name,
            quantity: Number(data.quantity) || 0,
            roomAmenityIds: selectedRoomAmenities,
        };

        try {
            await updateRoom(roomData).unwrap();

            await Promise.all(
                roomVariants
                    .filter((variant) => variant.isNew && !variant.isDeleted)
                    .map((variant) =>
                        createRoomVariant({
                            ...variant,
                            roomId: numericId,
                            price: variant.price ?? 0, // ?
                        }).unwrap()
                    )
            );

            await Promise.all(
                roomVariants
                    .filter((variant) => variant.isUpdated && !variant.isNew && !variant.isDeleted)
                    .map((variant) =>
                        updateRoomVariant({
                            ...variant,
                            price: variant.price ?? 0,
                        }).unwrap()
                    )
            );

            await Promise.all(
                roomVariants
                    .filter((variant) => variant.isDeleted && !variant.isNew)
                    .map((variant) =>
                        deleteRoomVariant(variant.id).unwrap()
                    )
            );

            navigate(`/realtor/rooms/${HotelId}`);
            refetch();
            showToast(`Номер успішно оновлено`, "success");
        } catch (error) {
            showToast(`Помилка при оновленні номеру`, "error");
        }
    };

    if (isLoading || !roomData) return <p className="isLoading-error pt-20 pb-20">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className={`add-hotel-room`}>
            <form className="add-page-1" onSubmit={handleSubmit(onSubmitRoom)}>
                <p className="title">Редагування інформації про кімнату</p>
                <div className="data-containers">

                    <div className="pre-container">
                        <div className="top">
                            <div className="number room-number">1</div>
                            <p className="title">Доступний період оренди</p>
                        </div>

                        <div className="room-containers-1-5">
                            <div className="data-1">
                                {rentalPeriodsData?.map((rentalPeriod) => (
                                    <label key={rentalPeriod.id} className="con-1-checkbox">
                                        <input
                                            type="checkbox"
                                            {...register("rentalPeriodIds")}
                                            value={rentalPeriod.id}
                                            checked={selectedRentalPeriods.includes(rentalPeriod.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedRentalPeriods((prev) => [...prev, rentalPeriod.id]);
                                                } else {
                                                    setSelectedRentalPeriods((prev) => prev.filter((id) => id !== rentalPeriod.id));
                                                }
                                                setValue("rentalPeriodIds", selectedRentalPeriods);
                                            }}
                                        />
                                        <p>{rentalPeriod.name}</p>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number room-number">2</div>
                            <p className="title">Назва номеру</p>
                        </div>

                        <div className="room-containers-1-5">
                            <div className="data">
                                <input
                                    {...register("name")}
                                    type="text"
                                    id="name"
                                    placeholder="Назва"
                                />
                                {errors?.name && (
                                    <FormError className="text-red-500"
                                               errorMessage={errors?.name?.message as string}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number room-number">3</div>
                            <p className="title">Тип номеру</p>
                        </div>

                        <div className="room-containers-1-5">
                            <div className="data">
                                <select
                                    {...register("roomTypeId")}
                                    id="roomTypeId"
                                    value={watch("roomTypeId") || ""}
                                >
                                    <option disabled value="">
                                        Вибрати
                                    </option>
                                    {roomTypesData?.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {errors?.roomTypeId && (
                                    <FormError className="text-red-500"
                                               errorMessage={errors?.roomTypeId?.message as string}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number room-number">4</div>
                            <p className="title">Площа</p>
                        </div>

                        <div className="room-containers-1-5">
                            <div className="data">
                                <input
                                    {...register("area")}
                                    type="number"
                                    id="area"
                                    placeholder="Площа"
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                                {errors?.area && (
                                    <FormError className="text-red-500"
                                               errorMessage={errors?.area?.message as string}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number room-number">5</div>
                            <p className="title">Кількість кімнат</p>
                        </div>

                        <div className="room-containers-1-5">
                            <div className="data">
                                <select
                                    {...register("numberOfRooms")}
                                    id="numberOfRooms"
                                    value={watch("numberOfRooms") || ""}
                                >
                                    <option disabled value="">
                                        Вибрати
                                    </option>
                                    {Array.from({length: 10}, (_, i) => i + 1).map((roomCount) => (
                                        <option key={roomCount} value={roomCount}>
                                            {roomCount}
                                        </option>
                                    ))}
                                </select>
                                {errors?.numberOfRooms && (
                                    <FormError className="text-red-500"
                                               errorMessage={errors?.numberOfRooms?.message as string}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number room-number">6</div>
                            <p className="title">Чим гості можуть користуватися у кімнаті?</p>
                        </div>

                        <div className="room-container-6">
                            {roomAmenitiesData?.map((roomAmenity) => (
                                <label key={roomAmenity.id}>
                                    <input
                                        {...register("roomAmenityIds")}
                                        type="checkbox"
                                        value={roomAmenity.id}
                                        checked={selectedRoomAmenities.includes(roomAmenity.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRoomAmenities((prev) => [...prev, roomAmenity.id]);
                                            } else {
                                                setSelectedRoomAmenities((prev) => prev.filter((id) => id !== roomAmenity.id));
                                            }
                                            setValue("roomAmenityIds", selectedRoomAmenities);
                                        }}
                                    />
                                    {roomAmenity.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number room-number">7</div>
                            <p className="title">Кількість ідентичних номерів</p>
                        </div>
                        <div className="room-container-7">
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(-1)}>﹘
                            </button>
                            <div
                                {...register("quantity")}
                                id="quantity"
                            >
                                {watch("quantity") || 0}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(1)}>+
                            </button>
                        </div>
                        {errors?.quantity && (
                            <FormError className="text-red-500"
                                       errorMessage={errors?.quantity?.message as string}/>
                        )}
                    </div>

                    <div className="pre-container">
                        {roomVariants
                            .filter((variant) => !variant.isDeleted)
                            .map((variant) => (
                            <div key={variant.id} className="room-variant">
                                <div className="container">
                                    <div className="variant-data">
                                        <p className="variant-title">Кількість гостей</p>

                                        <div className="data">
                                            <p>Кількість дорослих</p>
                                            <span>{variant.guestInfo.adultCount}</span>
                                        </div>

                                        <div className="data">
                                            <p>Кількість дітей</p>
                                            <span>{variant.guestInfo.childCount}</span>
                                        </div>
                                    </div>


                                    <div className="variant-data">
                                        <p className="variant-title">Ліжка</p>

                                        <div className="data">
                                            <p>Одномісне ліжко</p>
                                            <span>{variant.bedInfo.singleBedCount}</span>
                                        </div>

                                        <div className="data">
                                            <p>Двомісне ліжко</p>
                                            <span>{variant.bedInfo.doubleBedCount}</span>
                                        </div>

                                        <div className="data">
                                            <p>Додаткове ліжко</p>
                                            <span>{variant.bedInfo.extraBedCount}</span>
                                        </div>

                                        <div className="data">
                                            <p>Диван ліжко</p>
                                            <span>{variant.bedInfo.sofaCount}</span>
                                        </div>

                                        <div className="data">
                                            <p>Кінгсайз</p>
                                            <span>{variant.bedInfo.kingsizeBedCount}</span>
                                        </div>
                                    </div>

                                    <div className="variant-data">
                                        <p className="variant-title">Ціна за ніч</p>

                                        <div className="data">
                                            <p>Оригінальна ціна</p>
                                            <span>{variant.price.toFixed()}$</span>
                                        </div>
                                        {variant.discountPrice != null && (
                                            <div className="data">
                                                <p>Ціна зі знижкою</p>
                                                <span>{variant?.discountPrice?.toFixed()}$</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="actions">
                                    <button
                                        className="btn-delete"
                                        type="button"
                                        onClick={() => handleDeleteRoomVariant(variant.id)}
                                    >
                                        <img src={getPublicResourceUrl("account/trash.svg")} alt=""/>
                                    </button>

                                    <button
                                        className="btn-edit"
                                        type="button"
                                        onClick={() => {
                                            setSelectedRoomVariant(variant);
                                            setUpdateModal(true);
                                        }}
                                    >
                                        Редагувати
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            className="add-variant-btn"
                            type="button"
                            onClick={() => setCreateModal(true)}
                        >
                            Додати варіації номеру
                        </button>
                    </div>
                </div>

                <button
                    className="btn-edit-room"
                    type="submit"
                    disabled={isCreating}
                >
                    Зберегти
                </button>
            </form>
            {createModal && (
                <AddRoomVariantPage
                    roomVariant={roomVariants}
                    onSave={handleAddRoomVariant}
                    setModal={setCreateModal}
                />
            )}
            {updateModal && selectedRoomVariant && (
                <UpdateRoomVariantPage
                    roomVariant={selectedRoomVariant}
                    onSave={handleUpdateRoomVariant}
                    setModal={setUpdateModal}
                />
            )}
        </div>
    );
};

export default RoomPage;