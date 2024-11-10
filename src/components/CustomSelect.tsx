import React, { useState } from 'react';
import './styles/InputFields.scss'
import { CategoryType } from './types/defaultTypes';

type CustomSelectProps = {
    style: string;
    options: CategoryType[];
    selectedValue: string | null;
    onSelect: (CategoryId: string) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ style, options, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (categoryId: string) => {
        onSelect(categoryId);
        setIsOpen(false); 
    };

    return (
        <div className={style}>
            <div className={style+"-button"} onClick={toggleDropdown}>
                {
                    selectedValue ?
                    options.find(option => option.id === selectedValue)?.name :
                    'Select a category'
                }
            </div>

            {/* Dropdown options */}
            {isOpen && (
                <div className={style + "-dropdown"}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={style + "-option"}
                            onClick={() => handleOptionClick(option.id)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
