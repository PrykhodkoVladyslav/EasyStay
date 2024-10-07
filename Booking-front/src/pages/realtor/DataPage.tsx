import { useEffect } from "react";
import {useSelector} from "react-redux";
import {getUser} from "store/slice/userSlice.ts";
import { useGetRealtorsInformationQuery } from "services/user.ts";
import {useGetAllCitiesQuery} from "services/city.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import FormError from "components/ui/FormError.tsx";
import {useGetAllCountriesQuery} from "services/country.ts";

const DataPage = () => {
    const {
        register,
        // handleSubmit,
        // reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(),
    });

    const user = useSelector(getUser);
    const { data: realtorInfo, error, isLoading } = useGetRealtorsInformationQuery(user.id);
    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: countriesData } = useGetAllCountriesQuery();

    const sortedCities = citiesData ? [...citiesData].sort((a, b) => a.name.localeCompare(b.name)) : [];
    const sortedCountries = countriesData ? [...countriesData].sort((a, b) => a.name.localeCompare(b.name)) : [];
    const selectedCityId = watch("address.cityId");

    useEffect(() => {
        const initializeCountry = () => {
            const cityId = selectedCityId || realtorInfo?.city?.id;
            if (cityId) {
                const city = sortedCities.find((city) => city.id === cityId);
                const countryId = city?.country?.id || null;

                if (countryId) {
                    setValue("address.countryId", countryId);
                }
            }
        };

        initializeCountry();
    }, [selectedCityId, sortedCities, setValue, realtorInfo?.city?.id]);

    if (!user) { return null; }
    if (isLoading) { return <h2 className="flex items-center justify-center">Завантаження...</h2>; }
    if (error) { return <p>Виникла помилка при отриманні даних: {error.message}</p>; }

    return (
        <div className="data-content">
            <p className="title">Особисті дані</p>

            <div className="data">
                <div className="info">
                    <p className="name">{realtorInfo.fullName}</p>
                    <p className="email">{realtorInfo.email}</p>
                </div>

                <div className="container10">
                    <div className="containers1">
                        <p>Опис</p>
                        <textarea
                            placeholder="Текст"
                            maxLength={4000}
                            value={realtorInfo.description}
                        ></textarea>
                        <p className="counter">0/4000</p>
                    </div>

                    <div className="containers1">
                        <p>Номер телефону</p>
                        <input className="text-input"
                               id="phone"
                               title="Номер телефону"
                               type="text"
                               value={realtorInfo.phoneNumber}
                               placeholder="Введіть Номер телефону"
                            // isError={Boolean(errors.firstName || firstNameError)}
                            // errorMessage={errors?.firstName?.message || firstNameError}
                            // showCross={showCross}
                            // formRegisterReturn={register("firstName")}
                        />
                    </div>

                    <div className="containers1">
                        <p>Дата народження</p>
                        <input
                            className="text-input"
                            id="birthdate"
                            title="Дата народження"
                            type="date"
                            value={realtorInfo.dateOfBirth}
                            placeholder="Введіть дату народження"
                            min="1900-01-01"
                            max="2020-01-01"
                        />
                    </div>

                    <div className="containers1">
                        <p>Громадянство</p>
                        <input
                            className="text-input"
                            id="citizenship"
                            title="Громадянство"
                            type="text"
                            value={realtorInfo.citizenship}
                            placeholder="Введіть громадянство"
                        />
                    </div>

                    <div className="containers1">
                        <p>Стать</p>
                        <select
                            {...register("gender.id", { required: "Стать обов'язкова" })}
                            defaultValue={realtorInfo.gender?.id || ""}
                        >
                            <option disabled value="">
                                Виберіть стать
                            </option>
                            <option value={1}>Чоловік</option>
                            <option value={2}>Жінка</option>
                        </select>
                        {errors?.gender?.id && (
                            <FormError className="text-red" errorMessage={errors?.gender?.id?.message as string} />
                        )}
                    </div>

                    <div className="containers1">
                        <p>Адресса</p>
                        <input
                            className="text-input"
                            id="address"
                            title="Адресса"
                            type="text"
                            value={realtorInfo.address}
                            placeholder="Введіть адрессу"
                        />
                    </div>

                    <div className="containers2">
                        <div className="container11">
                            <div>
                                <p>Країна</p>
                                <select
                                    {...register("address.countryId", {required: "Країна обов'язкова"})}
                                    id="countryId"
                                    defaultValue={realtorInfo?.city?.country?.id || ""}
                                    disabled={!!realtorInfo?.city?.country?.id}
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
                                {errors?.address?.countryId && (
                                    <FormError
                                        className="text-red"
                                        errorMessage={errors?.address?.countryId?.message as string}
                                    />
                                )}
                            </div>
                            <div>
                                <p>Місто</p>
                                <select
                                    {...register("address.cityId", {required: "Місто обов'язкове"})}
                                    id="cityId"
                                    defaultValue={realtorInfo.city?.id || ""}
                                >
                                    <option disabled value="">
                                        Виберіть місто
                                    </option>
                                    {sortedCities.map((city) => (
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
                        </div>

                        <button className="btn-edit">
                            Редагувати
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataPage;