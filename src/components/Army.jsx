import { useState, useEffect } from "react";

import Categories from "./Categories";
import Unit from "./Unit";
import NewUnit from "./NewUnit";

import unitService from "../services/unit";
import categoryService from "../services/category";
import armyService from "../services/army";


const Army  = (props) => {
    const armyId = props.army.id
    const [allUnits, setAllUnits] = useState([])
    const [allCategories, setAllCategories] = useState([])

    const allUnitHook = () => {
        unitService.getAll(armyId).then(initialUnits => {
          setAllUnits(initialUnits)
        })
    }
    useEffect(allUnitHook, [])

    const allCategoriesHook = () => {
        categoryService.getAll(armyId).then(initialCategories => {
            setAllCategories(initialCategories)
        })
    }
    useEffect(allCategoriesHook, [])



    const sortedCategories = (allCategories.sort((a, b) => a.index - b.index))
    return(
        <div>
            <h1>{props.army.name}</h1>
            {sortedCategories.map(category =>
                <div key={category.id}>
                    <h3>{category.name}</h3> 
                    <div className='div-table'> 
                        {allUnits.map(unit =>
                            <div key={unit.id}>
                                {(unit.categoryId===category.id) && 
                                    <div key={unit.id} className='div-table-row'>
                                        <Unit 
                                            unit={unit} 
                                            allUnits={allUnits}
                                            setAllUnits={setAllUnits}
                                            category={category} 
                                            allBases={props.allBases} 
                                            allStatuses={props.allStatuses}
                                        />
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
            <NewUnit 
                armyId={armyId} 
                allUnits={allUnits} 
                setAllUnits={setAllUnits} 
                allCategories={allCategories}
                allBases={props.allBases}
                allStatuses={props.allStatuses}
            />

            <Categories 
                armyId={armyId} 
                allCategories={allCategories} 
                setAllCategories={setAllCategories}
            />
        </div>
    )
}

export default Army