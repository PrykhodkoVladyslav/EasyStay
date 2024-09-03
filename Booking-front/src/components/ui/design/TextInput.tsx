import { Input } from "components/ui/Input.tsx";
import React from "react";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

const TextInput = (props: {
    id: string,
    title: string,
    type: string,
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isError: boolean,
    errorMessage: string
}) => {
    const inputClass = props.isError ? "text-input-input-error" : "text-input-input-default";
    const inputClassNames = `base-text-input-input ${inputClass}`;

    return (
        <div className="text-input-container">
            <label htmlFor={props.id} className="text-input-title">
                {props.title || "\u00A0"}
            </label>

            <div className="text-input-input-container">
                {props.isError && <img src={getPublicResourceUrl("x-circle.svg")} alt="error"
                                       className="text-input-error-icon" />}

                <Input
                    className={inputClassNames}
                    id={props.id}
                    type={props.type}
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
