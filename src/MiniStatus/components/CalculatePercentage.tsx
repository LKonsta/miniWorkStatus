import { useStatusContext } from "../components/context/StatusContext";
import { useBaseContext } from "../components/context/BaseContext";
import { UnitType } from "../components/types/defaultTypes";

const calculateUnitPercentage = ( unit : UnitType): [number, number] => {
    const { allStatuses } = useStatusContext();
    const { allBases } = useBaseContext();

    var unitArea: number = 0;
    var doneArea: number = 0;

    for (var status of unit.miniStatus) {
        const base = allBases.filter(base => base.id === status.baseId)[0];

        const [baseHeight, baseWidth, baseShape] = (base)
            ? [base.height, base.width, base.shape]
            : [0, 0, "none"];

        const sta = allStatuses.filter(sta => sta.id === status.statusId)[0];
        const donePercentage = (sta) ? (sta.percentage) : (0);

        var Area: number = 0;
        if (baseShape == "square") {
            Area = baseHeight * baseWidth
        } else {
            Area = ((1 / 4) * baseHeight * baseWidth * Math.PI)
        };
        unitArea = unitArea + Area;
        doneArea = doneArea + (Area * donePercentage);
    };
    
    return [unitArea, doneArea];
};

const calculatePercentage = ( units : UnitType[]): number => {

    var totalArea: number = 0;
    var doneArea: number = 0;

    for (var unit of units) {
        const unitAreas = calculateUnitPercentage(unit)
        totalArea = totalArea + unitAreas[0];
        doneArea = doneArea + unitAreas[1];
    };
    const percent: number = (doneArea / totalArea);

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
    calculatePercentage,
    calculatePercentageColor
};