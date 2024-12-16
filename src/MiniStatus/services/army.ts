import axios from 'axios';
import { ArmyType, ErrorType } from '../components/types/defaultTypes';
import errorHandling from './components/errorHandling';

const baseUrl = 'http://localhost:3001/armies';

// Fetch all armies
const getAll = async (): Promise<ArmyType[]> => {
    try {
        const response = await axios.get<ArmyType[]>(baseUrl);
        return response.data;
    } catch (error) {
        errorHandling(error); 
    }
};

// Create a new army
const create = async (newObject: Omit<ArmyType, 'id'>): Promise<ArmyType> => {
    try {
        const response = await axios.post<ArmyType>(baseUrl, newObject);
        return response.data;
    } catch (error) {
        errorHandling(error); 
    }
};

// Update an existing army
const update = async (id: string, newObject: Partial<ArmyType>): Promise<ArmyType> => {
    try {
        const response = await axios.put<ArmyType>(`${baseUrl}/${id}`, newObject);
        return response.data;
    } catch (error) {
        errorHandling(error); 
    }
};

// Delete an army
const remove = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${baseUrl}/${id}`);
    } catch (error) {
        errorHandling(error); 
    }
};

export default {
    getAll,
    create,
    update,
    remove
};
