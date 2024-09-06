import { Input } from "components/ui/Input.tsx";
import React from "react";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
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
    const [showPassword, setShowPassword] = React.useState(false);
    const showEye = props.type === "password";
    const inputClass = props.isError
        ? (showEye
            ? "text-input-input-password-error"
            : "text-input-input-error")
        : "text-input-input-default";
    const inputClassNames = `base-text-input-input ${inputClass} ${props.showCross && props.isError ? "cross-padding" : ""} ${showEye ? "eye-padding" : ""}`;

    const inputType = showPassword ? "text" : props.type;

    return (
        <div className="text-input-container">
            <label htmlFor={props.id} className="text-input-title">
                {props.title || getEmptySymbol()}
            </label>

            <div className="text-input-input-container">
                {props.showCross && props.isError &&
                    <img src={getPublicResourceUrl("x-circle.svg")} alt="error"
                         className="text-input-error-icon" />}

                {showEye && <img src={getPublicResourceUrl(showPassword ? "show.svg" : "hide.svg")} alt="password"
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
