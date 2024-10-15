import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useState } from "react";
import VerticalPad from "components/ui/VerticalPad.tsx";

interface IMultipleSelectProps {
    title: string;
    options: { id: number, name: string, isSelected: boolean }[];
    onOptionClick?: (id: number) => void;
}

const MultipleSelect = (props: IMultipleSelectProps) => {
    const [isHidden, setIsHidden] = useState(false);

    const hide = () => setIsHidden(true);
    const show = () => setIsHidden(false);

    const checkedIcon = getPublicResourceUrl("icons/multipleSelect/checked.svg");
    const uncheckedIcon = getPublicResourceUrl("icons/multipleSelect/unchecked.svg");

    return (
        <div className="multiple-select">
            <div className="title-container">
                <p className="title">{props.title}</p>
                {isHidden
                    ? <img src={getPublicResourceUrl("icons/multipleSelect/hidden.svg")} alt="hidden"
                           onClick={show} className="pointer" />
                    : <img src={getPublicResourceUrl("icons/multipleSelect/expand-down.svg")} alt="expand"
                           onClick={hide} className="pointer" />
                }
            </div>

            {!isHidden && <>
                <div className="options-container">
                    {props.options.map((option) => {
                        return <div
                            key={option.id} className="option pointer"
                            onClick={() => props.onOptionClick?.(option.id)}>
                            <img src={option.isSelected ? checkedIcon : uncheckedIcon} alt="icon" />
                            <p>{option.name}</p>
                        </div>;
                    })}
                </div>

                <div className="hide-options pointer" onClick={hide}>
                    <p className="title">Сховати</p>
                    <img src={getPublicResourceUrl("icons/multipleSelect/expand-up.svg")} alt="expand" />
                </div>

                <VerticalPad heightPx={12} />
            </>}
        </div>
    );
};

export default MultipleSelect;