import { useState, useEffect } from "react";

import Categories from "./Categories";
import Unit from "./Unit";
import NewUnit from "./NewUnit";

import unitService from "../services/unit";
import categoryService from "../services/category";
import baseService from "../services/bases";
import statusService from "../services/status";
import armyService from "../services/army";


const Army  = (props) => {
    const army_id = props.army.id

    const [allUnits, setAllUnits] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [allBases, setAllBases] = useState([])
    const [allStatuses, setAllStatuses] = useState([])


    const allUnitHook = () => {
        unitService.getAll(army_id).then(initialUnits => {
          setAllUnits(initialUnits)
        })
    }
    useEffect(allUnitHook, [])

    const allCategoriesHook = () => {
        categoryService.getAll(army_id).then(initialCategories => {
            setAllCategories(initialCategories)
        })
    }
    useEffect(allCategoriesHook, [])

    const allBasesHook = () => {
        baseService.getAll().then(initialBases => {
            setAllBases(initialBases)
        })
    }
    useEffect(allBasesHook, [])

    const allStatusesHook = () => {
        statusService.getAll().then(initialStatuses => {
            setAllStatuses(initialStatuses)
        })
    }
    useEffect(allStatusesHook, [])


    const sortedCategories = (allCategories.sort((a, b) => a.index - b.index))
    return(
        <div>
            <h1>{props.army.name}</h1>
            {sortedCategories.map(category =>
                <div key={category.id}>
                    <h3>{category.name}</h3> 
                    <div className='div-table'> 
                        {allUnits.map(unit =>
                            <>
                                {(unit.categoryId===category.id) && 
                                    <div key={unit.id} className='div-table-row'>
                                        <Unit 
                                            unit={unit} 
                                            allUnits={allUnits}
                                            setAllUnits={setAllUnits}
                                            category={category} 
                                            allBases={allBases} 
                                            allStatuses={allStatuses}
                                        />
                                    </div>
                                }
                            </>
                        )}
                    </div>
                </div>
            )}
            <NewUnit 
                army_id={army_id} 
                allUnits={allUnits} 
                setAllUnits={setAllUnits} 
                allCategories={allCategories}
                allBases={allBases}
                allStatuses={allStatuses}
            />

            <Categories 
                army_id={army_id} 
                allCategories={allCategories} 
                setAllCategories={setAllCategories}
            />
        </div>
    )
}

export default Army