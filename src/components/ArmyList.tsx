import React from "react";
import { useArmyContext } from './context/ArmyContext';
import { CategoryProvider } from './context/CategoryContext';
import { UnitProvider } from './context/UnitContext';

import Army from "./Army"

const ArmyList: React.FC = () => {
    const { allArmies } = useArmyContext();

    return (
        <div>
            {allArmies.map((army) => (
                <CategoryProvider armyId={ army.id }>
                    <UnitProvider armyId={ army.id }>
                        <div key={army.id}>
                            <Army id={army.id} name={army.name} /> 
                        </div>
                    </UnitProvider>
                </CategoryProvider>
            ))}
        </div>
    );
};

export default ArmyList;