import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const MyHotels = () => {

    return (
        <div className="hotels-container">
            <div className="container1">
                <p className="title">Мої готелі</p>
                <div className="hotels">
                    <div className="hotel">
                        <div className="images-container">
                            <img className="image"
                                 src="https://img.poehalisnami.ua/static/hotels/dominikana/khuan-dolio/h6158/orig/booking6158_16158_637973645967969341.jpg"
                                 alt=""
                            />

                            <div className="slides">
                                <div className="container2">
                                    <div className="active-slide"></div>
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                </div>
                            </div>
                        </div>

                        <div className="info">
                            <div className="top">
                                <div className="container3">
                                    <p className="name">Costa</p>
                                    <div className="stars-container">
                                        <div className="container4">
                                            <img
                                                src={getPublicResourceUrl("account/home/star.svg")}
                                                alt=""
                                                className="star"
                                            />
                                            <p className="rating">
                                                9.7
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <p className="location">Huan, Caribe</p>
                                <p className="description">Люкс з гідромасажною ванною, вигляд на центр міста,
                                    балкон</p>
                                <div className="realtor">
                                    <p>Рієлтор:</p>
                                    <p>Оксана</p>
                                </div>
                            </div>

                            <div className="bottom">
                                <p>2 ночі, 1 дорослий</p>
                                <div className="container5">
                                    <div className="prices-container">
                                        <p className="price">6999₴</p>
                                        <p className="old-price">13399₴</p>
                                    </div>
                                    <div className="container6">
                                        <p className="no-any-of-left">Залишилось лише 2 варіанти</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel">
                        <div className="images-container">
                            <img className="image"
                                 src="https://hotel-mir-rivne.hotelmix.com.ua/data/Photos/OriginalPhoto/1381/138197/138197871/Hotel-Mir-Rivne-Exterior.JPEG"
                                 alt=""
                            />

                            <div className="slides">
                                <div className="container2">
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                    <div className="active-slide"></div>
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                </div>
                            </div>
                        </div>

                        <div className="info">
                            <div className="top">
                                <div className="container3">
                                    <p className="name">Costtac Costata Costa</p>
                                    <div className="stars-container">
                                        <div className="container4">
                                            <img
                                                src={getPublicResourceUrl("account/home/star.svg")}
                                                alt="Зірки"
                                                className="star"
                                            />
                                            <p className="rating">
                                                9.7
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <p className="location">Рівне, Україна</p>
                                <p className="description">Люкс з гідромасажною ванною, вигляд на центр міста,
                                    балкон</p>
                                <div className="realtor">
                                    <p>Рієлтор:</p>
                                    <p>Оксана</p>
                                </div>
                            </div>

                            <div className="bottom">
                                <p>2 ночі, 1 дорослий</p>
                                <div className="container5">
                                    <div className="prices-container">
                                        <p className="price">6999₴</p>
                                        <p className="old-price">13399₴</p>
                                    </div>
                                    <div className="container6">
                                        <p className="any-of-left">Сезонна пропозиція</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel">
                        <div className="images-container">
                            <img className="image"
                                 src="https://hotel-mir-rivne.hotelmix.com.ua/data/Photos/OriginalPhoto/1381/138197/138197871/Hotel-Mir-Rivne-Exterior.JPEG"
                                 alt=""
                            />

                            <div className="slides">
                                <div className="container2">
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                    <div className="slide"></div>
                                    <div className="active-slide"></div>
                                </div>
                            </div>
                        </div>

                        <div className="info">
                            <div className="top">
                                <div className="container3">
                                    <p className="name">Hotel Mir Rivne</p>
                                    <div className="stars-container">
                                        <div className="container4">
                                            <img
                                                src={getPublicResourceUrl("account/home/star.svg")}
                                                alt="Зірки"
                                                className="star"
                                            />
                                            <p className="rating">
                                                9.7
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <p className="location">Рівне, Україна</p>
                                <p className="description">Люкс з гідромасажною ванною, вигляд на центр міста,
                                    балкон</p>
                                <div className="realtor">
                                    <p>Рієлтор:</p>
                                    <p>Оксана</p>
                                </div>
                            </div>

                            <div className="bottom">
                                <p>2 ночі, 1 дорослий</p>
                                <div className="container5">
                                    <div className="prices-container">
                                        <p className="price">6999₴</p>
                                        <p className="old-price">13399₴</p>
                                    </div>
                                    <div className="container6">
                                        <p className="no-any-of-left">Залишилось лише 2 варіанти</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container8">
                <button>
                    Більше
                </button>
            </div>
        </div>
    )
}

export default MyHotels;