import React from "react";

import Army from "./Army"

import { ArmyType } from './types/defaultTypes'

import "./styles/ArmyList.scss"

type ArmyListPropsType = {
    allArmies: ArmyType[],
    removeArmy: any,
    modifyArmy: any,
}

const ArmyList: React.FC<ArmyListPropsType> = ({allArmies, removeArmy, modifyArmy}) => {
    
    return (
        <div className="ArmyList">
            {allArmies.map((army) => (
                <div key={army.id} className="wrapper">
                    <Army army={army} removeArmy={removeArmy} modifyArmy={modifyArmy} /> 
                </div>
            ))}
        </div>
    );
};

export default ArmyList;