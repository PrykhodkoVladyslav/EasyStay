import ReviewCard from "components/partials/customer/ReviewCard.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IRealtorReview } from "interfaces/realtorReview/IRealtorReview.ts";
import { useGetRealtorReviewsPageQuery } from "services/realtorReview.ts";
import showToast from "utils/toastShow.ts";

const RealtorReviews = () => {
    const { id } = useParams();
    const [pageSize, setPageSize] = useState(4);
    const [allReviews, setAllReviews] = useState<IRealtorReview[]>([]);

    const { data: realtorReviewsPageData, isLoading, error } = useGetRealtorReviewsPageQuery({
        pageIndex: 0,
        pageSize: 100,
        realtorId: id ? Number(id) : undefined,
    });

    useEffect(() => {
        if (realtorReviewsPageData) {
            setAllReviews(realtorReviewsPageData.data as IRealtorReview[]);
        }
    }, [realtorReviewsPageData]);

    const reviews = allReviews.slice(0, pageSize);
    const hasMoreReviews = allReviews.length > pageSize;

    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <>
            <p className="pre-title">Відгуки</p>
            {reviews.length > 0 ? (
                <div className="hotels-and-reviews">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <p className="isLoading-error">У вас немає відгуків</p>
            )}

            {hasMoreReviews && (
                <div className="main-button">
                    <button onClick={() => setPageSize(prev => prev + 4)}>
                        Більше
                    </button>
                </div>
            )}
        </>
    )
}

export default RealtorReviews;