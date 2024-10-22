import Categories from "./Categories";
import Unit from "./Unit";
import NewUnit from "./NewUnit";

import { useCategoryContext } from './context/CategoryContext';
import { useUnitContext } from './context/UnitContext';
import "./Army.scss"
import { ArmyType } from './types/defaultTypes'


const Army: React.FC<ArmyType> = ({ id, name }) => {
    const armyId = id;
    const armyName = name;

    const { allUnits } = useUnitContext();
    const { allCategories } = useCategoryContext();

    return (
        <div className="Army">
            <div>
                <h1>{armyName}</h1>
                <Categories armyId={armyId} />
            </div>
            {allCategories.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <div className='div-table'>
                        {allUnits.map((unit) => (
                            <div key={unit.id}>
                                {unit.categoryId === category.id && (
                                    <div>
                                        <Unit {...unit} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <NewUnit armyId={armyId} />
        </div>
    );
};

export default Army;