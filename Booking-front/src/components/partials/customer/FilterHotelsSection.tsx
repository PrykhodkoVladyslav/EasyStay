import VerticalPad from "components/ui/VerticalPad.tsx";
import PriceFilter from "components/partials/customer/PriceFilter.tsx";

const FilterHotelsSection = () => {


    return (
        <div className="filter-hotels-section">
            <div className="title-container">
                <p>Фільтр</p>
                <button>Скинути</button>
            </div>

            <VerticalPad heightPx={40} />

            <PriceFilter maxPrice={10000} />
        </div>
    );
};

export default FilterHotelsSection;