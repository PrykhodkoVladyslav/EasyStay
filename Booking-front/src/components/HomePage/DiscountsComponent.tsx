import { useGetHotelsPageQuery } from "services/hotel.ts";
import { useEffect, useState } from "react";
import HotelCard from "components/partials/customer/HotelCard.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import OrderByButton from "components/partials/shared/OrderByButton/OrderByButton.tsx";
import { hotelOrderOptions } from "utils/orderMethods/hotelOrderOptions.ts";

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
            <OrderByButton orderName={hotelOrderOptions[orderIndex].value} onNextOrder={nextOrder} />

            <VerticalPad heightPx={24} />

            <div className="discount-hotels-container">
                {hotels.map(item => <HotelCard key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default DiscountsComponent;