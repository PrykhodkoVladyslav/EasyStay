import SearchHotelSection, { ISearchData } from "components/partials/customer/SearchHotelSection.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import FilterHotelsSection, { IFilter } from "components/partials/customer/FilterHotelsSection.tsx";
import HotelsSection from "components/partials/customer/HotelsSection.tsx";
import { useState } from "react";
import IHotelsPageQuery from "interfaces/hotel/IHotelsPageQuery.ts";

const HotelsPage = () => {
    const [sideFilters, setSideFilters] = useState<IFilter>({
        hotelAmenities: [],
        roomAmenities: [],
        bedTypes: [],
        languages: [],
        breakfasts: [],
        genders: [],
    });

    const [hotelSearchFilters, setHotelSearchFilters] = useState<IHotelsPageQuery>({} as IHotelsPageQuery);

    const onSearch = (topFilters: ISearchData) => {
        const cityName = topFilters.city;
        const dateFrom = topFilters.date?.from;
        const dateTo = topFilters.date?.to;
        const adultGuests = topFilters.adultGuests;
        const minPrice = sideFilters.prices?.minPrice;
        const maxPrice = sideFilters.prices?.maxPrice;
        const hotelAmenities = sideFilters.hotelAmenities;
        const roomAmenities = sideFilters.roomAmenities;
        const rating = sideFilters.rating;
        const bedTypes = sideFilters.bedTypes;
        const numberOfRooms = sideFilters.numberOfRooms;
        const languages = sideFilters.languages;
        const breakfasts = sideFilters.breakfasts;
        const genders = sideFilters.genders;

        setHotelSearchFilters({
            address: {
                city: {
                    name: cityName,
                },
            },

            minPrice,
            maxPrice,
            allHotelAmenityIds: hotelAmenities,
            allRoomAmenityIds: roomAmenities,
            minRating: rating,

            allLanguageIds: languages,
            allBreakfastIds: breakfasts,

        });
    };

    return (
        <div className="hotels-page">
            <SearchHotelSection onSearch={onSearch} />

            <VerticalPad heightPx={18} />

            <div className="page-path">
                <p className="first-page-path-item page-path-item">Головна</p>
                <p className="page-path-separator">/</p>
                <p className="page-path-item">Пошук готелів</p>
            </div>

            <VerticalPad heightPx={54} />

            <div className="hotels-container">
                <FilterHotelsSection onChange={setSideFilters} />

                <HotelsSection filter={hotelSearchFilters} />
            </div>

            <VerticalPad heightPx={110} />
        </div>
    );
};

export default HotelsPage;