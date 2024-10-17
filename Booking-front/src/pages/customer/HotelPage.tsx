import SearchHotelSection from "components/partials/customer/SearchHotelSection.tsx";
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
                                        /* У помешканні Messe-Congress Central with balcony, розміщеному приблизно за
                                        менше ніж 1 км від пам'ятки "Конференц-центр Messe Wien", до розпорядження
                                        гостей комфортне перебування з красивим видом на басейн. Також для зручності
                                        гостей тераса та балкон. У помешканні Messe-Congress Central with balcony, яке
                                        розміщено за 14 хв. ходьби від пам'ятки "Віденський парк Пратер", доступний
                                        безкоштовний Wi-Fi. Це помешкання (апартаменти) складається зі спалень (1),
                                        вітальнi, повністю обладнаної кухні з холодильником і кавоваркою, а також ванних
                                        кімнат (1) з душем та безкоштовними туалетно-косметичними засобами. У цьому
                                        помешканні для зручності гостей є постільна білизна та рушники. Працівники
                                        стійки реєстрації говорять такими мовами – німецька, англійська, іврит та
                                        російська – і нададуть гостям необхідні поради про околиці помешкання.
                                        Помешкання Messe-Congress Central with balcony розміщено за 2,9 км від пам'ятки
                                        "Стадіон Ернста Хаппеля". Найближчий аеропорт до помешкання Messe-Congress
                                        Central with balcony – Аеропорт Відень-Швехат, що розташований за 19 км. Це
                                        місце розташування особливо подобається індивідуальним мандрівникам – вони
                                        оцінили його на 9,0 для подорожі наодинці. */
                                        position: static;
                                        width: 725px;
                                        height: 240px;
                                        /* Auto layout */
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: flex-start;
                                        align-items: flex-start;
                                        gap: 58;
                                        padding: 0px;


                                        /* Inside Auto Layout */
                                        flex: none;
                                        order: 1;
                                        align-self: stretch;
                                        flex-grow: 0;
                                        margin: 58px 0px;</p>
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