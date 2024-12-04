import React, { useState } from "react";
import Modal from "./Modal";
import { CategoryType, ArmyType } from "./types/defaultTypes";

import CategoryService from "../services/category";
import './styles/Container.scss'
import './styles/CustomComponents.scss';
import './styles/EditArmy.scss';

import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type NewArmyPropsType = {
    addArmy: any,
}

const NewArmy: React.FC<NewArmyPropsType> = ({ addArmy }) => { 
    interface NewCategoryType {
        name: string,
        index: number
    }
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = () => { setModalOpen(!modalOpen); };

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
    const removeArmyCategory = ( index:number ) => {
        setNewArmyCategories(preCategories => {
            const removedCategoryList = preCategories.filter(category => category.index !== index);
        
            const resettedIndexes = removedCategoryList.map((category, i) => ({
                ...category,
                index: i+1,
            }));
                
            return resettedIndexes;
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
                ModalButton={
                    <button
                        className="default-btn"
                        onClick={openModal}
                    >New Army</button>
                }
                ModalHeader={"New army"}
                ModalContent={
                    <>
                        <form 
                            onSubmit={handleSubmit} 
                            className="edit-army-container"
                        >
                            <div className="outer-container">
                                <div className="header">
                                    <div className="input-container">
                                        <input
                                            className="army-name-input"
                                            value={newArmyName}
                                            onChange={handleArmyNameChange}
                                            placeholder="Army name"
                                        />
                                    </div>
                                    <div className="right-box-header">
                                        <div className="item-container">
                                            <button 
                                                className="accept-btn"
                                                type="submit"
                                            >Add</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-wrapper">
                                    {newArmyCategories.map(category => (
                                        <div 
                                            key={category.index}
                                            className="inner-container"
                                        >    
                                            <div className="inner-header">
                                                <div className="input-container">
                                                    <input 
                                                        className="category-name-input"
                                                        placeholder="Category name"
                                                        value={category.name} 
                                                        onChange={handleArmyCategoryNameChange(category.index)} 
                                                    />
                                                </div>
                                                <div className="right-box-header">
                                                    <div className="button-container">
                                                        <MdDelete 
                                                            size={25}
                                                            className="button"
                                                            onClick={() => removeArmyCategory(category.index)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="empty" />
                                        </div>
                                    ))}
                                    <div 
                                        onClick={addArmyCategory} 
                                        className="ghost-category"
                                    >
                                        <FaPlus 
                                            size={25}
                                            className="ghost-plus"
                                        />
                                    </div> 
                                </div>
                            </div>
                            <div>
                                <div className="config-end">
                                    
                                </div>
                            </div>
                        </form>
                    </>
                }
                open={modalOpen}
                setOpen={setModalOpen}
            />
        </div>
    );
};

export default NewArmy;