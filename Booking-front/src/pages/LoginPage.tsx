import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { User } from "interfaces/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";
import showToast from "utils/toastShow.ts";

import React from "react";
import TextInput from "components/ui/design/TextInput.tsx";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [emailLogin, { isLoading: isLoadingEmailLogin }] = useLoginMutation();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await emailLogin({ email, password });

        if (res && res.data) {
            setUser(res.data.token);
            showToast(`Авторизація успішна!`, "success");
            console.log(`Авторизація успішна!`, "success");
            console.log(res.data.token);
        } else {
            showToast(`Помилка авторизаціі. Перевірте ваші дані!`, "error");
        }
    };

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
        <form className="flex flex-col" onSubmit={login}>
            <TextInput
                id="email"
                title="Пошта"
                type="email"
                value={email}
                placeholder="Введіть свою електронну пошту"
                onChange={(e) => setEmail(e.target.value)}
                isError={true}
                errorMessage={"Введіть свою електронну пошту"} />

            <div>
                <label htmlFor="password" className="mb-1 text-sm block font-semibold">
                    Пароль
                </label>

                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    id="password"
                    placeholder="Введіть свій пароль"
                />
            </div>

            <Button
                disabled={isLoadingEmailLogin}
                type="submit"
                className="w-full mb-6 disabled:opacity-50"
            >
                Ввійти
            </Button>
        </form>
    );
};

export default LoginPage;
