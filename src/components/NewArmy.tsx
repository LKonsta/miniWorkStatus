import React, { useState } from "react";
import { useArmyContext } from './context/ArmyContext';

const NewArmy: React.FC = () => {
    const { addArmy } = useArmyContext();
    const [newArmyName, setNewArmyName] = useState<string>('');

    const handleArmyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewArmyName(event.target.value);
    };

    const addNewArmy = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const armyObject = {
            name: newArmyName
        };
        await addArmy(armyObject);
        setNewArmyName('');
    };

    return (
        <div>
            <form onSubmit={addNewArmy}>
                <input
                    value={newArmyName}
                    onChange={handleArmyNameChange}
                />
                <button type="submit">Add New Army</button>
            </form>
        </div>
    );
};

export default NewArmy;