import { useState } from "react"

import basesService from "../services/bases";
import PrecentageColor from "./PrecentageColor";

const Bases = (props) => {
    return(
        <div className="bases">
            {props.miniStatus.map(mini => 
            <div key={mini.id} className="bases-divider">  
                <DrawBase 
                        mini={mini}
                        allBases={props.allBases}
                        allStatuses={props.allStatuses}
                        configureMini={props.configureMini}
                        configureOptions={props.configureOptions}
                />
            </div>
            )}
        </div>
    )
}

const DrawBase = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const base = props.allBases.find(x => x.id === props.mini.baseId) 
    const status = props.allStatuses.find(x => x.id === props.mini.statusId)
    const color = PrecentageColor(status.precentage)

    const handleConfigureMiniChange = (event) => {
        props.configureMini(props.mini, event.target.value)
        setDropdownOpen(!dropdownOpen)
    }

    const style =
        (base.shape == "square") ? ({
            width: base.width * 2,
            height: base.height * 2,
            backgroundColor: color
        }) : ({
            width: base.radiusX * 2,
            height: base.radiusY * 2,
            backgroundColor: color,
            borderRadius: "50%"
        })
    
    return (
        <div>
            <button
                className="bases-base"
                style={style}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                type="button"
            />
            {
            dropdownOpen && (
                <div>
                    <select
                        key="1"
                        name="settings"
                        id="settings"
                        onChange={handleConfigureMiniChange}
                        >
                            <option key="0" value="0">
                                options
                            </option>
                        {props.configureOptions.map(option =>
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        )}
                    </select>
                </div>
                )

            }
        </div>
    )
}


export default Bases



