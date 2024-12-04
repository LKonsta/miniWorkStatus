import axios from 'axios';
import { StatusType } from '../components/types/defaultTypes';

const baseUrl = 'http://localhost:3001/status';

// Fetch all statuses
const getAll = async (): Promise<StatusType[]> => {
    const response = await axios.get<StatusType[]>(baseUrl);
    return response.data;
};

// Create a new status
const create = async (newObject: Omit<StatusType, 'id'>): Promise<StatusType> => {
    const response = await axios.post<StatusType>(baseUrl, newObject);
    return response.data;
};

// Update an existing status
const update = async (id: string, newObject: Partial<StatusType>): Promise<StatusType> => {
    const response = await axios.put<StatusType>(`${baseUrl}/${id}`, newObject);
    return response.data;
};

// Delete an status
const remove = async (id: string): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
};

export default {
    getAll,
    create,
    update,
    remove
};
