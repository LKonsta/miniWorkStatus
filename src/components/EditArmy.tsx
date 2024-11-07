import { useEffect, useState } from "react";
import Modal from "./Modal";

import { CategoryType, ArmyType } from "./types/defaultTypes"
import { useCategoryContext } from "./context/CategoryContext";

import { IoMdSettings } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";

const EditArmy: React.FC<ArmyType> = (army) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = () => { setModalOpen(true); };
    const { allCategories, modifyCategory, addCategory, removeCategory } = useCategoryContext();

    const [editArmyCategories, setEditArmyCategories] = useState<CategoryType[]>(
        allCategories
    );

    const handleArmyCategoryNameChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditArmyCategories(preArmyCategories =>
            preArmyCategories.map(armyCategory =>
                armyCategory.index === index ? { ...armyCategory, name: event.target.value } : armyCategory
            )
        );
    };

    const addArmyCategory = () => {
        const newArmyCategoryObject = {
            name: "",
            index: (editArmyCategories.length + 1),
            armyId: army.id
        };
        setEditArmyCategories(preCategories => [
            ...preCategories,
            newArmyCategoryObject
        ]);
    };
    const removeArmyCategory = () => {
        setEditArmyCategories(preCategories => {
            return preCategories.slice(0, preCategories.length - 1);
        });
    };

    const editCategories = () => {
        allCategories.forEach(async (category) => {
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

    const openModal = () => {
        setEditArmyCategories(allCategories);
        toggleModal();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        editCategories();
        toggleModal();
    };

    return (
        <Modal
            ModalButton={
                <IoMdSettings
                    size={25}
                    className="outer-right-box-button"
                    onClick={openModal}
                />
            }
            ModalHeader={army.name + " settings"}
            ModalContent={
                <form onSubmit={handleSubmit}>
                    <div className="inner-container">
                        <div className="inner-container-header">
                            <div className="inner-container-header-title">Categories</div>
                            <div className="outer-right-box">
                                <div className="outer-right-box-button-container">
                                    <FaMinus
                                        className="outer-right-box-button"
                                        onClick={removeArmyCategory} />
                                </div>
                                <div className="outer-right-box-item">{editArmyCategories.length}</div>
                                <div className="outer-right-box-button-container">
                                    <FaPlus
                                        className="outer-right-box-button"
                                        onClick={addArmyCategory} />
                                </div>
                            </div>
                        </div>
                        <div>
                            {editArmyCategories.map(category => (
                                <div key={category.index} className="new-army-categories-category">
                                    {category.index}
                                    <input value={category.name} onChange={handleArmyCategoryNameChange(category.index)} />
                                </div>
                            ))}
                        </div>
                        <button type="submit">apply</button>
                    </div>
                </form>
            }
            open={modalOpen}
            setOpen={setModalOpen}
        />
    );
}

export default EditArmy;

function setNewArmyName(arg0: string) {
    throw new Error("Function not implemented.");
}
