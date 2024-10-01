import { useState, useEffect } from 'react'
import unitService from '../services/unit'
import categoryService from '../services/category'

import EditUnit from './EditUnit'
import NewUnit from './NewUnit'
import Categories from './Categories'
import {Bases as Bases} from './Base' 


const UnitMiniAmount = (props) => {
    const amount = (props.miniAmount) ? (props.miniAmount) : ("0")
    return(
        <div className={props.className}>
            {amount}
        </div>
    )
}

const UnitName = (props) => {
    const name = (props.name) ? (props.name) : ("-undefined-")
    const info = (props.info) ? (props.info) : (null)
    return(
        <div className={props.className}>
            <div>
                {name}
            </div>
            {info}
        </div>
    ) 
}

const UnitMiniStatus = (props) => {
    const [open, setOpen] = useState(false);

    return(
        <div>
            <button 
              onClick={() => setOpen(!open)}
              type="button"
            >
              {(open) ? ('⤊') : ('⤋')}
            </button>
            {open && (
            <div>
                {
                    (props.miniStatus)
                    ? (
                    <div>
                        <Bases 
                            miniStatus={props.miniStatus} 
                            allBases={props.allBases}
                            allStatuses={props.allStatuses}    
                        />
                    </div>
                    )
                    : ("--none--")
                }
              
            </div>       
            )}
        </div>
    )
}

const UnitRemove = (props) => {
    const removeUnit = (unit) => {
        unitService.remove(unit.id).then(() => {
            props.setAllUnits(props.allUnits.filter(u => u.id !== unit.id))
        })
    }
    return(
        <div>
            <button
                className={props.className} 
                onClick={() => removeUnit(props.unit)}
            > X </button>
        </div>
    )
}



const Unit = (props) => {
    
    const unit = props.unit
    const category = props.category
    return(
        <div>
            <UnitMiniAmount 
                miniAmount={unit.miniAmount} 
                className='unit-table-amount'
            />
            <UnitName 
                name={unit.name} 
                info={unit.info}
                className='unit-table-name'
            />
            <UnitMiniStatus
                miniStatus={unit.miniStatus}
                allBases={props.allBases}
                allStatuses={props.allStatuses}
                className='unit-table-dropdown'
            />
            <EditUnit
                unit={unit}
                allBases={props.allBases}
                allCategories={props.allCategories}
                className='unit-table-right-button'
            />
            <UnitRemove
                unit={unit}
                allUnits={props.allUnits}
                setAllUnits={props.setAllUnits}
                className='unit-table-right-button'
            />
        </div>
    )
}

export default Unit