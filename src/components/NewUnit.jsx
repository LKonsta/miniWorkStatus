import { useState, useEffect } from "react"

import unitService from '../services/unit'
import Bases from "./Base";

import Modal from "./Modal"

const NewUnit = (props) => {
    const [newUnit, setNewUnit] = useState('')
    const [newUnitInfo, setNewUnitInfo] = useState('')
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState(1)
    const [newUnitCategory, setNewUnitCategory] = useState('null')
    const [newUnitBases, setNewUnitBases] = useState("1")
    const [newInitialStatus, setNewInitialStatus] = useState("1")
    const [newMiniStatus, setNewMiniStatus] = useState([{"id": 1,"baseId": "1","statusId": "1"}])

    const handleUnitChange = (event) => {
      setNewUnit(event.target.value)
      initBases()
    }
    const handleUnitInfoChange = (event) => {
        setNewUnitInfo(event.target.value)
    }
    const handleUnitMiniAmountChange = (event) => {
      setNewUnitMiniAmount(event.target.value)
      const amount = event.target.value
      initBases({amount})
    }
    const handleUnitCategoryChange = (event) => {
      setNewUnitCategory(event.target.value)
    }
    const handleUnitBaseChange = (event) =>  {
      setNewUnitBases(event.target.value)
      const bases = event.target.value
      initBases({bases})
    }
    const handleInitialStatusChange= (event) => {
      setNewInitialStatus(event.target.value)
      const status = event.target.value
      initBases({status})
    }
  
    const initBases = (props) => {
        const mAmount = (props && props.amount) ? (props.amount) : (newUnitMiniAmount)
        const mBases = (props && props.bases) ? (props.bases) : (newUnitBases)
        const mStatus = (props && props.status) ? (props.status) : (newInitialStatus)
        let miniStatusList = []
        for (let i = 0;i < mAmount;i++) {
            const miniStatusObject = {
                id: i+1,
                baseId: mBases,
                statusId: mStatus
            }
            miniStatusList.push(miniStatusObject)
        }
        setNewMiniStatus(miniStatusList)
    }

    function configureBase(mini, newBase) {
        const newMiniStatusList = newMiniStatus.map((miniStatus) => {
            if (miniStatus.id === mini.id) {
                const updatedMiniStatusObject = {
                    ...mini,
                    baseId: newBase,
                }
                return updatedMiniStatusObject
            }
            return miniStatus
        })
        setNewMiniStatus(newMiniStatusList)
    }

    const addNewUnit = (event) => {
      event.preventDefault()
      const unitObject = {
          name: newUnit,
        info: newUnitInfo,
        miniAmount: newUnitMiniAmount,
        miniStatus: newMiniStatus,
        categoryId: (newUnitCategory == 'null') ? props.allCategories[0].id : newUnitCategory,
        armyId: props.armyId
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
                    key="2"
                    value={newUnitInfo}
                    onChange={handleUnitInfoChange} 
                />
                <input
                  className="input-integer"
                  key="3"
                  value={newUnitMiniAmount}
                  onChange={handleUnitMiniAmountChange}
                />
                <select 
                  key="4"
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
                  key="5" 
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
                  key="6" 
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
                
                <Bases
                    miniStatus={newMiniStatus}
                    allBases={props.allBases}
                        allStatuses={props.allStatuses}
                        configureOptions={props.allBases}
                    configureMini={configureBase}
                    />
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