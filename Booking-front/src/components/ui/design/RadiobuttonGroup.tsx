import { UseFormRegisterReturn } from "react-hook-form";

const RadiobuttonGroup = (props: {
    formRegisterReturn?: UseFormRegisterReturn,
    isError?: boolean,
    options: Array<{
        title: string,
        value: string
    }>
}) => {
    const className = props.isError
        ? "radiobutton-title-error"
        : "radiobutton-title-default";

    return (
        <div className="flex flex-row justify-evenly">
            {props.options.map((option) => (
                <label className={`radiobutton-title ${className}`}>
                    <input
                        type="radio"
                        className="radiobutton-title-margin"
                        value={option.value}
                        {...props.formRegisterReturn}
                    />
                    {option.title}
                </label>
            ))}
        </div>
    );
};

export default RadiobuttonGroup;
