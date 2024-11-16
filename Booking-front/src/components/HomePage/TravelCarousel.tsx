import { getIconUrl } from "utils/publicAccessor.ts";
import { useGetCitiesAdvertisingPageQuery } from "services/city.ts";
import ICityAdvertising from "interfaces/city/ICityAdvertising.ts";
import { useEffect, useState } from "react";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";

const TravelCarousel = () => {
    const [pageIndex, setPageIndex] = useState(0);

    const { data: citiesPage } = useGetCitiesAdvertisingPageQuery({
        hasMinPrice: true,
        pageIndex,
        pageSize: 4,
    });

    const [cities, setCities] = useState<ICityAdvertising[]>(citiesPage?.data ?? []);

    useEffect(() => {
        setCities(citiesPage?.data ?? []);
    }, [citiesPage]);

    const prevPage =
        () => setPageIndex((pageIndex > 0) ? (pageIndex - 1) : (pageIndex));

    const nextPage =
        () => setPageIndex(((citiesPage?.pagesAvailable ?? 0) > pageIndex + 1) ? (pageIndex + 1) : (pageIndex));

    return (
        <div className="Carousel-conteiner">
            <div className="Carousel-conteiner2">
                <img src={getIconUrl("homepageSvg/line.svg")} alt="line" className="background-image" />

                <h1>Найкращі пропозиції</h1>

                <div className="Carousel-conteiner3">
                    {cities.map((city, index) => (
                        <div className={`Carousel-item CarItem${index + 1}`}>
                            <img
                                className={`imgItem${index + 1}`}
                                src={getApiImageUrl(city.image, 800)}
                                alt="city-photo"
                            />
                            <div className="CarItemContent">
                                <h3>{city.name}</h3>
                                <div className="cost">
                                    <p>від ${(city?.minPrice ?? 0).toFixed(2)}</p>
                                </div>
                                <button>
                                    <img width="100%" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="div-btn">
                    <button className="arrow-btn left-arrow">
                        <img className="arrow-icon" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow"
                             onClick={prevPage} />
                    </button>

                    <button className="arrow-btn right-arrow">
                        <img className="arrow-icon" src={getIconUrl("homepageSvg/rightArr.svg")} alt="right-arrow"
                             onClick={nextPage} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default TravelCarousel;