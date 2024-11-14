import { API_URL } from "utils/getEnvData.ts";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { IHotelReview } from "interfaces/hotelReview/IHotelReview.ts";
import { IRealtorReview } from "interfaces/realtorReview/IRealtorReview.ts";

interface ReviewCardProps {
    review: IHotelReview | IRealtorReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {

    return (
        <div className="review">
            <div className="author">
                <img
                    src={review.author.photo ? `${API_URL}/images/800_${review.author.photo}` : getPublicResourceUrl('account/no_user_photo.png')}
                    alt="Author"
                    className="author-image"
                />
                <div className="container9">
                    <p className="name" title={`${review.author.firstName} ${review.author.lastName}`}>
                        {review.author.firstName}
                    </p>
                    <div className="stars-container">
                        <img
                            src={getPublicResourceUrl("account/star.svg")}
                            alt="Rating star"
                            className="star"
                        />
                        <p className="rating">{review.score}</p>
                    </div>
                </div>
            </div>

            <p className="description">{review.description}</p>
        </div>
    );
};

export default ReviewCard;
