import { useState, useEffect } from "react"

import unitService from '../services/unit'
import { setAllUnitsOutside }  from './Unit'


const NewUnit = () => {

    const [newUnit, setNewUnit] = useState('')
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState("1")
  
    const handleUnitChange = (event) => {
      console.log(event.target.value)
      setNewUnit(event.target.value)
    }
    const handleUnitMiniAmountChange = (event) => {
      setNewUnitMiniAmount(event.target.value)
    }
  
    const addNewUnit = (event) => {
      event.preventDefault()
      const unitObject = {
        name: newUnit,
        miniAmount: newUnitMiniAmount
      }
      unitService
        .create(unitObject)
          .then(returnedUnit => {
            setAllUnitsOutside(returnedUnit)
            setNewUnit('')
            setNewUnitMiniAmount(1)  
      })
    }

    return(
        <div>
        <form onSubmit={addNewUnit}>
          <input
            name={newUnit}
            onChange={handleUnitChange}
          />
          <input
            name={newUnitMiniAmount}
            onChange={handleUnitMiniAmountChange}
          />
          <button type="submit">add</button>
        </form>
      </div>
    )
}

export default NewUnit