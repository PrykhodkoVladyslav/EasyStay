import SearchTopSection from "components/partials/customer/SearchTopSection.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";

const HotelsPage = () => {
    return (
        <div className="hotels-page">
            <SearchTopSection />

            <VerticalPad heightPx={18} />

            <div className="page-path">
                <p className="first-page-path-item page-path-item">Головна</p>
                <p className="page-path-separator">/</p>
                <p className="page-path-item">Пошук готелів</p>
            </div>

            <VerticalPad heightPx={54} />

        </div>
    );
};

export default HotelsPage;