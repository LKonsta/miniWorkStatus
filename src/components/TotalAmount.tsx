import { UnitType } from "./types/defaultTypes"

const totalAmount = (units: UnitType[]): number => {
	var total = 0;
	for (var unit of units) {
		total = parseInt(total) + parseInt(unit.miniAmount)
	};
	return total;
};

export default totalAmount;