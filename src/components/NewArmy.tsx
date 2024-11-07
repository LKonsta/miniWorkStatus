import React, { useState } from "react";
import { useArmyContext } from './context/ArmyContext';
import Modal from "./Modal";
import { CategoryType, ArmyType } from "./types/defaultTypes";

import CategoryService from "../services/category";
import './Container.scss'

import { FaMinus, FaPlus } from "react-icons/fa";


interface NewCategoryType {
    name: string,
    index: number
}

const NewArmy: React.FC = () => { 
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = () => { setModalOpen(!modalOpen); };

    const { addArmy } = useArmyContext();
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

    const addNewArmy = async () => {
        const armyObject = {
            name: newArmyName
        };
        const returnedArmy: ArmyType = await addArmy(armyObject);
        newArmyCategories.forEach(async (category) => {
            const categoryObject = {
                name: category.name,
                index: category.index,
                armyId: returnedArmy.id
            };
            await CategoryService.create(categoryObject);
        });
        resetSettings();
    };
    const openModal = () => {
        resetSettings();
        toggleModal();
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewArmy();
        toggleModal();
    };

    return (
        <div>
            <Modal 
                ModalButton={<button onClick={openModal}>New Army</button>}
                ModalHeader={"New army"}
                ModalContent={
                    <div className="new-army">
                        <form onSubmit={handleSubmit} className="inner-container">
                            <div className="inner-container-header">
                                <div className="inner-container-header-title">Army name</div>
                            </div>
                            <div className="inner-container-content">
                                <input
                                    className="new-army-form-inputs-name-field"
                                    value={newArmyName}
                                    onChange={handleArmyNameChange}
                                />
                                <div className="new-army-button-form-button">
                                    <button type="submit">Add</button>
                                </div>
                            </div>
                        </form>
                        <div className="inner-container">
                            <div className="inner-container-header">
                                <div className="inner-container-header-title">Categories</div>
                                <div className="outer-right-box">
                                    <div className="outer-right-box-button-container">
                                        <FaMinus
                                            className="outer-right-box-button"
                                            onClick={removeArmyCategory} />
                                    </div>
                                    <div className="outer-right-box-item">{newArmyCategories.length}</div>
                                    <div className="outer-right-box-button-container">
                                        <FaPlus
                                            className="outer-right-box-button"
                                            onClick={addArmyCategory} />
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
                open={modalOpen}
                setOpen={setModalOpen}
            />
        </div>
    );
};

export default NewArmy;