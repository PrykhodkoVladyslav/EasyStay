import { Input } from "components/ui/Input.tsx";
import React from "react";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

const TextInput = (props: {
    id: string,
    title: string,
    type: string,
    value: string,
    placeholder?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
    const inputClassNames = `base-text-input-input ${inputClass} ${props.showCross ? "cross-padding" : ""} ${showEye ? "eye-padding" : ""}`;

    const inputType = showPassword ? "text" : props.type;

    return (
        <div className="text-input-container">
            <label htmlFor={props.id} className="text-input-title">
                {props.title || "\u00A0"}
            </label>

            <div className="text-input-input-container">
                {props.isError && props.showCross && props.type !== "password" &&
                    <img src={getPublicResourceUrl("x-circle.svg")} alt="error"
                         className="text-input-error-icon" />}

                {showEye && <img src={getPublicResourceUrl(showPassword ? "hide.svg" : "show.svg")} alt="password"
                                 className="text-input-password-icon" onClick={() => setShowPassword(!showPassword)} />}

                <Input
                    className={inputClassNames}
                    id={props.id}
                    type={inputType}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                />
            </div>

            <label htmlFor={props.id} className="text-input-error">
                {props.errorMessage || "\u00A0"}
            </label>
        </div>
    );
};

export default TextInput;
