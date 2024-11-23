import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useSelector } from "react-redux";
import { RootState } from "store/index.ts";
import { getToken } from "store/slice/userSlice.ts";
import showToast from "utils/toastShow.ts";
import { useGetRealtorReviewsPageQuery } from "services/realtorReview.ts";
import { useGetRealtorsPersonalRatingQuery } from "services/user.ts";
import { useContext, useEffect, useState } from "react";
import Pagination from "rc-pagination";
import { API_URL } from "utils/getEnvData.ts";
import "./../../css/review-item.scss";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import OrderByButton from "components/partials/shared/OrderByButton/OrderByButton.tsx";
import { realtorReviewOrderOptions } from "utils/orderMethods/realtorReviewOrderOptions.ts";

const ReviewsPage = () => {
    useEffect(instantScrollToTop, []);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage("reviews");
    }, []);

    const token = useSelector((state: RootState) => getToken(state));
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const realtor = payload ? payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;

    const [itemAvailable, setItemsAvailable] = useState(0);
    const [pagesAvailable, setPagesAvailable] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [orderIndex, setOrderIndex] = useState(0);
    const nextOrder = () => setOrderIndex((orderIndex + 1 === realtorReviewOrderOptions.length) ? 0 : orderIndex + 1);

    const { data: realtorRating } = useGetRealtorsPersonalRatingQuery();
    const { data: realtorReviewsPageData, isLoading, error } = useGetRealtorReviewsPageQuery({
        pageIndex: pageIndex,
        pageSize: 9,
        realtorId: realtor,
        orderBy: realtorReviewOrderOptions[orderIndex].key,
    });
    const [realtorReviews, setRealtorReviews] = useState(realtorReviewsPageData?.data ?? []);

    useEffect(() => {
        setRealtorReviews(realtorReviewsPageData?.data ?? []);
        setItemsAvailable(realtorReviewsPageData?.itemsAvailable ?? 0);
        setPagesAvailable(realtorReviewsPageData?.pagesAvailable ?? 0);
    }, [realtorReviewsPageData]);

    useEffect(() => {
        if (pageIndex > 0 && pageIndex >= pagesAvailable)
            setPageIndex(Math.max(pagesAvailable - 1, 0));
    }, [pageIndex, pagesAvailable]);

    const handlePaginationChange = (pageNumber: number) => {
        setPageIndex(pageNumber - 1);

        const realtorReviewsSection = document.getElementById("hotels");
        if (realtorReviewsSection) {
            realtorReviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="reviews-container">
            <div className="top">
                <p className="global-title">Відгуки</p>
                <div className="rating">
                    <p>Рейтинг рієлтора</p>
                    <div className="stars-container">
                        <img
                            src={getPublicResourceUrl("account/star.svg")}
                            alt=""
                            className="star"
                        />
                        <p className="rating">{realtorRating?.toFixed(1) ?? "0"}</p>
                    </div>
                </div>
                <OrderByButton orderName={realtorReviewOrderOptions[orderIndex].value} onNextOrder={nextOrder} />
            </div>

            <div className="reviews">
                {realtorReviews.length > 0 ? (
                    realtorReviews.map((review) => (
                        <div key={review.id} className="review">
                            <div className="author">
                                <img
                                    src={review.author.photo ? `${API_URL}/images/800_${review.author.photo}` : getPublicResourceUrl("account/no_user_photo.png")}
                                    alt=""
                                    className="author-image"
                                />
                                <div className="container9">
                                    <p className="name" title={`${review.author.firstName} ${review.author.lastName}`}>
                                        {review.author.firstName}
                                    </p>
                                    {review.score != null && <div className="stars-container">
                                        <img
                                            src={getPublicResourceUrl("account/star.svg")}
                                            alt=""
                                            className="star"
                                        />
                                        <p className="rating">{review.score}</p>
                                    </div>}
                                </div>
                            </div>

                            <p className="description">{review.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="isLoading-error pt-20 pb-20">У вас немає Відгуків</p>
                )}
            </div>

            <Pagination
                className="pagination-container"
                current={pageIndex + 1}
                total={itemAvailable}
                onChange={handlePaginationChange}
                pageSize={9}
                itemRender={(current, type, originalElement) => {
                    if (type === "prev") {
                        return <img className="pagination-item arrow"
                                    src={getPublicResourceUrl("icons/pagination/prev.svg")}
                                    alt="prev arrow"
                                    title="Попередня" />;
                    }

                    if (type === "next") {
                        return <img className="pagination-item arrow"
                                    src={getPublicResourceUrl("icons/pagination/next.svg")}
                                    alt="next arrow"
                                    title="Наступна" />;
                    }

                    if (type === "page") {
                        const classNames = "pagination-item page";
                        const activeClassNames = `${classNames} page-selected`;
                        return <div
                            className={pageIndex + 1 === current ? activeClassNames : classNames}
                            title=""
                        >{current}</div>;
                    }

                    if (type === "jump-prev" || type === "jump-next") {
                        return <div className="pagination-item page">...</div>;
                    }

                    return originalElement;
                }}
            />
        </div>
    );
};

export default ReviewsPage;