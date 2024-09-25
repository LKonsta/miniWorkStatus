import { useState, useEffect } from "react"

import armyService from '../services/army'

const NewArmy = (props) => {
    const [newArmyName, setNewArmyName] = useState('')

    const handleArmyNameCHange = (event) => {
        setNewArmyName(event.target.value)
    }
    const addNewArmy = (event) => {
        event.preventDefault()
        const armyObject = {
            name: newArmyName,
            categories: [],
            units: []
        }
        armyService
            .create(armyObject)
            .then(returnedArmy => {
                props.setAllArmies(props.allArmies.concat(returnedArmy))
                setNewArmyName('')
            })
    }
    return(
        <div>
            <form onSubmit={addNewArmy}>
                <input 
                    key = "1"
                    value={newArmyName}
                    onChange={handleArmyNameCHange}
                />
                <button type="submit">add new army</button>
            </form>
        </div>
    )
}


export default NewArmy