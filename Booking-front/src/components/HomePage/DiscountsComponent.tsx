import React from 'react';
import {getPublicResourceUrl} from "utils/publicAccessor.ts";


const DiscountsComponent = () => {
    return (
        <div className="all-conteiner">
            <h1 className="first-discount">Знижки</h1>
            <button className="sort-btn"><img src="icons/homepageSvg/arrow.svg"></img>Сортувати за:</button>

            <div className="sidebar">
                <ul className="menu">
                    <li className="menu__item"><a href="#" className="menu__link">Готелі</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Апартаменти</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Машини</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Трансфери</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Тури</a></li>
                </ul>
            </div>


        <div className="hotels-reviews1">
          <div className="hotels-container1">
                    <div className="container11">
                        <div className="items1">
                            <div className="item1">
                                <div className="images-container1">
                                    <img className="image1"
                                         src="public\images\Homepage\HiltonHotel.png"
                                         alt=""
                                    />


                                </div>

                                <div className="info1">
                                    <div className="top1">
                                        <div className="container31">
                                            <p className="name1">Hilton Hotel</p>
                                            <div className="stars-container1">
                                                <div className="container41">
                                                    <img
                                                        src={getPublicResourceUrl("account/home/star.svg")}
                                                        alt=""
                                                        className="star1"
                                                    />
                                                    <p className="rating1">
                                                        8.3
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <p className="location1">Відень, Австрія</p>


                                    </div>

                                    <div className="bottom1">

                                        <div className="container51">
                                            <div className="prices-container1">
                                                <p className="price1">4599₴</p>
                                                <p className="old-price1">7999₴</p>
                                            </div>

                                            <a href="/#hotel" className="button-Reserve">Забронювати</a>

                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="item1">
                                <div className="images-container1">
                                    <img className="image1"
                                         src="public\images\Homepage\RadissonBlu.png"
                                         alt=""
                                    />


                                </div>

                                <div className="info1">
                                    <div className="top1">
                                        <div className="container31">
                                            <p className="name1">Hilton Hotel</p>
                                            <div className="stars-container1">
                                                <div className="container41">
                                                    <img
                                                        src={getPublicResourceUrl("account/home/star.svg")}
                                                        alt=""
                                                        className="star1"
                                                    />
                                                    <p className="rating1">
                                                        9.5
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <p className="location1">Київ, Україна</p>


                                    </div>

                                    <div className="bottom1">

                                        <div className="container51">
                                            <div className="prices-container1">
                                                <p className="price1">2999₴</p>
                                                <p className="old-price1">6599₴</p>
                                            </div>

                                            <a href="/#hotel" className="button-Reserve">Забронювати</a>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="item1">
                                <div className="images-container1">
                                    <img className="image1"
                                         src="public\images\Homepage\AlicanteHills.png"
                                         alt=""
                                    />


                                </div>

                                <div className="info1">
                                    <div className="top1">
                                        <div className="container31">
                                            <p className="name1">Hilton Hotel</p>
                                            <div className="stars-container1">
                                                <div className="container41">
                                                    <img
                                                        src={getPublicResourceUrl("account/home/star.svg")}
                                                        alt=""
                                                        className="star1"
                                                    />
                                                    <p className="rating1">
                                                        9.7
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <p className="location1">Аліканте, Іспанія</p>


                                    </div>

                                    <div className="bottom1">

                                        <div className="container51">
                                            <div className="prices-container1">
                                                <p className="price1">6999₴</p>
                                                <p className="old-price1">13399₴</p>
                                            </div>

                                            <a href="/#hotel" className="button-Reserve">Забронювати</a>

                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="item1">
                                <div className="images-container1">
                                    <img className="image1"
                                         src="public\images\Homepage\HotelBelle.png"
                                         alt=""
                                    />


                                </div>

                                <div className="info1">
                                    <div className="top1">
                                        <div className="container31">
                                            <p className="name1">Hilton Hotel</p>
                                            <div className="stars-container1">
                                                <div className="container41">
                                                    <img
                                                        src={getPublicResourceUrl("account/home/star.svg")}
                                                        alt=""
                                                        className="star1"
                                                    />
                                                    <p className="rating1">
                                                        9.9
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <p className="location1">Руян, Франція</p>


                                    </div>

                                    <div className="bottom1">

                                        <div className="container51">
                                            <div className="prices-container1">
                                                <p className="price1">7999₴</p>
                                                <p className="old-price1">15999₴</p>
                                            </div>

                                            <a href="/#hotel" className="button-Reserve">Забронювати</a>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
          </div>
        </div>
        </div>

    );
};

export default DiscountsComponent;