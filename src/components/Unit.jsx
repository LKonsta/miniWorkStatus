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
            <UnitminiCategory
                miniCategory={unit.miniCategory}
                miniCategoryName={category.name}
                className='div-table-col'
            />
        </div>
    )
}

export default Unit