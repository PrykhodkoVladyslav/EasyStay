import {useEffect, useMemo, useState} from "react";
import { useSelector } from "react-redux";
import { getUser } from "store/slice/userSlice.ts";
import {useGetRealtorsInformationQuery, useUpdateRealtorsInformationMutation} from "services/user.ts";
import { useGetAllCitiesQuery } from "services/city.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormError from "components/ui/FormError.tsx";
import { useGetAllCountriesQuery } from "services/country.ts";
import { UpdateRealtorInformationSchema, UpdateRealtorInformationSchemaType } from "interfaces/zod/user.ts";
import showToast from "utils/toastShow.ts";
// import { useGetAllCitizenshipsQuery } from "services/user.ts";

const DataPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<UpdateRealtorInformationSchemaType>({
        resolver: zodResolver(UpdateRealtorInformationSchema),
    });

    const user = useSelector(getUser);
    const { data: realtorInfo, error, isLoading } = useGetRealtorsInformationQuery(user.id);
    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: countriesData } = useGetAllCountriesQuery();
    // const { data: citizenshipsData } = useGetAllCitizenshipsQuery();
    const [updateRealtorsInformation ] = useUpdateRealtorsInformationMutation();

    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
    const [filteredCities, setFilteredCities] = useState([]);

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

    useEffect(() => {
        if (realtorInfo) {
            const citizenship = realtorInfo.citizenship || {};
            const city = realtorInfo.city || {};
            const country = realtorInfo.country || {};
            setSelectedCountryId(country.id || null);
            setValue("description", realtorInfo.description || "");
            setValue("phoneNumber", realtorInfo.phoneNumber || "");
            setValue("dateOfBirth", realtorInfo.dateOfBirth || "");
            setValue("citizenshipId", citizenship.id || "");
            setValue("genderId", realtorInfo.gender.id || "");
            setValue("address", realtorInfo.address || "");
            setValue("countryId", country.id || "");
            setValue("cityId", city.id || "");
        }
    }, [realtorInfo, setValue]);

    const handleCountryChange = (e) => {
        const countryId = Number(e.target.value);
        setSelectedCountryId(countryId);
        setValue("cityId", "");
    };

    const onSubmit = async (data: UpdateRealtorInformationSchemaType) => {
        try {
            await updateRealtorsInformation({
                ...data,
                genderId: ,
                citizenshipId: "1",
            }).unwrap();
            console.log(data);

            showToast(`Данні успішно оновлено!`, "success");
        } catch (error) {
            showToast(`Помилка при оновленні данних!`, "error");
        }
    };

    if (!user) { return null; }
    if (isLoading) { return <h2 className="flex items-center justify-center">Завантаження...</h2>; }
    if (error) { return <p>Виникла помилка при отриманні даних: {error.message}</p>; }

    return (
        <div className="data-content">
            <p className="title">Особисті дані</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="data">
                    <div className="info">
                        <p className="name">{realtorInfo.fullName}</p>
                        <p className="email">{realtorInfo.email}</p>
                    </div>

                    <div className="container10">
                        <div className="containers1">
                            <p>Опис</p>
                            <textarea
                                {...register("description")}
                                placeholder="Текст"
                                maxLength={4000}
                            ></textarea>
                            {errors?.description && (
                                <FormError className="text-red" errorMessage={errors?.description?.message as string} />
                            )}
                            <p className="counter">{watch("description")?.length || 0}/4000</p>
                        </div>

                        <div className="containers1">
                            <p>Номер телефону</p>
                            <input className="text-input"
                                   {...register("phoneNumber")}
                                   id="phone"
                                   title="Номер телефону"
                                   type="text"
                                   placeholder="Введіть Номер телефону"
                            />
                            {errors?.phoneNumber && (
                                <FormError className="text-red" errorMessage={errors?.phoneNumber?.message as string} />
                            )}
                        </div>

                        <div className="containers1">
                            <p>Дата народження</p>
                            <input
                                className="text-input"
                                {...register("dateOfBirth")}
                                id="birthdate"
                                title="Дата народження"
                                type="date"
                                placeholder="Введіть дату народження"
                                min="1900-01-01"
                                max="2020-01-01"
                            />
                            {errors?.dateOfBirth && (
                                <FormError className="text-red" errorMessage={errors?.dateOfBirth?.message as string} />
                            )}
                        </div>

                        <div className="containers1">
                            <p>Громадянство</p>
                            <select
                                {...register("citizenshipId")}
                                id="citizenshipId"
                                // value={selectedCitizenshipId || ""}
                                // onChange={handleCountryChange}
                            >
                                <option disabled value="">
                                    Виберіть громадянство
                                </option>
                                {/*{sortedCountries.map((country) => (*/}
                                {/*    <option key={country.id} value={country.id}>*/}
                                {/*        {country.name}*/}
                                {/*    </option>*/}
                                {/*))}*/}
                            </select>
                            {errors?.citizenship?.id && (
                                <FormError className="text-red" errorMessage={errors?.citizenship?.message as string}/>
                            )}

                        </div>

                        <div className="containers1">
                            <p>Стать</p>
                            <select
                                {...register("gender.id")}
                                defaultValue={realtorInfo.gender?.id || ""}
                            >
                                <option disabled value="">
                                    Виберіть стать
                                </option>
                                <option value={1}>Чоловік</option>
                                <option value={2}>Жінка</option>
                            </select>
                            {errors?.gender?.id && (
                                <FormError className="text-red" errorMessage={errors?.gender?.id?.message as string}/>
                            )}
                        </div>

                        <div className="containers1">
                            <p>Адреса</p>
                            <input
                                className="text-input"
                                {...register("address")}
                                id="address"
                                title="Адреса"
                                type="text"
                                placeholder="Введіть адресу"
                            />
                        </div>

                        <div className="containers2">
                            <div className="container11">
                                <div>
                                    <p>Країна</p>
                                    <select
                                        {...register("countryId")}
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
                                    {errors?.city?.country?.id && (
                                        <FormError
                                            className="text-red"
                                            errorMessage={errors?.city?.country.id?.message as string}
                                        />
                                    )}
                                </div>
                                <div>
                                    <p>Місто</p>
                                    <select
                                        {...register("cityId")}
                                        id="cityId"
                                        value={watch("cityId") || ""}
                                    >
                                        <option disabled value="">
                                            Виберіть місто
                                        </option>
                                        {filteredCities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.city?.id && (
                                        <FormError
                                            className="text-red"
                                            errorMessage={errors?.city?.idd?.message as string}
                                        />
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="btn-edit">
                                Редагувати
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DataPage;
