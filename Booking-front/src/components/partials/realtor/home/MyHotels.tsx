import HotelCard from "components/partials/customer/HotelCard.tsx";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import showToast from "utils/toastShow.ts";
import { IHotel } from "interfaces/hotel/IHotel.ts";

const MyHotels = () => {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(3);
    const [hotels, setHotels] = useState<IHotel[]>([]);

    const { data: hotelsData, isLoading, error } = useGetHotelsPageQuery({
        onlyOwn: true,
        isArchived: false,
        pageIndex: 0,
        pageSize,
    });

    useEffect(() => {
        if (hotelsData) {
            setHotels(hotelsData.data);
        }
    }, [hotelsData]);

    const hasMoreHotels = (hotelsData?.itemsAvailable ?? 0) > pageSize;

    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <>
            <p className="pre-title">Мої готелі</p>
            {hotels.length > 0 ? (
                <div className="hotels-and-reviews" onClick={() => navigate("/realtor/hotels")}>
                    {hotels.map((item) => (
                        <HotelCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className="isLoading-error pt-20 pb-20">У вас немає готелів</p>
            )}

            {hasMoreHotels && (
                <div className="main-button">
                    <button onClick={() => setPageSize(prev => prev + 3)}>
                        Більше
                    </button>
                </div>
            )}
        </>
    );
};

export default MyHotels;
