import { useState, useEffect } from "react"

import Army from "./Army"
import NewArmy from "./NewArmy"

import armyService from "../services/army"
import baseService from "../services/bases";
import statusService from "../services/status";



const Listing = () => {
    const [allArmies, setAllArmies] = useState([])
    const [allBases, setAllBases] = useState([])
    const [allStatuses, setAllStatuses] = useState([])

    const allArmiesHook = () => {
        armyService.getAll().then(initialArmies => {
            setAllArmies(initialArmies)
        })
    }
    useEffect(allArmiesHook, [])
    
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


    return(
        <div>
            <div>
                {allArmies.map(army =>
                    <div key={army.id}>
                        <Army 
                            army={army} 
                            allBases={allBases}
                            allStatuses={allStatuses}
                        />
                    </div>
                )}
            </div>
            <NewArmy allArmies={allArmies} setAllArmies={setAllArmies} />
        </div>
    )
}

export default Listing