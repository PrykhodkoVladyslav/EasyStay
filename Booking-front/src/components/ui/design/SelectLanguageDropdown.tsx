import { useState } from 'react';
// import { FaChevronDown } from 'react-icons/fa';
// import {getPublicResourceUrl} from "utils/publicAccessor.ts";

interface DropdownProps {
    options: { full: string; abbr: string }[];
    defaultOption?: string;
}

const SelectLanguageDropdown: React.FC<DropdownProps> = ({ options, defaultOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption/*, setSelectedOption */] = useState(defaultOption || options[0].full);

    // const handleOptionClick = (option: { full: string; abbr: string }) => {
    //     setSelectedOption(option.full);
    //     setIsOpen(false);
    // };

    const selectedAbbr = options.find(option => option.full === selectedOption)?.abbr || '';

    return (
        <button className="dropdown-lang-container" onClick={() => setIsOpen(!isOpen)}>
            <div className="elements">
                <div className="lang">
                    <div className="text">{selectedAbbr}</div>
                </div>
                {/*<button className={`arrow ${isOpen ? 'open' : ''}`}>*/}
                {/*    <img*/}
                {/*        src={getPublicResourceUrl("account/header/vector.svg")}*/}
                {/*        alt="Messages"*/}
                {/*    />*/}
                {/*</button>*/}
            </div>
            {/*{isOpen && (*/}
            {/*    <ul className="dropdown-options">*/}
            {/*        {options.map((option, index) => (*/}
            {/*            <li*/}
            {/*                key={index}*/}
            {/*                className="dropdown-option"*/}
            {/*                onClick={() => handleOptionClick(option)}*/}
            {/*            >*/}
            {/*                {option.full}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*)}*/}
        </button>
    );
};

export default SelectLanguageDropdown;
