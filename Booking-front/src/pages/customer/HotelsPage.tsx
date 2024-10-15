import SearchHotelSection from "components/partials/customer/SearchHotelSection.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import FilterHotelsSection from "components/partials/customer/FilterHotelsSection.tsx";

const HotelsPage = () => {
    return (
        <div className="hotels-page">
            <SearchHotelSection />

            <VerticalPad heightPx={18} />

            <div className="page-path">
                <p className="first-page-path-item page-path-item">Головна</p>
                <p className="page-path-separator">/</p>
                <p className="page-path-item">Пошук готелів</p>
            </div>

            <VerticalPad heightPx={54} />

            <div className="hotels-container">
                <FilterHotelsSection />

            </div>

            <VerticalPad heightPx={110} />
        </div>
    );
};

export default HotelsPage;