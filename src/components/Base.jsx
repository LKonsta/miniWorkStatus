import basesService from "../services/bases";
import PrecentageColor from "./PrecentageColor";

const BasesEdit = (props) => {
    return(
        <div className="bases">
            {props.newMiniStatus.map(mini => 
            <div key={mini.id} className="bases-divider">  
                <DrawBase 
                    mini={mini} 
                    allBases={props.allBases} 
                    allStatuses={props.allStatuses}
                />
            </div>
            )}            
        </div>
    )
}

const Bases = (props) => {
    return(
        <div className="bases">
            {props.miniStatus.map(mini => 
            <div key={mini.id} className="bases-divider">  
                <DrawBase 
                    mini={mini} 
                    allBases={props.allBases} 
                    allStatuses={props.allStatuses}
                />
            </div>
            )}
        </div>
    )
}

const DrawBase = (props) => {
    const base = props.allBases.find(x => x.id === props.mini.baseId) 
    const status = props.allStatuses.find(x => x.id === props.mini.statusId)
    const width = base.width * 2
    const height = base.height * 2
    const color = PrecentageColor(status.precentage)  
    return(
        <div 
            className="bases-base" 
            style={{width: width, height: height, backgroundColor: color}}
        >
            
        </div>
    )
}


export { 
    Bases, 
    BasesEdit 
}

