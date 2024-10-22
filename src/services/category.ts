import axios from 'axios'
const baseUrlGet = 'http://localhost:3001/armies/'
const embedCategories = '?_embed=categories'
const baseUrl = 'http://localhost:3001/categories'

import { CategoryType } from '../components/types/defaultTypes';

interface ArmyTypeCategories {
    id: string;
    name: string;
    categories: CategoryType[];
}

// Fetch categories for a single army
const getAll = async (armyId: string): Promise<CategoryType[]> => {
    const response = await axios.get<ArmyTypeCategories>(`${baseUrlGet}${armyId}${embedCategories}`);
    return response.data.categories;
};

// Create a new category
const create = async (newObject: Omit<CategoryType, 'id'>): Promise<CategoryType> => {
    const response = await axios.post<CategoryType>(baseUrl, newObject);
    return response.data;
};

// Update an existing category
const update = async (id: number, newObject: Partial<CategoryType>): Promise<CategoryType> => {
    const response = await axios.put<CategoryType>(`${baseUrl}/${id}`, newObject);
    return response.data;
};

// Delete an category
const remove = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
};

export default {
    getAll,
    create,
    update,
    remove
};