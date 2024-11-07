import HotelCard from "components/partials/customer/HotelCard.tsx";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import { useNavigate } from "react-router-dom";

const MyHotels = () => {
    const { data: hotelsData, error, isLoading } = useGetHotelsPageQuery({onlyOwn: true, pageIndex: 0, pageSize: 3});
    const navigate = useNavigate();

    if (isLoading) { return <p>Loading...</p>; }
    if (error) { return <p>Error loading hotels.</p>; }

    return (
        <div className="hotels-container">
            <div className="container1">
                <p className="pre-title">Мої готелі</p>
                    <div className="hotels" onClick={() => navigate(`/realtor/hotels`)}>
                        {hotelsData?.data?.map((item) => (
                            <HotelCard key={item.id} item={item} />
                        ))}
                    </div>
            </div>

            <div className="main-button">
                <button onClick={() => navigate("/realtor/hotels")}>
                    Більше
                </button>
            </div>
        </div>
    )
}

export default MyHotels;
