import React from "react";
import CalculatePrecentage from "./CalculatePercentage";


const DrawPercentage: React.FC<{ value: number }> = ({ value }) => {
    const backgroundColor = CalculatePrecentage.calculatePercentageColor(value);
    const percent = `${(value*100).toFixed(0)}%`

    return (
        <div className="percentage-box" style={{ backgroundColor }}>
            {percent}
        </div>
    );
}
export default DrawPercentage;
