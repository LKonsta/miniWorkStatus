import { useState, useEffect } from "react"

import Army from "./Army"
import NewArmy from "./NewArmy"

import armyService from "../services/army"

const Listing = () => {
    const [allArmies, setAllArmies] = useState([])

    const allArmiesHook = () => {
        armyService.getAll().then(initialArmies => {
            setAllArmies(initialArmies)
        })
    }
    useEffect(allArmiesHook, [])
    
    return(
        <div>
            <div>
                {allArmies.map(army =>
                    <div>
                        <Army army={army} />
                    </div>
                )}
            </div>
            <NewArmy allArmies={allArmies} setAllArmies={setAllArmies} />
        </div>
    )
}

export default Listing