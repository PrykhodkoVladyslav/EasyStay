import { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "store/slice/userSlice.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import { useGetCustomersInformationQuery, useUpdateCustomersInformationMutation } from "services/user.ts";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useGetAllCountriesQuery } from "services/country.ts";
import { useGetAllCitizenshipsQuery } from "services/citizenship.ts";
import { useGetAllGendersQuery } from "services/gender.ts";
import { UpdateCustomerInformationSchema, UpdateCustomerInformationSchemaType } from "interfaces/zod/user.ts";
import { City } from "interfaces/city";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import FormError from "components/ui/FormError.tsx";
import showToast from "utils/toastShow.ts";

const DataPage = () => {
    useEffect(instantScrollToTop, []);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage("personal-data");
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<UpdateCustomerInformationSchemaType>({
        resolver: zodResolver(UpdateCustomerInformationSchema),
    });

    const user = useSelector(getUser);
    const { data: customerInfo, error, isLoading } = useGetCustomersInformationQuery();
    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: countriesData } = useGetAllCountriesQuery();
    const { data: citizenshipsData } = useGetAllCitizenshipsQuery();
    const { data: gendersData } = useGetAllGendersQuery();
    const [updateCustomersInformation] = useUpdateCustomersInformationMutation();

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
        if (customerInfo) {
            setSelectedCountryId(customerInfo?.country?.id);
            setSelectedCitizenshipId(customerInfo?.citizenship?.id);
            setSelectedGenderId(customerInfo?.gender?.id);
            setValue("phoneNumber", customerInfo.phoneNumber || "");
            setValue("dateOfBirth", customerInfo?.dateOfBirth ? new Date(customerInfo.dateOfBirth).toISOString().split("T")[0] : "");
            setValue("address", customerInfo.address || "");
            setValue("citizenshipId", customerInfo?.citizenship?.id as number);
            setValue("genderId", customerInfo?.gender?.id as number);
            setValue("cityId", customerInfo?.city?.id as number);
        }
    }, [customerInfo, setValue]);

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

    const onSubmit = async (data: UpdateCustomerInformationSchemaType) => {
        try {
            await updateCustomersInformation(data).unwrap();
            showToast(`Данні успішно оновлено!`, "success");
        } catch (error) {
            showToast(`Помилка при оновленні данних!`, "error");
        }
    };

    if (!user) {
        return null;
    }
    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="data-container">
            <p className="global-title">Особисті дані</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="data">
                    <div className="info">
                        {customerInfo && (
                            <>
                                <p className="name">{customerInfo.fullName}</p>
                                <p className="email">{customerInfo.email}</p>
                            </>
                        )}
                    </div>

                    <div className="container10">
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
