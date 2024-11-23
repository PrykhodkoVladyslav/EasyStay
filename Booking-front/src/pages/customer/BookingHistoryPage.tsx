// import { getPublicResourceUrl } from "utils/publicAccessor.ts";
// import Pagination from "rc-pagination";
// import HotelCard from "components/partials/customer/HotelCard.tsx";

const BookingHistoryPage = () => {

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
            </div>

            {/*<div className="hotel-reviews">*/}
            {/*    {hotels.length > 0 ? (*/}
            {/*        <div className="hotels-and-reviews" onClick={handleHotelClick}>*/}
            {/*            {hotels.map((item) => (*/}
            {/*                <HotelCard key={item.id} item={item} />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <p className="isLoading-error">У вас немає улюблених готелів</p>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/*<Pagination*/}
            {/*    className="pagination-container"*/}
            {/*    current={pageIndex + 1}*/}
            {/*    total={itemAvailable}*/}
            {/*    onChange={handlePaginationChange}*/}
            {/*    pageSize={9}*/}
            {/*    itemRender={(current, type, originalElement) => {*/}
            {/*        if (type === "prev") {*/}
            {/*            return <img className="pagination-item arrow"*/}
            {/*                        src={getPublicResourceUrl("icons/pagination/prev.svg")}*/}
            {/*                        alt="prev arrow"*/}
            {/*                        title="Попередня" />;*/}
            {/*        }*/}

            {/*        if (type === "next") {*/}
            {/*            return <img className="pagination-item arrow"*/}
            {/*                        src={getPublicResourceUrl("icons/pagination/next.svg")}*/}
            {/*                        alt="next arrow"*/}
            {/*                        title="Наступна" />;*/}
            {/*        }*/}

            {/*        if (type === "page") {*/}
            {/*            const classNames = "pagination-item page";*/}
            {/*            const activeClassNames = `${classNames} page-selected`;*/}
            {/*            return <div*/}
            {/*                className={pageIndex + 1 === current ? activeClassNames : classNames}*/}
            {/*                title=""*/}
            {/*            >{current}</div>;*/}
            {/*        }*/}

            {/*        if (type === "jump-prev" || type === "jump-next") {*/}
            {/*            return <div className="pagination-item page">...</div>;*/}
            {/*        }*/}

            {/*        return originalElement;*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};


export default BookingHistoryPage;