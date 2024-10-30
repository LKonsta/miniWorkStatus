import { useEffect, useState } from "react";
import Modal from "./Modal";

import { CategoryType } from "./types/defaultTypes"
import { useCategoryContext } from "./context/CategoryContext";



const Category: React.FC<CategoryType> = (category) => {

    return (
        <div>
            {category.name}
            <CategoryRemove {...category} />
        </div>
    );
}


const CategoryRemove: React.FC<CategoryType> = (category) => {
    const { removeCategory } = useCategoryContext();

    return (
        <button onClick={() => removeCategory(category.id)}> X </button>
    );
}

const NewCategory: React.FC<{ armyId: string; }> = ({ armyId }) => {
    const { allCategories, addCategory } = useCategoryContext();
    const [newCategory, setNewCategory] = useState < string > ('');

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(event.target.value);
    }

    const addNewCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const categoryObject = {
            name: newCategory,
            index: allCategories.length + 1,
            armyId: armyId,
        };
        await addCategory(categoryObject)
        setNewCategory('');
    }

    return (
        <div>
            <form onSubmit={addNewCategory}>
                <input
                    value={newCategory}
                    onChange={handleCategoryChange}
                />
                <button type="submit">add</button>
            </form>
        </div>
    );
}

const Categories: React.FC<{ armyId: string }> = ({ armyId }) => {
    const { allCategories } = useCategoryContext();
    return (
        <div>
            <Modal
                ModalButton={"Edit"}
                ModalHeader={"Modify categories"}
                ModalContent={
                    <div>
                        {allCategories.map(category => (
                            <div key={category.id}>
                                <Category {...category} />
                            </div>
                        ))}
                        <NewCategory armyId={armyId} />
                    </div>
                }
            />
        </div>
    );
}

export default Categories;
