import { Input } from "components/ui/Input.tsx";
import React from "react";
import { getIconUrl } from "utils/publicAccessor.ts";
import getEmptySymbol from "utils/emptySymbol.ts";
import { UseFormRegisterReturn } from "react-hook-form";

const TextInput = (props: {
    formRegisterReturn?: UseFormRegisterReturn,
    id: string,
    title: string,
    type: string,
    value?: string,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isError?: boolean,
    errorMessage?: string,
    showCross?: boolean
}) => {
    const isPasswordInput = props.type === "password";
    const inputClassDefault = (isPasswordInput
        ? "text-input-input-password-default"
        : "text-input-input-default");
    const inputClassError = (isPasswordInput
        ? "text-input-input-password-error"
        : "text-input-input-error");
    const inputClass = props.isError ? inputClassError : inputClassDefault;
    const inputClassNames = `base-text-input-input ${inputClass} ${props.showCross && props.isError ? "cross-padding" : ""} ${isPasswordInput ? "eye-padding" : ""}`;

    const [showPassword, setShowPassword] = React.useState(false);

    const inputType = showPassword ? "text" : props.type;

    return (
        <div className="text-input-container">
            <label htmlFor={props.id} className="text-input-title">
                {props.title || getEmptySymbol()}
            </label>

            <div className="text-input-input-container">
                {props.showCross && props.isError &&
                    <img src={getIconUrl("x-circle.svg")} alt="error"
                         className="text-input-error-icon" />}

                {isPasswordInput &&
                    <img src={getIconUrl(showPassword ? "eye/show.svg" : "eye/hide.svg")}
                         alt="password"
                         className="text-input-password-icon" onClick={() => setShowPassword(!showPassword)} />}

                <Input
                    className={inputClassNames}
                    id={props.id}
                    type={inputType}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    {...props.formRegisterReturn}
                />
            </div>

            <label htmlFor={props.id} className="text-input-error">
                {props.errorMessage || getEmptySymbol()}
            </label>
        </div>
    );
};

export default TextInput;
