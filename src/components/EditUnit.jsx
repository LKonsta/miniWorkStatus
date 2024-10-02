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

    const [newUnitBases, setNewUnitBases] = useState((props.unit.miniStatus) ? (props.unit.miniStatus[0].baseId): (1))
    const [newInitialStatus, setNewInitialStatus] = useState((props.unit.miniStatus) ? (props.unit.miniStatus[0].StatusId) : (1))
    
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
        const mAmount = (props && props.amount) ? (props.amount) : (newUnitMiniAmount)
        const mBases = (props && props.bases) ? (props.bases) : (newUnitBases)
        const mStatus = (props && props.status) ? (props.status) : (newInitialStatus)
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
    
    return(
        <div>
            <Modal
                ModalButton={"Edit"}
                ModalHeader={modal_header}
                ModalContent={
                    <form>
                      
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