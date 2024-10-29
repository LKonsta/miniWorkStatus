import { useStatusContext } from "../components/context/StatusContext";
import { useBaseContext } from "../components/context/BaseContext";
import { UnitType, CategoryType, ArmyType } from "../components/types/defaultTypes";
import { useUnitContext } from "./context/UnitContext";

// returns a units done percentage value in percentage value format
const calculateUnitPercentage = (unit: UnitType): number => {
    const { allStatuses } = useStatusContext();
    const { allBases } = useBaseContext();

    var totalArea: number = 0;
    var doneArea: number = 0;

    for (var status of unit.miniStatus) {
        const base = allBases.filter(base => base.id === status.baseId)[0];
        const baseHeight = (base) ? (base.height) : (0);
        const baseWidth = (base) ? (base.width) : (0);
        const baseShape = (base) ? (base.shape) : ("none");

        const sta = allStatuses.filter(sta => sta.id === status.statusId)[0];
        const donePercentage = (sta) ? (sta.percentage) : (0);

        var Area: number = 0;
        if (baseShape == "square") {
            Area = baseHeight * baseWidth
        } else {
            Area = ((1 / 4) * baseHeight * baseWidth * Math.PI)
        };
        totalArea = totalArea + Area;
        doneArea = doneArea + (Area * donePercentage);
    }
    
    const percent: number = totalArea ? ((doneArea / totalArea)) : 0;
    
    return percent;
};

const calculateCategoryPercentage = (category: CategoryType): number => {
    const { allUnits } = useUnitContext();
    let CategorysUnits: UnitType[] = [];
    let addedPercentages: number = 0;

    for (var unit of allUnits) {
        if (unit.categoryId == category.id) {
            CategorysUnits.push(unit)
        }
    }
    if (CategorysUnits.length > 0) {
        for (var unit of CategorysUnits) {
            addedPercentages = addedPercentages + calculateUnitPercentage(unit)
        }
    }
    const percent: number = (addedPercentages / CategorysUnits.length)
    
    return percent;
};

const calculateArmyPercentage = (army: ArmyType): number => {
    const { allUnits } = useUnitContext();
    let ArmysUnits: UnitType[] = [];
    let addedPercentages: number = 0;

    for (var unit of allUnits) {
        if (unit.armyId == army.id) {
            ArmysUnits.push(unit)
        }
    }
    if (ArmysUnits.length > 0) {
        for (var unit of ArmysUnits) {
            addedPercentages = addedPercentages + calculateUnitPercentage(unit)
        }
    }
    const percent: number = (addedPercentages / ArmysUnits.length)
   
    return percent;
};

const calculatePercentageColor = (value: number): string => {

    const greater = (Math.pow(value, 1.2) / 1);
    const clampedValue = Math.min(1, Math.max(0, greater));

    const r = Math.round(255 * (1 - clampedValue));
    const g = Math.round(255 * clampedValue);
    const b = 0;

    return `rgb(${r}, ${g}, ${b})`;
};

export default {
    calculateUnitPercentage,
    calculateCategoryPercentage,
    calculateArmyPercentage,
    calculatePercentageColor
};