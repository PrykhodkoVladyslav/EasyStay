import { useEffect } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";

const SuccessSendPage = () => {
    useEffect(instantScrollToTop, []);

    return (
        <p>Лист успішно відправлено. Перейдіть по вкладеному посиланню, щоб відновити пароль. Якщо лист не надійшов,
            переконайтесь, що правильно ввели email.</p>
    );
};

export default SuccessSendPage;