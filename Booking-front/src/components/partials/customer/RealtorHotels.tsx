import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IHotel } from "interfaces/hotel/IHotel.ts";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import showToast from "utils/toastShow.ts";
import HotelCard from "components/partials/customer/HotelCard.tsx";

const RealtorHotels = () => {
    const { id } = useParams();
    const [pageSize, setPageSize] = useState(4);
    const [hotels, setHotels] = useState<IHotel[]>([]);

    const { data: hotelsData, isLoading, error } = useGetHotelsPageQuery({
        isArchived: false,
        pageIndex: 0,
        pageSize,
        realtorId: id ? Number(id) : undefined,
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
            <p className="pre-title">Помешкання цього рієлтора</p>
            {hotels.length > 0 ? (
                <div className="hotels-and-reviews">
                    {hotels.map((item) => (
                        <HotelCard key={item.id} item={item}/>
                    ))}
                </div>
            ) : (
                <p className="isLoading-error">У вас немає готелів</p>
            )}

            {hasMoreHotels && (
                <div className="main-button">
                    <button onClick={() => setPageSize(prev => prev + 4)}>
                        Більше
                    </button>
                </div>
            )}
        </>
    );
}

export default RealtorHotels;