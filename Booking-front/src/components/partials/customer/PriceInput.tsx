interface IPriceInputProps {
    title: string;
    value: number | null | undefined;
    onChange?: (value: number | null) => void;
    maxValue?: number;
}

const PriceInput = (props: IPriceInputProps) => {
    const onChange = (value: string | null) => {
        if (value == null || !value) {
            props?.onChange?.(null);
            return;
        }

        if (props.maxValue && +value > props.maxValue) {
            props?.onChange?.(props.maxValue);
            return;
        }

        props?.onChange?.(+value);
    };

    return (
        <div className="price-input">
            <p className="price-input-title">{props.title}</p>
            <p className="price-input-value">$</p>
            <input className="price-input-value price-input-value-input" type="number" value={props.value ?? ""}
                   onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default PriceInput;