import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import ImageUpload from "components/ImageUpload.tsx";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { CountryCreateSchema, CountryCreateSchemaType } from "interfaces/zod/country.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddCountryMutation } from "services/country.ts";
import showToast from "utils/toastShow.ts";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const CountryCreatePage: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CountryCreateSchemaType>({ resolver: zodResolver(CountryCreateSchema) });

    // const [files, setFiles] = useState<(File | string)[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const [create, { isLoading }] = useAddCountryMutation();

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
                        const isDuplicate = updatedFiles.some(
                            (existingFile) => existingFile.name === file[i].name,
                        );
                        if (!isDuplicate) {
                            updatedFiles.push(file[i]);
                        }
                    }
                }
                return updatedFiles.slice(0, 1);
            });
        }
    };

    const removeImage = (file: File) => {
        setFiles(files.filter((x: File) => x.name !== file.name));
    };

    // const removeImage = (file: string) => {
    //     setFiles(files.filter((x: File) => x.name !== file));
    // };

    const onSubmit = handleSubmit(async (data) => {
        try {
            // console.log("Data: ", data);

            if (files.length === 0) {
                showToast(`Будь ласка, завантажте файл зображення.`, "error");
                return;
            }

            await create({
                name: data.name,
                image: files[0],
            }).unwrap();

            // await create({
            //     name: data.name,
            //     image: files[0],
            // }).unwrap();

            showToast(`Успішно створено нову країну!`, "success");
            onReset();
        } catch (err) {
            showToast(`Помилка при створенні нової країни!`, "error");
        }
    });

    const onReset = () => {
        reset();
        setFiles([]);
    };

    return (
        <div className="container mx-auto flex justify-center mt-5 max-w-4xl mx-auto">
            <div className="w-full ">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Створення Країни</h1>
                <div className="flex justify-end mb-4">
                    <Button onClick={() => navigate("/admin/countries/list")} className="border">
                        Список Країн
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
                        {errors?.image && (
                            <FormError
                                className="text-red"
                                errorMessage={errors?.image?.message as string}
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

export default CountryCreatePage;
