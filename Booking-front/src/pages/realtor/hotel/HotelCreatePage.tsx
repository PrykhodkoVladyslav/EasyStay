import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { HotelCreateSchema, HotelCreateSchemaType } from "interfaces/zod/hotel.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useAddHotelMutation } from "services/hotel.ts";
import { useGetAllHotelCategoriesQuery } from "services/hotelCategories.ts";
import showToast from "utils/toastShow.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const HotelCreatePage: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<HotelCreateSchemaType>({
        resolver: zodResolver(HotelCreateSchema),
    });

    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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
                setValue("address.latitude", selectedCity.latitude.toString().replace('.', ','));
                setValue("address.longitude", selectedCity.longitude.toString().replace('.', ','));
            }
        }
    }, [selectedCityId, citiesData, setValue]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (fileList) {
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                Array.from(fileList).forEach((file) => {
                    const validImageTypes = ["image/gif", "image/jpeg", "image/webp", "image/png"];
                    if (validImageTypes.includes(file.type) && !updatedFiles.some((existingFile) => existingFile.name === file.name)) {
                        updatedFiles.push(file);
                    }
                });
                return updatedFiles;
            });
        }
    };

    const removeImage = (file: string) => {
        setFiles(files.filter((x: File) => x.name !== file));
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            await create({
                ...data,
                photos: data.photos as File[],
                cityId: Number(data.address.cityId),
            }).unwrap();

            showToast(`Успішно створено новий готель!`, "success");
            onReset();
        } catch (err) {
            showToast(`Помилка при створенні нового готелю!`, "error");
        }
    });

    const onReset = () => {
        reset();
        setFiles([]);
    };

    return (
        <div className="container mx-auto flex justify-center mt-5 max-w-4xl mx-auto">
            <div className="w-full">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Створення Готелю</h1>
                {/*<div className="flex justify-end mb-4">*/}
                {/*    <Button onClick={() => navigate("/realtor/hotels/list")} className="border">*/}
                {/*        Список Готелів*/}
                {/*    </Button>*/}
                {/*</div>*/}
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div>
                        <Label htmlFor="name">Назва:</Label>

                        <Input
                            {...register("name")}
                            id="name"
                            placeholder="Назва..."
                            className="w-full"
                        />
                        {errors?.name && (
                            <FormError className="text-red" errorMessage={errors?.name?.message as string}/>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="categoryId">Категорія готелю:</Label>
                        <select
                            {...register("categoryId", {required: "Категорія обов'язкова"})}
                            id="categoryId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm "
                        >
                            <option disabled value="">
                                Виберіть категорію
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
                            placeholder="Опис..."
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
                            placeholder="Площа..."
                            className="w-full"
                            onWheel={(e) => e.currentTarget.blur()}
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
                            placeholder="Кількість кімнат..."
                            className="w-full"
                            onWheel={(e) => e.currentTarget.blur()}
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
                            placeholder="Вулиця..."
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
                        <Label htmlFor="address.houseNumber">Номер будинку:</Label>

                        <Input
                            {...register("address.houseNumber")}
                            id="address.houseNumber"
                            placeholder="№..."
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
                            {...register("address.cityId", {required: "Місто обов'язкове"})}
                            id="cityId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm"
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

                    <div>
                        <Label htmlFor="latitude">Широта:</Label>

                        <Input
                            {...register("address.latitude")}
                            id="latitude"
                            type="double"
                            placeholder="Широта..."
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
                            type="double"
                            placeholder="Довгота..."
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
                        <Label>Архівувати готель:</Label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    {...register("isArchived")}
                                    type="radio"
                                    value="true"
                                    className="mr-2"
                                />
                                Так
                            </label>
                            <label className="flex items-center">
                                <input
                                    {...register("isArchived")}
                                    type="radio"
                                    value="false"
                                    className="mr-2"
                                />
                                Ні
                            </label>
                        </div>
                        {errors?.isArchived && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.isArchived?.message as string}
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

                    <div className=" flex w-full items-center justify-center gap-5">
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="submit"
                            className="hover:bg-sky/70 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <IconCirclePlus/>
                            Створити
                        </Button>
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="button"
                            onClick={onReset}
                            className="hover:bg-sky/70 disabled:cursor-not-allowed"
                        >
                            <IconCircleX/>
                            Скинути
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HotelCreatePage;
