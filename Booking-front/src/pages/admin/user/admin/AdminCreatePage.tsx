import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import FormError from "components/ui/FormError.tsx";
import { useCreateAdminMutation } from "services/user.ts";
import showToast from "utils/toastShow.ts";
import { useForm } from "react-hook-form";
import { CreateAdminSchemaType, CreateAdminSchema } from "interfaces/zod/user.ts";

const AdminCreatePage: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateAdminSchemaType>({
        resolver: zodResolver(CreateAdminSchema),
    });

    const [createAdmin, { isLoading }] = useCreateAdminMutation();

    const handleCreateAdmin = async (data: CreateAdminSchemaType) => {
        if (confirm("Ви впевнені, що хочете створити нового адміна?")) {
            try {
                await createAdmin(data).unwrap();
                showToast(`Реєстрація успішна!`, "success");
                reset();
            } catch (err) {
                showToast(`Помилка створення адміна. Перевірте дані!`, "error");
            }
        }
    };

    // TODO: (під питанням) додати повідомлення про помилки
    // const errorMessagesMap: { [key: string]: string } = {
    //     "There is already a user with this email": "Користувач з такою електронною поштою вже існує",
    //     "There is already a user with this username": "Користувач з таким ім'ям користувача вже існує",
    // };
    //
    // const handleCreateAdmin = async (data: CreateAdminSchemaType) => {
    //     if (confirm("Ви впевнені, що хочете створити нового адміна?")) {
    //         try {
    //             await createAdmin(data).unwrap();
    //             showToast(`Реєстрація успішна!`, "success");
    //             reset();
    //         } catch (err) {
    //             if (err.data && Array.isArray(err.data) && err.data.length > 0) {
    //                 const firstError = err.data[0];
    //                 const translatedMessage = errorMessagesMap[firstError.ErrorMessage] || firstError.ErrorMessage;
    //                 showToast(translatedMessage, "error");
    //             } else {
    //                 showToast("Помилка створення адміна. Перевірте дані!", "error");
    //             }
    //         }
    //     }
    // };

    const onReset = () => {
        reset();
    };

    return (
        <div className="container mx-auto flex justify-center mt-5 max-w-4xl mx-auto">
            <div className="bg-white rounded w-full max-w-md font-main">
                <h1 className="text-1xl text-center font-main mb-6 font-extrabold">Створення нового Адміна</h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateAdmin)}>
                    {[
                        { id: "firstName", label: "Ім'я", type: "text", placeholder: "Введіть ім'я" },
                        { id: "lastName", label: "Прізвище", type: "text", placeholder: "Введіть прізвище" },
                        {
                            id: "email",
                            label: "Електронна пошта",
                            type: "email",
                            placeholder: "Введіть електронну адресу",
                        },
                        {
                            id: "username",
                            label: "Ім'я користувача",
                            type: "text",
                            placeholder: "Введіть ім'я користувача",
                        },
                        { id: "password", label: "Пароль", type: "password", placeholder: "Введіть пароль" },
                    ].map(({ id, label, type, placeholder }) => (
                        <div key={id}>
                            <Label htmlFor={id} className="mb-1 text-sm block font-semibold">{label}</Label>
                            <Input
                                {...register(id as "email" | "firstName" | "lastName" | "password" | "username")}
                                id={id}
                                type={type}
                                placeholder={placeholder}
                            />
                            {errors[id as keyof typeof errors] && (
                                <FormError
                                    className="text-red"
                                    errorMessage={errors[id as keyof typeof errors]?.message || ""}
                                />
                            )}
                            {/*{errors[id] && <FormError className="text-red" errorMessage={errors[id].message} />}*/}
                        </div>
                    ))}

                    <div className=" flex w-full items-center justify-center gap-5">
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="submit"
                            className="hover:bg-sky/70 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <IconCirclePlus />
                            Зареєструвати
                        </Button>
                        <Button
                            disabled={isLoading}
                            size="lg"
                            type="button"
                            onClick={onReset}
                            className="hover:bg-sky/70 disabled:cursor-not-allowed"
                        >
                            <IconCircleX />
                            Скинути
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCreatePage;
