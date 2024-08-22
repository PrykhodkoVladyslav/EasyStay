import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "components/ui/Button.tsx";
import FormError from "components/ui/FormError.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import ImageUpload from "components/ImageUpload.tsx";
import { useGetAllCountriesQuery, useUpdateCountryMutation } from "services/country.ts";
import { CountryCreateSchema, CountryCreateSchemaType } from "interfaces/zod/country.ts";
import showToast from "utils/toastShow.ts";

const CountryEditPage: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<CountryCreateSchemaType>({
        resolver: zodResolver(CountryCreateSchema),
    });

    const { data: countries = [] } = useGetAllCountriesQuery();
    const [updateCountry, { isLoading }] = useUpdateCountryMutation();
    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (selectedCountryId) {
            const selectedCountry = countries.find(c => c.id === selectedCountryId);
            if (selectedCountry) {
                setValue("name", selectedCountry.name);
                setValue("image", selectedCountry.image);
            }
        }
    }, [selectedCountryId, countries, setValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file) {
            setFiles([file[0]]);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateCountry({
                id: selectedCountryId!,
                name: data.name,
                image: files[0],
            }).unwrap();

            showToast(`Країну успішно оновлено!`, "success");
            reset();
        } catch (err) {
            showToast(`Помилка при оновленні країни!`, "error");
        }
    });

    return (
        <div className="container mx-auto flex justify-center mt-5">
            <div className="w-full">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">Редагування Країни</h1>
                <div>
                    <Label htmlFor="countryId">Країна:</Label>
                    <select
                        id="countryId"
                        className="w-full text-md border px-3 py-1 rounded-sm"
                        onChange={(e) => setSelectedCountryId(Number(e.target.value))}
                        value={selectedCountryId || ""}
                    >
                        <option disabled value="">
                            Виберіть країну
                        </option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCountryId && (
                    <form className="flex flex-col gap-5 mt-5" onSubmit={onSubmit}>
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
                            <ImageUpload setFiles={setFiles} remove={() => setFiles([])} files={files}>
                                <Input
                                    {...register("image")}
                                    onChange={handleFileChange}
                                    ref={inputRef}
                                    id="image"
                                    type="file"
                                    className="w-full"
                                />
                            </ImageUpload>
                            {errors?.image && (
                                <FormError className="text-red" errorMessage={errors?.image?.message as string}/>
                            )}
                        </div>

                        <div className=" flex w-full items-center justify-center gap-5">
                            <Button
                                disabled={isLoading}
                                size="lg"
                                type="submit"
                                className="hover:bg-sky/70 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Оновити
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CountryEditPage;
