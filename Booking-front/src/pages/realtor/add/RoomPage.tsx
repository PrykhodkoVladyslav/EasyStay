import FormError from "components/ui/FormError.tsx";
import {City} from "interfaces/city";
import {getPublicResourceUrl} from "utils/publicAccessor.ts";
import {useForm} from "react-hook-form";
import {HotelCreatePage1Schema, HotelCreateSchema, HotelCreateSchemaType} from "interfaces/zod/hotel.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import showToast from "utils/toastShow.ts";

const RoomPage = () => {
    const [currentContainer, setCurrentContainer] = useState(1);

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        watch,
        formState: { errors },
    } = useForm/*<HotelCreateSchemaType>*/({
        resolver: zodResolver(/*currentContainer === 1 ? HotelCreatePage1Schema : HotelCreateSchema*/),
        defaultValues: {
            // hotelAmenityIds: [],
            // staffLanguageIds: [],
            // arrivalTimeUtcFrom: "00:00:00",
            // arrivalTimeUtcTo: "00:00:00",
            // departureTimeUtcFrom: "00:00:00",
            // departureTimeUtcTo: "00:00:00",
        },
    });

    const nextContainer = async () => {
        setCurrentContainer(currentContainer + 1);
        // const isValid = await trigger();
        // if (isValid) {
        //     if (currentContainer < 2) {
        //         setCurrentContainer(currentContainer + 1);
        //     } else {
        //         handleSubmit(onSubmit)();
        //     }
        // }
    };

    const onSubmit = async (/*data: HotelCreateSchemaType*/) => {
        setCurrentContainer(currentContainer + 1);
        // const hoteldata = {
        //     ...data,
        //     isArchived: false,
        //     hotelAmenityIds: selectedHotelAmenities,
        //     breakfastIds: selectedBreakfasts,
        //     staffLanguageIds: selectedLanguages,
        //     photos: selectedPhotos,
        //     arrivalTimeUtcFrom: data.arrivalTimeUtcFrom || '',
        //     arrivalTimeUtcTo: data.arrivalTimeUtcTo || '',
        //     departureTimeUtcFrom: data.departureTimeUtcFrom || '',
        //     departureTimeUtcTo: data.departureTimeUtcTo || '',
        //     categoryId: Number(data.categoryId) || 0,
        //     address: {
        //         ...data.address,
        //         floor: data.address.floor || '',
        //         cityId: Number(data.address.cityId) || 0,
        //     },
        // }
        //
        // try {
        //     await createHotel(hoteldata).unwrap();
        //     navigate(`/realtor/hotels`);
        //     // navigate(`/hotel/${hoteldata.id}`);
        //     showToast(`Готель успішно створено!`, "success");
        // } catch (error) {
        //     showToast(`Помилка при створенні готелю!`, "error");
        // }
    };

    return (
        <div className="add-hotel-room">
            <form onSubmit={handleSubmit(onSubmit)}>
                {currentContainer === 1 && (
                    <div className="add-page-1">
                        <p className="title">Інформація про кімнату</p>
                        <div className="data-containers">

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number room-number">1</div>
                                    <p className="title">Доступний період оренди</p>
                                </div>

                                <div className="room-containers-1-5">
                                    <div className="data-1">
                                        <label className="con-1-checkbox">
                                            <input
                                                {...register("roomPeriod")}
                                                type="checkbox"
                                                id="roomPeriod"
                                            />
                                            <p>Погодино</p>
                                        </label>

                                        <label className="con-1-checkbox">
                                            <input
                                                {...register("roomPeriod")}
                                                type="checkbox"
                                                id="roomPeriod"
                                            />
                                            <p>Додобово</p>
                                        </label>

                                        <label className="con-1-checkbox">
                                            <input
                                                {...register("roomPeriod")}
                                                type="checkbox"
                                                id="roomPeriod"
                                            />
                                            <p>Довго тривала оренда</p>
                                        </label>
                                        {/*{roomAmenitiesData?.map((roomPeriod) => (*/}
                                        {/*    <label key={roomPeriod.id}>*/}
                                        {/*        <input*/}
                                        {/*            {...register("RentalPeriodIds")}*/}
                                        {/*            type="checkbox"*/}
                                        {/*            value={roomPeriod.id}*/}
                                        {/*            checked={selectedRoomPeriods.includes(roomPeriod.id)}*/}
                                        {/*            onChange={(e) => {*/}
                                        {/*                if (e.target.checked) {*/}
                                        {/*                    setSelectedRoomPeriods((prev) => [...prev, roomPeriod.id]);*/}
                                        {/*                } else {*/}
                                        {/*                    setSelectedRoomPeriods((prev) => prev.filter((id) => id !== roomPeriod.id));*/}
                                        {/*                }*/}
                                        {/*                setValue("RentalPeriodIds", selectedRoomPeriods);*/}
                                        {/*            }}*/}
                                        {/*        />*/}
                                        {/*        {roomPeriod.name}*/}
                                        {/*    </label>*/}
                                        {/*))}*/}
                                        {errors?.rentalPeriodIds && (
                                            <FormError className="text-red"
                                                       errorMessage={errors?.rentalPeriodIds?.message as string}/>
                                        )}
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
                                            {/*{roomTypesData?.map((type) => (*/}
                                            {/*    <option key={type.id} value={type.id}>*/}
                                            {/*        {type.name}*/}
                                            {/*    </option>*/}
                                            {/*))}*/}
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
                                            {/*{hotelCategoriesData?.map((category) => (*/}
                                            {/*    <option key={category.id} value={category.id}>*/}
                                            {/*        {category.name}*/}
                                            {/*    </option>*/}
                                            {/*))}*/}
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

                                <div className="container-3">
                                    {/*{roomAmenitiesData?.map((roomAmenity) => (*/}
                                    {/*    <label key={roomAmenity.id}>*/}
                                    {/*        <input*/}
                                    {/*            {...register("RoomAmenityIds")}*/}
                                    {/*            type="checkbox"*/}
                                    {/*            value={roomAmenity.id}*/}
                                    {/*            checked={selectedRoomAmenities.includes(roomAmenity.id)}*/}
                                    {/*            onChange={(e) => {*/}
                                    {/*                if (e.target.checked) {*/}
                                    {/*                    setSelectedRoomAmenities((prev) => [...prev, roomAmenity.id]);*/}
                                    {/*                } else {*/}
                                    {/*                    setSelectedRoomAmenities((prev) => prev.filter((id) => id !== roomAmenity.id));*/}
                                    {/*                }*/}
                                    {/*                setValue("RoomAmenityIds", selectedRoomAmenities);*/}
                                    {/*            }}*/}
                                    {/*        />*/}
                                    {/*        {roomAmenity.name}*/}
                                    {/*    </label>*/}
                                    {/*))}*/}
                                    {errors?.RoomAmenityIds && (
                                        <FormError className="text-red"
                                                   errorMessage={errors?.RoomAmenityIds?.message as string}/>
                                    )}
                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number room-number">7</div>
                                    <p className="title">Кількість ідентичних номерів</p>
                                </div>
                                <div className="room-container-7">
                                    <button>-</button>
                                    <div
                                        {...register("quantity")}
                                        id="quantity"
                                    >
                                        0
                                    </div>
                                    <button>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentContainer === 2 && (
                    <div className="add-room-page-2">
                        <p className="title">Додайте більше варіантів в ваш номер</p>
                        <div className="data-containers">

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">1</div>
                                    <p className="title">Скільки гостей можуть зупинитися у кімнаті?</p>
                                </div>

                                <div className="room-container-1-3-4">
                                    <div className="guests">
                                        <div className="flex flex-col gap-2.5">
                                            <p>Кількість дорослих</p>
                                            <div className="stepper">
                                                <button>-</button>
                                                <div
                                                    {...register("quantity")}
                                                    id="quantity"
                                                >
                                                    0
                                                </div>
                                                <button>+</button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <p>Кількість дітей</p>
                                            <div className="stepper">
                                                <button>-</button>
                                                <div
                                                    {...register("quantity")}
                                                    id="quantity"
                                                >
                                                    0
                                                </div>
                                                <button>+</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">2</div>
                                    <p className="title">Скільки гостей можуть зупинитися у кімнаті?</p>
                                </div>

                                <div className="room-container-2">
                                    <div className="beds">
                                        <p>Одномісне ліжко</p>
                                        <div className="stepper">
                                            <button>-</button>
                                            <div
                                                {...register("quantity")}
                                                id="quantity"
                                            >
                                                0
                                            </div>
                                            <button>+</button>
                                        </div>
                                    </div>

                                    <div className="beds">
                                        <p>Двомісне ліжко</p>
                                        <div className="stepper">
                                            <button>-</button>
                                            <div
                                                {...register("quantity")}
                                                id="quantity"
                                            >
                                                0
                                            </div>
                                            <button>+</button>
                                        </div>
                                    </div>

                                    <div className="beds">
                                        <p>Додаткове ліжко</p>
                                        <div className="stepper">
                                            <button>-</button>
                                            <div
                                                {...register("quantity")}
                                                id="quantity"
                                            >
                                                0
                                            </div>
                                            <button>+</button>
                                        </div>
                                    </div>

                                    <div className="beds">
                                        <p>Диван ліжко</p>
                                        <div className="stepper">
                                            <button>-</button>
                                            <div
                                                {...register("quantity")}
                                                id="quantity"
                                            >
                                                0
                                            </div>
                                            <button>+</button>
                                        </div>
                                    </div>

                                    <div className="beds">
                                        <p>Кінгсайз</p>
                                        <div className="stepper">
                                            <button>-</button>
                                            <div
                                                {...register("quantity")}
                                                id="quantity"
                                            >
                                                0
                                            </div>
                                            <button>+</button>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">3</div>
                                    <p className="title">Скільки ви хочете отримувати за ніч?</p>
                                </div>

                                <div className="room-container-1-3-4">
                                    <div className="price-discount">
                                        <p>$</p>
                                        <input
                                            {...register("price")}
                                            type="number"
                                            id="price"
                                            placeholder="0"
                                        />
                                        {errors?.price && (
                                            <FormError className="text-red"
                                                       errorMessage={errors?.price?.message as string}/>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">4</div>
                                    <p className="title">Знижка</p>
                                    <p className="optional">(за бажанням)</p>
                                </div>

                                <div className="room-container-1-3-4">
                                    <div className="price-discount">
                                        <p>$</p>
                                        <input
                                            {...register("discountPrice")}
                                            type="number"
                                            id="discountPrice"
                                            placeholder="0"
                                        />
                                        {errors?.discountPrice && (
                                            <FormError className="text-red"
                                                       errorMessage={errors?.discountPrice?.message as string}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="main-button-2"
                    onClick={nextContainer}
                    type="button"
                >
                    {currentContainer === 1 ? "Додати варіації номеру" : "Зберегти"}
                </button>
            </form>
        </div>
    );
}

export default RoomPage;