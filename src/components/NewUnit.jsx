import { useState, useEffect } from "react"

import unitService from '../services/unit'

const NewUnit = (props) => {

    const [newUnit, setNewUnit] = useState('')
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState(1)
    const [newUnitCategory, setNewUnitCategory] = useState('Hero/Lord')
  
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
        miniCategory: newUnitCategory
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
            key="1"
            value={newUnit}
            onChange={handleUnitChange}
          />
          <input
            key="2"
            value={newUnitMiniAmount}
            onChange={handleUnitMiniAmountChange}
          />
          <select
            key="3" 
            name="category" 
            id="category" 
            onChange={handleUnitCategoryChange}>
            {props.allCategories.map(category => 
              <option key={category.id} value={category.name}>
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