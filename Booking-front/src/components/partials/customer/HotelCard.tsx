import "./../../../css/hotel-item.scss";
import { IHotel } from "interfaces/hotel/IHotel.ts";
import PhotoSlider from "components/partials/customer/PhotoSlider.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { useNavigate } from "react-router-dom";

const HotelCard = (props: { item: IHotel }) => {
    const item = props.item;

    const navigate = useNavigate();

    const hasPrice = (item.minPrice && item.maxPrice) != undefined;
    const minPrice = Math.ceil(item.minPrice ?? 0);
    const maxPrice = Math.ceil(item.maxPrice ?? 0);

    const priceString = minPrice !== maxPrice
        ? `${minPrice} - ${maxPrice}`
        : `${minPrice}`;

    const sortedPhotos = [...props.item.photos as typeof props.item.photos]
        .sort((firstPhoto, secondPhoto) => firstPhoto.priority - secondPhoto.priority);

    return (
        <div className="hotel-item" onClick={() => navigate(`/hotel/${item.id}`)}>
            <PhotoSlider photos={sortedPhotos.map(p => p.name)} />

            <div className="hotel-info-container">
                <div className="title-rating-container">
                    <p className="title no-wrap">{item.name}</p>
                    <div className="rating-container">
                        <img src={getPublicResourceUrl("icons/star.svg")} alt="star" />
                        <p className="rating">{item.rating.toFixed(1)}</p>
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

                {hasPrice &&
                    <p className="price">
                        ${priceString}
                    </p>}
            </div>
        </div>
    );
};

export default HotelCard;