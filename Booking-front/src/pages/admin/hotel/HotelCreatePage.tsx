import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { HotelCreateSchema, HotelCreateSchemaType } from "interfaces/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useAddHotelMutation } from "services/hotel.ts";
import { useGetAllHotelCategoriesQuery } from "services/hotelCategories.ts";
import showToast from "utils/toastShow.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";
// import {hotelCategoriesApi} from "../services/hotelCategories";

const HotelCreatePage: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<HotelCreateSchemaType>({ resolver: zodResolver(HotelCreateSchema) });

    const navigate = useNavigate();
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const [create, { isLoading }] = useAddHotelMutation();

    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: hotelCategoriesData } = useGetAllHotelCategoriesQuery();

    const sortedCities = citiesData ? [...citiesData].sort((a, b) => a.name.localeCompare(b.name)) : [];
    const selectedCityId = watch("address.cityId");

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            inputRef.current.files = dataTransfer.files;
        }
        setValue("photos", inputRef.current?.files as any);
    }, [files, setValue]);

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        if (selectedCityId) {
            const selectedCity = citiesData?.find((city) => city.id === parseInt(selectedCityId));
            if (selectedCity) {
                const minLatitude = selectedCity.latitude - 0.3;
                const maxLatitude = selectedCity.latitude + 0.3;
                const minLongitude = selectedCity.longitude - 0.3;
                const maxLongitude = selectedCity.longitude + 0.3;

                setValue("address.latitude", selectedCity.latitude.toString());
                setValue("address.longitude", selectedCity.longitude.toString());

                const latitudeInput = document.getElementById("latitude");
                const longitudeInput = document.getElementById("longitude");

                if (latitudeInput) {
                    latitudeInput.setAttribute("min", minLatitude.toString());
                    latitudeInput.setAttribute("max", maxLatitude.toString());
                }
                if (longitudeInput) {
                    longitudeInput.setAttribute("min", minLongitude.toString());
                    longitudeInput.setAttribute("max", maxLongitude.toString());
                }
            }
        }
    }, [selectedCityId, citiesData, setValue]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;

        if (file) {
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                for (let i = 0; i < file.length; i++) {
                    const validImageTypes = ["image/gif", "image/jpeg", "image/webp", "image/png"];
                    if (validImageTypes.includes(file[i].type)) {
                        const isDuplicate = updatedFiles.some(
                            (existingFile) => existingFile.name === file[i].name,
                        );
                        if (!isDuplicate) {
                            updatedFiles.push(file[i]);
                        }
                    }
                }
                return updatedFiles;
            });
        }
    };

    const removeImage = (file: string) => {
        setFiles(files.filter((x: File) => x.name !== file));
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log("Данні: ", data);
            await create({
                ...data,
                photos: data.photos as File[],
                cityId: Number(data.address.cityId),
            }).unwrap();

            const cityId = data.address.cityId;
            const cityName = citiesData?.find((c) => c.id === Number(cityId))?.name;
            showToast(`Успішно створено новий готель!`, "success");

            navigate(`/search-results?cityId=${data.address.cityId}&destination=${cityName}`);
        } catch (err) {
            showToast(`Помилка при створенні нового готелю!`, "error");
        }
    });

    const onReset = () => {
        reset();
    };

    return (
        <div className="container mx-auto flex justify-center mt-5">
            <div className="w-full ">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Add New Hotel</h1>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div>
                        <Label htmlFor="name">Назва:</Label>

                        <Input {...register("name")} id="name" placeholder="Name..." className="w-full"/>
                        {errors?.name && (
                            <FormError className="text-red" errorMessage={errors?.name?.message as string}/>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="categoryId">Категорія готелю:</Label>
                        <select
                            {...register("categoryId", {required: "Category is required"})}
                            id="categoryId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm "
                        >
                            <option disabled value="">
                                Select Category
                            </option>
                            {hotelCategoriesData?.map((hotelCategory) => (
                                <option key={hotelCategory.id} value={hotelCategory.id}>
                                    {hotelCategory.name}
                                </option>
                            ))}
                        </select>
                        {errors?.categoryId && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.categoryId?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Опис:</Label>

                        <textarea
                            {...register("description")}
                            id="description"
                            placeholder="Description..."
                            className="p-3 border-gray-300 font-normal w-full text-sm placeholder:text-lightgray h-full rounded-md outline-none border"
                        />
                        {errors?.description && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.description?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="area">Площа:</Label>

                        <Input
                            {...register("area")}
                            id="area"
                            type="number"
                            // step={0.01}
                            placeholder="Area..."
                            className="w-full"
                        />
                        {errors?.area && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.area?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="numberOfRooms">Кількість кімнат:</Label>

                        <Input
                            {...register("numberOfRooms")}
                            id="numberOfRooms"
                            type="number"
                            // step={1}
                            placeholder="Number of rooms..."
                            className="w-full"
                        />
                        {errors?.numberOfRooms && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.numberOfRooms?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="address.street">Вулиця:</Label>

                        <Input
                            {...register("address.street")}
                            id="address.street"
                            placeholder="Street..."
                            className="w-full"
                        />
                        {errors?.address?.street && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.street?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="address.houseNumber">№ будинку:</Label>

                        <Input
                            {...register("address.houseNumber")}
                            id="address.houseNumber"
                            placeholder="House Number..."
                            className="w-full"
                        />
                        {errors?.address?.houseNumber && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.houseNumber?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="cityId">Місто:</Label>

                        <select
                            {...register("address.cityId", {required: "City is required"})}
                            id="cityId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm"
                        >
                            <option disabled value="">
                                Select city
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

                    <div>
                        <Label htmlFor="latitude">Широта:</Label>

                        <Input
                            {...register("address.latitude")}
                            id="latitude"
                            type="number"
                            // step={0.0001}
                            placeholder="Latitude..."
                            className="w-full"
                        />
                        {errors?.address?.latitude && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.latitude?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="longitude">Довгота:</Label>

                        <Input
                            {...register("address.longitude")}
                            id="longitude"
                            type="number"
                            // step={0.0001}
                            placeholder="Longitude..."
                            className="w-full"
                        />
                        {errors?.address?.longitude && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address?.longitude?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label>Фото:</Label>

                        <ImageUpload setFiles={setFiles} remove={removeImage} files={files}>
                            <Input
                                {...register("photos")}
                                onChange={handleFileChange}
                                multiple
                                ref={inputRef}
                                id="photos"
                                type="file"
                                className="w-full"
                            />
                        </ImageUpload>
                        {errors?.photos && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.photos?.message as string}
                            />
                        )}
                    </div>

                    {/*<div>*/}
                    {/*    <Label htmlFor="realtorId">ID Реєстратора:</Label>*/}

                    {/*    <input*/}
                    {/*        {...register("realtorId")}*/}
                    {/*        id="realtorId"*/}
                    {/*        type="number"*/}
                    {/*        placeholder="RealtorID..."*/}
                    {/*        className="w-full"*/}
                    {/*    />*/}
                    {/*    {errors?.realtorId && (*/}
                    {/*        <FormError*/}
                    {/*            className="text-red"*/}
                    {/*            errorMessage={errors?.realtorId?.message as string}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    <div className=" flex w-full items-center justify-center gap-5">
                        {/*<div className=" text-white flex w-full items-center justify-center gap-5">*/}
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="submit"
                            className="hover:bg-sky/70 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <IconCirclePlus/>
                            Create
                        </Button>
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="button"
                            onClick={onReset}
                            className="hover:bg-sky/70 disabled:cursor-not-allowed"
                        >
                            <IconCircleX/>
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HotelCreatePage;
