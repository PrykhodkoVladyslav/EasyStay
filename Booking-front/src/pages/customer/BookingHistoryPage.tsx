import {getIconUrl, getPublicResourceUrl} from "utils/publicAccessor.ts";

const BookingHistoryPage = () => {

    return (
        <>
            <div className="favorites-component">
                <p className="pre-title">Історія бронювань</p>
                <div className="sort-date-div">
                    <button className="sort-btn" >
                        <img src={getIconUrl("order.svg")} alt="order" />
                        <p className="order-title">Сортувати за: <span
                            className="order-name"></span></p>
                    </button>
                    <button className="date-btn">
                        <p><span className="order-name">13.09</span></p>
                        <img src={getIconUrl("calendarV2.svg")} alt="order" />

                    </button>
                </div>

                <div className="hotel-reviews">

                    <div className="hotel-item" >


                        <div className="hotel-info-container">
                            <div className="title-rating-container">
                                <p className="title no-wrap">Radisson Blu Hotel</p>
                                <div className="rating-container">
                                    <img src={getPublicResourceUrl("icons/star.svg")} alt="star" />
                                    <p className="rating">9,5</p>
                                </div>
                            </div>

                            <p className="address no-wrap">Барселона, іспанія</p>



                            <p className="amenities no-wrap">люкс.............</p>
                            <p className="realtor-info">Рієлтор: <span className="realtor-name"></span>дімон</p>
                            <p className="price"></p>

                        </div>
                    </div>

                    <div className="hotel-item" >


                        <div className="hotel-info-container">
                            <div className="title-rating-container">
                                <p className="title no-wrap">Radisson Blu Hotel</p>
                                <div className="rating-container">
                                    <img src={getPublicResourceUrl("icons/star.svg")} alt="star" />
                                    <p className="rating">9,5</p>
                                </div>
                            </div>

                            <p className="address no-wrap">Барселона, іспанія</p>



                            <p className="amenities no-wrap">люкс.............</p>
                            <p className="realtor-info">Рієлтор: <span className="realtor-name"></span>дімон</p>
                            <p className="price"></p>

                        </div>
                    </div>
                    <div className="hotel-item" >


                        <div className="hotel-info-container">
                            <div className="title-rating-container">
                                <p className="title no-wrap">Radisson Blu Hotel</p>
                                <div className="rating-container">
                                    <img src={getPublicResourceUrl("icons/star.svg")} alt="star" />
                                    <p className="rating">9,5</p>
                                </div>
                            </div>

                            <p className="address no-wrap">Барселона, іспанія</p>



                            <p className="amenities no-wrap">люкс.............</p>
                            <p className="realtor-info">Рієлтор: <span className="realtor-name"></span>дімон</p>
                            <p className="price"></p>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default BookingHistoryPage;