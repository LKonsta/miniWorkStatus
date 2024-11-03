import React, { useState } from "react";
import { useArmyContext } from './context/ArmyContext';
import { useCategoryContext } from "./context/CategoryContext";
import Modal from "./Modal";
import { CategoryType, ArmyType } from "./types/defaultTypes";

interface NewCategoryType {
    name: string,
    index: number
}

const NewArmy: React.FC = () => { 
    const { addArmy } = useArmyContext();
    const { addCategory } = useCategoryContext();
    const [newArmyName, setNewArmyName] = useState<string>('');
    const [newArmyCategories, setNewArmyCategories] = useState<NewCategoryType[]>(
        [
            {name: "Hero/Lord", index: 1},
            {name: "Core", index: 2},
            {name: "Special", index: 3},
            {name: "Rare", index: 4},
            {name: "Extra", index: 5}, 
        ]
    );

    const handleArmyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewArmyName(event.target.value);
    };

    const handleArmyCategoryNameChange = (index: number) =>(event: React.ChangeEvent<HTMLInputElement>) => {
        setNewArmyCategories(preArmyCategories =>
            preArmyCategories.map(armyCategory =>
                armyCategory.index === index ? {...armyCategory, name: event.target.value } : armyCategory
            )
        );
    };
    
    const addArmyCategory = () => {
        const newArmyCategoryObject = {
            name: "",
            index: (newArmyCategories.length + 1)
        };
        setNewArmyCategories(preCategories => [
            ...preCategories,
            newArmyCategoryObject
        ]);
    };
    const removeArmyCategory = () => {
        setNewArmyCategories(preCategories => {
            return preCategories.slice(0, preCategories.length - 1);
        });
    };

    const resetSettings = () => {
        setNewArmyCategories([
            {name: "Hero/Lord", index: 1},
            {name: "Core", index: 2},
            {name: "Special", index: 3},
            {name: "Rare", index: 4},
            {name: "Extra", index: 5}, 
        ]);
        setNewArmyName("");
    };

    const addNewArmy = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const armyObject = {
            name: newArmyName
        };
        const returnedArmy:ArmyType = await addArmy(armyObject);
        setNewArmyName('');
        newArmyCategories.forEach(async (category) => {
            const categoryObject = {
                name: category.name,
                index: category.index,
                armyId: returnedArmy.id
            };
            await addCategory(categoryObject);
        });
    };

    return (
        <div>
            <Modal 
                ModalButton={<button onClick={resetSettings}>New Army</button>}
                ModalHeader={"New army"}
                ModalContent={
                    <div className="new-army">
                        <form onSubmit={addNewArmy} className="new-army-form">
                            <div className="new-army-form-inputs">
                                <div className="new-army-form-inputs-name">Army name</div>
                                <input
                                    className="new-army-form-inputs-name-field"
                                    value={newArmyName}
                                    onChange={handleArmyNameChange}
                                />
                            </div>
                            <div className="new-army-button-form-button">
                                <button type="submit">Add</button>
                            </div>
                        </form>
                        <div className="new-army-categories">
                            <div className="new-army-categories-header">
                                <div className="new-army-categories-header-title">Categories</div>
                                <div className="new-army-categories-header-amount">
                                    <div>
                                        <button onClick={removeArmyCategory}>-</button>
                                    </div>
                                    <div className="new-army-categories-header-amount-number">{newArmyCategories.length}</div>
                                    <div>
                                        <button onClick={addArmyCategory}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {newArmyCategories.map(category => (
                                    <div key={category.index} className="new-army-categories-category">
                                        {category.index}
                                        <input value={category.name} onChange={handleArmyCategoryNameChange(category.index)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default NewArmy;