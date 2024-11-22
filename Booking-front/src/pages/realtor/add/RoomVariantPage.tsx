import FormError from "components/ui/FormError.tsx";
import { useForm } from "react-hook-form";
import { RoomVariantCreateSchema, RoomVariantCreateSchemaType } from "interfaces/zod/roomVariant.ts";
import { useCreateRoomVariantMutation } from "services/roomVariant.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import showToast from "utils/toastShow.ts";

const RoomVariantPage = (props: {roomId: number, numericId: number}) => {
    const navigate = useNavigate();
    const [ createRoomVariant ] = useCreateRoomVariantMutation();

    const {
        roomId,
        numericId,
    } = props;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RoomVariantCreateSchemaType>({
        resolver: zodResolver(RoomVariantCreateSchema),
        defaultValues: {
            price: 0,
            discountPrice: 0,
            guest: {
                adultCount: 0,
                childCount: 0
            },
            bedInfo: {
                singleBedCount: 0,
                doubleBedCount: 0,
                extraBedCount: 0,
                sofaCount: 0,
                kingsizeBedCount: 0,
            },
        },
    });

    const handleCountChange = (
        field: keyof RoomVariantCreateSchemaType | "guest.adultCount" | "guest.childCount" | "bedInfo.singleBedCount" | "bedInfo.doubleBedCount" | "bedInfo.extraBedCount" | "bedInfo.sofaCount" | "bedInfo.kingsizeBedCount",
        delta: number,
        min = 0,
        max = 10
    ) => {
        const currentValue = watch(field as any) || 0;
        const newValue = Math.min(max, Math.max(min, currentValue + delta));
        setValue(field as any, newValue);
    };

    const onSubmitRoomVariants = async (data: RoomVariantCreateSchemaType) => {
        const roomVariantData = {
            ...data,
            roomId: roomId,
            price: data.price ?? 0,
        };

        try {
            await createRoomVariant(roomVariantData).unwrap();
            showToast(`Варіант номеру успішно створено!`, "success");
            navigate(`/realtor/rooms/${numericId}`);
        } catch (error) {
            showToast(`Помилка при створенні варіанту номера!`, "error");
        }
    };

    return (
        <>
            <div className="modal-backdrop"></div>

            <form className="add-room-page-2-modal" onSubmit={handleSubmit(onSubmitRoomVariants)}>
                <p className="title">Додайте більше варіантів в ваш номер</p>
                <div className="data-containers">

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">1</div>
                            <p className="title">Скільки гостей можуть зупинитися у кімнаті?</p>
                        </div>

                        <div className="room-container-1-3-4">
                            <div className="guests">
                                <div className="guest">
                                    <p>Кількість дорослих</p>
                                    <div className="stepper">
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange("guest.adultCount", -1)}>﹘</button>
                                        <div id="guest.adultCount">{watch("guest.adultCount") || 0}</div>
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange("guest.adultCount", 1)}>+</button>
                                    </div>
                                    {errors?.guest?.adultCount && (
                                        <FormError className="text-red"
                                                   errorMessage={errors?.guest?.adultCount?.message as string}/>
                                    )}
                                </div>

                                <div className="guest">
                                    <p>Кількість дітей</p>
                                    <div className="stepper">
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange("guest.childCount", -1)}>﹘</button>
                                        <div id="guest.childCount">{watch("guest.childCount") || 0}</div>
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange("guest.childCount", 1)}>+</button>
                                    </div>
                                    {errors?.guest?.childCount && (
                                        <FormError className="text-red"
                                                   errorMessage={errors?.guest?.childCount?.message as string}/>
                                    )}
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
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.singleBedCount", -1)}>﹘</button>
                                    <div id="bedInfo.singleBedCount">{watch("bedInfo.singleBedCount") || 0}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.singleBedCount", 1)}>+</button>
                                </div>
                            </div>

                            <div className="beds">
                                <p>Двомісне ліжко</p>
                                <div className="stepper">
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.doubleBedCount", -1)}>﹘</button>
                                    <div id="bedInfo.doubleBedCount">{watch("bedInfo.doubleBedCount") || 0}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.doubleBedCount", 1)}>+</button>
                                </div>
                            </div>

                            <div className="beds">
                                <p>Додаткове ліжко</p>
                                <div className="stepper">
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.extraBedCount", -1)}>﹘</button>
                                    <div id="bedInfo.extraBedCount">{watch("bedInfo.extraBedCount") || 0}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.extraBedCount", 1)}>+</button>
                                </div>
                            </div>

                            <div className="beds">
                                <p>Диван ліжко</p>
                                <div className="stepper">
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.sofaCount", -1)}>﹘</button>
                                    <div id="bedInfo.sofaCount">{watch("bedInfo.sofaCount") || 0}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.sofaCount", 1)}>+</button>
                                </div>
                            </div>

                            <div className="beds">
                                <p>Кінгсайз</p>
                                <div className="stepper">
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.kingsizeBedCount", -1)}>﹘</button>
                                    <div id="bedInfo.kingsizeBedCount">{watch("bedInfo.kingsizeBedCount") || 0}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleCountChange("bedInfo.kingsizeBedCount", 1)}>+</button>
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
                                    {...register("discountPrice")}
                                    type="number"
                                    id="discountPrice"
                                    placeholder="0"
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                                {errors?.discountPrice && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.discountPrice?.message as string}/>
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
                                    {...register("price")}
                                    type="number"
                                    id="price"
                                    placeholder="0"
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                                {errors?.price && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.discountPrice?.message as string}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="main-button-2"
                    type="submit"
                >
                    Зберегти
                </button>
            </form>
        </>
    )
}

export default RoomVariantPage;