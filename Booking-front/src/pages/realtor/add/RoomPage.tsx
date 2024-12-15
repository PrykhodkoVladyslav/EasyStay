import FormError from "components/ui/FormError.tsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import { useGetAllRentalPeriodsQuery } from "services/rentalPeriod.ts";
import { useGetAllRoomAmenitiesQuery } from "services/roomAmenity.ts";
import { useGetAllRoomTypesQuery } from "services/roomType.ts";
import { useCreateRoomMutation } from "services/room.ts";
import showToast from "utils/toastShow.ts";
import { RoomCreateSchema, RoomCreateSchemaType } from "interfaces/zod/room.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";
import AddRoomVariantPage from "pages/realtor/add/RoomVariantPage.tsx";
import UpdateRoomVariantPage from "pages/realtor/edit/RoomVariantPage.tsx";
import { useCreateRoomVariantMutation } from "services/roomVariant.ts";

const RoomPage = () => {
    useEffect(instantScrollToTop, []);
    const navigate = useNavigate();
    const numericId = Number(useParams<{ id: string }>().id);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RoomCreateSchemaType>({
        resolver: zodResolver(RoomCreateSchema),
        defaultValues: {
            rentalPeriodIds: [],
            roomTypeId: "",
            area: 0,
            numberOfRooms: 0,
            name: "",
            quantity: 0,
            roomAmenityIds: [],
        },
    });

    const { data: rentalPeriodsData } = useGetAllRentalPeriodsQuery();
    const { data: roomTypesData } = useGetAllRoomTypesQuery();
    const { data: roomAmenitiesData } = useGetAllRoomAmenitiesQuery();
    const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation();
    const [createRoomVariant] = useCreateRoomVariantMutation();

    const [selectedRentalPeriods, setSelectedRentalPeriods] = useState<number[]>([]);
    const [selectedRoomAmenities, setSelectedRoomAmenities] = useState<number[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<IRoomVariant | null>(null);
    const [roomVariants, setRoomVariants] = useState<IRoomVariant[]>([]);

    const handleQuantityChange = (delta: number) => {
        const currentValue = watch("quantity");
        const newValue = Math.min(10, Math.max(0, currentValue + delta));
        setValue("quantity", newValue);
    };

    const addRoomVariant = (variant: IRoomVariant) => {
        setRoomVariants((prev) => [...prev, variant]);
    };

    const updateRoomVariant = (updatedVariant: IRoomVariant) => {
        setRoomVariants((prev) =>
            prev.map((variant) => (variant.id === updatedVariant.id ? updatedVariant : variant))
        );
    };

    const deleteRoomVariant = (variantId: number) => {
        setRoomVariants((prev) =>
            prev.filter((variant) => variant.id !== variantId)
        );
    };

    const onSubmitRoom = async (data: RoomCreateSchemaType) => {
        const roomData = {
            rentalPeriodIds: selectedRentalPeriods,
            roomTypeId: Number(data.roomTypeId) || 0,
            area: data.area,
            numberOfRooms: data.numberOfRooms,
            name: data.name,
            quantity: Number(data.quantity) || 0,
            hotelId: numericId,
            roomAmenityIds: selectedRoomAmenities,
        };

        try {
            const createdRoomId = await createRoom(roomData).unwrap();

            await Promise.all(
                roomVariants.map((variant) =>
                    createRoomVariant({
                        ...variant,
                        roomId: createdRoomId,
                        price: variant.price ?? 0, // ?
                    }).unwrap()
                )
            );
            navigate(`/realtor/rooms/${numericId}`);
            // refetch();
            showToast(`Номер успішно створено`, "success");
        } catch (error) {
            showToast(`Помилка при створенні номеру`, "error");
        }
    };

    return (
        <div className={`add-hotel-room`}> {/*  ${modal ? "overflow-hidden" : ""} */}
            <form className="add-page-1" onSubmit={handleSubmit(onSubmitRoom)}>
                <p className="title">Інформація про кімнату</p>
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
                        {roomVariants.map((variant) => (
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
                                        <div className="data">
                                            <p>Ціна зі знижкою</p>
                                            <span>{variant?.discountPrice?.toFixed()}$</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="actions">
                                    <button
                                        className="btn-delete"
                                        type="button"
                                        onClick={() => deleteRoomVariant(variant.id)}
                                    >
                                        <img src={getPublicResourceUrl("account/trash.svg")} alt=""/>
                                    </button>

                                    <button
                                        className="btn-edit"
                                        type="button"
                                        onClick={() => {
                                            setSelectedVariant(variant);
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
                    className="main-button-2"
                    type="submit"
                    disabled={isCreating}
                >
                    Створити
                </button>
            </form>
            {createModal && (
                <AddRoomVariantPage
                    roomVariant={roomVariants}
                    onSave={addRoomVariant}
                    setModal={setCreateModal}
                />
            )}
            {updateModal && selectedVariant && (
                <UpdateRoomVariantPage
                    roomVariant={selectedVariant}
                    onSave={updateRoomVariant}
                    setModal={setUpdateModal}/>
            )}
        </div>
    );
};

export default RoomPage;