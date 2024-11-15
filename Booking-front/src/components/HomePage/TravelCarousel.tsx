import { getIconUrl, getPublicResourceUrl } from "utils/publicAccessor.ts";

const TravelCarousel = () => {
    return (
        <div className="Carousel-conteiner">
            <div className="Carousel-conteiner2">
                <img src={getIconUrl("homepageSvg/line.svg")} alt="line" className="background-image" />

                <h1>Найкращі пропозиції</h1>

                <div className="Carousel-conteiner3">
                    <div className="Carousel-item CarItem1">
                        <img className="imgItem1"
                             src={getPublicResourceUrl("images/Homepage/propositionImages/Egypt.jpg")}></img>
                        <div className="CarItemContent">
                            <h3>Єгипет</h3>
                            <div className="cost">
                                <p>від</p><p>8799₴</p>
                            </div>
                            <button>
                                <img width="100%" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow" />
                            </button>
                        </div>
                    </div>

                    <div className="Carousel-item CarItem2">
                        <img className="imgItem2"
                             src={getPublicResourceUrl("images/Homepage/propositionImages/Turkey.png")}></img>
                        <div className="CarItemContent">
                            <h3>Туреччина</h3>
                            <div className="cost">
                                <p>від</p><p>5799₴</p>
                            </div>
                            <button>
                                <img width="100%" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow" />
                            </button>
                        </div>
                    </div>

                    <div className="Carousel-item CarItem3">
                        <img className="imgItem3"
                             src={getPublicResourceUrl("images/Homepage/propositionImages/Bali.png")}></img>
                        <div className="CarItemContent">
                            <h3>Балі</h3>
                            <div className="cost">
                                <p>від</p><p>13999₴</p>
                            </div>
                            <button>
                                <img width="100%" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow" />
                            </button>
                        </div>
                    </div>

                    <div className="Carousel-item CarItem4">
                        <img className="imgItem4"
                             src={getPublicResourceUrl("images/Homepage/propositionImages/ShriLanka.png")}></img>
                        <div className="CarItemContent">
                            <h3>Шрі Ланка</h3>
                            <div className="cost">
                                <p>від</p><p>13699₴</p>
                            </div>
                            <button>
                                <img width="100%" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="div-btn">
                    <button className="arrow-btn left-arrow">
                        <img className="arrow-icon" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow" />
                    </button>

                    <button className="arrow-btn right-arrow">
                        <img className="arrow-icon" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default TravelCarousel;