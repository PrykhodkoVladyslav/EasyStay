import React, { useState } from 'react';


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
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
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