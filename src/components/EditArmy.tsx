import { useEffect, useState } from "react";
import Modal from "./Modal";

import { CategoryType, ArmyType } from "./types/defaultTypes"
import { useCategoryContext } from "./context/CategoryContext";
import { useArmyContext } from "./context/ArmyContext";

import { IoMdSettings } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";

const EditArmy: React.FC<ArmyType> = (army) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = () => { setModalOpen(true); };
    const { sortedCategories, modifyCategory, addCategory, removeCategory } = useCategoryContext();
    const { modifyArmy } = useArmyContext();

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
                    className="outer-right-box-button"
                    onClick={openModal}
                />
            }
            ModalHeader={"[" + army.name + "] settings"}
            ModalContent={
                <>
                    <form onSubmit={handleSubmit} className="inner-container">
                        <div className="inner-container-header">
                            <div className="inner-container-header-title">Army name</div>
                        </div>
                        <div className="inner-container-content-column">
                            <input
                                className="new-army-form-inputs-name-field"
                                value={editArmyName}
                                onChange={handleArmyNameChange}
                            />
                            <button type="submit">apply</button>
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
                                <div className="outer-right-box-item">{editArmyCategories.length}</div>
                                <div className="outer-right-box-button-container">
                                    <FaPlus
                                        className="outer-right-box-button"
                                        onClick={addArmyCategory} />
                                </div>
                            </div>
                        </div>
                        <div className="inner-container-content-column">
                            {editArmyCategories.map(category => (
                                <div key={category.index}>
                                    {category.index}
                                    <input value={category.name} onChange={handleArmyCategoryNameChange(category.index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
            open={modalOpen}
            setOpen={setModalOpen}
        />
    );
}

export default EditArmy;
