import IRoomAmenity from "interfaces/roomAmenity/IRoomAmenity.ts";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";
import IRoom, { IFreePeriod } from "interfaces/room/IRoom.ts";
import { useGetRoomVariantsFreeQuantityQuery } from "services/room.ts";

interface IRoomCardProps {
    room: IRoom;
    freePeriod: IFreePeriod;
}

const RoomCard = (props: IRoomCardProps) => {
    const { room, freePeriod } = props;

    const { data: freeQuantity } = useGetRoomVariantsFreeQuantityQuery({
        id: room.id,
        freePeriod: freePeriod,
    });

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
                                id={`double-bed`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`double-bed`}>
                                <p>{variant.bedInfo.doubleBedCount} двоспальне ліжко</p>
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
                                id={`single-bed`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`single-bed`}>
                                <p>{variant.bedInfo.singleBedCount} односпальні ліжка</p>
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
                                id={`extra-bed`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`extra-bed`}>
                                <p>{variant.bedInfo.extraBedCount} додаткове ліжко</p>
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
                                id={`sofa-bed`}
                                name={`bed-type_${variant.roomId}`}
                            />
                            <label htmlFor={`sofa-bed`}>
                                <p>{variant.bedInfo.sofaCount} софа</p>
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
                                <p>{variant.bedInfo.kingsizeBedCount} kingsize ліжко</p>
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

        {/*<td className="advantages">*/}
        {/*    {room.variants.map((variant: IRoomVariant) => (*/}
        {/*        <div className="cols" key={variant.id}>*/}
        {/*            {hotelBreakfast && (*/}
        {/*                <div className="flex flex-row">*/}
        {/*                    <img src={getPublicResourceUrl("icons/breakfast.svg")}*/}
        {/*                         alt="" />*/}
        {/*                    <p>Сніданок включено</p>*/}
        {/*                </div>*/}
        {/*            )}*/}

        {/*            <p><span>Тип кімнати:</span> {room.roomType.name}</p>*/}

        {/*            <p><span>Площа:</span> {room.area.toFixed(1)} м²</p>*/}

        {/*            <p><span>Кількість кімнат:</span> {room.numberOfRooms}</p>*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*</td>*/}

        {/*<td className="price">*/}
        {/*    {room.variants.map((variant: IRoomVariant) => {*/}
        {/*        const discountPrice = variant.price != null ? variant.price : variant.discountPrice;*/}
        {/*        const basePrice = variant.discountPrice != null ? variant.discountPrice : variant.price;*/}
        {/*        const totalBasePrice = basePrice != null ? basePrice * selectedDays : 0;*/}
        {/*        const totalDiscountPrice = discountPrice != null ? discountPrice * selectedDays : 0;*/}

        {/*        return (*/}
        {/*            <div className="cols" key={variant.id}>*/}
        {/*                <div className="flex flex-row gap-2 flex-wrap">*/}
        {/*                    {selectedDays === 0 ? (*/}
        {/*                        <p className="new-price text-red-500">Виберіть дати</p>*/}
        {/*                    ) : (*/}
        {/*                        <>*/}
        {/*                            <p className="new-price" title="Нова ціна">*/}
        {/*                                {totalBasePrice.toFixed(0) + "$"}*/}
        {/*                            </p>*/}
        {/*                            {variant.discountPrice != null && (*/}
        {/*                                <p className="old-price" title="Стара ціна">*/}
        {/*                                    {totalDiscountPrice.toFixed(0) + "$"}*/}
        {/*                                </p>*/}
        {/*                            )}*/}
        {/*                            <p className="description">Включає податки та збори</p>*/}
        {/*                        </>*/}
        {/*                    )}*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        );*/}
        {/*    })}*/}
        {/*</td>*/}

        {/*<td className="select-options">*/}
        {/*    {room.variants.map((variant: IRoomVariant) => (*/}
        {/*        <div className="cols" key={variant.id}>*/}
        {/*            <select*/}
        {/*                value={selectedQuantities[room.id]?.[variant.id] || 0}*/}
        {/*                onChange={(e) => handleSelectChange(room.id, variant.id, parseInt(e.target.value))}*/}
        {/*            >*/}
        {/*                {[...Array(getRemainingQuantity(room.id) + (selectedQuantities[room.id]?.[variant.id] || 0) + 1)].map((_, idx) => (*/}
        {/*                    <option key={idx} value={idx}>*/}
        {/*                        {idx}*/}
        {/*                    </option>*/}
        {/*                ))}*/}
        {/*            </select>*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*</td>*/}

        <td className="book">
            <button className="btn-book">Забронювати</button>
            <p>Миттєве підтвердження</p>
        </td>
    </tr>;
};

export default RoomCard;