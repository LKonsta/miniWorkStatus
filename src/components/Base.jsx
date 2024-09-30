import basesService from "../services/bases";

const BaseEdit = (props) => {
    console.log("raadsads")
    const mini = props.mini
    const base = props.allBases.find(x => x.id === mini.baseId) 
    const status = props.allStatuses.find(x => x.id === mini.statusId)
    const width = base.width * 2
    const height = base.height * 2

    return(
        <div className="bases-divider">
            <DrawBase

            />
        </div>
    )
}

const Base = (props) => {
    const mini = props.mini
    const base = props.allBases.find(x => x.id === mini.baseId) 
    const status = props.allStatuses.find(x => x.id === mini.statusId)
    const width = base.width * 2
    const height = base.height * 2
    
    const style = 'width: ' + width + 'px;'
             + 'height: ' + height + 'px;'
             + 'background-color: black'
             
    return(
        <div className="bases-divider">
            <DrawBase 
                style = {style}
                width = {width}
                height = {height}
                status = {status}
                id = {mini.id}
            />
        </div>
    )
}

const DrawBase = (style, width, height, status, id) => {
    return(
        <div className="bases-base" style={style} >
            {status}
        </div>
    )
}


export { 
    Base, 
    BaseEdit 
}

