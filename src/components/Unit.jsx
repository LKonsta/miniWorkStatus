import { useState, useEffect } from 'react'
import unitService from '../services/unit'
import categoryService from '../services/category'

import NewUnit from './NewUnit'
import Categories from './Categories'


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

const UnitminiCategory = (props) => {
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


const Unit = (props) => {
    const [allUnits, setAllUnits] = useState([])
    const [allCategories, setAllCategories] = useState([])
    
    const allUnitHook = () => {
        unitService.getAll().then(initialUnits => {
          setAllUnits(initialUnits)
        })
      }
    useEffect(allUnitHook, [])

    const allCategoriesHook = () => {
        categoryService.getAll().then(initialCategories => {
            setAllCategories(initialCategories)
        })
    }
    useEffect(allCategoriesHook, [])

    const sortedCategories = (allCategories.sort((a, b) => a.index - b.index))

    return(
        <div> 
            {sortedCategories.map(category =>
                <div key={category.id}>
                    <h3>{category.name}</h3> 
                    <div className='div-table'> 
                        {allUnits.map(unit =>
                            <>
                                {(unit.miniCategory===category.id) && 
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
                                            miniCategoryName={category.name}
                                            className='div-table-col'
                                        />
                                    </div>
                                }
                            </>
                        )}
                    </div>
                </div>
            )}
            <NewUnit allUnits={allUnits} setAllUnits={setAllUnits} allCategories={allCategories}/>
            <Categories allCategories={allCategories} setAllCategories={setAllCategories}/>
        </div>
    )
}

export default Unit