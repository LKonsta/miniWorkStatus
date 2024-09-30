import { useState, useEffect } from 'react'
import unitService from '../services/unit'
import categoryService from '../services/category'

import NewUnit from './NewUnit'
import Categories from './Categories'
import {Base as Base} from './Base' 

const UnitName = (props) => {
    return(
        <div className={props.className}>
            {
                (props.name.trim().length != 0) 
                ? (props.name) 
                : ("--undefined--")
            }
        </div>
    ) 
}

const UnitMiniAmount = (props) => {
    return(
        <div className={props.className}>
            {
                (props.miniAmount)
                ? (props.miniAmount)
                : ("--none--")
            }
        </div>
    )
}

const UnitMiniCategory = (props) => {
    return(
        <div className={props.className}>
            {
                (props.miniCategory)
                ? (props.miniCategoryName)
                : ("--none--")
            }
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
              {
                (open) ? ('close') : ('open')
              }
            </button>
            {open && (
            <div>
                {
                    (props.miniStatus)
                    ? (
                    <div>
                        {props.miniStatus.map(mini => 
                            <Base 
                                mini={mini} 
                                allBases={props.allBases}
                                allStatuses={props.allStatuses}    
                            />
                        )}
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
                onClick={() => removeUnit(props.unit)
            }> X </button>
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
                className='div-table-number'
            />
            <UnitName 
                name={unit.name} 
                className='div-table-col'
            />
            <UnitMiniCategory
                miniCategory={unit.miniCategory}
                miniCategoryName={category.name}
                className='div-table-col'
            />
            <UnitMiniStatus
                miniStatus={unit.miniStatus}
                allBases={props.allBases}
                allStatuses={props.allStatuses}
                className='div-table-dropdown'
            />
            <UnitRemove
                unit={unit}
                allUnits={props.allUnits}
                setAllUnits={props.setAllUnits}
            />
        </div>
    )
}

export default Unit