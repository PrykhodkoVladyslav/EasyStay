import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import Pagination from "rc-pagination";
import { API_URL } from "utils/getEnvData.ts";
import showToast from "utils/toastShow.ts";
import { instantScrollToTop } from "utils/scrollToTop.ts";

const ArchivedPage = () => {
    useEffect(instantScrollToTop, []);

    const navigate = useNavigate();
    const [pageIndex, setPageIndex] = useState(0);

    const { data: hotelsPageData, isLoading, error } = useGetHotelsPageQuery({
        onlyOwn: true,
        pageIndex: pageIndex,
        pageSize: 6,
        isArchived: true,
    });

    const [hotels, setHotels] = useState(hotelsPageData?.data ?? []);
    const [itemAvailable, setItemAvailable] = useState(hotelsPageData?.itemsAvailable ?? 0);
    const [pagesAvailable, setPagesAvailable] = useState(hotelsPageData?.pagesAvailable ?? 0);

    useEffect(() => {
        setHotels(hotelsPageData?.data ?? []);
        setItemAvailable(hotelsPageData?.itemsAvailable ?? 0);
        setPagesAvailable(hotelsPageData?.pagesAvailable ?? 0);
    }, [hotelsPageData]);

    useEffect(() => {
        if (pageIndex > 0 && pageIndex >= pagesAvailable)
            setPageIndex(Math.max(pagesAvailable - 1, 0));
    }, [pageIndex, pagesAvailable]);

    const handlePaginationChange = (pageNumber: number) => {
        setPageIndex(pageNumber - 1);

        const hotelsSection = document.getElementById("hotels");
        if (hotelsSection) {
            hotelsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="hotels-content" id="hotels">
            <div className="top">
                <p className="global-title">Архів оголошень</p>
                <div className="filter">
                    <button>
                        <img
                            src={getPublicResourceUrl("account/sort.svg")}
                            alt="Sort"
                        />

                        <p>Сортувати за:</p>

                        <p className="sort-active">
                            Назвою
                        </p>
                    </button>

                    <div className="list hidden">
                        List
                    </div>
                </div>
            </div>

            <div className="hotels">
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <div className="hotel" key={hotel.id}>
                            <div className="img-info">
                                <div className="img">
                                    <img
                                        src={`${API_URL}/images/800_${hotel.photos[0].name}`}
                                        alt={`${hotel.name}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="info">
                                    <div className="top-info">
                                        <p className="name">{hotel.name}</p>
                                        <div>
                                            <p>{hotel.address.city.name}, {hotel.address.street} {hotel.address.houseNumber}</p>
                                        </div>
                                    </div>

                                    <p className="category">{hotel.category.name}</p>
                                </div>
                            </div>

                            <div className="actions">
                                <button className="btn-delete">
                                    <img
                                        src={getPublicResourceUrl("account/trash.svg")}
                                        alt="" />
                                </button>

                                <div className="rooms-action">
                                    <button className="btn-rooms" onClick={() => {
                                        navigate(`/realtor/rooms/${hotel.id}`);
                                    }}>Номери
                                    </button>
                                    <button className="btn-edit" onClick={() => {
                                        navigate(`/realtor/hotel/edit:${hotel.id}`);
                                    }}>Редагувати
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="isLoading-error">У вас немає готелів</p>
                )}
            </div>

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

export default ArchivedPage;