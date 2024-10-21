import VerticalPad from "components/ui/VerticalPad.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import IHotelsPageQuery from "interfaces/hotel/IHotelsPageQuery.ts";
import { useEffect, useState } from "react";
import HotelCard from "components/partials/customer/HotelCard.tsx";

const orderOptions = [
    { key: "Rating", value: "рейтинг" },
    { key: "Category", value: "категорія" },
    { key: "City", value: "місто" },
    { key: "RoomsCount", value: "кількість кімнат" },
];

const HotelsSection = (props: { filter: IHotelsPageQuery }) => {
    const [pageIndex, setPageIndex] = useState(0);

    const [orderIndex, setOrderIndex] = useState(0);
    const nextOrder = () => setOrderIndex((orderIndex + 1 === orderOptions.length) ? 0 : orderIndex + 1);

    const buildFilter = (): IHotelsPageQuery => {
        return {
            ...props.filter,
            pageIndex: pageIndex,
            pageSize: 18,
            isArchived: false,
            hasAnyRoomVariant: props.filter?.maxPrice == undefined ? true : undefined,
            orderBy: orderOptions[orderIndex].key,
        };
    };

    const [filter, setFilter] = useState<IHotelsPageQuery>(buildFilter());
    useEffect(() => {
        setFilter(buildFilter());
    }, [props.filter, pageIndex, orderIndex]);

    const { data: hotelsPageData } = useGetHotelsPageQuery(filter);

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

    const cityName = filter.address?.city?.name;
    const foundMessage = cityName ? `${cityName}: знайдено помешкань: ${itemAvailable}` : `Знайдено помешкань: ${itemAvailable}`;

    return (
        <div className="hotels-section">
            <div>
                <p className="found-message">{foundMessage}</p>
                <VerticalPad heightPx={16} />
                <button className="order-by-button" onClick={nextOrder}>
                    <img src={getPublicResourceUrl("icons/order.svg")} alt="order" />
                    <p className="order-title">Сортувати за: <span
                        className="order-name">{orderOptions[orderIndex].value}</span></p>
                </button>
            </div>

            <VerticalPad heightPx={36} />

            <div className="hotels-list">
                {hotels.map(item => <HotelCard key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default HotelsSection;