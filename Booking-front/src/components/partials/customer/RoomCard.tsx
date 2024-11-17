import IRoomAmenity from "interfaces/roomAmenity/IRoomAmenity.ts";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";
import IRoom, { IFreePeriod } from "interfaces/room/IRoom.ts";
import { useGetRoomVariantsFreeQuantityQuery } from "services/room.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import showToast from "utils/toastShow.ts";

interface IRoomCardProps {
    room: IRoom;
    freePeriod: IFreePeriod;
    hotelBreakfast: boolean;
    selectedDays: number;
    hotelId: number;
}

const RoomCard = (props: IRoomCardProps) => {
    const {
        room,
        freePeriod,
        hotelBreakfast,
        selectedDays,
        hotelId
    } = props;
    const navigate = useNavigate();

    const { data: freeQuantity } = useGetRoomVariantsFreeQuantityQuery({
        id: room.id,
        freePeriod: freePeriod,
    });

    const [selectedQuantities, setSelectedQuantities] = useState<{
        [roomId: number]: { [variantId: number]: number }
    }>({});

    const handleSelectChange = (roomId: number, variantId: number, selectedQuantity: number) => {
        setSelectedQuantities((prevSelectedQuantities) => {
            const roomSelections = prevSelectedQuantities[roomId] || {};
            return {
                ...prevSelectedQuantities,
                [roomId]: {
                    ...roomSelections,
                    [variantId]: selectedQuantity,
                },
            };
        });
    };

    const getRemainingQuantity = () => {
        const totalAvailable = freeQuantity ?? 0;
        const totalUsed = Object.values(selectedQuantities[room.id] || {}).reduce((sum, qty) => sum + qty, 0);
        const remainingQuantity = Math.max(totalAvailable - totalUsed, 0);
        return remainingQuantity;
    };

    const getSelectedBeds = (variant: IRoomVariant): { [key: string]: boolean } => {
        const selectedBeds = {
            isDoubleBed: variant.bedInfo.doubleBedCount > 0 && (document.getElementById(`double-bed_${variant.id}`) as HTMLInputElement)?.checked,
            isSingleBed: variant.bedInfo.singleBedCount > 0 && (document.getElementById(`single-bed_${variant.id}`) as HTMLInputElement)?.checked,
            isExtraBed: variant.bedInfo.extraBedCount > 0 && (document.getElementById(`extra-bed_${variant.id}`) as HTMLInputElement)?.checked,
            isSofa: variant.bedInfo.sofaCount > 0 && (document.getElementById(`sofa-bed_${variant.id}`) as HTMLInputElement)?.checked,
            isKingsizeBed: variant.bedInfo.kingsizeBedCount > 0 && (document.getElementById(`bed_kingsize_${variant.id}`) as HTMLInputElement)?.checked,
        };

        return Object.fromEntries(
            Object.entries(selectedBeds).filter(([, isSelected]) => isSelected),
        );
    };

    const handleBookingClick = () => {
        const selectedVariants = room.variants.filter(
            (variant) => selectedQuantities[room.id]?.[variant.id] > 0,
        );

        if (selectedVariants.length === 0) {
            showToast("Оберіть варіанти номерів", "warning");
            return;
        }

        const bookingRoomVariants = [];

        for (const variant of selectedVariants) {
            const bookingBedSelection = getSelectedBeds(variant);

            if (Object.keys(bookingBedSelection).length === 0) {
                showToast(`Оберіть хоча б один тип ліжка для вибраного номеру`, "warning");
                return;
            }

            bookingRoomVariants.push({
                roomVariantId: variant.id,
                quantity: selectedQuantities[room.id]?.[variant.id],
                bookingBedSelection,
            });
        }

        if (bookingRoomVariants.length === 0) {
            showToast(`Оберіть хоча б один тип ліжка для вибраного номеру`, "warning");
            return;
        }

        const bookingData = {
            hotelId,
            bookingInfo: {
                dateFrom: freePeriod.from,
                dateTo: freePeriod.to,
                bookingRoomVariants,
            },
        };

        const base64Data = btoa(JSON.stringify(bookingData));
        navigate(`/booking/${base64Data}`);
    };

    return <tr key={room.id}>
        <td className="room-type">
            <p className="title">{room.name}</p>
            <p className="rooms-left">! Лише {freeQuantity} залишилось на цьому
                сайті!</p>
            <div className="features">
                {room.amenities.map((amenity: IRoomAmenity) => (
                    <div key={amenity.id}>
                        <img src={getPublicResourceUrl("icons/check.svg")} alt="" />
                        <p>{amenity.name}</p>
                    </div>
                ))}
            </div>
        </td>

        <td className="peoples">
            {room.variants.map((variant: IRoomVariant) => (
                <div className="cols" key={variant.id}>
                    <div className="flex flex-wrap">
                        {Array.from({ length: variant.guestInfo.adultCount }).map((_, idx) => (
                            <img
                                key={`adult-${idx}`}
                                src={getPublicResourceUrl("icons/homepageSvg/people.svg")}
                                alt="Adult"
                                title="Дорослий"
                            />
                        ))}
                        {Array.from({ length: variant.guestInfo.childCount }).map((_, idx) => (
                            <img
                                key={`child-${idx}`}
                                src={getPublicResourceUrl("icons/homepageSvg/people.svg")}
                                alt="Child"
                                title="Дитина"
                                className="child"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </td>

        <td className="bed-type">
            {room.variants.map((variant: IRoomVariant) => (
                <div className="cols" key={variant.id}>
                    <p className="title">Оберіть тип ліжка</p>

                    {variant.bedInfo.doubleBedCount > 0 && (
                        <div className="flex">
                            <input
                                type="checkbox"
                                id={`double-bed_${variant.id}`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`double-bed_${variant.id}`}>
                                <p>двоспальне ліжко</p>
                                <img
                                    src={getPublicResourceUrl("icons/bed/double-bed.svg")}
                                    alt=""
                                />
                            </label>
                        </div>
                    )}

                    {variant.bedInfo.singleBedCount > 0 && (
                        <div className="flex">
                            <input
                                type="checkbox"
                                id={`single-bed_${variant.id}`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`single-bed_${variant.id}`}>
                                <p>односпальне ліжко</p>
                                <img
                                    src={getPublicResourceUrl("icons/bed/single-bed.svg")}
                                    alt=""
                                />
                            </label>
                        </div>
                    )}

                    {variant.bedInfo.extraBedCount > 0 && (
                        <div className="flex">
                            <input
                                type="checkbox"
                                id={`extra-bed_${variant.id}`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`extra-bed_${variant.id}`}>
                                <p>додаткове ліжко</p>
                                <img
                                    src={getPublicResourceUrl("icons/bed/additional-bed.svg")}
                                    alt=""
                                />
                            </label>
                        </div>
                    )}

                    {variant.bedInfo.sofaCount > 0 && (
                        <div className="flex">
                            <input
                                type="checkbox"
                                id={`sofa-bed_${variant.id}`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`sofa-bed_${variant.id}`}>
                                <p>софа</p>
                                <img
                                    src={getPublicResourceUrl("icons/bed/sofa-bed.svg")}
                                    alt=""
                                />
                            </label>
                        </div>
                    )}

                    {variant.bedInfo.kingsizeBedCount > 0 && (
                        <div className="flex">
                            <input
                                type="checkbox"
                                id={`bed_kingsize_${variant.id}`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`bed_kingsize_${variant.id}`}>
                                <p>Кінгсайз</p>
                                <img
                                    src={getPublicResourceUrl("icons/bed/kingsize-bed.svg")}
                                    alt=""
                                />
                            </label>
                        </div>
                    )}
                </div>
            ))}
        </td>

        <td className="advantages">
            {room.variants.map((variant: IRoomVariant) => (
                <div className="cols" key={variant.id}>
                    {hotelBreakfast && (
                        <div className="flex flex-row">
                            <img src={getPublicResourceUrl("icons/breakfast.svg")}
                                 alt="" />
                            <p>Сніданок включено</p>
                        </div>
                    )}

                    <p><span>Тип кімнати:</span> {room.roomType.name}</p>

                    <p><span>Площа:</span> {room.area.toFixed(1)} м²</p>

                    <p><span>Кількість кімнат:</span> {room.numberOfRooms}</p>
                </div>
            ))}
        </td>

        <td className="price">
            {room.variants.map((variant: IRoomVariant) => {
                const discountPrice = variant.price != null ? variant.price : variant.discountPrice;
                const basePrice = variant.discountPrice != null ? variant.discountPrice : variant.price;
                const totalBasePrice = basePrice != null ? basePrice * selectedDays : 0;
                const totalDiscountPrice = discountPrice != null ? discountPrice * selectedDays : 0;

                return (
                    <div className="cols" key={variant.id}>
                        <div className="flex flex-row gap-2 flex-wrap">
                            <p className="new-price" title="Нова ціна">
                                {totalBasePrice.toFixed(0) + "$"}
                            </p>
                            {variant.discountPrice != null && (
                                <p className="old-price" title="Стара ціна">
                                    {totalDiscountPrice.toFixed(0) + "$"}
                                </p>
                            )}
                            <p className="description">Включає податки та збори</p>
                        </div>
                    </div>
                );
            })}
        </td>

        <td className="select-options">
            {room.variants.map((variant: IRoomVariant) => (
                <div className="cols" key={variant.id}>
                    <select
                        value={selectedQuantities[room.id]?.[variant.id] || 0}
                        onChange={(e) => handleSelectChange(room.id, variant.id, parseInt(e.target.value))}
                    >
                        {[...Array(getRemainingQuantity() + (selectedQuantities[room.id]?.[variant.id] || 0) + 1)].map((_, idx) => (
                            <option key={idx} value={idx}>
                                {idx}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </td>

        <td className="book">
            <button className="btn-book" onClick={handleBookingClick}>
                Забронювати
            </button>
            <p>Миттєве підтвердження</p>
        </td>
    </tr>;
};

export default RoomCard;