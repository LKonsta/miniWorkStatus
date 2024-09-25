import { useState, useEffect } from "react"

import unitService from '../services/unit'

const NewUnit = (props) => {
    const army_id = props.army_id
    
    const [newUnit, setNewUnit] = useState('')
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState(1)
    const [newUnitCategory, setNewUnitCategory] = useState('null')

    const handleUnitChange = (event) => {
      setNewUnit(event.target.value)
    }
    const handleUnitMiniAmountChange = (event) => {
      setNewUnitMiniAmount(event.target.value)
    }
    const handleUnitCategoryChange = (event) => {
      setNewUnitCategory(event.target.value)
    }
  
    const addNewUnit = (event) => {
      event.preventDefault()
      const unitObject = {
        name: newUnit,
        miniAmount: newUnitMiniAmount,
        miniCategory: (newUnitCategory == 'null') ? props.allCategories[0].id : newUnitCategory,
        armyId: army_id
      }
      unitService
        .create(unitObject)
          .then(returnedUnit => {
            props.setAllUnits(props.allUnits.concat(returnedUnit))
            setNewUnit('')
            setNewUnitMiniAmount(1) 
      })
    }

    return(
        <div>
        <form onSubmit={addNewUnit}>
          <input 
            className="input-string"
            key="1"
            value={newUnit}
            onChange={handleUnitChange}
          />
          <input
            className="input-integer"
            key="2"
            value={newUnitMiniAmount}
            onChange={handleUnitMiniAmountChange}
          />
          <select
            key="4" 
            name="category" 
            id="category" 
            onChange={handleUnitCategoryChange}>
            {props.allCategories.map(category => 
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )}
          </select>
          <button type="submit">add</button>
        </form>
      </div>
    )
}

export default NewUnit