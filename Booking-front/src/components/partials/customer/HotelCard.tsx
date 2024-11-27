import "./../../../css/hotel-item.scss";
import { IHotel } from "interfaces/hotel/IHotel.ts";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";
import { User } from "interfaces/user";
import {
    useCreateFavoriteHotelMutation,
    useDeleteFavoriteHotelMutation,
    useIsFavoriteHotelQuery
} from "services/favoriteHotel.ts";
import PhotoSlider from "components/partials/customer/PhotoSlider.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import showToast from "utils/toastShow.ts";

const HotelCard = (props: { item: IHotel }) => {
    const item = props.item;

    const navigate = useNavigate();
    const token = useSelector(getToken);
    const user = token ? jwtParser(token) as User : null;
    const role = user ? user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : undefined;

    const hasPrice = (item.minPrice && item.maxPrice) != undefined;
    const minPrice = Math.ceil(item.minPrice ?? 0);
    const maxPrice = Math.ceil(item.maxPrice ?? 0);

    const priceString = minPrice !== maxPrice
        ? `${minPrice} - ${maxPrice}`
        : `${minPrice}`;

    const sortedPhotos = [...props.item.photos as typeof props.item.photos]
        .sort((firstPhoto, secondPhoto) => firstPhoto.priority - secondPhoto.priority);

    const { data: isFavorite, refetch } =
        role === "Customer"
            ? useIsFavoriteHotelQuery(item.id)
            : { data: false, refetch: () => {} };
    const [favorite, { isLoading: isFavoriteLoading }] = useCreateFavoriteHotelMutation();
    const [unFavorite, { isLoading: isUnFavoriteLoading }] = useDeleteFavoriteHotelMutation();

    const handleFavorite = async () => {
        try {
            await favorite({ hotelId: item.id }).unwrap();
            refetch();
        } catch (err) {
            showToast("Не вдалося додати до улюблених", "error");
        }
    };

    const handleUnFavorite = async () => {
        try {
            await unFavorite(item.id).unwrap();
            refetch();
        } catch (err) {
            showToast("Не вдалося видалити з улюблених", "error");
        }
    };

    return (
        <div className="hotel-item">
            { !isFavorite ? (
                <button
                    className="btn-favorite"
                    onClick={() => {
                        if (role === "Customer") { handleFavorite(); }
                        else { showToast("Будь ласка, зареєструйтесь або увійдіть під користувачем", "info"); }
                    }}
                    disabled={isFavoriteLoading || isUnFavoriteLoading}
                >
                    <img
                        src={getPublicResourceUrl("icons/heart.svg")}
                        alt="Favorite"
                    />
                </button>
            ) : (
                <button
                    className="btn-favorite"
                    onClick={() => {
                        if (role === "Customer") { handleUnFavorite(); }
                        else { showToast("Будь ласка, зареєструйтесь або увійдіть під користувачем", "info"); }
                    }}
                    disabled={isFavoriteLoading || isUnFavoriteLoading}
                >
                    <img
                        src={getPublicResourceUrl("icons/heart-favorite.svg")}
                        alt="UnFavorite"
                    />
                </button>
            )}
            <div onClick={() => navigate(`/hotel/${item.id}`)}>
                <PhotoSlider photos={sortedPhotos.map(p => p.name)}/>

                <div className="hotel-info-container">
                    <div className="title-rating-container">
                        <p className="title no-wrap">{item.name}</p>
                        <div className="rating-container">
                            <img src={getPublicResourceUrl("icons/star.svg")} alt="star"/>
                            <p className="rating">{item.rating.toFixed(1)}</p>
                        </div>
                    </div>

                    <p className="address no-wrap">{`${item.address.city.name}, ${item.address.city.country.name}`}</p>

                    <VerticalPad heightPx={10}/>

                    <p className="amenities no-wrap">
                        {item.hotelAmenities.map(ha => ha.name).join(", ")}
                    </p>
                    <p className="realtor-info">Рієлтор: <span className="realtor-name">
                    {item.realtor.firstName}
                </span></p>

                    <VerticalPad heightPx={22}/>

                    {hasPrice &&
                        <p className="price">
                            ${priceString}
                        </p>}
                </div>
            </div>
        </div>
    );
};

export default HotelCard;