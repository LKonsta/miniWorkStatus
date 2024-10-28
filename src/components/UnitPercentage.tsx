const UnitPercentage: React.FC<UnitType> = (unit) => {
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
    const value: number = (doneArea / totalArea)
    const color = PrecentageColor(value);
    const percent = ((doneArea / totalArea) * 100).toFixed(0) + "%";
    const style = { backgroundColor: color }

    return 
};

export default UnitPercentage;