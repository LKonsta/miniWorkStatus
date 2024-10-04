import {useState, useEffect } from "react"

import unitService from '../services/unit'

import Modal from "./Modal"
import Bases from "./Base"

const EditUnit = (props) => {
    const modal_header = (`Editing: ${props.unit.name}`)

    const [newUnitName, setNewUnitName] = useState(props.unit.name)
    const [newUnitInfo, setNewUnitInfo] = useState(props.unit.info)
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState(props.unit.miniAmount)
    const [newMiniStatus, setNewMiniStatus] = useState(props.unit.miniStatus)
    const [newUnitCategory, setNewUnitCategory] = useState(props.unit.categoryId)

    const [newUnitBases, setNewUnitBases] = useState((props.unit.miniStatus) ? (Object.values(props.unit.miniStatus[0])[1]): (1))
    const [newInitialStatus, setNewInitialStatus] = useState((props.unit.miniStatus) ? (Object.values(props.unit.miniStatus[0])[2]) : (1))

    const handleUnitNameChange = (event) => {
        setNewUnitName(event.target.value)
    }
    const handleUnitInfoChange = (event) => {
        setNewUnitInfo(event.target.value)
    }
    const handleUnitMiniAmountChange = (event) => {
        setNewUnitMiniAmount(event.target.value)
        const amount = event.target.value
        initBases({ amount })
    }
    const handleUnitCategoryChange = (event) => {
        setNewUnitCategory(event.target.value)
    }
    const handleUnitBaseChange = (event) => {
        setNewUnitBases(event.target.value)
        const bases = event.target.value
        initBases({ bases })
    }
    const handleInitialStatusChange = (event) => {
        setNewInitialStatus(event.target.value)
        const status = event.target.value
        initBases({ status })
    }
    const initBases = (props) => {
        console.log()
        const mAmount = (props && props.amount) ? (props.amount) : (newUnitMiniAmount)
        const mBases = (props && props.bases) ? (props.bases) : (newUnitBases)
        const mStatus = (props && props.status) ? (props.status) : (newInitialStatus)
        console.log(mStatus, " & ", props.status, " # ", newInitialStatus)
        let miniStatusList = []
        for (let i = 0; i < mAmount; i++) {
            const miniStatusObject = {
                id: i + 1,
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

    const modifyUnit = (event) => {
        event.preventDefault()
        
        const newAllUnits = props.allUnits.map((unit) => {
            if (unit.id === props.unit.id) {
                const unitObject = {
                    name: newUnitName,
                    info: newUnitInfo,
                    miniAmount: newUnitMiniAmount,
                    miniStatus: newMiniStatus,
                    categoryId: newUnitCategory,
                    armyId: props.unit.armyId,
                }
                unitService.update(props.unit.id, unitObject)
                return unitObject
            }
            return unit
        })
        props.setAllUnits(newAllUnits)

    }
    
    return (
        <div>
            <Modal
                ModalButton={"Edit"}
                ModalHeader={modal_header}
                ModalContent={
                    <form onSubmit={modifyUnit}>
                        <input
                            key="1"
                            value={newUnitName}
                            onChange={handleUnitNameChange}
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
                            <button type="submit">save</button>
                        </div>
                    </form>
                }
                />
        </div>
    )
}

export default EditUnit