import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { IHotelReview } from "interfaces/hotelReview/IHotelReview.ts";
import { IRealtorReview } from "interfaces/realtorReview/IRealtorReview.ts";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";

interface ReviewCardProps {
    review: IHotelReview | IRealtorReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {

    return (
        <div className="review">
            <div className="author">
                <img
                    src={review.author.photo ? getApiImageUrl(review.author.photo, 400) : getPublicResourceUrl("account/no_user_photo.png")}
                    alt="Author"
                    className="author-image"
                />
                <div className="container9">
                    <p className="name" title={`${review.author.firstName} ${review.author.lastName}`}>
                        {review.author.firstName}
                    </p>
                    {review.score != null && <div className="stars-container">
                        <img
                            src={getPublicResourceUrl("account/star.svg")}
                            alt="Rating star"
                            className="star"
                        />
                        <p className="rating">{(review.score ?? 0).toFixed(0)}</p>
                    </div>}
                </div>
            </div>

            <p className="description">{review.description}</p>
        </div>
    );
};

export default ReviewCard;
