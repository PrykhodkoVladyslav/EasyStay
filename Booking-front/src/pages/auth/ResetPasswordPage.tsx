import { useState } from "react";
import { useResetPasswordMutation } from "services/user.ts";
import { useForm } from "react-hook-form";
import {
    ResetPasswordSchema,
    ResetPasswordSchemaType,
} from "interfaces/zod/user.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "components/ui/design/TextInput.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import SignInRegisterButton from "components/ui/design/SignInRegisterButton.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [searchParams] = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordSchemaType) => {
        try {
            await resetPassword({
                email: searchParams.get("email") ?? "",
                token: atob(searchParams.get("token") ?? ""),
                newPassword: data.password,
            }).unwrap();

            setMessage("Пароль успішно відновлено.");
        } catch (error) {
            setMessage("Невідома помилка.");
        }
    };

    return (
        <>
            {message
                ? <>
                    <p>{message}</p>

                    <VerticalPad heightPx={10} />

                    <a className="login-register-offer-link pointer"
                       onClick={() => navigate("/auth/login")}>На сторінку входу</a>
                </>
                : <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        id="password"
                        title="Новий пароль"
                        type="password"
                        placeholder="Введіть новий пароль"
                        isError={Boolean(errors.password)}
                        errorMessage={errors?.password?.message}
                        showCross={true}
                        formRegisterReturn={register("password")} />

                    <VerticalPad heightPx={10} />

                    <SignInRegisterButton
                        disabled={isLoading}
                        text="Відновити пароль" />
                </form>}
        </>
    );
};

export default ResetPasswordPage;