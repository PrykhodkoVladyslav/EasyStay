import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useContext, useEffect, useState } from "react";
import { bookingOrderOptions } from "utils/orderMethods/bookingOrderOptions.ts";
import { useGetBookingsPageQuery } from "services/booking.ts";
import OrderByButton from "components/partials/shared/OrderByButton/OrderByButton.tsx";
import HotelCard from "components/partials/customer/HotelCard.tsx";
import Pagination from "rc-pagination";
import showToast from "utils/toastShow.ts";
import { IBooking } from "interfaces/booking/IBooking.ts";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import RealtorReviewModal from "components/partials/customer/RealtorReviewModal/RealtorReviewModal.tsx";

const BookingHistoryPage = () => {
    useEffect(instantScrollToTop, []);
    const [isOpenRealtorReviewModal, setIsOpenRealtorReviewModal] = useState(false);
    const [bookingId, setBookingId] = useState(0);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage("bookings");
    }, []);

    const [itemAvailable, setItemsAvailable] = useState(0);
    const [pagesAvailable, setPagesAvailable] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [orderIndex, setOrderIndex] = useState(0);
    const nextOrder = () => setOrderIndex((orderIndex + 1 === bookingOrderOptions.length) ? 0 : orderIndex + 1);

    const { data: bookingsPageData, isLoading, error } = useGetBookingsPageQuery({
        pageIndex: pageIndex,
        pageSize: 6,
        orderBy: bookingOrderOptions[orderIndex].key,
    });
    const [bookings, setBookings] = useState(bookingsPageData?.data ?? []);

    useEffect(() => {
        setBookings(bookingsPageData?.data ?? []);
        setItemsAvailable(bookingsPageData?.itemsAvailable ?? 0);
        setPagesAvailable(bookingsPageData?.pagesAvailable ?? 0);
    }, [bookingsPageData]);

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
            <RealtorReviewModal isOpen={isOpenRealtorReviewModal} setIsOpen={setIsOpenRealtorReviewModal}
                                bookingId={bookingId} />

            <div className="top">
                <p className="global-title">Історія бронювань</p>
                <OrderByButton orderName={bookingOrderOptions[orderIndex].value} onNextOrder={nextOrder} />
            </div>

            {bookings.length > 0 ? (
                <div className="hotels-and-reviews">
                    {bookings.map((booking: IBooking) => (
                        <div className="hotel-card-wrapper" key={booking.id}>
                            <HotelCard key={booking.id} item={booking.hotel} />
                            <button
                                onClick={() => { setBookingId(booking.id); setIsOpenRealtorReviewModal(true); }}
                                className="leave-review-button"
                            >Залишити Відгук</button>
                        </div>
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