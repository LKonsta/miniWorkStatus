import React from "react";
import { useArmyContext } from './context/ArmyContext';
import { CategoryProvider } from './context/CategoryContext';
import { UnitProvider } from './context/UnitContext';
import "./ArmyList.scss"
import Army from "./Army"

const ArmyList: React.FC = () => {
    const { allArmies } = useArmyContext();

    return (
        <div className="ArmyList">
            {allArmies.map((army) => (
                <div key={army.id} className="wrapper">
                    <CategoryProvider armyId={ army.id }>
                        <UnitProvider armyId={ army.id }>
                            <Army id={army.id} name={army.name} /> 
                        </UnitProvider>
                    </CategoryProvider>
                </div>
            ))}
        </div>
    );
};

export default ArmyList;