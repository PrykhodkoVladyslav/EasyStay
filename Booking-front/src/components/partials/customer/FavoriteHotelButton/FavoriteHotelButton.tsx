import showToast from "utils/toastShow.ts";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import {
    useCreateFavoriteHotelMutation,
    useDeleteFavoriteHotelMutation,
    useIsFavoriteHotelQuery,
} from "services/favoriteHotel.ts";
import styles from "./styles.module.scss";

const FavoriteHotelButton = (props: { hotelId: number }) => {
    const { hotelId } = props;

    const { data: isFavorite, refetch, isLoading: isFavoriteLoading } = useIsFavoriteHotelQuery(hotelId);
    const [favorite, { isLoading: isSetFavoriteLoading }] = useCreateFavoriteHotelMutation();
    const [unFavorite, { isLoading: isUnsetFavoriteLoading }] = useDeleteFavoriteHotelMutation();

    const handleFavoriteAsync = async () => {
        try {
            await favorite(hotelId).unwrap();
            refetch();
        } catch (err) {
            showToast("Не вдалося додати до улюблених", "error");
        }
    };

    const handleUnFavoriteAsync = async () => {
        try {
            await unFavorite(hotelId).unwrap();
            refetch();
        } catch (err) {
            showToast("Не вдалося видалити з улюблених", "error");
        }
    };

    const switchIsFavoriteAsync = async () => {
        await (isFavorite ? handleUnFavoriteAsync() : handleFavoriteAsync());
    };

    return (
        <button
            className={styles.FavoriteButton}
            onClick={switchIsFavoriteAsync}
            disabled={isFavoriteLoading || isSetFavoriteLoading || isUnsetFavoriteLoading}
        >
            <img
                src={getPublicResourceUrl(`icons/${(isFavorite ? "heart-favorite" : "heart")}.svg`)}
                alt="Favorite icon"
            />
        </button>
    );
};

export default FavoriteHotelButton;