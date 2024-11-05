import { useEffect, useMemo, useState } from 'react';
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import showToast from "utils/toastShow.ts";
import FormError from "components/ui/FormError.tsx";
import { City } from "interfaces/city";
import { useGetAllHotelCategoriesQuery } from "services/hotelCategories.ts";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useGetAllCountriesQuery } from "services/country.ts";
import { useGetAllHotelAmenitiesQuery } from "services/hotelAmenity.ts";
import { useGetAllBreakfastsQuery } from "services/breakfast.ts";
import { useGetAllLanguagesQuery } from "services/language.ts";
import { useCreateHotelMutation } from "services/hotel.ts";
import { HotelCreatePage1Schema, HotelCreateSchemaType, HotelCreateSchema } from "interfaces/zod/hotel.ts";
import { useNavigate } from "react-router-dom";

const HotelPage = () => {
    const [currentContainer, setCurrentContainer] = useState(1);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        watch,
        formState: { errors },
    } = useForm<HotelCreateSchemaType>({
        resolver: zodResolver(currentContainer === 1 ? HotelCreatePage1Schema : HotelCreateSchema),
        defaultValues: {
            hotelAmenityIds: [],
            staffLanguageIds: [],
            arrivalTimeUtcFrom: "00:00:00",
            arrivalTimeUtcTo: "00:00:00",
            departureTimeUtcFrom: "00:00:00",
            departureTimeUtcTo: "00:00:00",
        },
    });

    const { data: hotelCategoriesData } = useGetAllHotelCategoriesQuery();
    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: countriesData } = useGetAllCountriesQuery();
    const { data: hotelAmenitiesData } = useGetAllHotelAmenitiesQuery();
    const { data: breakfastsData } = useGetAllBreakfastsQuery();
    const { data: languagesData } = useGetAllLanguagesQuery();
    const [createHotel] = useCreateHotelMutation();

    const [selectedCountryId, setSelectedCountryId] = useState<number>();
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [selectedHotelAmenities, setSelectedHotelAmenities] = useState<number[]>([]);
    const [isBreakfast, setIsBreakfast] = useState<boolean>(false);
    const [selectedBreakfasts, setSelectedBreakfasts] = useState<number[]>([]);
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
        setValue("address.cityId", String(countryId));
    };

    const handleBreakfastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsBreakfast(e.target.value === "yes");
        if (e.target.value === "no") {
            setValue("breakfastIds", []);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedPhotos([...selectedPhotos, ...filesArray]);
        }
    };

    const handleDeletePhoto = (index: number) => {
        setSelectedPhotos(selectedPhotos.filter((_, i) => i !== index));
    };

    const nextContainer = async () => {
        const isValid = await trigger();
        if (isValid) {
            if (currentContainer < 2) {
                setCurrentContainer(currentContainer + 1);
            } else {
                handleSubmit(onSubmit)();
            }
        }
    };

    const onSubmit = async (data: HotelCreateSchemaType) => {
        const hoteldata = {
            ...data,
            isArchived: false,
            hotelAmenityIds: selectedHotelAmenities,
            breakfastIds: selectedBreakfasts,
            staffLanguageIds: selectedLanguages,
            photos: selectedPhotos,
            arrivalTimeUtcFrom: data.arrivalTimeUtcFrom || '',
            arrivalTimeUtcTo: data.arrivalTimeUtcTo || '',
            departureTimeUtcFrom: data.departureTimeUtcFrom || '',
            departureTimeUtcTo: data.departureTimeUtcTo || '',
            categoryId: Number(data.categoryId) || 0,
            address: {
                ...data.address,
                floor: data.address.floor || '',
                cityId: Number(data.address.cityId) || 0,
            },
        }

        try {
            await createHotel(hoteldata).unwrap();
            navigate(`/realtor/hotels`);
            // navigate(`/hotel/${hoteldata.id}`);
            showToast(`Готель успішно створено!`, "success");
        } catch (error) {
            showToast(`Помилка при створенні готелю!`, "error");
        }
    };

    return (
        <div className="add-hotel-room">
            <form onSubmit={handleSubmit(onSubmit)}>
                {currentContainer === 1 && (
                    <div className="add-page-1">
                        <p className="title">Додайте своє помешкання</p>
                        <div className="data-containers">

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">1</div>
                                    <p className="title">Дайте опис</p>
                                </div>

                                <div className="hotel-container-1">
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
                                                       errorMessage={errors?.name?.message as string}/>
                                        )}
                                    </div>
                                    <div className="data">
                                        <p className="title">Категорія готелю</p>
                                        <select
                                            {...register("categoryId")}
                                            id="categoryId"
                                            value={watch("categoryId") || ""}
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
                                                       errorMessage={errors?.categoryId?.message as string}/>
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

                                <div className="hotel-container-2">
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
                                                       errorMessage={errors?.address?.street?.message as string}/>
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
                                                       errorMessage={errors?.address?.houseNumber?.message as string}/>
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
                                                       errorMessage={errors?.address?.floor?.message as string}/>
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
                                                       errorMessage={errors?.address?.apartmentNumber?.message as string}/>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">3</div>
                                    <p className="title">Чим можуть користуватися гості у цьому готелі?</p>
                                </div>

                                <div className="hotel-container-3 label-checkbox">
                                    {hotelAmenitiesData?.map((hotelAmenity) => (
                                        <label key={hotelAmenity.id}>
                                            <input
                                                {...register("hotelAmenityIds")}
                                                type="checkbox"
                                                value={hotelAmenity.id}
                                                checked={selectedHotelAmenities.includes(hotelAmenity.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedHotelAmenities((prev) => [...prev, hotelAmenity.id]);
                                                    } else {
                                                        setSelectedHotelAmenities((prev) => prev.filter((id) => id !== hotelAmenity.id));
                                                    }
                                                    setValue("hotelAmenityIds", selectedHotelAmenities);
                                                }}
                                            />
                                            {hotelAmenity.name}
                                        </label>
                                    ))}
                                    {errors?.hotelAmenityIds && (
                                        <FormError className="text-red"
                                                   errorMessage={errors?.hotelAmenityIds?.message as string}/>
                                    )}
                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">4</div>
                                    <p className="title"> Ви подаєте сніданок?</p>
                                </div>

                                <div className="hotel-container-4">
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
                                                defaultChecked
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
                                                        {...register("breakfastIds")}
                                                        type="checkbox"
                                                        value={breakfast.id}
                                                        checked={selectedBreakfasts.includes(breakfast.id)}
                                                        disabled={!isBreakfast}
                                                        onChange={(e) => {
                                                            const id = Number(e.target.value);
                                                            setSelectedBreakfasts((prev) =>
                                                                e.target.checked ? [...prev, id] : prev.filter((bid) => bid !== id)
                                                            );
                                                        }}
                                                    />
                                                    <span>{breakfast.name}</span>
                                                </label>
                                            ))}
                                            {errors?.breakfastIds && (
                                                <FormError className="text-red"
                                                           errorMessage={errors?.breakfastIds?.message as string}/>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">5</div>
                                    <p className="title">Якими мовами говорите ви або ваш персонал?</p>
                                </div>

                                <div className="hotel-container-5 label-checkbox">
                                    {languagesData?.map((languages) => (
                                        <label key={languages.id}>
                                            <input
                                                {...register("staffLanguageIds")}
                                                type="checkbox"
                                                value={languages.id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedLanguages((prev) => [...prev, languages.id]);
                                                    } else {
                                                        setSelectedLanguages((prev) => prev.filter((id) => id !== languages.id));
                                                    }
                                                }}
                                            />
                                            {languages.name}
                                        </label>
                                    ))}
                                    {errors?.staffLanguageIds && (
                                        <FormError className="text-red"
                                                   errorMessage={errors?.staffLanguageIds?.message as string}/>
                                    )}
                                </div>
                            </div>

                            <div className="pre-container">
                                <div className="top">
                                    <div className="number">6</div>
                                    <p className="title">О котрій у вас відбувається заїзд і виїзд?</p>
                                </div>

                                <div className="hotel-container-6">
                                    <div className="containers">
                                        <p className="title">Заїзд</p>
                                        <div className="container">
                                            <div className="from-to">
                                                <p>З</p>
                                                <input
                                                    {...register("arrivalTimeUtcFrom")}
                                                    type="time"
                                                    step="1"
                                                />
                                                {errors?.arrivalTimeUtcFrom && (
                                                    <FormError
                                                        className="text-red"
                                                        errorMessage={errors?.arrivalTimeUtcFrom?.message as string}
                                                    />
                                                )}
                                            </div>
                                            <div className="from-to">
                                                <p>До</p>
                                                <input
                                                    {...register("arrivalTimeUtcTo")}
                                                    type="time"
                                                    step="1"
                                                />
                                                {errors?.arrivalTimeUtcTo && (
                                                    <FormError
                                                        className="text-red"
                                                        errorMessage={errors?.arrivalTimeUtcTo?.message as string}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="containers">
                                        <p className="title">Виїзд</p>
                                        <div className="container">
                                            <div className="from-to">
                                                <p>З</p>
                                                <input
                                                    {...register("departureTimeUtcFrom")}
                                                    type="time"
                                                    step="1"
                                                />
                                                {errors?.departureTimeUtcFrom && (
                                                    <FormError
                                                        className="text-red"
                                                        errorMessage={errors?.departureTimeUtcFrom?.message as string}
                                                    />
                                                )}
                                            </div>
                                            <div className="from-to">
                                                <p>До</p>
                                                <input
                                                    {...register("departureTimeUtcTo")}
                                                    type="time"
                                                    step="1"
                                                />
                                                {errors?.departureTimeUtcTo && (
                                                    <FormError
                                                        className="text-red"
                                                        errorMessage={errors?.departureTimeUtcTo?.message as string}
                                                    />
                                                )}
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
                                Чим більше фотографій ви завантажите, тим більші ваші шанси отримати бронювання. Ви
                                завжди
                                можете додати більше фото згодом.
                            </p>
                        </div>

                        <div className="photo-container">
                            <label className="add-photo" htmlFor="photos">
                                <div className="inner">
                                    <img src={getPublicResourceUrl("account/add-photo.svg")} alt="Додати фото"/>
                                    <input
                                        {...register("photos")}
                                        id="photos"
                                        type="file"
                                        name="photos"
                                        multiple
                                        onChange={handlePhotoChange}
                                    />
                                    <span>Завантажити фото</span>
                                </div>
                            </label>

                            <div className="right-section">
                                <p className="title">Ваші фото</p>
                                <div className="photos">
                                    {selectedPhotos.map((photo, index) => (
                                        <div key={index} className="photo">
                                            <img src={URL.createObjectURL(photo)} alt={`Зображення ${index + 1}`}/>
                                            <button className="btn-delete" onClick={() => handleDeletePhoto(index)}>
                                                <img
                                                    src={getPublicResourceUrl("account/trash.svg")}
                                                    alt="Видалити фото"
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {errors?.photos && (
                            <FormError className="text-red flex justify-end"
                                       errorMessage={errors?.photos?.message as string}/>
                        )}
                    </div>
                )}

                <button
                    className="main-button"
                    onClick={nextContainer}
                    type="button"
                >
                    Далі
                </button>
            </form>
        </div>
    );
}

export default HotelPage;
