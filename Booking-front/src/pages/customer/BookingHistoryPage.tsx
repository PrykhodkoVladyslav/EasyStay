import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useEffect, useState } from "react";
import { bookingOrderOptions } from "utils/orderMethods/bookingOrderOptions.ts";
import { useGetBookingHotelsPageQuery } from "services/booking.ts";
import OrderByButton from "components/partials/shared/OrderByButton/OrderByButton.tsx";
import HotelCard from "components/partials/customer/HotelCard.tsx";
import Pagination from "rc-pagination";

const BookingHistoryPage = () => {
    const [itemAvailable, setItemsAvailable] = useState(0);
    const [pagesAvailable, setPagesAvailable] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [orderIndex, setOrderIndex] = useState(0);
    const nextOrder = () => setOrderIndex((orderIndex + 1 === bookingOrderOptions.length) ? 0 : orderIndex + 1);

    const { data: bookingHotelsPageData } = useGetBookingHotelsPageQuery({
        pageIndex: pageIndex,
        pageSize: 6,
        orderBy: bookingOrderOptions[orderIndex].key,
    });
    const [bookingHotels, setBookingHotels] = useState(bookingHotelsPageData?.data ?? []);

    useEffect(() => {
        setBookingHotels(bookingHotelsPageData?.data ?? []);
        setItemsAvailable(bookingHotelsPageData?.itemsAvailable ?? 0);
        setPagesAvailable(bookingHotelsPageData?.pagesAvailable ?? 0);
    }, [bookingHotelsPageData]);

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

    return (
        <div className="favorites-history-container">
            <div className="top">
                <p className="global-title">Історія бронювань</p>
                {/*<div className="sort-date-div">*/}
                {/*    <button className="sort-btn">*/}
                {/*        <img src={getIconUrl("order.svg")} alt="order"/>*/}
                {/*        <p className="order-title">Сортувати за: <span*/}
                {/*            className="order-name"></span></p>*/}
                {/*    </button>*/}
                {/*    <button className="date-btn">*/}
                {/*        <p><span className="order-name">13.09</span></p>*/}
                {/*        <img src={getIconUrl("calendarV2.svg")} alt="order"/>*/}
                {/*    </button>*/}
                {/*</div>*/}

                <OrderByButton orderName={bookingOrderOptions[orderIndex].value} onNextOrder={nextOrder}/>
            </div>

            {bookingHotels.length > 0 ? (
                <div className="hotels-and-reviews">
                    {bookingHotels.map((item) => (
                        <HotelCard key={item.id} item={item}/>
                    ))}
                </div>
            ) : (
                <p className="isLoading-error pt-20 pb-20">У вас немає бронювань</p>
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


export default BookingHistoryPage;