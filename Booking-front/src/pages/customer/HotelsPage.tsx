import SearchHotelSection, { ISearchData } from "components/partials/customer/SearchHotelSection.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import FilterHotelsSection, { IFilter } from "components/partials/customer/FilterHotelsSection.tsx";
import HotelsSection from "components/partials/customer/HotelsSection.tsx";
import { useContext, useEffect, useState } from "react";
import IHotelsPageQuery from "interfaces/hotel/IHotelsPageQuery.ts";
import { format } from "date-fns";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

const HotelsPage = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    activeMenuItemContext?.setActivePage("Готелі");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const [sideFilters, setSideFilters] = useState<IFilter>({
        hotelAmenities: [],
        roomAmenities: [],
        bedTypes: [],
        languages: [],
        breakfasts: [],
        genders: [],
    });

    useEffect(() => {
        const minPrice = sideFilters.prices?.minPrice;
        const maxPrice = sideFilters.prices?.maxPrice;
        const hotelAmenities = sideFilters.hotelAmenities;
        const roomAmenities = sideFilters.roomAmenities;
        const rating = sideFilters.rating;
        const bedTypes = sideFilters.bedTypes;
        const bedInfo = {
            hasSingleBed: bedTypes.includes(1),
            hasDoubleBed: bedTypes.includes(2),
            hasExtraBed: bedTypes.includes(3),
            hasSofa: bedTypes.includes(4),
            hasKingsizeBed: bedTypes.includes(5),
        };
        const numberOfRooms = sideFilters.numberOfRooms;
        const languages = sideFilters.languages;
        const breakfasts = sideFilters.breakfasts;
        const genders = sideFilters.genders;

        setHotelSearchFilters({
            ...hotelSearchFilters,
            minPrice,
            maxPrice,
            allHotelAmenityIds: hotelAmenities,
            allRoomAmenityIds: roomAmenities,
            minRating: rating,
            bedInfo,
            minNumberOfRooms: numberOfRooms,
            allLanguageIds: languages,
            allBreakfastIds: breakfasts,
            allowedRealtorGenders: genders,
        });
    }, [sideFilters]);

    const [hotelSearchFilters, setHotelSearchFilters] = useState<IHotelsPageQuery>({} as IHotelsPageQuery);

    const onSearch = (topFilters: ISearchData) => {
        const cityName = topFilters.city;
        const dateFrom = topFilters.date?.from;
        const dateTo = topFilters.date?.to;
        const freeDatePeriod = dateFrom && dateTo ? {
            from: format(dateFrom, "yyyy-MM-dd"),
            to: format(dateTo, "yyyy-MM-dd"),
        } : undefined;
        const adultGuests = topFilters.adultGuests || undefined;

        setHotelSearchFilters({
            ...hotelSearchFilters,
            address: {
                city: {
                    name: cityName,
                },
            },
            freePeriod: freeDatePeriod,
            minAdultGuests: adultGuests,
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