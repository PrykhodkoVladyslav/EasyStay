import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "store/slice/userSlice.ts";
import { useGetRealtorsInformationQuery, useUpdateRealtorsInformationMutation } from "services/user.ts";
import { useGetAllCitiesQuery } from "services/city.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormError from "components/ui/FormError.tsx";
import { useGetAllCountriesQuery } from "services/country.ts";
import { UpdateRealtorInformationSchema, UpdateRealtorInformationSchemaType } from "interfaces/zod/user.ts";
import showToast from "utils/toastShow.ts";
import { useGetAllCitizenshipsQuery } from "services/citizenship.ts";
import { City } from "interfaces/city";
import { useGetAllGendersQuery } from "services/gender.ts";

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
    const { data: realtorInfo, error, isLoading } = useGetRealtorsInformationQuery();
    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: countriesData } = useGetAllCountriesQuery();
    const { data: citizenshipsData } = useGetAllCitizenshipsQuery();
    const { data: gendersData } = useGetAllGendersQuery();
    const [updateRealtorsInformation] = useUpdateRealtorsInformationMutation();

    const [selectedCountryId, setSelectedCountryId] = useState<number>();
    const [selectedCitizenshipId, setSelectedCitizenshipId] = useState<number>();
    const [selectedGenderId, setSelectedGenderId] = useState<number>();
    const [filteredCities, setFilteredCities] = useState<City[]>([]);

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
            setSelectedCountryId(realtorInfo?.country?.id);
            setSelectedCitizenshipId(realtorInfo?.citizenship?.id);
            setSelectedGenderId(realtorInfo?.gender?.id);
            setValue("description", realtorInfo.description || "");
            setValue("phoneNumber", realtorInfo.phoneNumber || "");
            setValue("dateOfBirth", realtorInfo?.dateOfBirth ? new Date(realtorInfo.dateOfBirth).toISOString().split("T")[0] : "");
            setValue("address", realtorInfo.address || "");
            setValue("citizenshipId", realtorInfo?.citizenship?.id as number);
            setValue("genderId", realtorInfo?.gender?.id as number);
            setValue("cityId", realtorInfo?.city?.id as number);
        }
    }, [realtorInfo, setValue]);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = Number(e.target.value);
        setSelectedCountryId(countryId);
        setValue("cityId", countryId);
    };

    const handleCitizenshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const citizenshipId = Number(e.target.value);
        setSelectedCitizenshipId(citizenshipId);
        setValue("citizenshipId", citizenshipId);
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genderId = Number(e.target.value);
        setSelectedGenderId(genderId);
        setValue("genderId", genderId);
    };

    const onSubmit = async (data: UpdateRealtorInformationSchemaType) => {
        try {
            await updateRealtorsInformation(data).unwrap();
            showToast(`Данні успішно оновлено!`, "success");
        } catch (error) {
            showToast(`Помилка при оновленні данних!`, "error");
        }
    };

    if (!user) { return null; }
    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) return showToast("Помилка завантаження даних", "error");

    return (
        <div className="data-content">
            <p className="global-title">Особисті дані</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="data">
                    <div className="info">
                        {realtorInfo && (
                            <>
                                <p className="name">{realtorInfo.fullName}</p>
                                <p className="email">{realtorInfo.email}</p>
                            </>
                        )}
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
                                max="9999-12-31"
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
                                value={selectedCitizenshipId || ""}
                                onChange={handleCitizenshipChange}
                            >
                                <option disabled value="">
                                    Виберіть громадянство
                                </option>
                                {citizenshipsData?.map((citizenship) => (
                                    <option key={citizenship.id} value={citizenship.id}>
                                        {citizenship.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.citizenshipId && (
                                <FormError className="text-red"
                                           errorMessage={errors?.citizenshipId?.message as string} />
                            )}

                        </div>

                        <div className="containers1">
                            <p>Стать</p>
                            <select
                                {...register("genderId")}
                                value={selectedGenderId || ""}
                                onChange={handleGenderChange}
                            >
                                <option disabled value="">
                                    Виберіть стать
                                </option>
                                {gendersData?.map((gender) => (
                                    <option key={gender.id} value={gender.id}>
                                        {gender.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.genderId && (
                                <FormError className="text-red" errorMessage={errors?.genderId?.message as string} />
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
                            {errors?.address && (
                                <FormError className="text-red" errorMessage={errors?.address?.message as string} />
                            )}
                        </div>

                        <div className="containers2">
                            <div className="container11">
                                <div>
                                    <p>Країна</p>
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
                                        {filteredCities.map((city: City) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.cityId && (
                                        <FormError
                                            className="text-red"
                                            errorMessage={errors?.cityId?.message as string}
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
};

export default DataPage;
