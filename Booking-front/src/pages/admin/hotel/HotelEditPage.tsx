import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { HotelEditSchema, HotelEditSchemaType } from "interfaces/zod/hotel.ts";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelQuery, useUpdateHotelMutation } from "services/hotel.ts";
import { useGetAllCitiesQuery } from "services/city.ts";
import { useGetAllHotelCategoriesQuery } from "services/hotelCategories.ts";
import showToast from "utils/toastShow.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const HotelEditPage: React.FC = () => {
    const { id } = useParams();
    const { data: hotelData, refetch } = useGetHotelQuery(Number(id));
    const { data: citiesData } = useGetAllCitiesQuery();
    const { data: hotelCategoriesData } = useGetAllHotelCategoriesQuery();
    const [updateHotel, { isLoading }] = useUpdateHotelMutation();

    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<HotelEditSchemaType>({
        resolver: zodResolver(HotelEditSchema),
    });

    useEffect(() => {
        if (hotelData) {
            setValue("name", hotelData.name || '');
            setValue("description", hotelData.description || '');
            setValue("area", hotelData.area.toString().replace('.', ','));
            setValue("numberOfRooms", hotelData.numberOfRooms.toString() || '');
            setValue("address.street", hotelData.address.street || '');
            setValue("address.houseNumber", hotelData.address.houseNumber || '');
            setValue("address.cityId", hotelData.address.city.id.toString() || '');
            setValue("address.latitude", hotelData.address.latitude.toString().replace('.', ','));
            setValue("address.longitude", hotelData.address.longitude.toString().replace('.', ','));
            setValue("categoryId", hotelData.category.id.toString() || '');
            // setFiles([])
        }
    }, [hotelData, setValue]);


    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            inputRef.current.files = dataTransfer.files;
        }
        setValue("photos", inputRef.current?.files as any);
    }, [files, setValue]);

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
            console.log("Data: ", data);
            console.log(id);
            await updateHotel({
                id: Number(id),
                name: data.name,
                description: data.description,
                area: data.area,
                numberOfRooms: Number(data.numberOfRooms),
                address: {
                    street: data.address.street,
                    houseNumber: data.address.houseNumber,
                    latitude: data.address.latitude,
                    longitude: data.address.longitude,
                },
                cityId: Number(data.address.cityId),
                categoryId: Number(data.categoryId),
                photos: data.photos as File[],
            }).unwrap();

            showToast(`Готель успішно оновлено!`, "success");
            refetch();
            navigate("/admin/cities/list");
        } catch (err) {
            showToast(`Помилка при оновленні готелю!`, "error");
        }
    });

    const onReset = () => {
        reset();
        setFiles([]);
    };

    if (!hotelData) return <p>Готель не знайдено</p>;

    return (
        <div className="container mx-auto flex justify-center mt-5">
            <div className="w-full ">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Редагування Готелю</h1>
                <div className="flex justify-end mb-4">
                    <Button onClick={() => navigate("/admin/hotels/list")} className="border">
                        Назад до списку Готелів
                    </Button>
                </div>
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
                            type="double"
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
                        <Label htmlFor="address.cityId">Місто:</Label>

                        <select
                            {...register("address.cityId", {required: "City is required"})}
                            id="address.cityId"
                            defaultValue=""
                            className="w-full text-md border px-3 py-1 rounded-sm"
                        >
                            <option disabled value="">
                                Виберіть місто
                            </option>
                            {citiesData?.map((city) => (
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
                        <Label htmlFor="address.latitude">Широта:</Label>

                        <Input
                            {...register("address.latitude")}
                            id="address.latitude"
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
                        <Label htmlFor="address.longitude">Довгота:</Label>

                        <Input
                            {...register("address.longitude")}
                            id="address.longitude"
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

                    {/*<div>*/}
                    {/*    <Label>Завантажте фото</Label>*/}
                    {/*    <input*/}
                    {/*        type="file"*/}
                    {/*        id="photos"*/}
                    {/*        className="hidden"*/}
                    {/*        multiple*/}
                    {/*        ref={inputRef}*/}
                    {/*        accept="image/*"*/}
                    {/*        {...register("photos")}*/}
                    {/*        onChange={handleFileChange}*/}
                    {/*    />*/}

                    {/*    <div className="flex gap-5 items-center mt-2">*/}
                    {/*        <Button*/}
                    {/*            className="font-medium w-fit text-black bg-brightorange rounded-3xl text-sm py-2.5 px-5"*/}
                    {/*            type="button"*/}
                    {/*            onClick={() => inputRef.current?.click()}*/}
                    {/*        >*/}
                    {/*            Додати фото*/}
                    {/*        </Button>*/}
                    {/*        {files.length > 0 && (*/}
                    {/*            <div className="flex flex-col gap-3 text-left">*/}
                    {/*                {files.map((file) => (*/}
                    {/*                    <div*/}
                    {/*                        className="flex gap-5 items-center text-darkgray"*/}
                    {/*                        key={file.name}*/}
                    {/*                    >*/}
                    {/*                        <span className="text-darkgray text-base">*/}
                    {/*                            {file.name}*/}
                    {/*                        </span>*/}

                    {/*                        <IconCircleX*/}
                    {/*                            size={20}*/}
                    {/*                            className="cursor-pointer"*/}
                    {/*                            onClick={() => removeImage(file.name)}*/}
                    {/*                        />*/}
                    {/*                    </div>*/}
                    {/*                ))}*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div>
                        <Label>Фото:</Label>
                        <div className="relative">
                            {/*{imagePreview && (*/}
                            {/*    <img*/}
                            {/*        src={imagePreview}*/}
                            {/*        alt="Current Preview"*/}
                            {/*        className="h-20 w-20 object-cover mb-2"*/}
                            {/*    />*/}
                            {/*)}*/}
                            <ImageUpload
                                setFiles={setFiles}
                                remove={removeImage}
                                files={files}>
                                <Input
                                    {...register("photos")}
                                    onChange={handleFileChange}
                                    multiple
                                    ref={inputRef}
                                    id="image"
                                    type="file"
                                    className="w-full"
                                />
                            </ImageUpload>
                        </div>
                        {errors?.photos && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.photos?.message as string}
                            />
                        )}
                    </div>

                    <div className="flex w-full items-center justify-center gap-5">
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="submit"
                            className="hover:bg-sky/70 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <IconCirclePlus/>
                            Оновити
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

export default HotelEditPage;
