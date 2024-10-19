import PriceFilter from "components/partials/customer/PriceFilter.tsx";
import MultipleSelect, { IMultipleSelectOption } from "components/partials/customer/MultipleSelect.tsx";
import { useEffect, useState } from "react";
import { useGetAllHotelAmenitiesQuery } from "services/hotelAmenity.ts";
import { useGetAllRoomAmenitiesQuery } from "services/roomAmenity.ts";
import { useGetMaxHotelPriceQuery } from "services/hotel.ts";
import NumericUpDown from "components/partials/customer/NumericUpDown.tsx";
import { useGetAllLanguagesQuery } from "services/language.ts";
import { useGetAllBreakfastsQuery } from "services/breakfast.ts";
import { useGetAllGendersQuery } from "services/gender.ts";

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

interface IFilter {
    prices?: {
        minPrice: number;
        maxPrice: number;
    };
    hotelAmenities: number[];
    roomAmenities: number[];
    rating?: number;
    bedType?: number;
    numberOfRooms?: number;
    languages: number[];
    breakfasts: number[];
    genders: number[];
}

interface IFilterHotelsSectionProps {
    onChange?: (filter: IFilter) => void;
}

const FilterHotelsSection = (props: IFilterHotelsSectionProps) => {
    const defaultMaxPrice = 10000;

    const { data: maxPriceData } = useGetMaxHotelPriceQuery();
    const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
    const [minPriceValue, setMinPriceValue] = useState<number | null>(0);
    const [maxPriceValue, setMaxPriceValue] = useState<number | null>(defaultMaxPrice);
    const pricesChanged = (minPrice: number | null, maxPrice: number | null) => {
        setMinPriceValue(minPrice);
        setMaxPriceValue(maxPrice);
    };
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

    const [numberOfRoomsString, setNumberOfRoomsString] = useState<string | undefined>("0");
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const changeNumberString = (value: string | undefined) => {
        if (value) {
            if (/^0[1-9]+/.test(value)) {
                setNumberOfRoomsString(value.replace(/^0+/, ""));
                return;
            }

            if ((+value > 99)) {
                setNumberOfRoomsString("99");
                return;
            }
        }


        setNumberOfRoomsString(value);
    };

    const { data: languageData } = useGetAllLanguagesQuery();
    const [languageOptions, setLanguageOptions] = useState<IMultipleSelectOption[]>([]);
    useEffect(() => {
        const newOptions = (languageData ?? []).map(l => {
            return {
                id: l.id,
                name: l.name,
                isSelected: false,
            };
        });

        setLanguageOptions(newOptions);
    }, [languageData]);
    const onLanguageOptionClick = (id: number) => {
        const opt = languageOptions.map(o => {
            if (o.id === id)
                o.isSelected = !o.isSelected;

            return o;
        });

        setLanguageOptions(opt);
    };

    const { data: breakfastData } = useGetAllBreakfastsQuery();
    const [breakfastOptions, setBreakfastOptions] = useState<IMultipleSelectOption[]>([]);
    useEffect(() => {
        const newOptions = (breakfastData ?? []).map(b => {
            return {
                id: b.id,
                name: b.name,
                isSelected: false,
            };
        });

        setBreakfastOptions(newOptions);
    }, [breakfastData]);
    const onBreakfastOptionClick = (id: number) => {
        const options = breakfastOptions.map(o => {
            if (o.id === id)
                o.isSelected = !o.isSelected;

            return o;
        });

        setBreakfastOptions(options);
    };

    const { data: genderData } = useGetAllGendersQuery();
    const [genderOptions, setGenderOptions] = useState<IMultipleSelectOption[]>([]);
    useEffect(() => {
        const newOptions = (genderData ?? []).map(g => {
            return {
                id: g.id,
                name: g.name,
                isSelected: false,
            };
        });

        setGenderOptions(newOptions);
    }, [genderData]);
    const onGenderOptionClick = (id: number) => {
        const options = genderOptions.map(o => {
            if (o.id === id)
                o.isSelected = !o.isSelected;

            return o;
        });

        setGenderOptions(options);
    };

    useEffect(() => {
        props.onChange?.({
            prices: {
                minPrice: minPriceValue ?? 0,
                maxPrice: maxPriceValue ?? maxPriceData ?? defaultMaxPrice,
            },
            hotelAmenities: hotelConvenienceOptions.filter(o => o.isSelected).map(o => o.id),
            rating: ratingOptions.find(o => o.isSelected)?.rating,
            roomAmenities: roomConvenienceOptions.filter(o => o.isSelected).map(o => o.id),
            bedType: bedTypeOptions.filter(o => o.isSelected).find(o => o.isSelected)?.id,
            numberOfRooms: numberOfRooms === 0 ? undefined : numberOfRooms,
            languages: languageOptions.filter(o => o.isSelected).map(o => o.id),
            breakfasts: breakfastOptions.filter(o => o.isSelected).map(o => o.id),
            genders: genderOptions.filter(o => o.isSelected).map(o => o.id),
        });
    }, [props, minPriceValue, maxPriceValue, maxPriceData, hotelConvenienceOptions, ratingOptions, roomConvenienceOptions, bedTypeOptions, numberOfRooms, languageOptions, breakfastOptions, genderOptions]);

    const reset = () => {
        setMinPriceValue(0);
        setMaxPriceValue(maxPriceData ?? defaultMaxPrice);

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

        setNumberOfRoomsString("0");

        setLanguageOptions(languageOptions.map(o => {
            return {
                id: o.id,
                name: o.name,
                isSelected: false,
            };
        }));

        setBreakfastOptions(breakfastOptions.map(o => {
            return {
                id: o.id,
                name: o.name,
                isSelected: false,
            };
        }));

        setGenderOptions(genderOptions.map(o => {
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

            <PriceFilter maxPrice={maxPrice} minPriceValue={minPriceValue} maxPriceValue={maxPriceValue}
                         onChange={pricesChanged} />

            <MultipleSelect title="Зручності" options={hotelConvenienceOptions}
                            onOptionClick={onHotelConvenienceOptionClick} />

            <MultipleSelect title="Оцінка за відгуками" options={ratingOptions} onOptionClick={onRatingOptionClick} />

            <MultipleSelect title="Зручності в номері" options={roomConvenienceOptions}
                            onOptionClick={onRoomConvenienceOptionClick} />

            <MultipleSelect title="Тип ліжка" options={bedTypeOptions} onOptionClick={onBedTypeOptionClick} />

            <NumericUpDown
                title="Кількість кімнат"
                valueTitle="Кількість"
                value={numberOfRoomsString}
                onChange={changeNumberString}
                onChangeNumber={setNumberOfRooms}
            />

            <MultipleSelect title="Мова персоналу" options={languageOptions} onOptionClick={onLanguageOptionClick} />

            <MultipleSelect title="Сніданок" options={breakfastOptions} onOptionClick={onBreakfastOptionClick} />

            <MultipleSelect title="Стать рієлтора" options={genderOptions} onOptionClick={onGenderOptionClick} />
        </div>
    );
};

export default FilterHotelsSection;