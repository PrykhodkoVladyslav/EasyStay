import VerticalPad from "components/ui/VerticalPad.tsx";
import PriceInput from "components/partials/customer/PriceInput.tsx";
import { useEffect } from "react";
import { getTrackBackground, Range } from "react-range";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

interface IPriceFilterProps {
    minPriceValue: number | null;
    maxPriceValue: number | null;

    maxPrice: number;

    onChange?: (minPrice: number | null, maxPrice: number | null) => void;
}

function PriceFilter(props: IPriceFilterProps) {
    const minPriceValue = props.minPriceValue;
    const maxPriceValue = props.maxPriceValue;
    const maxPrice = props.maxPrice;
    const notify = (minValue: number | null, maxValue: number | null) => {
        props.onChange?.(minValue, maxValue);
    };

    const setMinPriceInput = (value: number | null) => notify(value, maxPriceValue);
    const setMaxPriceInput = (value: number | null) => notify(minPriceValue, value);

    const requiredPrices = [minPriceValue ?? 0, maxPriceValue ?? maxPrice];
    const setRequiredPrices = (values: number[]) => {
        notify(values[0], values[1]);
    };

    useEffect(() => {
        notify(0, maxPrice);
    }, [maxPrice]);

    return <div className="price-container">
        <p className="price-title">Ціна</p>

        <VerticalPad heightPx={20} />

        <div className="price-input-container">
            <PriceInput title="Від:" value={minPriceValue} onChange={setMinPriceInput} maxValue={requiredPrices[1]} />
            <p>—</p>
            <PriceInput title="До:" value={maxPriceValue} onChange={setMaxPriceInput} maxValue={maxPrice} />
        </div>

        <VerticalPad heightPx={40} />

        <Range
            step={1}
            min={0}
            max={maxPrice}
            values={requiredPrices}
            onChange={setRequiredPrices}
            renderTrack={({ props, children }) => (
                <div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart}>
                    <div
                        ref={props.ref}
                        className="price-range-input-track"
                        style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                                values: requiredPrices,
                                colors: ["#a5a5a5", "#3f523c", "#a5a5a5"],
                                min: 0,
                                max: maxPrice,
                            }),
                            alignSelf: "center",
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props, isDragged, index }) => (
                <div
                    {...props}
                    key={index}
                    style={{
                        ...props.style,
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        backgroundColor: "rgb(63, 82, 60)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            height: "10px",
                            width: "10px",
                            borderRadius: "50%",
                            backgroundColor: isDragged ? "#fff" : "rgb(63, 82, 60)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    />
                    {isDragged && <div
                        style={{
                            position: "absolute",
                            bottom: "-38px",
                            height: "32px",
                            width: "58px",
                        }}
                    >
                        <div className="price-range-input-price-container">
                            <img className="price-range-input-image" src={getPublicResourceUrl("icons/price-mark.svg")}
                                 alt="Price mark" />
                            <p className="price-range-input-price">${requiredPrices[index].toFixed(0)}</p>
                        </div>
                    </div>}
                </div>
            )}
        />

        <VerticalPad heightPx={44} />
    </div>;
}

export default PriceFilter;