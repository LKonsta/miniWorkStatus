import axios from 'axios';
import { BaseType } from '../components/types/defaultTypes';

const baseUrl = 'http://localhost:3001/bases';

// Fetch all bases
const getAll = async (): Promise<BaseType[]> => {
    const response = await axios.get<BaseType[]>(baseUrl);
    return response.data;
};

// Create a new base
const create = async (newObject: Omit<BaseType, 'id'>): Promise<BaseType> => {
    const response = await axios.post<BaseType>(baseUrl, newObject);
    return response.data;
};

// Update an existing base
const update = async (id: number, newObject: Partial<BaseType>): Promise<BaseType> => {
    const response = await axios.put<BaseType>(`${baseUrl}/${id}`, newObject);
    return response.data;
};

// Delete an base
const remove = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
};

export default {
    getAll,
    create,
    update,
    remove
};
