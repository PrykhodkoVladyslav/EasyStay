import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { CityEditSchema, CityEditSchemaType } from "interfaces/zod/city.ts";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCityQuery, useUpdateCityMutation } from "services/city.ts";
import { useGetAllCountriesQuery } from "services/country.ts";
import showToast from "utils/toastShow.ts";
import ImageUpload from "components/ImageUpload.tsx";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const CityEditPage: React.FC = () => {
    const { id } = useParams();
    const { data: cityData, refetch } = useGetCityQuery(Number(id));
    const { data: countriesData } = useGetAllCountriesQuery();
    const [updateCity, { isLoading }] = useUpdateCityMutation();

    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CityEditSchemaType>({
        resolver: zodResolver(CityEditSchema),
    });

    useEffect(() => {
        if (cityData) {
            setValue("name", cityData.name || '');
            setValue("latitude", cityData.latitude .toString().replace('.', ','));
            setValue("longitude", cityData.longitude.toString().replace('.', ','));
            setValue("countryId", cityData.country.id.toString() || '');

        }
    }, [cityData, setValue]);

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            inputRef.current.files = dataTransfer.files;
        }
        setValue("image", inputRef.current?.files as any);
    }, [files, setValue]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;

        if (file) {
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                for (let i = 0; i < file.length; i++) {
                    const validImageTypes = ["image/jpeg", "image/webp", "image/png"];
                    if (validImageTypes.includes(file[i].type)) {
                        updatedFiles[0] = file[i];
                    }
                }
                return updatedFiles.slice(0, 1);
            });
        }
    };

    const removeImage = (file: string) => {
        setFiles([]);
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateCity({
                id: Number(id),
                name: data.name,
                latitude: data.latitude,
                longitude: data.longitude,
                countryId: data.countryId,
                image: files[0],
            }).unwrap();

            showToast(`Місто успішно оновлено!`, "success");
            refetch();
            navigate("/admin/cities/list");
        } catch (err) {
            showToast(`Помилка при оновленні міста!`, "error");
        }
    });

    const onReset = () => {
        reset();
        setFiles([]);
    };

    if (!cityData) return <p>Місто не знайдено</p>;

    return (
        <div className="container mx-auto flex justify-center mt-5">
            <div className="w-full">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Редагування Міста</h1>
                <div className="flex justify-end mb-4">
                    <Button onClick={() => navigate("/admin/cities/list")} className="border">
                        Назад назад до списку Міст
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
                        <Label htmlFor="latitude">Широта:</Label>
                        <Input
                            {...register("latitude")}
                            id="latitude"
                            placeholder="Широта..."
                            className="w-full"
                        />
                        {errors?.latitude && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.latitude?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="longitude">Довгота:</Label>
                        <Input
                            {...register("longitude")}
                            id="longitude"
                            placeholder="Довгота..."
                            className="w-full"
                        />
                        {errors?.longitude && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.longitude?.message as string}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="countryId">Країна:</Label>
                        <select
                            {...register("countryId", {required: "Country is required"})}
                            id="countryId"
                            className="w-full text-md border px-3 py-1 rounded-sm"
                        >
                            <option disabled value="">
                                Виберіть країну
                            </option>
                            {countriesData?.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {errors?.countryId && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.countryId?.message as string}
                            />
                        )}
                    </div>

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
                                    {...register("image")}
                                    onChange={handleFileChange}
                                    multiple
                                    ref={inputRef}
                                    id="image"
                                    type="file"
                                    className="w-full"
                                />
                            </ImageUpload>
                        </div>
                        {errors?.image && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.image?.message as string}
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

export default CityEditPage;
