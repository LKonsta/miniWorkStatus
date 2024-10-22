interface ColorPrecentage {
    value: number;
}

const PrecentageColor: React.FC<ColorPrecentage> = ({ value }) => {

    const greater = (Math.pow(value, 1.2) / 1);
    const clampedValue = Math.min(1, Math.max(0, greater));

    const r = Math.round(255 * (1 - clampedValue));
    const g = Math.round(255 * clampedValue);
    const b = 0;

    return `rgb(${r}, ${g}, ${b})`;
};
export default PrecentageColor;
