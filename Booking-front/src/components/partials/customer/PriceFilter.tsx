import VerticalPad from "components/ui/VerticalPad.tsx";
import PriceInput from "components/partials/customer/PriceInput.tsx";
import { useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

interface IPriceFilterProps {
    maxPrice: number;
    onChange?: (minPrice: number | null, maxPrice: number | null) => void;
}

function PriceFilter(props: IPriceFilterProps) {
    const maxPrice = props.maxPrice;

    const [prices, setPrices] = useState<(number | null)[]>([0, maxPrice]);

    const minPriceInput = prices[0];
    const setMinPriceInput = (value: number | null) => setPrice(value, 0);
    const maxPriceInput = prices[1];
    const setMaxPriceInput = (value: number | null) => setPrice(value, 1);


    const requiredPrices = [prices[0] ?? 0, prices[1] ?? maxPrice];
    const setRequiredPrices = (values: number[]) => {
        setPrices(values);
        setMinPriceInput(values[0]);
        setMaxPriceInput(values[1]);
    };

    const setPrice = (value: number | null, index: number) => {
        setPrices(oldPrices => {
            const pricesCopy = [oldPrices[0], oldPrices[1]];
            pricesCopy[index] = value;
            return pricesCopy;
        });
    };

    useEffect(() => {
        if (requiredPrices[1] > maxPrice)
            setPrices([0, maxPrice]);
    }, [maxPrice]);

    useEffect(() => {
        if (prices[0] && prices[1] && prices[0] > prices[1])
            setPrices([prices[1], prices[1]]);

        props.onChange?.(prices[0], prices[1]);
    }, [prices]);

    return <div className="price-container">
        <p className="price-title">Ціна</p>

        <VerticalPad heightPx={20} />

        <div className="price-input-container">
            <PriceInput title="Від:" value={minPriceInput} onChange={setMinPriceInput} maxValue={requiredPrices[1]} />
            <p>—</p>
            <PriceInput title="До:" value={maxPriceInput} onChange={setMaxPriceInput} maxValue={maxPrice} />
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
                            bottom: "-40px",
                            height: "32px",
                            width: "58px",
                        }}
                    >
                        <div className="price-range-input-price-container">
                            <img className="price-range-input-image" src={getPublicResourceUrl("icons/price-mark.svg")}
                                 alt="Price mark" />
                            <p className="price-range-input-price">${prices[index]}</p>
                        </div>
                    </div>}
                </div>
            )}
        />
    </div>;
}

export default PriceFilter;