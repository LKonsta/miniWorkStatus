const PrecentageColor = (props) => {
    const clampedValue = Math.min(1, Math.max(0, props));

    // Calculate the RGB values based on the percentage
    const r = Math.round(255 * (1 - clampedValue));   // Red decreases from 255 to 0
    const g = Math.round(255 * clampedValue);
    const b = 0

    return `rgb(${r}, ${g}, ${b})`;
}
export default PrecentageColor;
