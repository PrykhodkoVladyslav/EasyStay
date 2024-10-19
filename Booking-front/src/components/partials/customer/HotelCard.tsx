import { IHotel } from "interfaces/hotel/IHotel.ts";
import PhotoSlider from "components/partials/customer/PhotoSlider.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import VerticalPad from "components/ui/VerticalPad.tsx";

const HotelCard = (props: { item: IHotel }) => {
    const item = props.item;

    return (
        <div className="hotel-item">
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

                {item.minPrice && item.maxPrice
                    ? <p className="price">
                        ${item.minPrice.toFixed(2)}-{item.maxPrice.toFixed(2)}
                    </p>
                    : null}
            </div>
        </div>
    );
};

export default HotelCard;