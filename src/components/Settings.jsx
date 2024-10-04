import { useState, useEffect } from 'react'

import baseService from '../services/bases'
import statusService from '../services/status'

import Modal from '../components/Modal'

const Settings = () => {

    /* Bases Values and Operators */
    const [allBases, setAllBases] = useState([])
    const allBaseHook = () => {
        baseService.getAll().then(initialBases => {
            setAllBases(initialBases)
        })
    }
    useEffect(allBaseHook, [])

    const [baseShapes, setBaseShapes] = useState(["square", "circle"])

    const [newBaseShape, setNewBaseShape] = useState('square')
    const [newBaseWidth, setNewBaseWidth] = useState(0)
    const [newBaseHeight, setNewBaseHeight] = useState(0)
    const [newBaseRadiusX, setNewBaseRadiusX] = useState(0)
    const [newBaseRadiusY, setNewBaseRadiusY] = useState(0)

    const handleNewBaseShapeChange = (event) => {
        setNewBaseShape(event.target.value)
    }
    const handleNewBaseWidthChange = (event) => {
        setNewBaseWidth(Number(event.target.value))
        setNewBaseHeight(Number(event.target.value))
    }
    const handleNewBaseHeightChange = (event) => {
        setNewBaseHeight(Number(event.target.value))
    }
    const handleNewBaseRadiusXChange = (event) => {
        setNewBaseRadiusX(Number(event.target.value))
        setNewBaseRadiusY(Number(event.target.value))
    }
    const handleNewBaseRadiusYChange = (event) => {
        setNewBaseRadiusY(Number(event.target.value))
    }

    const addNewBase = (event) => {
        event.preventDefault()
        const newBaseObject = (newBaseShape == 'square') ? (
            {
                name: `${newBaseWidth}x${newBaseHeight}`,
                shape: newBaseShape,
                width: newBaseWidth,
                height: newBaseHeight
            }
        ) : (
            {
                name: (newBaseRadiusX == newBaseRadiusY) ? (`${newBaseRadiusX}mm`) : (`${newBaseRadiusX}x${newBaseRadiusY}mm`),
                shape: newBaseShape,
                radiusX: newBaseRadiusX,
                radiusY: newBaseRadiusY
            }
        )
        baseService.create(newBaseObject).then(returnedBase => {
            setAllBases(allBases.concat(returnedBase))
        })

    }
    const removeBase = ({ base }) => {
        console.log(base)
        baseService.remove(base.id).then(() => {
            setAllBases(allBases.filter(u => u.id !== base.id))
        })
    }

    /* Status Values and Operators */
    const [allStatuses, setAllStatuses] = useState([])
    const allStatusHook = () => {
        statusService.getAll().then(initialStatuses => {
            setAllStatuses(initialStatuses)
        })
    }
    useEffect(allStatusHook, [])

    const [newStatusName, setNewStatusName] = useState('')
    const [newStatusPrecentageValue, setNewStatusPrecentageValue] = useState('')

    const handleNewStatusNameChange = (event) => {
        setNewStatusName(event.target.value)
    }
    const handleNewStatusPrecentageValueChange = (event) => {
        setNewStatusPrecentageValue(event.target.value)
    }


    const addNewStatus = (event) => {
        event.preventDefault()
        const newStatusObject = {
            name: newStatusName,
            precentage: newStatusPrecentageValue/100
        }
        statusService.create(newStatusObject).then(returnedStatus => {
            setAllStatuses(allStatuses.concat(returnedStatus))
            setNewStatusName('')
        })

    }
    const removeStatus = ({status}) => {
        statusService.remove(status.id).then(() => {
            setAllStatuses(allStatuses.filter(u => u.id !== status.id))
        })
    }
    
    return (
        <div>
            <Modal
                ModalButton={"Settings"}
                ModalHeader={"Base and Status settings"}
                ModalContent={
                    <div>
                        <div>
                            {allBases.length > 0 && 
                                allBases.map(base =>
                                    <div key={base.id}>
                                        {base.shape} {base.name}
                                        <button onClick={() => removeBase({ base })}>
                                            remove
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <SettingsBaseFrom
                            addNewBase={addNewBase}
                            baseShapes={baseShapes}
                            newBaseShape={newBaseShape}
                            handleNewBaseShapeChange={handleNewBaseShapeChange}
                            newBaseHeight={newBaseHeight}
                            handleNewBaseHeightChange={handleNewBaseHeightChange}
                            newBaseWidth={newBaseWidth}
                            handleNewBaseWidthChange={handleNewBaseWidthChange}
                            newBaseRadiusX={newBaseRadiusX}
                            handleNewBaseRadiusXChange={handleNewBaseRadiusXChange}
                            newBaseRadiusY={newBaseRadiusY}
                            handleNewBaseRadiusYChange={handleNewBaseRadiusYChange}
                        />
                            
                        <div>
                            {allStatuses.length > 0 &&
                                allStatuses.map(status =>
                                    <div key={status.id}>
                                        {status.name}
                                        <button onClick={() => removeStatus({ status })}>
                                            remove
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <SettingsStatusForm
                            addNewStatus={addNewStatus}
                            newStatusName={newStatusName}
                            newStatusPrecentageValue={newStatusPrecentageValue}
                            handleNewStatusNameChange={handleNewStatusNameChange}
                            handleNewStatusPrecentageValueChange={handleNewStatusPrecentageValueChange}
                        />
                    </div>
                }
            />
        </div>
    )
}

const SettingsBaseFrom = ({
    addNewBase,
    baseShapes,
    newBaseShape,
    handleNewBaseShapeChange,
    newBaseHeight,
    handleNewBaseHeightChange,
    newBaseWidth,
    handleNewBaseWidthChange,
    newBaseRadiusX,
    handleNewBaseRadiusXChange,
    newBaseRadiusY,
    handleNewBaseRadiusYChange,
    
}) => {
    return(
        <form onSubmit={addNewBase}>
            <select
                name="bases"
                id="bases"
                onChange={handleNewBaseShapeChange}
            >
                {baseShapes.map(shape =>
                    <option key={shape} value={shape}>
                        {shape}
                    </option>
                )}
            </select>
            {(newBaseShape == "square") ? (
                <div>
                    <input
                        value={newBaseWidth}
                        onChange={handleNewBaseWidthChange}                                
                    />  
                    <input
                        value={newBaseHeight}
                        onChange={handleNewBaseHeightChange}                                
                    /> 
                </div>
            ) : (
                    <div>
                        <input
                            value={newBaseRadiusX}
                            onChange={handleNewBaseRadiusXChange}
                        />
                        <input
                            value={newBaseRadiusY}
                            onChange={handleNewBaseRadiusYChange}
                        />
                    </div>               
            )}
            <button type="submit"> add </button>
        </form>
    )
}

const SettingsStatusForm = ({
    addNewStatus,
    newStatusName,
    newStatusPrecentageValue,
    handleNewStatusNameChange,
    handleNewStatusPrecentageValueChange
}) => {
    return (
        <form onSubmit={addNewStatus}>
            <input
                value={newStatusName}
                onChange={handleNewStatusNameChange}
            />
            <input
                key="silder"
                type="range"
                min="0"
                max="100"
                value={newStatusPrecentageValue}
                onChange={handleNewStatusPrecentageValueChange}
            />
            <div> {(newStatusPrecentageValue)} % </div>
            <button type="submit"> add </button>
        </form>
    )
}






export default Settings