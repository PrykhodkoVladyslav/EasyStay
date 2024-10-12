import {useEffect, useMemo, useState} from 'react';
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateHotelMutation } from "services/hotel.ts";
import {City} from "interfaces/city";
import {UpdateRealtorInformationSchemaType} from "interfaces/zod/user.ts";
import showToast from "utils/toastShow.ts";
import {useGetAllHotelCategoriesQuery} from "services/hotelCategories.ts";
import FormError from "components/ui/FormError.tsx";
import {useGetAllCitiesQuery} from "services/city.ts";
import {useGetAllCountriesQuery} from "services/country.ts";
import {useGetAllHotelAmenitiesQuery} from "services/hotelAmenity.ts";
import {useGetAllBreakfastsQuery} from "services/breakfast.ts";

const HotelPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm/*<CreateHotelSchemaType>*/({
        resolver: zodResolver(/*CreateHotelSchema*/),
    });

    const [currentContainer, setCurrentContainer] = useState(1);
    const { data: hotelCategoriesData } = useGetAllHotelCategoriesQuery();
    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: countriesData } = useGetAllCountriesQuery();
    const { data: hotelAmenitiesData } = useGetAllHotelAmenitiesQuery();
    const { data: breakfastsData } = useGetAllBreakfastsQuery();

    const [createHotel] = useCreateHotelMutation();

    const [selectedCountryId, setSelectedCountryId] = useState<number>();
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [selectedHotelAmenities, setSelectedHotelAmenities] = useState<number[]>([]);
    const [selectedBreakfasts, setSelectedBreakfasts] = useState<number[]>([]);
    const [isBreakfast, setIsBreakfast] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);


    const sortedCities = useMemo(() => {
        return citiesData ? [...citiesData].sort((a, b) => a.name.localeCompare(b.name)) : [];
    }, [citiesData]);

    const sortedCountries = useMemo(() => {
        return countriesData ? [...countriesData].sort((a, b) => a.name.localeCompare(b.name)) : [];
    }, [countriesData]);

    useEffect(() => {
        if (selectedCountryId) {
            setFilteredCities(sortedCities.filter(city => city.country.id === selectedCountryId));
        } else {
            setFilteredCities([]);
        }
    }, [selectedCountryId, sortedCities]);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = Number(e.target.value);
        setSelectedCountryId(countryId);
        setValue("cityId", countryId);
    };

    const handleBreakfastChange = (event) => {
        setIsBreakfast(event.target.value === "yes");
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedPhotos([...photos, ...Array.from(e.target.files)]);
        }
    };

    const nextContainer = () => {
        if (currentContainer === 1) {
            setCurrentContainer(2);
        } else {

            // onSubmit();
        }
    };

    const onSubmit = async (/*data: CreateHotelSchemaType*/) => {
        try {
            await createHotel(data).unwrap();
            showToast(`Готель успішно створено!`, "success");
        } catch (error) {
            showToast(`Помилка при створенні готелю!`, "error");
        }
    };

    return (
        <div className="add-hotel">

            {currentContainer === 1 && (
            <div className="add-hotel-page-1">
                <p className="title">Додайте своє помешкання</p>
                <div className="data-containers">

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">1</div>
                            <p className="title">Дайте опис</p>
                        </div>

                        <div className="container-1">
                            <div className="data">
                                <p className="title">Назва готелю</p>
                                <input
                                    {...register("name")}
                                    type="text"
                                    id="name"
                                    placeholder="Назва"
                                />
                                {errors?.name && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.name?.message as string} />
                                )}
                            </div>
                            <div className="data">
                                <p className="title">Категорія готелю</p>
                                <select
                                    {...register("categoryId")}
                                    id="categoryId"
                                    // value={selected || ""}
                                    // onChange={handleCitizenshipChange}
                                >
                                    <option disabled value="">
                                        Виберіть категорію
                                    </option>
                                    {hotelCategoriesData?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors?.categoryId && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.categoryId?.message as string} />
                                )}
                            </div>
                            <div className="data">
                                <p className="title">Опис</p>
                                <div className="form-textarea">
                                    <textarea
                                        {...register("description")}
                                        placeholder="Текст"
                                        maxLength={4000}
                                    ></textarea>
                                    {errors?.description && (
                                        <FormError className="text-red"
                                                   errorMessage={errors?.description?.message as string}/>
                                    )}
                                    <p className="counter">{watch("description")?.length || 0}/4000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">2</div>
                            <p className="title">Вкажіть адрес</p>
                        </div>

                        <div className="container-2">
                            <div className="data">
                                <p className="title">Країна</p>
                                <select
                                    id="countryId"
                                    value={selectedCountryId || ""}
                                    onChange={handleCountryChange}
                                >
                                    <option disabled value="">
                                        Виберіть країну
                                    </option>
                                    {sortedCountries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="data">
                                <p className="title">Місто</p>
                                <select
                                    {...register("address.cityId")}
                                    id="address.cityId"
                                    value={watch("address.cityId") || ""}
                                >
                                    <option disabled value="">
                                        Виберіть місто
                                    </option>
                                    {filteredCities.map((city: City) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                                {errors?.address?.cityId && (
                                    <FormError
                                        className="text-red"
                                        errorMessage={errors?.address?.cityId?.message as string}
                                    />
                                )}
                            </div>
                            <div className="data">
                                <p className="title">Назва вулиці</p>
                                <input
                                    {...register("address.street")}
                                    type="text"
                                    id="address.street"
                                    placeholder="Вулиця"
                                />
                                {errors?.address?.street && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.address?.street?.message as string} />
                                )}
                            </div>
                            <div className="data">
                                <p className="title">Номер будинку</p>
                                <input
                                    {...register("address.houseNumber")}
                                    type="text"
                                    id="address.houseNumber"
                                    placeholder="Номер будинку"
                                />
                                {errors?.address?.houseNumber && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.address?.houseNumber?.message as string} />
                                )}
                            </div>
                            <div className="data">
                                <p className="title">Поверх</p>
                                <input
                                    {...register("address.floor")}
                                    type="number"
                                    id="address.floor"
                                    placeholder="Поверх"
                                />
                                {errors?.address?.floor && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.address?.floor?.message as string} />
                                )}
                            </div>
                            <div className="data">
                                <p className="title">Номер квартири / кімнати</p>
                                <input
                                    {...register("address.apartmentNumber")}
                                    type="text"
                                    id="address.apartmentNumber"
                                    placeholder="Назва"
                                />
                                {errors?.address?.apartmentNumber && (
                                    <FormError className="text-red"
                                               errorMessage={errors?.address?.apartmentNumber?.message as string} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">3</div>
                            <p className="title">Чим можуть користуватися гості у цьому готелі?</p>
                        </div>

                        <div className="container-3">
                            {hotelAmenitiesData?.map((hotelAmenity) => (
                                <label key={hotelAmenity.id}>
                                    <input
                                        type="checkbox"
                                        value={hotelAmenity.id}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedHotelAmenities((prev) => [...prev, hotelAmenity.id]);
                                            } else {
                                                setSelectedHotelAmenities((prev) => prev.filter((id) => id !== hotelAmenity.id));
                                            }
                                        }}
                                    />
                                    {hotelAmenity.name}
                                </label>
                            ))}
                            {errors?.amenities && (
                                <FormError className="text-red" errorMessage={errors?.amenities?.message as string} />
                            )}
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">4</div>
                            <p className="title"> Ви подаєте сніданок?</p>
                        </div>

                        <div className="container-4">
                            <div className="check-breakfast">
                                <label htmlFor="yes">
                                    <input
                                        type="radio"
                                        id="yes"
                                        value="yes"
                                        name="breakfast"
                                        onChange={handleBreakfastChange}
                                    />
                                    Так
                                </label>
                                <label htmlFor="no">
                                    <input
                                        type="radio"
                                        id="no"
                                        value="no"
                                        name="breakfast"
                                        onChange={handleBreakfastChange}
                                    />
                                    Ні
                                </label>
                            </div>

                            <div className="post-check">
                                <p>Типи сніданку</p>
                                <div className="breakfast">
                                    {breakfastsData?.map((breakfast) => (
                                        <label key={breakfast.id}>
                                            <input
                                                type="checkbox"
                                                value={breakfast.id}
                                                disabled={!isBreakfast}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedBreakfasts((prev) => [...prev, breakfast.id]);
                                                    } else {
                                                        setSelectedBreakfasts((prev) => prev.filter((id) => id !== breakfast.id));
                                                    }
                                                }}
                                            />
                                            <span>{breakfast.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">5</div>
                            <p className="title">Якими мовами говорите ви або ваш персонал?</p>
                        </div>

                        <div className="container-5">
                            <label><input type="checkbox"/> Українська</label>
                            <label><input type="checkbox"/> Англійська</label>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">6</div>
                            <p className="title">О котрій у вас відбувається заїзд і виїзд?</p>
                        </div>

                        <div className="container-6">
                            <div className="containers">
                                <p className="title">Заїзд</p>
                                <div className="container">
                                    <div className="from-to">
                                        <p>З</p>
                                        <input type="date"/>
                                    </div>
                                    <div className="from-to">
                                        <p>До</p>
                                        <input type="date"/>
                                    </div>
                                </div>
                            </div>

                            <div className="containers">
                                <p className="title">Виїзд</p>
                                <div className="container">
                                    <div className="from-to">
                                        <p>З</p>
                                        <input type="date"/>
                                    </div>
                                    <div className="from-to">
                                        <p>До</p>
                                        <input type="date"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            )}

            {currentContainer === 2 && (
                <div className="add-hotel-page-2">
                    <div className="top">
                        <p className="title">Додайте фотографії готелю</p>
                        <p className="description">
                            <span>Завантажте принаймні 5 фото свого помешкання.</span>
                            Чим більше фотографій ви завантажите, тим більші ваші шанси отримати бронювання. Ви завжди
                            можете додати більше фото згодом.
                        </p>
                    </div>

                    <div className="photo-container">
                        <label className="add-photo" htmlFor="photo">
                            <div className="inner">
                                <img src={getPublicResourceUrl("account/add-photo.svg")} alt=""/>
                                <input id="photo" type="file" name="photo"/>
                                <span>Завантажити фото</span>
                            </div>
                        </label>

                        <div className="right-section">
                            <p className="title">Ваші фото</p>
                            <div className="photos">

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className="main-button" onClick={nextContainer}>
                Далі
            </button>

        </div>

    );
}

export default HotelPage;