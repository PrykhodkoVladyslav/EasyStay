import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { CountryEditSchema, CountryEditSchemaType } from "interfaces/zod/country.ts";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCountriesQuery, useUpdateCountryMutation } from "services/country.ts";
import showToast from "utils/toastShow.ts";
import { zodResolver } from "@hookform/resolvers/zod";
// import {API_URL} from "utils/getEnvData.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const CountryEditPage: React.FC = () => {
    const { id } = useParams();
    const { data: countriesData, refetch } = useGetAllCountriesQuery();
    const [updateCountry, { isLoading } ] = useUpdateCountryMutation();
    const navigate = useNavigate();

    const country = countriesData?.find(c => c.id === Number(id));

    const [files, setFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CountryEditSchemaType>({
        resolver: zodResolver(CountryEditSchema),
    });

    useEffect(() => {
        if (country) {
            setValue("name", country.name);
            setFiles([]);
            // if (country.image) {
            //     const imageUrl = API_URL + `/images/800_${country.image}`;
            //     setImagePreview(imageUrl);
            //
            //     fetch(imageUrl)
            //         .then((response) => response.blob())
            //         .then((blob) => {
            //             const file = new File([blob], `${country.image}`, { type: blob.type });
            //             setFiles([file]);
            //         });
            // }
        }
    }, [country, setValue]);

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
            await updateCountry({
                id: Number(id),
                name: data.name,
                image: files[0],
            }).unwrap();

            showToast(`Країну успішно оновлено!`, "success");

            refetch();
            navigate("/admin/countries/list");
        } catch (err) {
            showToast(`Помилка при оновленні країни!`, "error");
        }
    });

    const onReset = () => {
        reset();
        setFiles([]);
    };

    if (!country) return <p>Країна не знайдена</p>;

    return (
        <div className="container mx-auto flex justify-center mt-5 max-w-4xl mx-auto">
            <div className="w-full ">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Редагування Країни</h1>
                <div className="flex justify-end mb-4">
                    <Button onClick={() => navigate("/admin/countries/list")} className="border">
                        Назад до списку Країн
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
                        <Label>Фото:</Label>
                        <div className="relative">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Current Preview"
                                    className="h-20 w-20 object-cover mb-2"
                                />
                            )}
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

export default CountryEditPage;
