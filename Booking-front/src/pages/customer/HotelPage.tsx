import { useParams } from "react-router-dom";
import SearchHotelSection from "components/partials/customer/SearchHotelSection.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useGetHotelQuery } from "services/hotel.ts";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";
import { useState } from "react";

const HotelPage = () => {
    const { id } = useParams();
    const { data: hotelData, isLoading, error } = useGetHotelQuery(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuantities, setSelectedQuantities] = useState<{ [roomId: number]: { [variantId: number]: number } }>({});

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка при завантаженні даних готелю</p>;

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

    const getRemainingQuantity = (roomId: number) => {
        const room = hotelData.rooms.find((r: any) => r.id === roomId);
        if (!room) return 0;

        const selectedForRoom = selectedQuantities[roomId] || {};
        const usedQuantity = Object.values(selectedForRoom).reduce((sum, qty) => sum + qty, 0);

        return Math.max(room.quantity - usedQuantity, 0);
    };

    const handleScroll = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    console.log(hotelData);

    const photos = hotelData?.photos || [];
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="hotel-page">
            <div className="hotel-section">
                <div className="pages-info">
                    <div className="pages" id="pages">
                        <a href="#rooms" onClick={handleScroll('rooms')}>Типи номерів</a>
                        <a href="#reviews" onClick={handleScroll('reviews')}>Відгуки</a>
                        <a href="#questions" onClick={handleScroll('questions')}>Питання</a>
                        <a href="#pages" onClick={handleScroll('pages')}>Зручності</a>
                        <a href="#info" onClick={handleScroll('info')}>Інформація</a>
                    </div>

                    <div className="hotel-info">
                        <div className="top">
                            <div className="name-favorite">
                                <div className="name-rating">
                                    <p className="name">{hotelData.name}</p>
                                    <div className="rating">
                                        <img
                                            src={getPublicResourceUrl("account/star.svg")}
                                            alt=""
                                            className="star"
                                        />
                                        <p>{hotelData.rating}</p>
                                    </div>
                                </div>

                                <button className="btn-favorite">
                                    <img
                                        src={getPublicResourceUrl("icons/heart.svg")}
                                        alt=""
                                    />
                                </button>
                            </div>

                            <div className="location">
                                <img
                                    src={getPublicResourceUrl("icons/location.svg")}
                                    alt=""
                                />
                                <p className="city">{hotelData.address.city.name}</p>
                                <p>, </p>
                                <p className="country"> {hotelData.address.city.country.name}</p>
                                <p> / </p>
                                <p className="address">{hotelData.address.street}, {hotelData.address.houseNumber}</p>
                            </div>
                        </div>

                        {hotelData.hotelAmenities.length > 0 && (
                            <div className="amenities" id="info">
                                {hotelData.hotelAmenities.map((amenity) => (
                                    <div key={amenity.id} className="amenity">
                                        <img
                                            src={getApiImageUrl(amenity.image, 800)}
                                            alt={amenity.name}
                                        />
                                        <p>{amenity.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="description" id="description">{hotelData.description}</p>

                        <div className="bottom">
                            <p className="title-about">Про власника</p>

                            <div className="realtor-rating">
                                <p className="name">{hotelData.realtor.firstName} {hotelData.realtor.lastName}</p>

                                <div className="rating">
                                    <img
                                        src={getPublicResourceUrl("account/star.svg")}
                                        alt=""
                                    />
                                    <p>{hotelData.realtor.rating.toFixed(1)}</p>
                                </div>
                            </div>

                            <p className="description">{hotelData.realtor.description}</p>
                        </div>
                    </div>
                </div>

                <div className="photos">
                    {/* Перша фотографія */}
                    {photos[0] && (
                        <img
                            src={getApiImageUrl(photos[0].name, 800)}
                            alt=""
                            className="first-photo"
                            onClick={openModal}
                        />
                    )}

                    {/* 4 фото та більше */}
                    <div className="row-photos">
                        {photos.slice(1, 4).map((photo, index) => (
                            <div key={index + 2} onClick={openModal}>
                                <img
                                    src={getApiImageUrl(photo.name, 800)}
                                    alt=""
                                />
                            </div>
                        ))}

                        {photos.length > 4 && (
                            <div className="photo-more" onClick={openModal}>
                                {photos.length > 6 && (
                                    <p>+<span>{photos.length - 6}</span> фото</p>
                                )}
                                <img
                                    src={getApiImageUrl(photos[4].name, 800)}
                                    alt=""
                                />
                            </div>
                        )}
                    </div>

                    {/* Остання фотографія */}
                    {photos[5] && (
                        <img
                            src={getApiImageUrl(photos[5].name, 800)}
                            alt=""
                            className="last-photo"
                            onClick={openModal}
                        />
                    )}
                </div>
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={closeModal}>×</button>
                            <div className="photo-gallery">
                                {photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={getApiImageUrl(photo.name, 800)}
                                        alt={`photo-${index}`}
                                        className="modal-photo"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="search-rooms">
                <div className="search">
                    <SearchHotelSection showCityInput={false} />
                </div>

                <div className="rooms" id="rooms">
                    <p className="global-title">Номери</p>

                    <table className="room-table">
                        <thead>
                        <tr>
                            <th>Тип номера</th>
                            <th>Кількість гостей</th>
                            <th>Тип ліжка</th>
                            <th>Додаткова інформація</th>
                            <th>Ціна</th>
                            <th>Оберіть варіанти</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {hotelData.rooms.map(room => (
                            <tr key={room.id}>
                                <td className="room-type">
                                    <p className="title">{room.name}</p>
                                    <p className="rooms-left">! Лише {room.quantity} залишилось на цьому сайті!</p>
                                    <div className="features">
                                        {room.amenities.map(amenity => (
                                            <div key={amenity.id}>
                                                <img src={getPublicResourceUrl("icons/check.svg")} alt=""/>
                                                <p>{amenity.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                <td className="peoples">
                                    {room.variants.map(variant => (
                                        <div className="cols" key={variant.id}>
                                            {Array.from({length: variant.guestInfo.adultCount}).map((_, idx) => (
                                                <img
                                                    key={`adult-${idx}`}
                                                    src={getPublicResourceUrl("icons/homepageSvg/people.svg")}
                                                    alt="Adult"
                                                />
                                            ))}
                                            {Array.from({length: variant.guestInfo.childCount}).map((_, idx) => (
                                                <img
                                                    key={`child-${idx}`}
                                                    src={getPublicResourceUrl("icons/homepageSvg/people.svg")}
                                                    alt="Child"
                                                    className="child"
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </td>

                                <td className="bed-type">
                                    {room.variants.map(variant => (
                                        <div className="cols" key={variant.id}>
                                            <p className="title">Оберіть тип ліжка</p>

                                            {variant.bedInfo.doubleBedCount > 0 && (
                                                <div className="flex">
                                                    <input
                                                        type="radio"
                                                        id={`bed_double_${variant.id}`}
                                                        name={`bed-type_${variant.roomId}`}
                                                    />
                                                    <label htmlFor={`bed_double_${variant.id}`}>
                                                        <p>{variant.bedInfo.doubleBedCount} двоспальне ліжко</p>
                                                        <img
                                                            src={getPublicResourceUrl("icons/roomSvg/double-bed.svg")}
                                                            alt=""
                                                        />
                                                    </label>
                                                </div>
                                            )}

                                            {variant.bedInfo.singleBedCount > 0 && (
                                                <div className="flex">
                                                    <input
                                                        type="radio"
                                                        id={`bed_single_${variant.id}`}
                                                        name={`bed-type_${variant.roomId}`}
                                                    />
                                                    <label htmlFor={`bed_single_${variant.id}`}>
                                                        <p>{variant.bedInfo.singleBedCount} односпальні ліжка</p>
                                                        <img
                                                            src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")}
                                                            alt=""
                                                        />
                                                    </label>
                                                </div>
                                            )}

                                            {variant.bedInfo.extraBedCount > 0 && (
                                                <div className="flex">
                                                    <input
                                                        type="radio"
                                                        id={`bed_extra_${variant.id}`}
                                                        name={`bed-type_${variant.roomId}`}
                                                    />
                                                    <label htmlFor={`bed_extra_${variant.id}`}>
                                                        <p>{variant.bedInfo.extraBedCount} додаткове ліжко</p>
                                                        <img
                                                            src={getPublicResourceUrl("icons/roomSvg/extra-bed.svg")}
                                                            alt=""
                                                        />
                                                    </label>
                                                </div>
                                            )}

                                            {variant.bedInfo.sofaCount > 0 && (
                                                <div className="flex">
                                                    <input
                                                        type="radio"
                                                        id={`bed_sofa_${variant.id}`}
                                                        name={`bed-type_${variant.roomId}`}
                                                    />
                                                    <label htmlFor={`bed_sofa_${variant.id}`}>
                                                        <p>{variant.bedInfo.sofaCount} софа</p>
                                                        <img
                                                            src={getPublicResourceUrl("icons/roomSvg/sofa.svg")}
                                                            alt=""
                                                        />
                                                    </label>
                                                </div>
                                            )}

                                            {variant.bedInfo.kingsizeBedCount > 0 && (
                                                <div className="flex">
                                                    <input
                                                        type="radio"
                                                        id={`bed_kingsize_${variant.id}`}
                                                        name={`bed-type_${variant.roomId}`}
                                                    />
                                                    <label htmlFor={`bed_kingsize_${variant.id}`}>
                                                        <p>{variant.bedInfo.kingsizeBedCount} kingsize ліжко</p>
                                                        <img
                                                            src={getPublicResourceUrl("icons/roomSvg/kingsize-bed.svg")}
                                                            alt=""
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </td>

                                <td className="advantages">
                                    {room.variants.map(variant => (
                                        <div className="cols" key={variant.id}>
                                            {hotelData.breakfast && (
                                                <div className="flex flex-row">
                                                    <img src={getPublicResourceUrl("icons/roomSvg/breakfast.svg")}
                                                         alt=""/>
                                                    <p>Сніданок включено</p>
                                                </div>
                                            )}

                                            <p><span>Тип кімнати:</span> {room.roomType.name}</p>

                                            <p><span>Площа:</span> {room.area.toFixed(1)} м²</p>

                                            <p><span>Кількість кімнат:</span> {room.numberOfRooms}</p>

                                            {/*<div className="rental-periods">*/}
                                            {/*    <p>Періоди оренди:</p>*/}
                                            {/*    <ul>*/}
                                            {/*        {room.rentalPeriods.map(period => (*/}
                                            {/*            <li key={period.id}>{period.name}</li>*/}
                                            {/*        ))}*/}
                                            {/*    </ul>*/}
                                            {/*</div>*/}
                                        </div>
                                    ))}
                                </td>

                                <td className="price">
                                    {room.variants.map(variant => (
                                        <div className="cols" key={variant.id}>
                                            <div className="flex flex-row gap-2">
                                                <p className="new-price">
                                                    {variant.discountPrice != null ? variant.discountPrice.toFixed(0) + '₴' : variant.price?.toFixed(0) + '₴'}
                                                </p>
                                                {variant.discountPrice != null && variant.price != null && (
                                                    <p className="old-price">
                                                        {variant.price.toFixed(0) + '₴'}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="description">Включає податки та збори</p>
                                        </div>
                                    ))}
                                </td>

                                <td className="select-options">
                                    {room.variants.map(variant => (
                                        <div className="cols" key={variant.id}>
                                            <select
                                                value={selectedQuantities[room.id]?.[variant.id] || 0}
                                                onChange={(e) => handleSelectChange(room.id, variant.id, parseInt(e.target.value))}
                                            >
                                                {[...Array(getRemainingQuantity(room.id) + (selectedQuantities[room.id]?.[variant.id] || 0) + 1)].map((_, idx) => (
                                                    <option key={idx} value={idx}>{idx}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </td>

                                <td className="book">
                                    <button className="btn-book">Забронювати</button>
                                    <p>Миттєве підтвердження</p>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="reviews-content" id="reviews">
                <p className="title">Відгуки гостей</p>

                <div className="count">
                    <div className="rating">
                        <p>9.2</p>
                        <p>чудово</p>
                    </div>
                    <div className="reviews-count">
                        <p><span>5</span> відгуків</p>
                        <a href="#reviews" onClick={handleScroll('reviews')}>читати відгуки</a>
                    </div>
                </div>

                {/*<div className="ratings">*/}
                {/*    <div className="rating-bar">*/}
                {/*        <div className="text-rating">*/}
                {/*            <p>Персонал</p>*/}
                {/*            <p>9.2</p>*/}
                {/*        </div>*/}
                {/*        <div className="bar">*/}
                {/*            <div className="pre-bar"></div>*/}
                {/*            <div className="active-bar"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="rating-bar">*/}
                {/*        <div className="text-rating">*/}
                {/*            <p>Чистота</p>*/}
                {/*            <p>9.2</p>*/}
                {/*        </div>*/}
                {/*        <div className="bar">*/}
                {/*            <div className="pre-bar"></div>*/}
                {/*            <div className="active-bar"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="rating-bar">*/}
                {/*        <div className="text-rating">*/}
                {/*            <p>Зручності</p>*/}
                {/*            <p>9.2</p>*/}
                {/*        </div>*/}
                {/*        <div className="bar">*/}
                {/*            <div className="pre-bar"></div>*/}
                {/*            <div className="active-bar"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="rating-bar">*/}
                {/*        <div className="text-rating">*/}
                {/*            <p>Комфорт</p>*/}
                {/*            <p>9.2</p>*/}
                {/*        </div>*/}
                {/*        <div className="bar">*/}
                {/*            <div className="pre-bar"></div>*/}
                {/*            <div className="active-bar"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="rating-bar">*/}
                {/*        <div className="text-rating">*/}
                {/*            <p>Розташування</p>*/}
                {/*            <p>9.2</p>*/}
                {/*        </div>*/}
                {/*        <div className="bar">*/}
                {/*            <div className="pre-bar"></div>*/}
                {/*            <div className="active-bar"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="rating-bar">*/}
                {/*        <div className="text-rating">*/}
                {/*            <p>Співвідношення ціна/якість</p>*/}
                {/*            <p>9.2</p>*/}
                {/*        </div>*/}
                {/*        <div className="bar">*/}
                {/*            <div className="pre-bar"></div>*/}
                {/*            <div className="active-bar"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="reviews">
                    <div className="review">
                        <div className="author">
                            <div className="image">
                                <img
                                    src={getPublicResourceUrl('account/no_user_photo.png')}
                                    alt="realtor name"
                                />
                            </div>
                            <div className="container9">
                                <p className="name">Марія</p>
                                <div className="stars-container">
                                    <img
                                        src={getPublicResourceUrl("account/star.svg")}
                                        alt=""
                                        className="star"
                                    />
                                    <p className="rating">
                                        9.7
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="description">
                            Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                            дуже чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                        </p>
                    </div>
                    <div className="review">
                        <div className="author">
                            <div className="image">
                                <img
                                    src={getPublicResourceUrl('account/no_user_photo.png')}
                                    alt="realtor name"
                                />
                            </div>
                            <div className="container9">
                                <p className="name">Олександра dsad as d asd dad s </p>
                                <div className="stars-container">
                                    <img
                                        src={getPublicResourceUrl("account/star.svg")}
                                        alt=""
                                        className="star"
                                    />
                                    <p className="rating">
                                        9.7
                                    </p>
                                </div>
                            </div>

                        </div>

                        <p className="description">
                            Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                            дуже
                            чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                            до центру міста. Господар був дуже добрим. Квартира була дуже
                            чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                            до центру міста. Господар був дуже добрим. Квартира була дуже
                            чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                        </p>
                    </div>
                    <div className="review">
                        <div className="author">
                            <div className="image">
                                <img
                                    src={getPublicResourceUrl('account/no_user_photo.png')}
                                    alt="realtor name"
                                />
                            </div>
                            <div className="container9">
                                <p className="name">Даніела</p>
                                <div className="stars-container">
                                    <img
                                        src={getPublicResourceUrl("account/star.svg")}
                                        alt=""
                                        className="star"
                                    />
                                    <p className="rating">
                                        9.7
                                    </p>
                                </div>
                            </div>

                        </div>

                        <p className="description">
                            Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                            дуже
                            чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                        </p>
                    </div>
                </div>

                <button className="btn-more">
                    Більше відгуків
                </button>
            </div>

            <div className="questions-content" id="questions">
                <div className="title">Найчастіші запитання</div>

                <div className="questions">
                    <div className="question">Чи є місце для парковки? <span>&#8250;</span></div>
                    <div className="question">Ви подаєте сніданок? <span>&#8250;</span></div>
                    <div className="question">Чи є ресторан? <span>&#8250;</span></div>
                    <div className="question">Чи є спа-центр? <span>&#8250;</span></div>
                    <div className="question">Які умови користування Wi-Fi? <span>&#8250;</span></div>
                    <div className="question">Чи є трансфер до аеропорту? <span>&#8250;</span></div>
                    <div className="question">Які умови розміщення з домашніми тваринами? <span>&#8250;</span></div>
                    <div className="question">Тут є обслуговування номерів? <span>&#8250;</span></div>
                    <div className="question">Тут є номер для некурців? <span>&#8250;</span></div>
                    <div className="question">Є тренажерний зал? <span>&#8250;</span></div>
                    <div className="question">Чи є трансфер до аеропорту? <span>&#8250;</span></div>
                    <div className="question">Які умови розміщення з домашніми тваринами? <span>&#8250;</span></div>
                    <div className="question">
                        <p className="question-title">Вас цікавить інше питання?</p>
                        <p className="question-subtitle">У нас є миттєва відповідь на найбільш поширені запитання</p>
                        <div className="w-full relative">
                            <input type="text" placeholder="Поставте запитання"/>
                            <button>Надіслати</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelPage;