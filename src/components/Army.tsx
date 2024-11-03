import EditArmy from "./EditArmy";
import Unit from "./Unit";
import NewUnit from "./NewUnit";

import { useArmyContext } from "./context/ArmyContext";
import { useCategoryContext } from './context/CategoryContext';
import { useUnitContext } from './context/UnitContext';
import "./Army.scss"
import { ArmyType, CategoryType, UnitType } from './types/defaultTypes'
import DrawPercentage from './DrawPercentage';
import CalculatePercentage from "./CalculatePercentage";


import { BiSolidHide } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";


const ArmyCategory: React.FC<{ category: CategoryType, armyId: string }> = ({ category, armyId }) => {
    const { getUnitByCategory } = useUnitContext();
    const categorysUnits = getUnitByCategory(category.id);
    console.log(armyId, "|" ,categorysUnits)
    
    return (
        <div>
            <div key={category.id} className="army-content-category">
                <div className="army-content-category-header">
                    <p className="army-content-category-header-title">
                        {category.name}
                    </p>

                    <div className="army-content-category-header-right">
                        <div>
                            <DrawPercentage value={CalculatePercentage.calculateCategoryPercentage(category)} />
                        </div>
                    </div>
                </div>
                <div className="army-content-category-units">
                    { (categorysUnits.length != 0) ? 
                    (categorysUnits.map((unit) => (
                        <div>
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

const Army: React.FC<ArmyType> = (army) => {
    const armyId = army.id;
    const armyName = army.name;

    const { allCategories } = useCategoryContext();
    const { removeArmy } = useArmyContext();

    return (
        <div className="army">
            <div className="army-header">
                <p className="army-header-title">{armyName}</p>
                
                <div className="army-header-right">
                    <div className="army-header-right-new-unit">
                        <NewUnit armyId={armyId} />
                    </div>
                    <div className="army-header-right-edit">
                        <EditArmy armyId={armyId} />
                    </div>
                    <div>
                        <DrawPercentage value={CalculatePercentage.calculateArmyPercentage(army)} />
                    </div>
                    <div className="army-header-right-remove">
                        <MdDelete color = {"white"} size = {25} onClick={() => removeArmy(armyId)} />
                    </div>
                </div>
            </div>
            <div className="army-content">
                {allCategories.map((category) => (
                    <div>
                        <ArmyCategory category={ category } armyId={ armyId } />
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Army;