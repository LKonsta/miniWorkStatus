import { useEffect, useState } from "react";
import Modal from "./Modal";

import { CategoryType, ArmyType } from "./types/defaultTypes"

import { IoMdSettings } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { DndContext, useDndMonitor } from '@dnd-kit/core';

type EditArmyPropsType = {
    army: ArmyType,
    modifyArmy: any,
    removeArmy: any,
    sortedCategories: CategoryType[],
    modifyCategory: any,
    addCategory: any,
    removeCategory: any,
}


const EditArmy: React.FC<EditArmyPropsType> = ({ army, modifyArmy, removeArmy, sortedCategories, modifyCategory, addCategory, removeCategory }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = () => { setModalOpen(!modalOpen); };

    const [editArmyName, setEditArmyName] = useState<string>(army.name);
    const [editArmyCategories, setEditArmyCategories] = useState<CategoryType[]>(
        sortedCategories
    );

    const handleArmyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditArmyName(event.target.value)
    }

    const handleArmyCategoryNameChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditArmyCategories(preArmyCategories =>
            preArmyCategories.map(armyCategory =>
                armyCategory.index === index ? { ...armyCategory, name: event.target.value } : armyCategory
            )
        );
    };

    const addArmyCategory = () => {
        const editArmyCategoryObject = {
            name: "",
            index: (editArmyCategories.length + 1),
            armyId: army.id
        };
        setEditArmyCategories(preCategories => [
            ...preCategories,
            editArmyCategoryObject
        ]);
    };
    const removeArmyCategory = (index: number) => {
        setEditArmyCategories(preCategories => {
            const removedCategoryList = preCategories.filter(category => category.index !== index);

            const resettedIndexes = removedCategoryList.map((category, i) => ({
                ...category,
                index: i + 1,
            }));

            return resettedIndexes;
        });
    };

    const editCategories = () => {
        sortedCategories.forEach(async (category) => {
            const categoryIsListed = editArmyCategories.some(editCategory => editCategory.id === category.id) 
            if (!categoryIsListed) {
                removeCategory(category.id)
            }
        });
        editArmyCategories.forEach(async (category) => {
            (
                category.id
            ) ? (
                await modifyCategory(category.id, category)
            ) : (
                await addCategory(category)
            );
        });
    };

    const deleteArmy = async () => {
        await removeArmy(army.id);
        toggleModal();
    }

    const openModal = () => {
        setEditArmyCategories(sortedCategories);
        toggleModal();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const ArmyObject = {
            name: editArmyName,
            id: army.id
        }
        modifyArmy(army.id, ArmyObject)
        editCategories();
        toggleModal();
    };



    return (
        <Modal
            ModalButton={
                <IoMdSettings
                    size={25}
                    className="button"
                    onClick={openModal}
                />
            }
            ModalHeader={"Editing (" + army.name + ")"}
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
                                        value={editArmyName}
                                        onChange={handleArmyNameChange}
                                        placeholder="Army name"
                                    />
                                </div>
                            </div>
                            <div className="content-wrapper">
                                <DndContext>
                                    {editArmyCategories.map(category => (
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
                                </DndContext>
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
                        <div className="inner-container">
                            <div className="edit-config">
                                <div className="config-fields">
                                    <div className="config-end">
                                        <div className="item-container">
                                            <button
                                                className="warning-btn"
                                                onClick={() => deleteArmy()}
                                            >Remove</button>
                                        </div>
                                        <div className="item-container">
                                            <button
                                                className="accept-btn"
                                                type="submit"
                                            >Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            }
            open={modalOpen}
            setOpen={setModalOpen}
        />
    );
}



export default EditArmy;
