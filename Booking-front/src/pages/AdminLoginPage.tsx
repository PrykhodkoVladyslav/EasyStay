
// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { User } from "interfaces/user";
import { useLocation, useNavigate } from "react-router-dom";
import {/* useGoogleLoginMutation,*/ useSignInMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";
import showToast from "utils/toastShow.ts";

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignInSchema, SignInSchemaType} from "interfaces/zod/user.ts";

const AdminLoginPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    // const [googleLogin, { isLoading: isLoadingGoogleLogin }] = useGoogleLoginMutation();
    const [signIn, { isLoading: isLoadingEmailLogin }] = useSignInMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) });

    const onSubmit = handleSubmit(async (data: SignInSchemaType) => {
        try {
            const res = await signIn(data).unwrap();
            if (res.token === null) {
                showToast(`Помилка авторизації`, "error");
                return;
            }
                setUser(res.token);
                showToast(`Авторизація успішна!`, "success");
        } catch (error) {
            showToast(`Помилка авторизації. Перевірте ваші дані!`, "error");
        }
    });

    // const authSuccess = async (credentialResponse: CredentialResponse) => {
    //     const res = await googleLogin({
    //         credential: credentialResponse.credential || "",
    //     });
    //
    //     if (res && "data" in res && res.data) {
    //         setUser(res.data.token);
    //         showToast(`Авторизація успішна!`, "success");
    //     } else {
    //         showToast(`Помилка авторизаціі. Перевірте ваші дані!`, "error");
    //     }
    // };

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
        <div className="flex flex-col items-center justify-center ">
            <div className="bg-white p-8 rounded w-full max-w-md font-main">
                {/*<h1 className="text-2xl font-main mb-6 font-extrabold ">Увійдіть або створіть акаунт</h1>*/}
                <h1 className="text-2xl font-main mb-6 font-extrabold text-center">Увійдіть як Адмін</h1>

                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="mb-1 text-sm block font-semibold">
                            Електронна пошта
                        </label>

                        <Input
                            {...register("email")}
                            id={"email"}
                            type="email"
                            placeholder="Введіть свою електронну адресу"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 text-sm block font-semibold">
                            Пароль
                        </label>

                        <Input
                            {...register("password")}
                            type="password"
                            minLength={8}
                            id="password"
                            placeholder="Введіть свій пароль"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        disabled={/*isLoadingGoogleLogin ||*/ isLoadingEmailLogin}
                        type="submit"
                        variant="primary"
                        className="w-full mb-6 disabled:opacity-50"
                    >
                        Ввійти
                    </Button>
                </form>

                {/*<div className="flex items-center mb-6">*/}
                {/*    <div className="flex-grow border-t text-gray/20"></div>*/}
                {/*    <span className="mx-4 text-sm">або вибрати один із цих варіантів</span>*/}
                {/*    <div className="flex-grow border-t text-gray/20"></div>*/}
                {/*</div>*/}

                {/*<div className="flex justify-center items-center">*/}
                {/*    <GoogleLogin*/}
                {/*        useOneTap*/}
                {/*        locale="uk"*/}
                {/*        size="large"*/}
                {/*        onSuccess={authSuccess}*/}
                {/*        onError={authError}*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className="border-t text-gray/20 mt-8"></div>*/}
            </div>
        </div>
    );
};

export default AdminLoginPage;