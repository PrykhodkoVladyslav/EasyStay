import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useContext, useEffect, useState } from "react";
import { hotelOrderOptions } from "utils/orderMethods/hotelOrderOptions.ts";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import OrderByButton from "components/partials/shared/OrderByButton/OrderByButton.tsx";
import HotelCard from "components/partials/customer/HotelCard.tsx";
import Pagination from "rc-pagination";
import showToast from "utils/toastShow.ts";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

const FavoritesPage = () => {
    useEffect(instantScrollToTop, []);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage("favorites");
    }, []);

    const [itemAvailable, setItemsAvailable] = useState(0);
    const [pagesAvailable, setPagesAvailable] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [orderIndex, setOrderIndex] = useState(0);
    const nextOrder = () => setOrderIndex((orderIndex + 1 === hotelOrderOptions.length) ? 0 : orderIndex + 1);

    const { data: favoriteHotelsPageData, isLoading, error } = useGetHotelsPageQuery({
        pageIndex: pageIndex,
        pageSize: 6,
        isFavorite: true,
        orderBy: hotelOrderOptions[orderIndex].key,
    });
    const [favoriteHotels, setFavoriteHotels] = useState(favoriteHotelsPageData?.data ?? []);

    useEffect(() => {
        setFavoriteHotels(favoriteHotelsPageData?.data ?? []);
        setItemsAvailable(favoriteHotelsPageData?.itemsAvailable ?? 0);
        setPagesAvailable(favoriteHotelsPageData?.pagesAvailable ?? 0);
    }, [favoriteHotelsPageData]);

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

    if (isLoading) return <p className="isLoading-error pt-20 pb-20">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="favorites-history-container">
            <div className="top">
                <p className="global-title">Збережене</p>
                {/*<div className="sort-date-div">*/}
                {/*    <button className="sort-btn" >*/}
                {/*        <img src={getIconUrl("order.svg")} alt="order" />*/}
                {/*        <p className="order-title">Сортувати за: <span*/}
                {/*            className="order-name"></span></p>*/}
                {/*    </button>*/}
                {/*    <button className="date-btn">*/}
                {/*        <p><span className="order-name">13.09</span></p>*/}
                {/*        <img src={getIconUrl("calendarV2.svg")} alt="order" />*/}
                {/*    </button>*/}
                {/*</div>*/}
                <OrderByButton orderName={hotelOrderOptions[orderIndex].value} onNextOrder={nextOrder} />
            </div>

            {favoriteHotels.length > 0 ? (
                <div className="hotels-and-reviews">
                    {favoriteHotels.map((item) => (
                        <HotelCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className="isLoading-error pt-20 pb-20">У вас немає улюблених готелів</p>
            )}

            <Pagination
                className="pagination-container"
                current={pageIndex + 1}
                total={itemAvailable}
                onChange={handlePaginationChange}
                pageSize={6}
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

export default FavoritesPage;