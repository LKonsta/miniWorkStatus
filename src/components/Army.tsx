import Categories from "./Categories";
import Unit from "./Unit";
import NewUnit from "./NewUnit";

import { useArmyContext } from "./context/ArmyContext";
import { useCategoryContext } from './context/CategoryContext';
import { useUnitContext } from './context/UnitContext';
import "./Army.scss"
import { ArmyType, CategoryType, UnitType } from './types/defaultTypes'
import DrawPercentage from './DrawPercentage';
import CalculatePercentage from "./CalculatePercentage";


const ArmyRemove: React.FC<{ armyId: string }> = ({ armyId }) => {
    const { removeArmy } = useArmyContext();

    return (
        <div>
            <button onClick={() => removeArmy(armyId)}> X </button>
        </div>
    );
};

const ArmyCategory: React.FC<{ category: CategoryType, armyId: string }> = ({ category, armyId }) => {
    const { allUnits } = useUnitContext();

    return (
        <div>
            <div key={category.id} className="army-category">
                <h3 className="army-category-title">
                    {category.name}
                </h3>
                <div className="army-category-right">
                    <div>
                        <DrawPercentage value={CalculatePercentage.calculateCategoryPercentage(category)} />
                    </div>
                </div>
            </div>
            <div>
                {allUnits.map((unit) => (
                    <>
                        <ArmyUnit unit={unit} categoryId={category.id} />
                    </>
                ))}
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

    return (
        <div className="army">
            <div className="army-header">
                <h1 className="army-header-title">{armyName}</h1>
                
                <div className="army-header-right">
                    <Categories armyId={armyId} />
                    <div>
                        <DrawPercentage value={CalculatePercentage.calculateArmyPercentage(army)} />
                    </div>
                    <div className="army-header-right-remove">
                        <ArmyRemove armyId = {armyId} />
                    </div>
                </div>
            </div>
            {allCategories.map((category) => (
                <div>
                    <ArmyCategory category={ category } armyId={ armyId } />
                </div>

            ))}
            <NewUnit armyId={armyId} />
        </div>
    );
};

export default Army;