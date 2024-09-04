import { Input } from "components/ui/Input.tsx";
import { User } from "interfaces/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";
import showToast from "utils/toastShow.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchemaType, RegistrationSchema } from "interfaces/zod/user.ts";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Label from "components/ui/Label.tsx";
import ImageUpload from "components/ImageUpload.tsx";
import FormError from "components/ui/FormError.tsx";
import TextInput from "components/ui/design/TextInput.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import SignInRegisterButton from "components/ui/design/SignInRegisterButton.tsx";

const RegisterPage: React.FC = () => {
    const showCross = true;

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [registerUser, { isLoading }] = useRegistrationMutation();
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegistrationSchemaType>({
        resolver: zodResolver(RegistrationSchema),
    });

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

    const onSubmit = async (data: RegistrationSchemaType) => {
        try {
            const res = await registerUser(data).unwrap();
            if (res.token === null) {
                showToast(`Помилка реєстрації`, "error");
                return;
            }
            setUser(res.token);
            showToast(`Реєстрація успішна!`, "success");
        } catch (error) {
            showToast(`Помилка реєстраціі. Перевірте ваші дані!`, "error");
        }
    };

    const setUser = (token: string) => {
        localStorage.setItem("authToken", token);
        dispatch(
            setCredentials({
                user: jwtParser(token) as User,
                token: token,
            }),
        );
        const { from } = location.state || { from: { pathname: "/admin" } };
        navigate(from);
        // navigate("/");
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                id="firstName"
                title="Ім'я"
                type="text"
                placeholder="Введіть ім'я"
                isError={Boolean(errors.firstName)}
                errorMessage={errors?.firstName?.message}
                showCross={showCross}
                formRegisterReturn={register("firstName")}
            />

            <VerticalPad heightPx={4} />

            <TextInput
                id="lastName"
                title="Прізвище"
                type="text"
                placeholder="Введіть прізвище"
                isError={Boolean(errors.lastName)}
                errorMessage={errors?.lastName?.message}
                showCross={showCross}
                formRegisterReturn={register("lastName")}
            />

            <VerticalPad heightPx={4} />

            <div>
                <Label>Фото:</Label>
                <ImageUpload setFiles={setFiles} remove={removeImage} files={files}>
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
                    <FormError className="text-red" errorMessage={errors?.image?.message as string} />
                )}
            </div>

            <TextInput
                id="email"
                title="Пошта"
                type="text"
                placeholder="Введіть свою електронну пошту"
                isError={Boolean(errors.email)}
                errorMessage={errors?.email?.message}
                showCross={showCross}
                formRegisterReturn={register("email")}
            />

            <VerticalPad heightPx={4} />

            <TextInput
                id="username"
                title="Логін"
                type="text"
                placeholder="Введіть логін"
                isError={Boolean(errors.username)}
                errorMessage={errors?.username?.message}
                showCross={showCross}
                formRegisterReturn={register("username")}
            />

            <VerticalPad heightPx={4} />

            <TextInput
                id="password"
                title="Пароль"
                type="password"
                placeholder="Введіть пароль"
                isError={Boolean(errors.password)}
                errorMessage={errors?.password?.message}
                showCross={showCross}
                formRegisterReturn={register("password")}
            />

            <div>
                <label className="mb-1 text-sm block font-semibold">Тип користувача</label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            {...register("type")}
                            type="radio"
                            defaultChecked={true}
                            value="Customer"
                            className="mr-2"
                        />
                        Користувач
                    </label>
                    <label className="flex items-center">
                        <input
                            {...register("type")}
                            type="radio"
                            value="Realtor"
                            className="mr-2"
                        />
                        Ріелтор
                    </label>
                </div>
                {errors.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                )}
            </div>

            <VerticalPad heightPx={10} />

            <SignInRegisterButton disabled={isLoading} text="Зареєструватись" />

            <VerticalPad heightPx={8} />

            <p className="login-register-offer">У вас вже є аканту? <a
                className="login-register-offer-link" href="/auth/login">Увійти</a></p>
        </form>
    );
};

export default RegisterPage;
