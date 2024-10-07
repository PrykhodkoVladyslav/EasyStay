import React, { useState } from 'react';
import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const LanguageSwitcher = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('En');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (lang) => {
        setSelectedLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="language-switcher">
            <div className="selected-language" onClick={toggleDropdown}>
                <span>{selectedLanguage}</span>
                <span className="arrow">{isOpen ? ''  : ''}
                <img
                   src={getPublicResourceUrl("account/header/vector.svg")}
                 alt="Messages"/>
              </span>
            </div>
            {isOpen && (
                <div className="dropdown">
                    <div onClick={() => selectLanguage('En')}>En</div>
                    <div onClick={() => selectLanguage('Ua')}>Ua</div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;