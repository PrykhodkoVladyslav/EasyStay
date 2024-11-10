import { useParams } from "react-router-dom";
import SearchHotelSection, { ISearchData } from "components/partials/customer/SearchHotelSection.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useGetHotelQuery } from "services/hotel.ts";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";
import { useState } from "react";
import { format } from "date-fns";
import RoomSection from "components/partials/customer/RoomSection.tsx";
import IRoom, { IFreePeriod } from "interfaces/room/IRoom.ts";
import showToast from "utils/toastShow.ts";

const HotelPage = () => {
    const { id } = useParams();
    const [hotelId] = useState(Number(id));

    const { data: hotelData, isLoading, error } = useGetHotelQuery(hotelId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [freePeriod, setFreePeriod] = useState<IFreePeriod | null>(null);
    const [rooms, setRooms] = useState<IRoom[]>([]);

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка при завантаженні даних готелю</p>;
    if (!hotelData) return null;

    const formatTime = (timeString: string) => {
        if (!timeString) return "Невірний час";
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}:00`;
    };

    const onSearch = (topFilters: ISearchData) => {
        const fromDate = topFilters.date?.from ? new Date(topFilters.date.from) : new Date();
        const toDate = topFilters.date?.to ? new Date(topFilters.date.to) : new Date();

        const freePeriod = (topFilters.date?.from && topFilters.date?.to) ? {
            from: format(fromDate, "yyyy-MM-dd"),
            to: format(toDate, "yyyy-MM-dd"),
        } : null;

        if (freePeriod == null)
            showToast("Оберість дати", "info");

        setFreePeriod(freePeriod);
        setRooms(hotelData?.rooms ?? []);
    };

    const handleScroll = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const photos: { name: string }[] = hotelData?.photos || [];
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="hotel-page">
            <div className="hotel-section">
                <div className="pages-info">
                    <div className="pages" id="pages">
                        <a href="#search" onClick={handleScroll("search")}>Типи номерів</a>
                        <a href="#reviews" onClick={handleScroll("reviews")}>Відгуки</a>
                        <a href="#questions" onClick={handleScroll("questions")}>Питання</a>
                        <a href="#pages" onClick={handleScroll("pages")}>Зручності</a>
                        <a href="#info" onClick={handleScroll("info")}>Інформація</a>
                    </div>

                    <div className="hotel-info">
                        <div className="top">
                            <div className="name-favorite">
                                <div className="name-rating">
                                    <p className="name" title={hotelData.name}>{hotelData.name}</p>
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

                        <div className="middle-block">
                            {hotelData.hotelAmenities.length > 0 && (
                                <div className="amenities" id="info">
                                    {hotelData.hotelAmenities.map(amenity => (
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

                            {hotelData.breakfasts.length > 0 && (
                                <div className="breakfasts">
                                    <p className="title">Сніданки:</p>
                                    {hotelData.breakfasts.map(breakfast => (
                                        <div>
                                            <img
                                                src={getPublicResourceUrl("icons/breakfast.svg")}
                                                alt=""
                                            />
                                            <p key={breakfast.id}>{breakfast.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {hotelData.languages.length > 0 && (
                                <div className="languages">
                                    <p className="title">Мови спілкування:</p>
                                    <ul>
                                        {hotelData.languages.map(language => (
                                            <li key={language.id}>{language.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="timing-info">
                                <p><span
                                    className="title">Час прибуття: </span>{formatTime(hotelData.arrivalTimeUtcFrom)} - {formatTime(hotelData.arrivalTimeUtcTo)}
                                </p>
                                <p><span
                                    className="title">Час від'їзду: </span>{formatTime(hotelData.departureTimeUtcFrom)} - {formatTime(hotelData.departureTimeUtcTo)}
                                </p>
                            </div>
                        </div>

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
                            src={getApiImageUrl(photos[0].name, 1200)}
                            alt=""
                            className="first-photo"
                            onClick={openModal}
                        />
                    )}

                    {/* 4 фото та більше */}
                    <div className="row-photos">
                        {photos.slice(1, 4).map((photo, index: number) => (
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
                                    src={getApiImageUrl(photos[4].name, 1200)}
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
                                        src={getApiImageUrl(photo.name, 1200)}
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
                <div className="search" id="search">
                    <SearchHotelSection onSearch={onSearch} hideCityInput={true} />
                </div>

                {freePeriod && (
                    <div className="rooms">
                        <p className="global-title">Номери</p>
                        <RoomSection
                            hotelId={hotelId}
                            hotelBreakfast={hotelData.breakfasts.length > 0}
                            freePeriod={freePeriod}
                            rooms={rooms}
                        />
                    </div>
                )}
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
                        <a href="#reviews" onClick={handleScroll("reviews")}>читати відгуки</a>
                    </div>
                </div>

                <div className="reviews">
                    <div className="review">
                        <div className="author">
                            <div className="image">
                                <img
                                    src={getPublicResourceUrl("account/no_user_photo.png")}
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
                                    src={getPublicResourceUrl("account/no_user_photo.png")}
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
                                    src={getPublicResourceUrl("account/no_user_photo.png")}
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
                            <input type="text" placeholder="Поставте запитання" />
                            <button>Надіслати</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelPage;