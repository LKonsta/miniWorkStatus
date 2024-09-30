import { useState, useEffect } from "react"

import unitService from '../services/unit'
import { BaseEdit as BaseEdit } from "./Base";

import Modal from "./Modal"

const NewUnit = (props) => {
    const army_id = props.army_id
    
    const [newUnit, setNewUnit] = useState('')
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState(1)
    const [newUnitCategory, setNewUnitCategory] = useState('null')
    const [newUnitBases, setNewUnitBases] = useState("1")
    const [newInitialStatus, setNewInitialStatus] = useState("1")
    const [newMiniStatus, setNewMiniStatus] = useState([])
    

    const handleUnitChange = (event) => {
      setNewUnit(event.target.value)
      initBases()
    }
    const handleUnitMiniAmountChange = (event) => {
      setNewUnitMiniAmount(event.target.value)
      initBases()
    }
    const handleUnitCategoryChange = (event) => {
      setNewUnitCategory(event.target.value)
    }
    const handleUnitBaseChange = (event) =>  {
      setNewUnitBases(event.target.value)
      initBases()
    }

    const handleInitialStatusChange= (event) => {
      setNewInitialStatus(event.target.value)
      initBases()
    }
  
    const initBases = () => {
      console.log(newMiniStatus)
      let miniStatusList = []
      for (let i = 0;i < newUnitMiniAmount;i++) {
        const miniStatusObject = {
          id: i+1,
          baseId: newUnitBases,
          statusId: newInitialStatus
        }
        miniStatusList.push(miniStatusObject)
      }
      console.log(miniStatusList)
      setNewMiniStatus(miniStatusList)
    }
    

    const addNewUnit = (event) => {
      event.preventDefault()
      const unitObject = {
        name: newUnit,
        miniAmount: newUnitMiniAmount,
        categoryId: (newUnitCategory == 'null') ? props.allCategories[0].id : newUnitCategory,
        miniStatus: newMiniStatus,
  
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
            ModalHeader = {"New unit"}
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
                <select
                  key="5" 
                  name="initialStatus" 
                  id="initialStatus" 
                  onChange={handleInitialStatusChange}
                >
                  {props.allStatuses.map(status => 
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  )}
                </select>
                <div>
                  dsadsda
                  {newMiniStatus.map(mini => {
                    <div>  
                      <div>
                        dsadsadsa
                      </div>
                      <BaseEdit 
                        mini={mini} 
                        allBases={props.allBases} 
                      />
                    </div>
                  })}
                </div>
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