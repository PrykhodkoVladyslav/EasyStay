import AddHotel from "components/partials/account/home/AddHotel.tsx";
import MyHotels from "components/partials/account/home/MyHotels.tsx";
import Reviews from "components/partials/account/home/Reviews.tsx";

const HomePage = () => {
    return (
        <>
            <AddHotel />
            <div className="content">
                <MyHotels />
                <Reviews />
            </div>
        </>
    );
}

export default HomePage;
