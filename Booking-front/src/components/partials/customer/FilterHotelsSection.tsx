import VerticalPad from "components/ui/VerticalPad.tsx";
import PriceFilter from "components/partials/customer/PriceFilter.tsx";
import MultipleSelect, { IMultipleSelectOption } from "components/partials/customer/MultipleSelect.tsx";
import { useEffect, useState } from "react";
import { useGetAllHotelAmenitiesQuery } from "services/hotelAmenity.ts";
import { useGetAllRoomAmenitiesQuery } from "services/roomAmenity.ts";

const defaultRatingOptions = [
    {
        id: 1,
        name: "Відмінно: 9+",
        isSelected: false,
        rating: 9,
    },
    {
        id: 2,
        name: "Чудово: 8+",
        isSelected: false,
        rating: 8,
    },
    {
        id: 3,
        name: "Дуже добре: 7+",
        isSelected: false,
        rating: 7,
    },
    {
        id: 4,
        name: "Добре: 6+",
        isSelected: false,
        rating: 6,
    },
    {
        id: 5,
        name: "Звичайно: 5+",
        isSelected: false,
        rating: 5,
    },
    {
        id: 6,
        name: "Гірше середнього: 4+",
        isSelected: false,
        rating: 4,
    },
    {
        id: 7,
        name: "Погано: 3+",
        isSelected: false,
        rating: 3,
    },
    {
        id: 8,
        name: "Досить погано: 2+",
        isSelected: false,
        rating: 2,
    },
    {
        id: 9,
        name: "Вкрай погано: 1+",
        isSelected: false,
        rating: 1,
    },
];

const FilterHotelsSection = () => {
    const { data: hotelConvenienceData } = useGetAllHotelAmenitiesQuery();
    const [hotelConvenienceOptions, setHotelConvenienceOptions] = useState<IMultipleSelectOption[]>([]);
    useEffect(() => {
        const newOptions = (hotelConvenienceData ?? []).map(hc => {
            return {
                id: hc.id,
                name: hc.name,
                isSelected: false,
            } as IMultipleSelectOption;
        });

        setHotelConvenienceOptions(newOptions);
    }, [hotelConvenienceData]);

    const onHotelConvenienceOptionClick = (id: number) => {
        const opt = hotelConvenienceOptions.map(o => {
            if (o.id === id)
                o.isSelected = !o.isSelected;

            return o;
        });

        setHotelConvenienceOptions(opt);
    };

    const [ratingOptions, setRatingOptions] = useState(defaultRatingOptions);

    const onRatingOptionClick = (id: number) => {
        const opt = ratingOptions.map(o => {
            o.isSelected = o.id === id ? !o.isSelected : false;
            return o;
        });

        setRatingOptions(opt);
    };

    const { data: roomConvenienceData } = useGetAllRoomAmenitiesQuery();
    const [roomConvenienceOptions, setRoomConvenienceOptions] = useState<IMultipleSelectOption[]>([]);
    useEffect(() => {
        const newOptions = (roomConvenienceData ?? []).map(rc => {
            return {
                id: rc.id,
                name: rc.name,
                isSelected: false,
            };
        });

        setRoomConvenienceOptions(newOptions);
    }, [roomConvenienceData]);

    const onRoomConvenienceOptionClick = (id: number) => {
        const opt = roomConvenienceOptions.map(o => {
            if (o.id === id)
                o.isSelected = !o.isSelected;

            return o;
        });

        setRoomConvenienceOptions(opt);
    };

    const reset = () => {
        setHotelConvenienceOptions(hotelConvenienceOptions.map(o => {
            o.isSelected = false;
            return o;
        }));

        setRatingOptions(defaultRatingOptions);

        setRoomConvenienceOptions(roomConvenienceOptions.map(o => {
            o.isSelected = false;
            return o;
        }));
    };

    return (
        <div className="filter-hotels-section">
            <div className="title-container">
                <p>Фільтр</p>
                <button onClick={reset}>Скинути</button>
            </div>

            <VerticalPad heightPx={40} />

            <PriceFilter maxPrice={10000} />

            <VerticalPad heightPx={86} />

            <MultipleSelect title="Зручності" options={hotelConvenienceOptions}
                            onOptionClick={onHotelConvenienceOptionClick} />

            <VerticalPad heightPx={32} />

            <MultipleSelect title="Оцінка за відгуками" options={ratingOptions} onOptionClick={onRatingOptionClick} />

            <VerticalPad heightPx={32} />

            <MultipleSelect title="Зручності в номері" options={roomConvenienceOptions}
                            onOptionClick={onRoomConvenienceOptionClick} />

            <VerticalPad heightPx={32} />
        </div>
    );
};

export default FilterHotelsSection;