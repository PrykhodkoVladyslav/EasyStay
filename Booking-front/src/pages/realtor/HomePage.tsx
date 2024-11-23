import AddHotel from "components/partials/realtor/home/AddHotel.tsx";
import MyHotels from "components/partials/realtor/home/MyHotels.tsx";
import Reviews from "components/partials/realtor/home/Reviews.tsx";
import { useContext, useEffect } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

const HomePage = () => {
    useEffect(instantScrollToTop, []);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage("home");
    }, []);

    return (
        <div className="home-container">
            <AddHotel />
            <div className="hotels-reviews">
                <MyHotels />
                <Reviews />
            </div>
        </div>
    );
};

export default HomePage;
