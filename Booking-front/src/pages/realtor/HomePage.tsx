import AddHotel from "components/partials/realtor/home/AddHotel.tsx";
import MyHotels from "components/partials/realtor/home/MyHotels.tsx";
import Reviews from "components/partials/realtor/home/Reviews.tsx";

const HomePage = () => {
    return (
        <div className="home-content">
            <AddHotel />
            <div className="hotels-reviews">
                <MyHotels />
                <Reviews />
            </div>
        </div>
    );
}

export default HomePage;
