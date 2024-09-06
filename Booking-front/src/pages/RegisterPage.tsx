import { User } from "interfaces/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchemaType, RegistrationSchema } from "interfaces/zod/user.ts";

import React from "react";
import TextInput from "components/ui/design/TextInput.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import SignInRegisterButton from "components/ui/design/SignInRegisterButton.tsx";
import IValidationError from "interfaces/error/IValidationError.ts";
import RadiobuttonGroup from "components/ui/design/RadiobuttonGroup.tsx";

const RegisterPage: React.FC = () => {
    const showCross = true;

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [registerUser, { isLoading }] = useRegistrationMutation();

    const [firstNameError, setFirstNameError] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [usernameError, setUsernameError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [typeError, setTypeError] = React.useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationSchemaType>({
        resolver: zodResolver(RegistrationSchema),
    });

    const lowerCaseEquals = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

    const onSubmit = async (data: RegistrationSchemaType) => {
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        setTypeError("");

        try {
            const res = await registerUser(data).unwrap();
            setUser(res.token);
        } catch (error) {
            const validationError = error as IValidationError;
            validationError.data.forEach(e => {
                if (lowerCaseEquals(e.PropertyName.toLowerCase(), "firstName")) {
                    setFirstNameError(e.ErrorMessage);
                } else if (lowerCaseEquals(e.PropertyName.toLowerCase(), "lastName")) {
                    setLastNameError(e.ErrorMessage);
                } else if (lowerCaseEquals(e.PropertyName.toLowerCase(), "email")) {
                    setEmailError(e.ErrorMessage);
                } else if (lowerCaseEquals(e.PropertyName.toLowerCase(), "username")) {
                    setUsernameError(e.ErrorMessage);
                } else if (lowerCaseEquals(e.PropertyName.toLowerCase(), "password")) {
                    setPasswordError(e.ErrorMessage);
                } else if (lowerCaseEquals(e.PropertyName.toLowerCase(), "type")) {
                    setTypeError(e.ErrorMessage);
                }
            });
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
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                id="firstName"
                title="Ім'я"
                type="text"
                placeholder="Введіть ім'я"
                isError={Boolean(errors.firstName || firstNameError)}
                errorMessage={errors?.firstName?.message || firstNameError}
                showCross={showCross}
                formRegisterReturn={register("firstName")}
            />

            <VerticalPad heightPx={4} />

            <TextInput
                id="lastName"
                title="Прізвище"
                type="text"
                placeholder="Введіть прізвище"
                isError={Boolean(errors.lastName || lastNameError)}
                errorMessage={errors?.lastName?.message || lastNameError}
                showCross={showCross}
                formRegisterReturn={register("lastName")}
            />

            <VerticalPad heightPx={4} />

            <TextInput
                id="email"
                title="Пошта"
                type="text"
                placeholder="Введіть свою електронну пошту"
                isError={Boolean(errors.email || emailError)}
                errorMessage={errors?.email?.message || emailError}
                showCross={showCross}
                formRegisterReturn={register("email")}
            />

            <VerticalPad heightPx={4} />

            <TextInput
                id="username"
                title="Логін"
                type="text"
                placeholder="Введіть логін"
                isError={Boolean(errors.username || usernameError)}
                errorMessage={errors?.username?.message || usernameError}
                showCross={showCross}
                formRegisterReturn={register("username")}
            />

            <VerticalPad heightPx={4} />

            <TextInput
                id="password"
                title="Пароль"
                type="password"
                placeholder="Введіть пароль"
                isError={Boolean(errors.password || passwordError)}
                errorMessage={errors?.password?.message || passwordError}
                showCross={showCross}
                formRegisterReturn={register("password")}
            />

            <VerticalPad heightPx={4} />

            <RadiobuttonGroup
                formRegisterReturn={register("type")}
                isError={Boolean(errors.type || typeError)}
                options={[
                    { title: "я клієнт", value: "Customer" },
                    { title: "я рієлтор", value: "Realtor" },
                ]}
            />

            <VerticalPad heightPx={20} />

            <SignInRegisterButton disabled={isLoading} text="Зареєструватись" />

            <VerticalPad heightPx={8} />

            <p className="login-register-offer">У вас вже є аканту? <a
                className="login-register-offer-link" href="/auth/login">Увійти</a></p>
        </form>
    );
};

export default RegisterPage;
