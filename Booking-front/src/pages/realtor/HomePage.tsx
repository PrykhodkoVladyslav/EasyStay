import AddHotel from "components/partials/account/home/AddHotel.tsx";
import MyHotels from "components/partials/account/home/MyHotels.tsx";
import Reviews from "components/partials/account/home/Reviews.tsx";

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
