import { useState, useEffect } from 'react'
import unitService from '../services/unit'
import categoryService from '../services/category'

import NewUnit from './NewUnit'
import NewCategory from './NewCategory'


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

const UnitminiCategory = (props) => {
    if (props.miniCategory) {
        return(
            <div className={props.className}>
                {props.miniCategory} 
            </div>
        )
    }
    return(
        <div className={props.className}>
            -none- 
        </div>
    )
}

const Unit = (props) => {
    const [allUnits, setAllUnits] = useState([])
    const [allCategories, setAllCategories] = useState([])
    
    const allUnitHook = () => {
        unitService.getAll().then(initialUnits => {
          setAllUnits(initialUnits)
        })
      }
    useEffect(allUnitHook, [])

    const allCategoryHook = () => {
        categoryService.getAll().then(initialCategories => {
            setAllCategories(initialCategories)
        })
    }
    useEffect(allCategoryHook, [])

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
                    <UnitminiCategory
                        miniCategory={unit.miniCategory}
                        className='div-table-col'
                    />
                </div>
                )}
            </div>

            <NewUnit allUnits={allUnits} setAllUnits={setAllUnits} allCategories={allCategories}/>
            <NewCategory allCategories={allCategories} setAllCategories={setAllCategories}/>
        </div>
    )
}

export default Unit