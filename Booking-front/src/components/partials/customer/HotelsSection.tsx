import VerticalPad from "components/ui/VerticalPad.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import PhotoSlider from "components/partials/customer/PhotoSlider.tsx";

const HotelsSection = () => {
    const foundMessage = "Іспанія: знайдено 4 009 помешкань";
    const orderName = "наші рекомендації";

    const { data: hotelsPageData } = useGetHotelsPageQuery({
        pageIndex: 0,
        pageSize: 18,
        isArchived: false,
    });

    return (
        <div className="hotels-section">
            <div>
                <p className="found-message">{foundMessage}</p>
                <VerticalPad heightPx={16} />
                <button className="order-by-button">
                    <img src={getPublicResourceUrl("icons/order.svg")} alt="order" />
                    <p className="order-title">Сортувати за: <span className="order-name">{orderName}</span></p>
                </button>
            </div>

            <VerticalPad heightPx={36} />

            <div className="hotels-list">
                {hotelsPageData?.data?.map?.(item => {
                    return <div className="hotel-item" key={item.id}>
                        <PhotoSlider photos={item.photos.map(p => p.name)} />

                        <div className="hotel-info-container">
                            <div className="title-rating-container">
                                <p className="title no-wrap">{item.name}</p>
                                <div className="rating-container">
                                    <div className="rating-inner-container">
                                        <img src={getPublicResourceUrl("icons/star.svg")} alt="star" />
                                        <p className="rating">{item.rating.toFixed(1)}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="address no-wrap">{`${item.address.city.name}, ${item.address.city.country.name}`}</p>

                            <VerticalPad heightPx={10} />

                            <p className="amenities no-wrap">
                                {item.hotelAmenities.map(ha => ha.name).join(", ")}
                            </p>
                            <p className="realtor-info">Рієлтор: <span className="realtor-name">
                                {item.realtor.firstName}
                            </span></p>

                            <VerticalPad heightPx={22} />

                            <div className="price-container">
                                {item.minPrice ? <p>
                                        <span className="from">Від </span>
                                        <span className="price">${item.minPrice}</span>
                                    </p>
                                    : null}
                            </div>
                        </div>
                    </div>;
                })}
            </div>
        </div>
    );
};

export default HotelsSection;