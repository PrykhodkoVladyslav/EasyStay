// import SearchHotelSection from "components/partials/customer/SearchHotelSection.tsx";
import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const HotelPage = () => {


    return (
        <div className="hotel-page">

            <div className="hotel-section">

                <div className="pages-info">
                    <div className="pages">
                        <a>Типи номерів</a>
                        <a>Відгуки</a>
                        <a>Питання</a>
                        <a>Зручності</a>
                        <a>Інформація</a>
                    </div>

                    <div className="hotel-info">
                        <div className="top">
                            <div className="name-favorite">
                                <div className="name-rating">
                                    <p className="name">Radisson Blu Hotel
                                         У помешканні Messe-Congress Central with balcony, розміщеному приблизно за
                                        менше ніж 1 км від пам'ятки "Конференц-центр Messe Wien", до розпорядження
                                        гостей комфортне перебування з красивим видом на басейн. Також для зручності
                                        </p>
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

                                <button className="btn-favorite">
                                    <img
                                        src={getPublicResourceUrl("icons/heart.svg")}
                                        alt=""
                                    />
                                </button>
                            </div>

                        </div>

                        <div className="main">

                        </div>

                        <div className="bottom">

                        </div>
                    </div>
                </div>

                <div className="photos">

                </div>
            </div>


            <div className="search-rooms">
                {/*<SearchHotelSection />*/}

                <div className="rooms">

                </div>
            </div>

            <div className="reviews">

            </div>

            <div className="questions">

            </div>

        </div>
    );
}

export default HotelPage;