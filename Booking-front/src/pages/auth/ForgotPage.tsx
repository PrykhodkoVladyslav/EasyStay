import TextInput from "components/ui/design/TextInput.tsx";
import React, { useEffect } from "react";
import SignInRegisterButton from "components/ui/design/SignInRegisterButton.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { useForm } from "react-hook-form";
import {
    ForgotPasswordSchema,
    ForgotPasswordSchemaType,
} from "interfaces/zod/user.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import IValidationError from "interfaces/error/IValidationError.ts";
import { useSendResetPasswordEmailMutation } from "services/user.ts";
import { useNavigate } from "react-router-dom";
import { instantScrollToTop } from "utils/scrollToTop.ts";

const ForgotPage = () => {
    useEffect(instantScrollToTop, []);

    const navigate = useNavigate();
    const [emailError, setEmailError] = React.useState("");

    const [sendResetPasswordEmail, { isLoading }] = useSendResetPasswordEmailMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordSchemaType>({
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const lowerCaseEquals = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

    const onSubmit = async (data: ForgotPasswordSchemaType) => {
        setEmailError("");

        try {
            await sendResetPasswordEmail(data).unwrap();
            navigate("/auth/success-send");
        } catch (error) {
            const validationError = error as IValidationError;
            validationError.data.forEach(e => {
                if (lowerCaseEquals(e.PropertyName.toLowerCase(), "email")) {
                    setEmailError(e.ErrorMessage);
                }
            });
        }
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                id="email"
                title="Пошта"
                type="email"
                placeholder="Введіть свою електронну пошту"
                isError={Boolean(errors.email || emailError)}
                errorMessage={errors?.email?.message || emailError}
                showCross={true}
                formRegisterReturn={register("email")} />

            <VerticalPad heightPx={10} />

            <SignInRegisterButton
                disabled={isLoading}
                text="Надіслати email" />

            <VerticalPad heightPx={8} />

            <p className="login-register-offer">Пригадали пароль?
                <a className="login-register-offer-link pointer"
                   onClick={() => navigate("/auth/login")}>Увійти</a></p>
        </form>
    );
};

export default ForgotPage;