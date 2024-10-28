import Categories from "./Categories";
import Unit from "./Unit";
import NewUnit from "./NewUnit";

import { useArmyContext } from "./context/ArmyContext";
import { useCategoryContext } from './context/CategoryContext';
import { useUnitContext } from './context/UnitContext';
import "./Army.scss"
import { ArmyType } from './types/defaultTypes'


const ArmyRemove: React.FC<{ armyId: string }> = ({ armyId }) => {
    const { removeArmy } = useArmyContext();

    return (
        <div>
            <button onClick={() => removeArmy(armyId)}> X </button>
        </div>
    );
};

const Army: React.FC<ArmyType> = ({ id, name }) => {
    const armyId = id;
    const armyName = name;

    const { removeArmy } = useArmyContext();
    const { allUnits } = useUnitContext();
    const { allCategories } = useCategoryContext();

    return (
        <div className="army">
            <div className="army-header">
                <h1 className="army-header-title">{armyName}</h1>
                <Categories armyId={armyId} />
                <div className="army-header-total">
                    <button>100%</button>
                </div>
                <div className="army-header-remove">
                    <ArmyRemove armyId = {armyId} />
                </div>
            </div>
            {allCategories.map((category) => (
                <div>
                    <div key={category.id} className="army-category">
                        <h3 className="army-category-title">
                            {category.name}
                        </h3>
                        <div className="army-category-total">
                            <button>100%</button>
                        </div>
                    </div>
                    <div>
                        {allUnits.map((unit) => (
                            <>
                                {unit.categoryId === category.id && (
                                    <div key={unit.id}>
                                        <Unit {...unit} />
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            ))}
            <NewUnit armyId={armyId} />
        </div>
    );
};

export default Army;