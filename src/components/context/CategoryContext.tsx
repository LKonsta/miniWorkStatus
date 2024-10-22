import React, { createContext, useContext, useEffect, useState } from 'react';
import categoryService from '../../services/category'; 
import { CategoryType } from '../types/defaultTypes';

interface CategoryContextType {
    allCategories: CategoryType[];
    addCategory: (newCategory: CategoryType) => Promise<void>;
    modifyCategory: (id: string, updatedCategory: CategoryType) => Promise<void>;
    removeCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode; armyId: string }> = ({ children, armyId }) => {
    const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const initialCategories = await categoryService.getAll(armyId);
            setAllCategories(initialCategories);
        };
        fetchCategories();
    }, []);

    const addCategory = async (newCategory: CategoryType) => {
        const returnedCategory = await categoryService.create(newCategory);
        setAllCategories((prevCategories) => [...prevCategories, returnedCategory]);
    };

    const modifyCategory = async (id: string, updatedCategory: CategoryType) => {
        const returnedCategory = await categoryService.update(id, updatedCategory);
        setAllCategories((prevCategories) =>
            prevCategories.map((category) => (category.id === id ? returnedCategory : category))
        );
    };

    const removeCategory = async (id: string) => {
        await categoryService.remove(id);
        setAllCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
    };

    return (
        <CategoryContext.Provider value={{ allCategories, addCategory, modifyCategory, removeCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = (): CategoryContextType => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }
    return context;
};
