import PriceFilter from "components/partials/customer/PriceFilter.tsx";
import MultipleSelect, { IMultipleSelectOption } from "components/partials/customer/MultipleSelect.tsx";
import { useEffect, useState } from "react";
import { useGetAllHotelAmenitiesQuery } from "services/hotelAmenity.ts";
import { useGetAllRoomAmenitiesQuery } from "services/roomAmenity.ts";
import { useGetMaxHotelPriceQuery } from "services/hotel.ts";

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

const defaultBedTypeOptions = [
    {
        id: 1,
        name: "Одномісне ліжко",
        isSelected: false,
    },
    {
        id: 2,
        name: "Двомісне ліжко",
        isSelected: false,
    },
    {
        id: 3,
        name: "Додаткове ліжко",
        isSelected: false,
    },
    {
        id: 4,
        name: "Диван ліжко",
        isSelected: false,
    },
    {
        id: 5,
        name: "Кінгсайз",
        isSelected: false,
    },
];

const FilterHotelsSection = () => {
    const defaultMaxPrice = 10000;

    const { data: maxPriceData } = useGetMaxHotelPriceQuery();
    const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
    useEffect(() => {
        setMaxPrice(maxPriceData ?? defaultMaxPrice);
    }, [maxPriceData]);

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

    const [bedTypeOptions, setBedTypeOptions] = useState(defaultBedTypeOptions);
    const onBedTypeOptionClick = (id: number) => {
        const opt = bedTypeOptions.map(o => {
            if (o.id === id)
                o.isSelected = !o.isSelected;

            return o;
        });

        setBedTypeOptions(opt);
    };

    const reset = () => {
        // ToDo Reset price

        setHotelConvenienceOptions(hotelConvenienceOptions.map(o => {
            o.isSelected = false;
            return o;
        }));

        setRatingOptions(ratingOptions.map(o => {
            return {
                id: o.id,
                name: o.name,
                isSelected: false,
                rating: o.rating,
            };
        }));

        setRoomConvenienceOptions(roomConvenienceOptions.map(o => {
            o.isSelected = false;
            return o;
        }));

        setBedTypeOptions(bedTypeOptions.map(o => {
            return {
                id: o.id,
                name: o.name,
                isSelected: false,
            };
        }));
    };

    return (
        <div className="filter-hotels-section">
            <div className="title-container">
                <p>Фільтр</p>
                <button onClick={reset}>Скинути</button>
            </div>

            <PriceFilter maxPrice={maxPrice} />

            <MultipleSelect title="Зручності" options={hotelConvenienceOptions}
                            onOptionClick={onHotelConvenienceOptionClick} />

            <MultipleSelect title="Оцінка за відгуками" options={ratingOptions} onOptionClick={onRatingOptionClick} />

            <MultipleSelect title="Зручності в номері" options={roomConvenienceOptions}
                            onOptionClick={onRoomConvenienceOptionClick} />

            <MultipleSelect title="Тип ліжка" options={bedTypeOptions} onOptionClick={onBedTypeOptionClick} />


        </div>
    );
};

export default FilterHotelsSection;