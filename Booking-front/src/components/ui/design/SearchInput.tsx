import { getIconUrl } from "utils/publicAccessor.ts";
import React, { useRef } from "react";
import "./../../../css/search-input.scss";

const SearchInput = (props: {
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return <div className="search-input-container" onClick={focusInput}>
        <img src={getIconUrl("magnifying-glass/magnifying-glass-gray.svg")} alt="magnifying-glass"
             className="search-magnifying-glass-icon" onClick={focusInput} />

        <input
            ref={inputRef}
            className="search-text-input"
            type="text"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </div>;
};

export default SearchInput;