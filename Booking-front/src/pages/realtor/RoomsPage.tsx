import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRoomMutation, useGetRoomsPageQuery } from "services/room.ts";
import showToast from "utils/toastShow.ts";
import IRoomAmenity from "interfaces/roomAmenity/IRoomAmenity.ts";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";
import "./../../css/room-table.scss";
import { useGetHotelQuery } from "services/hotel.ts";
import { useContext, useEffect } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

const RoomsPage = () => {
    useEffect(instantScrollToTop, []);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage("hotels");
    }, []);

    const currentHotelStringId = useParams<{ id: string }>().id;
    const hotelId = Number(currentHotelStringId);

    const { data: roomsData, isLoading, error } = useGetRoomsPageQuery({
        pageIndex: 0,
        hotelId: hotelId,
    });
    const [deleteRoom] = useDeleteRoomMutation();
    const { data: hotelData } = useGetHotelQuery(hotelId);
    const navigate = useNavigate();

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await deleteRoom(roomId).unwrap();
            showToast("Номер успішно видалено", "success");
        } catch (err) {
            showToast("Помилка при видаленні номера", "error");
        }
    };

    const rooms = roomsData?.data ?? [];
    if (isLoading || !rooms) return <p className="isLoading-error pt-20">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="rooms-container">
            <p className="global-title">Номери готелю ,,{hotelData?.name},,</p>
            <button
                onClick={() => navigate(`/realtor/add/room/${hotelId}`)}
                className="add-room-btn"
            >Додати номер
            </button>

            <div className="rooms-page">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <table key={room.id} className="room-table">
                            <thead>
                            <tr>
                                <th>Тип номера</th>
                                <th>Кількість гостей</th>
                                <th>Тип ліжка</th>
                                <th>Додаткова інформація</th>
                                <th>Ціна</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr key={room.id}>
                                <td className="room-type">
                                    <p className="title">{room.name}</p>
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

                                        return (
                                            <div className="cols" key={variant.id}>
                                                <div className="flex flex-row gap-2 flex-wrap">
                                                    <p className="new-price" title="Оригінальна ціна">
                                                        {basePrice?.toFixed(0) + "$"}
                                                    </p>
                                                    {variant.discountPrice != null && (
                                                        <p className="old-price" title="Ціна зі знижкою">
                                                            {discountPrice != null && discountPrice.toFixed(0) + "$"}
                                                        </p>
                                                    )}
                                                    <p className="description">Включає податки та збори</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </td>

                                <td className="book items">
                                    <button className="btn-book"
                                            onClick={() => navigate(`/realtor/edit/room/${room.id}`)}>
                                        Редагувати
                                    </button>
                                    <button className="trash" onClick={() => handleDeleteRoom(room.id)}>
                                        <img src={getPublicResourceUrl("account/trash.svg")} alt="" />
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    ))
                ) : (
                    <p className="isLoading-error pt-20 pb-20">У цього готелю немає Номерів</p>
                )}
            </div>
        </div>
    );
};

export default RoomsPage;
