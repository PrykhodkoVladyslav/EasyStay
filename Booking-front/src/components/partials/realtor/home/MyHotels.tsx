import HotelCard from "components/partials/customer/HotelCard.tsx";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import showToast from "utils/toastShow.ts";

const MyHotels = () => {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(3);
    const [allHotels, setAllHotels] = useState([]);

    const { data: hotelsData, isLoading, error } = useGetHotelsPageQuery({
        onlyOwn: true,
        isArchived: false,
        pageIndex: 0,
        pageSize: 100,
    });

    useEffect(() => {
        if (hotelsData) {
            setAllHotels(hotelsData.data);
        }
    }, [hotelsData]);

    const hotels = allHotels.slice(0, pageSize);
    const hasMoreHotels = allHotels.length > pageSize;

    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) return showToast("Помилка завантаження даних", "error");

    return (
        <div className="hotels-container">
            <div className="container1">
                <p className="pre-title">Мої готелі</p>
                {hotels.length > 0 ? (
                    <div className="hotels-and-reviews" onClick={() => navigate(`/realtor/hotels`)}>
                        {hotels.map((item) => (
                            <HotelCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <p className="isLoading-error">У вас немає готелів</p>
                )}
            </div>

            {hasMoreHotels && (
                <div className="main-button">
                    <button onClick={() => setPageSize(prev => prev + 3)}>
                        Більше
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyHotels;
