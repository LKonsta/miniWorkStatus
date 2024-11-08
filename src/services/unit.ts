import axios from 'axios'
const baseUrlGet = 'http://localhost:3001/armies/'
const embedUnits = '?_embed=units'
const baseUrl = 'http://localhost:3001/units'

import { UnitType } from '../components/types/defaultTypes';

interface ArmyTypeUnits {
    id: string;
    name: string;
    units: UnitType[];
}

// Fetch all units for a single army
const getAll = async (armyId: string): Promise<UnitType[]> => {
    const response = await axios.get<ArmyTypeUnits>(`${baseUrlGet}${armyId}${embedUnits}`);
    return response.data.units;
};

// Create a new unit
const create = async (newObject: Omit<UnitType, 'id'>): Promise<UnitType> => {
    const response = await axios.post<UnitType>(baseUrl, newObject);
    return response.data;
};

// Update an existing unit
const update = async (id: string, newObject: Partial<UnitType>): Promise<UnitType> => {
    const response = await axios.put<UnitType>(`${baseUrl}/${id}`, newObject);
    return response.data;
};

// Delete an unit
const remove = async (id: string): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
};

export default {
    getAll,
    create,
    update,
    remove
};