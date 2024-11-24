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
import { useParams } from "react-router-dom";
import RoomVariantPage from "pages/realtor/add/RoomVariantPage.tsx";

const RoomPage = () => {
    useEffect(instantScrollToTop, []);
    const numericId = Number(useParams<{ id: string }>().id);
    const [modal, setModal] = useState(false);

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
    const [ createRoom/*, { isLoading }*/ ] = useCreateRoomMutation();

    const [selectedRentalPeriods, setSelectedRentalPeriods] = useState<number[]>([]);
    const [selectedRoomAmenities, setSelectedRoomAmenities] = useState<number[]>([]);
    const [roomId, setRoomId] = useState<number | null>(null);

    const handleQuantityChange = (delta: number) => {
        const currentValue = watch("quantity");
        const newValue = Math.min(10, Math.max(0, currentValue + delta));
        setValue("quantity", newValue);
    };

    // TODO: якщо потрібно забрати скролл в body
    // useEffect(() => {
    //     document.body.style.overflow = modal ? "hidden" : "auto";
    // }, [modal]);

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
            setRoomId(createdRoomId);
            showToast(`Номер успішно створено!`, "success");
            setModal(true);
        } catch (error) {
            showToast(`Помилка при створенні номеру!`, "error");
        }
    };

    return (
        <div className={`add-hotel-room ${modal ? "overflow-hidden" : ""}`}>
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
                                    <FormError className="text-red"
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
                                    <FormError className="text-red"
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
                                />
                                {errors?.area && (
                                    <FormError className="text-red"
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
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((roomCount) => (
                                        <option key={roomCount} value={roomCount}>
                                            {roomCount}
                                        </option>
                                    ))}
                                </select>
                                {errors?.numberOfRooms && (
                                    <FormError className="text-red"
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
                                onClick={() => handleQuantityChange(-1)} >﹘</button>
                            <div
                                {...register("quantity")}
                                id="quantity"
                            >
                                {watch("quantity") || 0}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        {errors?.quantity && (
                            <FormError className="text-red"
                                       errorMessage={errors?.quantity?.message as string}/>
                        )}
                    </div>
                </div>

                <button
                    className="main-button-2"
                    type="submit"
                >
                    Додати варіації номеру
                </button>
            </form>

            {modal && (
                <RoomVariantPage roomId={roomId ?? 0} numericId={numericId}/>
            )}
        </div>
    );
};

export default RoomPage;