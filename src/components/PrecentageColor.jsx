const PrecentageColor = (props) => {
    const value = props * 2 
    
    const r = Math.floor(255 * Math.min(1, 2 - value))
    const g = Math.floor(255 * Math.min(1, value))
    const b = 0


    return `rgb(${r}, ${g}, ${b})`;
}

export default PrecentageColor
