import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import { HotelCreateSchema, HotelCreateSchemaType } from "interfaces/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useAddHotelMutation } from "services/hotel.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {useGetAllHotelTypesQuery} from "services/hotelTypes.ts";

const HotelCreatePage = () => {
    const { data: cities } = useGetAllCitiesQuery();
    const {data: hotelTypes } = useGetAllHotelTypesQuery();
    const [files, setFiles] = useState<File[]>([]);
    const [create, { isLoading }] = useAddHotelMutation();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<HotelCreateSchemaType>({ resolver: zodResolver(HotelCreateSchema) });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            inputRef.current.files = dataTransfer.files;
        }
        setValue("photos", inputRef.current?.files);
    }, [files, setValue]);

    useEffect(() => {
        reset();
    }, [open, reset]);

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
        console.log(data);
        // if (!data.photos?.length) {
        //     setError("photos", {
        //         type: "required",
        //         message: "Hotel images is required!",
        //     });
        //     return;
        // // }
        try {
            await create({ ...data, photos: files, cityId: Number(data.address.cityId) }).unwrap();

            navigate(`/search-results?cityId=${data.address.cityId}`);
        } catch (err) {
            console.log("Error created hotel: ", err);
        }
    });

    const onReset = () => {
        reset();
    };
    const sortedCities = cities ? [...cities].sort((a, b) => a.name.localeCompare(b.name)) : [];
    return (
        <div className="container mx-auto flex justify-center mt-5">
            <div className="w-full p-5">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Add New Hotel</h1>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div>
                        <label className="text-white text-xl font-main" htmlFor="name">
                            Name
                        </label>
                        <Input {...register("name")} id="name" placeholder="Name..." className="w-full" />
                        {errors?.name && (
                            <FormError className="text-red" errorMessage={errors?.name?.message as string} />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="typeId">
                            Type Hotel
                        </label>
                        <select
                            {...register("typeId", { required: "Type is required" })}
                            id="typeId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm "
                        >
                            <option disabled value="">
                                Select type
                            </option>
                            {hotelTypes?.map((hotelType) => (
                                <option key={hotelType.id} value={hotelType.id}>
                                    {hotelType.name}
                                </option>
                            ))}
                        </select>
                        {errors?.typeId && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.typeId?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="description">
                            Description
                        </label>
                        <Input
                            {...register("description")}
                            id="description"
                            placeholder="Description..."
                            className="w-full"
                        />
                        {errors?.description && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.description?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="street">
                            Street
                        </label>
                        <Input
                            {...register("address.street")}
                            id="address.street"
                            placeholder="Street..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address.street?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="houseNumber">
                            House Number
                        </label>
                        <Input
                            {...register("address.houseNumber")}
                            id="address.houseNumber"
                            placeholder="House Number..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address.houseNumber?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="cityId">
                            City
                        </label>
                        <select
                            {...register("address.cityId", { required: "City is required" })}
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
                        {errors?.address && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address.cityId?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="latitude">
                            Latitude
                        </label>
                        <Input
                            {...register("address.latitude")}
                            id="latitude"
                            type="number"
                            min={-90.0000000000000000}
                            step={0.0000000000000001}
                            placeholder="Latitude..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address.latitude?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-white text-xl font-main" htmlFor="longitude">
                            Longitude
                        </label>
                        <Input
                            {...register("address.longitude")}
                            id="longitude"
                            type="number"
                            min={-180.0000000000000000}
                            step={0.0000000000000001}
                            placeholder="Longitude..."
                            className="w-full"
                        />
                        {errors?.address && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.address.longitude?.message as string}
                            />
                        )}
                    </div>



                    <div>
                        <label className="text-white text-xl font-main" htmlFor="photos">
                            Images
                        </label>
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

                    <div className=" text-white flex w-full items-center justify-center gap-5">
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="submit"
                            className="hover:bg-sky/70 disabled:cursor-not-allowed"
                        >
                            <IconCirclePlus />
                            Create
                        </Button>
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="button"
                            onClick={onReset}
                            className="hover:bg-sky/70 disabled:cursor-not-allowed"
                        >
                            <IconCircleX />
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HotelCreatePage;
