import { useGetHotelsPageQuery } from "services/hotel.ts";
import { useEffect, useState } from "react";
import HotelCard from "components/partials/customer/HotelCard.tsx";
import { hotelOrderOptions } from "components/partials/customer/HotelsSection.tsx";
import { getIconUrl } from "utils/publicAccessor.ts";
import VerticalPad from "components/ui/VerticalPad.tsx";

const DiscountsComponent = () => {
    const [orderIndex, setOrderIndex] = useState(0);
    const nextOrder = () => setOrderIndex((orderIndex + 1 === hotelOrderOptions.length) ? 0 : orderIndex + 1);

    const { data: hotelsPageData } = useGetHotelsPageQuery({
        hasDiscount: true,
        orderBy: hotelOrderOptions[orderIndex].key,
        pageIndex: 0,
        pageSize: 4,
    });

    const [hotels, setHotels] = useState(hotelsPageData?.data ?? []);

    useEffect(() => {
        setHotels(hotelsPageData?.data ?? []);
    }, [hotelsPageData]);

    return (
        <div className="all-conteiner">
            <h1 className="first-discount">Знижки</h1>
            <button className="order-by-button" onClick={nextOrder}>
                <img src={getIconUrl("order.svg")} alt="order" />
                <p className="order-title">Сортувати за: <span
                    className="order-name">{hotelOrderOptions[orderIndex].value}</span></p>
            </button>

            <VerticalPad heightPx={24} />

            <div className="discount-hotels-container">
                {hotels.map(item => <HotelCard key={item.id} item={item} />)}
            </div>

        </div>

    );
};

export default DiscountsComponent;