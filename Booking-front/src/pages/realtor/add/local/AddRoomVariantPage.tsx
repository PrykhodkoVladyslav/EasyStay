import FormError from "components/ui/FormError.tsx";
import { useForm } from "react-hook-form";
import { RoomVariantCreateSchema, RoomVariantCreateSchemaType } from "interfaces/zod/roomVariant.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import showToast from "utils/toastShow.ts";
import { Dispatch, SetStateAction, useEffect } from "react";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";

interface IRoomVariantPageProps {
    roomVariant: any;
    onSave: (updatedVariant: IRoomVariant) => void;
    setModal?: Dispatch<SetStateAction<boolean>>;
}

const RoomVariantPage = (props: IRoomVariantPageProps) => {
    const {
        roomVariant,
        onSave,
        setModal,
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
            guestInfo: {
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

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const modalElement = document.querySelector(".add-room-page-2-modal");
            const backdropElement = document.querySelector(".modal-backdrop");

            if (modalElement && backdropElement && !modalElement.contains(e.target as Node) && !backdropElement.contains(e.target as Node)) {
                setModal?.(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setModal]);

    const handleCountChange = (
        field: keyof RoomVariantCreateSchemaType | "guestInfo.adultCount" | "guestInfo.childCount" | "bedInfo.singleBedCount" | "bedInfo.doubleBedCount" | "bedInfo.extraBedCount" | "bedInfo.sofaCount" | "bedInfo.kingsizeBedCount",
        delta: number,
        min = 0,
        max = 10
    ) => {
        const currentValue = watch(field as any) || 0;
        const newValue = Math.min(max, Math.max(min, currentValue + delta));
        setValue(field as any, newValue);
    };

    const onSubmitRoomVariants = async (data: RoomVariantCreateSchemaType) => {
        try {
            const newVariant = {
                ...data,
                id: roomVariant?.id || Date.now(),
                roomId: roomVariant?.roomId || 0,
            };
            onSave(newVariant);
            if (setModal) setModal(false);
            // showToast(`Варіант номеру успішно створено`, "success");
        } catch (error) {
            showToast(`Помилка при створенні варіанту номера`, "error");
        }
    };

    return (
        <>
            <div className="modal-backdrop" onClick={() => setModal?.(false)}></div>

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
                                            onClick={() => handleCountChange("guestInfo.adultCount", -1)}>﹘</button>
                                        <div id="guestInfo.adultCount">{watch("guestInfo.adultCount") || 0}</div>
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange("guestInfo.adultCount", 1)}>+</button>
                                    </div>
                                    {errors?.guestInfo?.adultCount && (
                                        <FormError className="text-red-500"
                                                   errorMessage={errors?.guestInfo?.adultCount?.message as string}/>
                                    )}
                                </div>

                                <div className="guest">
                                    <p>Кількість дітей</p>
                                    <div className="stepper">
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange("guestInfo.childCount", -1)}>﹘</button>
                                        <div id="guestInfo.childCount">{watch("guestInfo.childCount") || 0}</div>
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange("guestInfo.childCount", 1)}>+</button>
                                    </div>
                                    {errors?.guestInfo?.childCount && (
                                        <FormError className="text-red-500"
                                                   errorMessage={errors?.guestInfo?.childCount?.message as string}/>
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
                            {errors?.bedInfo && (
                                <FormError className="text-red-500" errorMessage={errors?.bedInfo?.message as string} />
                            )}
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
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                                {errors?.price && (
                                    <FormError className="text-red-500"
                                               errorMessage={errors?.price?.message as string}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">4</div>
                            <p className="title">Ціна зі знижкою</p>
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
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                                {errors?.discountPrice && (
                                    <FormError className="text-red-500"
                                               errorMessage={errors?.discountPrice?.message as string}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="main-button-2"
                    type="submit"
                    // disabled={!roomVariant}
                >
                    Зберегти
                </button>
            </form>
        </>
    )
}

export default RoomVariantPage;