import EditArmy from "./EditArmy";
import Unit from "./Unit";
import NewUnit from "./NewUnit";

import { useArmyContext } from "./context/ArmyContext";
import { useCategoryContext } from './context/CategoryContext';
import { useUnitContext } from './context/UnitContext';
import "./Army.scss"
import "./Container.scss"
import { ArmyType, CategoryType, UnitType } from './types/defaultTypes'
import DrawPercentage from './DrawPercentage';
import CalculatePercentage from "./CalculatePercentage";


import { BiSolidHide } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState } from "react";


const ArmyCategory: React.FC<{ category: CategoryType, armyId: string }> = ({ category, armyId }) => {
    const { getUnitByCategory } = useUnitContext();
    const categorysUnits = getUnitByCategory(category.id);
    console.log(armyId, "|" ,categorysUnits)
    
    return (
        <div>
            <div key={category.id} className="inner-container">
                <div className="inner-container-header">
                    <p className="inner-container-header-title">
                        {category.name}
                    </p>

                    <div className="inner-right-box">
                        <div className="inner-right-box-item">
                            <DrawPercentage value={CalculatePercentage.calculateCategoryPercentage(category)} />
                        </div>
                    </div>
                </div>
                <div className="inner-container-content">
                    { (categorysUnits.length != 0) ? 
                    (categorysUnits.map((unit) => (
                        <div key={unit.id}>
                            <ArmyUnit unit={unit} categoryId={category.id} />
                            <div className="army-content-category-units-seperator" />
                        </div>
                    ))) : 
                    (<></>)
                    }
                    <div className="army-content-category-units-empty">

                    </div>
                </div>
            </div>
        </div>
    )
};

const ArmyUnit: React.FC<{ unit: UnitType, categoryId: string }> = ({ unit, categoryId }) => {
    return (
        <>
            {unit.categoryId === categoryId && (
                <div key={unit.id}>
                    <Unit {...unit} />
                </div>
            )}
        </>
    )
};

const DeleteArmy: React.FC<{ armyId: string }> = ({ armyId }) => {
    const { removeArmy } = useArmyContext();
    return (
        <MdDelete
            size={25}
            className="outer-right-box-button"
            onClick={() => removeArmy(armyId)}
        />
    )
}

const Army: React.FC<ArmyType> = (army) => {
    const armyId = army.id;
    const armyName = army.name;

    const { allCategories } = useCategoryContext();

    return (
        <div className="outer-container">
            <div className="outer-container-header">
                <p className="outer-container-header-title">{armyName}</p>
                <div className="outer-right-box">
                    <div className="outer-right-box-button-container">
                        <NewUnit armyId={armyId} />
                    </div>
                    <div className="outer-right-box-button-container">
                        <EditArmy {...army} />
                    </div>
                    <div className="outer-right-box-item">
                        <DrawPercentage value={CalculatePercentage.calculateArmyPercentage(army)} />
                    </div>
                    <div className="outer-right-box-button-container">
                        <DeleteArmy armyId={armyId} />
                    </div>
                </div>
            </div>
            <div className="outer-container-content">
                {allCategories.map((category) => (
                    <div key={category.id}>
                        <ArmyCategory category={ category } armyId={ armyId } />
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Army;