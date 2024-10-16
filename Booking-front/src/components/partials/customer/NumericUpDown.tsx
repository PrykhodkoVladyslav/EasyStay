import VerticalPad from "components/ui/VerticalPad.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useEffect } from "react";

interface INumericUpDownProps {
    title: string;
    valueTitle: string;

    value?: string | undefined;
    onChange?: (value: string | undefined) => void;
    onChangeNumber?: (value: number) => void;
}

const NumericUpDown = (props: INumericUpDownProps) => {
    const onUnfocused = () => {
        if (!props.value)
            props.onChange?.("0");
    };

    const increaseValue = (step: number) => {
        if (!props.value) {
            props.onChange?.("0");
            return;
        }

        const number = +props.value + step;
        props.onChange?.(number.toString());
    };

    useEffect(() => {
        props.onChangeNumber?.(props.value ? +props.value : 0);
    }, [props.value]);

    return (
        <div className="numeric-up-down">
            <div className="title-container">
                <p className="title">{props.title}</p>
            </div>

            <VerticalPad heightPx={18} />

            <div className="value-container">
                <div className="value">
                    <p className="title">{props.valueTitle}</p>
                    <div className="up-down-container">
                        <img src={getPublicResourceUrl("icons/numericUpDown/decrease.svg")} alt="decrease"
                             onClick={() => increaseValue(-1)} />
                        <input
                            type="number"
                            value={props.value}
                            onChange={(e) => props.onChange?.(e.target.value)}
                            onBlur={onUnfocused}
                        />
                        <img src={getPublicResourceUrl("icons/numericUpDown/increase.svg")} alt="increase"
                             onClick={() => increaseValue(1)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumericUpDown;