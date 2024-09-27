import { useState, useEffect } from "react"

import unitService from '../services/unit'
import Bases from "./Bases";

import Modal from "./Modal"

const NewUnit = (props) => {
    const army_id = props.army_id
    
    const [newUnit, setNewUnit] = useState('')
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState(1)
    const [newUnitCategory, setNewUnitCategory] = useState('null')
    const [newMiniStatus, setNewMiniStatus] = useState([])
    const [newUnitBases, setNewUnitBases] = useState("1")

    const handleUnitChange = (event) => {
      setNewUnit(event.target.value)

    }
    const handleUnitMiniAmountChange = (event) => {
      setNewUnitMiniAmount(event.target.value)
    }
    const handleUnitCategoryChange = (event) => {
      setNewUnitCategory(event.target.value)
    }
    const handleUnitBaseChange = (event) =>  {
      setNewUnitBases(event.target.value)
    }
  
    const newMiniStatusObject = (base) => {
      const miniStatusObject = {
        baseId: base,
        statusID: ""
      }
    }

    const addNewUnit = (event) => {
      event.preventDefault()
      const unitObject = {
        name: newUnit,
        miniAmount: newUnitMiniAmount,
        miniCategoryId: (newUnitCategory == 'null') ? props.allCategories[0].id : newUnitCategory,
        miniStatus: [],
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
          <Modal 
            ModalButton = {"add new unit"}
            ModalHeader = {"newUnit"}
            ModalContent = {
              <form onSubmit={addNewUnit} >
                <input 
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
                  key="3"
                  name="bases"
                  id="bases"
                  onChange={handleUnitBaseChange}
                >
                  {props.allBases.map(base => 
                    <option key={base.id} value={base.id}>
                      {base.name} {base.shape}
                    </option>
                  )}
                </select>
                <select
                  key="4" 
                  name="category" 
                  id="category" 
                  onChange={handleUnitCategoryChange}
                >
                  {props.allCategories.map(category => 
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )}
                </select>
                
                <div>
                  <button type="submit">add</button>
                </div>
              </form>
            }  
          />
        </div>
    )
}

export default NewUnit