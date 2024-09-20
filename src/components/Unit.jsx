import { useState, useEffect } from 'react'
import unitService from '../services/unit'

const UnitName = (props) => {
    if (props.name.trim() != "" || props.name.trim().length != 0) {
        return(
            <div className={props.className}>
                {props.name} 
            </div>
        )
    }
    return(
        <div className={props.className}>
            -undefined- 
        </div>
    ) 
}

const UnitMiniAmount = (props) => {
    if (props.miniAmount) {
        return(
            <div className={props.className}>
                {props.miniAmount} 
            </div>
        )
    }
    return(
        <div className={props.className}>
            -none- 
        </div>
    )
}


export const setAllUnitsOutside = (returnedUnit) => {
    allUnits.concat(returnedUnit)
}

const Unit = (props) => {
    const [allUnits, setAllUnits] = useState([])

    const allUnitHook = () => {
        unitService.getAll().then(initialUnits => {
          setAllUnits(initialUnits)
        })
      }
    useEffect(allUnitHook, [])

    return(
        <div>
            <div className='div-table'>
                {allUnits.map(unit =>
                <div key={unit.id} className='div-table-row'>
                    <UnitName 
                        name={unit.name} 
                        className='div-table-col'
                    />
                    <UnitMiniAmount 
                        miniAmount={unit.miniAmount} 
                        className='div-table-col'
                    />
                </div>
                )}
            </div>
        </div>
    )
}

export default Unit