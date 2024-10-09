
const TravelCarousel = () => {
    return (

        <div className="Carousel-conteiner">
            <div className="Carousel-conteiner2">
            <h1>Найкращі пропозиції</h1>


                <div className="Carousel-conteiner3">
                    <div className="Carousel-item CarItem1">
                        <h3>Єгипет</h3>
                        <div className="cost">
                        <p>від</p><p1>8799₴</p1>
                        </div>
                        <button ><img width="100%" src="./icons/homepageSvg/rightArr.svg"></img></button>
                    </div>

                    <div className="Carousel-item CarItem2">
                        <h3>Туреччина</h3>
                        <div className="cost">
                            <p>від</p><p1>5799₴</p1>
                        </div>
                        <button ><img width="100%" src="./icons/homepageSvg/rightArr.svg"></img></button>
                    </div>

                    <div className="Carousel-item CarItem3">
                        <h3>Балі</h3>
                        <div className="cost">
                            <p>від</p><p1>13999₴</p1>
                        </div>
                        <button ><img width="100%" src="./icons/homepageSvg/rightArr.svg"></img></button>
                    </div>

                    <div className="Carousel-item CarItem4">
                        <h3>Шрі Ланка</h3>
                        <div className="cost">
                            <p>від</p><p1>13699₴</p1>
                        </div>
                        <button ><img width="100%" src="./icons/homepageSvg/rightArr.svg"></img></button>
                    </div>
                </div>

                <div className="div-btn">
                <button className="arrow-btn left-arrow">
                    <img className="arrow-icon" src="/icons/homepageSvg/rightArr.svg"></img>
                </button>

                <button className="arrow-btn right-arrow">
                    <img className="arrow-icon" src="/icons/homepageSvg/rightArr.svg"></img>
                </button>
                </div>
            </div>


        </div>
    );
};

export default TravelCarousel;