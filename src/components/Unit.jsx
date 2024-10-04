import { useState, useEffect } from 'react'

import unitService from '../services/unit'
import categoryService from '../services/category'

import EditUnit from './EditUnit'
import NewUnit from './NewUnit'
import Categories from './Categories'
import Bases from './Base' 


const UnitMiniAmount = (props) => {
    const amount = (props.miniAmount) ? (props.miniAmount) : ("0")
    return(
        <div className={props.className}>
            {amount}
        </div>
    )
}

const UnitNameInfo = (props) => {
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
    const unit = props.unit

    const [open, setOpen] = useState(false);

    function configureStatus(mini, newStatus) {

        const newMiniStatusList = unit.miniStatus.map((miniStatus) => {
            if (miniStatus.id === mini.id) {
                const updatedMiniStatusObject = {
                    ...mini,
                    statusId: newStatus,
                }
                return updatedMiniStatusObject
            }
            return miniStatus
        })
        const unitObject = {
            ...unit,
            miniStatus: newMiniStatusList
        }
        
        unitService.update(unit.id, unitObject).then(() => {
            props.setUnit(unitObject)
        })
    }

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
                    (unit.miniStatus)
                    ? (
                    <div>
                        <Bases 
                            miniStatus={unit.miniStatus} 
                            allBases={props.allBases}
                            allStatuses={props.allStatuses}
                            configureOptions={props.allStatuses}
                            configureMini={configureStatus}
                            
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
    
    const [unit, setUnit] = useState(props.unit)
    const category = props.category
    return(
        <div>
            <UnitMiniAmount 
                miniAmount={unit.miniAmount} 
                className='unit-table-amount'
            />
            <UnitNameInfo
                name={unit.name} 
                info={unit.info}
                className='unit-table-name'
            />
            <UnitMiniStatus
                unit={unit}
                setUnit={setUnit}
                allUnits={props.allUnits}
                setAllUnits={props.setAllUnits}
                allBases={props.allBases}
                allStatuses={props.allStatuses}
                className='unit-table-dropdown'
            />
            <EditUnit
                unit={unit}
                allBases={props.allBases}
                allCategories={props.allCategories}
                allStatuses={props.allStatuses}
                setAllUnits={props.setAllUnits}
                allUnits={props.allUnits}
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