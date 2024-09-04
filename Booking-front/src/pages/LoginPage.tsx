import { Button } from "components/ui/Button.tsx";
import { User } from "interfaces/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";

import React from "react";
import TextInput from "components/ui/design/TextInput.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import getEmptySymbol from "utils/emptySymbol.ts";
import { useSignInMutation } from "services/user.ts";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [error, setError] = React.useState("");

    const [emailLogin, { isLoading: isLoadingEmailLogin }] = useSignInMutation();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await emailLogin({ email, password });

        if (response.error) {
            if ("status" in response.error && response.error.status === 400) {
                setError("Не вірна пошта або пароль");
            } else {
                setError("Невідома помилка");
            }
        } else if (response && response.data) {
            setUser(response.data.token);
            setError("");
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
        <form className="flex flex-col" onSubmit={login}>
            <TextInput
                id="email"
                title="Пошта"
                type="email"
                value={email}
                placeholder="Введіть свою електронну пошту"
                onChange={(e) => setEmail(e.target.value)}
                isError={!!error} />

            <VerticalPad heightPx={4} />

            <TextInput
                id="password"
                title="Пароль"
                type="password"
                value={password}
                placeholder="Введіть пароль"
                onChange={(e) => setPassword(e.target.value)}
                isError={!!error} />

            <p className="login-error-message">{error || getEmptySymbol()}</p>

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
