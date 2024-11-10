import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import "./../../../../css/review-item.scss";
import { API_URL } from "utils/getEnvData.ts";
import { useGetRealtorReviewsPageQuery } from "services/realtorReview.ts";
import { useSelector } from "react-redux";
import { RootState } from "store/index.ts";
import { getToken } from "store/slice/userSlice.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import showToast from "utils/toastShow.ts";
import { IRealtorReview } from "interfaces/realtorReview/IRealtorReview.ts";
import { useRealtorActivePage } from "components/contexts/RealtorActivePage.tsx";

const Reviews = () => {
    const token = useSelector((state: RootState) => getToken(state));
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const realtor = payload ? payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;
    const navigate = useNavigate();
    const { setActivePage } = useRealtorActivePage();

    const [pageSize, setPageSize] = useState(3);
    const [allReviews, setAllReviews] = useState<IRealtorReview[]>([]);

    const { data: realtorReviewsPageData, isLoading, error } = useGetRealtorReviewsPageQuery({
        pageIndex: 0,
        pageSize: 100,
        realtorId: realtor,
    });

    useEffect(() => {
        if (realtorReviewsPageData) {
            setAllReviews(realtorReviewsPageData.data as IRealtorReview[]);
        }
    }, [realtorReviewsPageData]);

    const handleReviewClick = () => {
        setActivePage("reviews");
        navigate("/realtor/reviews");
    };

    const reviews = allReviews.slice(0, pageSize);
    const hasMoreReviews = allReviews.length > pageSize;

    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="reviews-container">
            <div className="container7">
                <p className="pre-title">Відгуки</p>
                {reviews.length > 0 ? (
                    <div className="hotels-and-reviews" onClick={handleReviewClick}>
                        {reviews.map((review) => (
                            <div key={review.id} className="review">
                                <div className="author">
                                    <img
                                        src={review.author.photo ? `${API_URL}/images/800_${review.author.photo}` : getPublicResourceUrl('account/no_user_photo.png')}
                                        alt=""
                                        className="author-image"
                                    />
                                    <div className="container9">
                                        <p className="name" title={`${review.author.firstName} ${review.author.lastName}`}>
                                            {review.author.firstName}
                                        </p>
                                        <div className="stars-container">
                                            <img
                                                src={getPublicResourceUrl("account/star.svg")}
                                                alt=""
                                                className="star"
                                            />
                                            <p className="rating">{review.score}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="description">{review.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="isLoading-error">У вас немає відгуків</p>
                )}
            </div>

            {hasMoreReviews && (
                <div className="main-button">
                    <button onClick={() => setPageSize(prev => prev + 3)}>
                        Більше
                    </button>
                </div>
            )}
        </div>
    );
};

export default Reviews;
