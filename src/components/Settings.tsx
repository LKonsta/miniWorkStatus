import { useState, useEffect } from 'react';
import baseService from '../services/bases';
import statusService from '../services/status';
import Modal from '../components/Modal';
import { BaseType, StatusType } from './types/defaultTypes';
import { useBaseContext } from './context/BaseContext';
import { useStatusContext } from './context/StatusContext';
import { DrawDummy } from './Base';
import './Settings.scss'

const Settings: React.FC = () => {
    /* Bases Values and Operators */
    const { allBases, addBase, removeBase } = useBaseContext();

    const [baseShapes] = useState < string[] > (["square", "round"]);
    const [newBaseShape, setNewBaseShape] = useState < string > ('square');
    const [newBaseWidth, setNewBaseWidth] = useState < number > (10);
    const [newBaseHeight, setNewBaseHeight] = useState < number > (10);

    const handleNewBaseShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewBaseShape(event.target.value);
    };

    const handleNewBaseWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBaseWidth(Number(event.target.value));
        setNewBaseHeight(Number(event.target.value));
    };

    const handleNewBaseHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBaseHeight(Number(event.target.value));
    };

    const addNewBase = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newBaseObject = {
            name: newBaseShape === 'square' ? `${newBaseWidth}x${newBaseHeight}` : `${newBaseWidth}x${newBaseHeight}mm`,
            shape: newBaseShape,
            width: newBaseWidth,
            height: newBaseHeight,
        };
        await addBase(newBaseObject)
    };


    /* Status Values and Operators */
    const { allStatuses, addStatus, removeStatus } = useStatusContext();

    const [newStatusName, setNewStatusName] = useState < string > ('');
    const [newStatusPrecentageValue, setNewStatusPrecentageValue] = useState < string > ('50');

    const handleNewStatusNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewStatusName(event.target.value);
    };

    const handleNewStatusPrecentageValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewStatusPrecentageValue(event.target.value);
    };

    const addNewStatus = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newStatusObject = {
            name: newStatusName,
            percentage: parseFloat(newStatusPrecentageValue) / 100,
        };
        await addStatus(newStatusObject);
    };

    return (
        <div>
            <Modal
                ModalButton={"Settings"}
                ModalHeader={"Base and Status settings"}
                ModalContent={
                    <div>
                        {/* base list */}
                        <span className='settings-bases-title'> Bases </span>
                        <div className='settings-bases'>
                            <div className='settings-bases-list'>
                            {allBases.length > 0 &&
                                allBases.map(base =>
                                    <div key={base.id} className='settings-bases-list-item'>
                                        {base.shape} {base.name}
                                        <button 
                                            onClick={() => removeBase(base.id)} 
                                            className='settings-bases-list-remove'
                                        >remove</button>
                                    </div>
                                )
                            }
                            </div>
                            
                            {/* add base form */}
                            <form onSubmit={addNewBase} className='settings-bases-form'>
                                <div className='settings-bases-form-preview'>
                                <DrawDummy width={newBaseWidth} height={newBaseHeight} shape={newBaseShape} />
                                </div>
                                <select
                                    className='settings-bases-form-input'
                                    name="bases"
                                    id="bases"
                                    onChange={handleNewBaseShapeChange}
                                    value={newBaseShape}
                                >
                                    {baseShapes.map(shape =>
                                        <option key={shape} value={shape}>
                                            {shape}
                                        </option>
                                    )}
                                </select>
                                <div>
                                    <input
                                        className='settings-bases-form-input'
                                        type="number"
                                        value={newBaseWidth}
                                        onChange={handleNewBaseWidthChange}
                                    />
                                    <input
                                        className='settings-bases-form-input'
                                        type="number"
                                        value={newBaseHeight}
                                        onChange={handleNewBaseHeightChange}
                                    />
                                </div>
                                <button type="submit" className='settings-bases-form-button'> add </button>
                            </form>
                            
                        </div>
                        
                        {/* status list */}
                        <span className='settings-status-title'> Statuses </span>
                        <div className='settings-status'>
                            <div className='settings-status-list'>
                                {allStatuses.length > 0 &&
                                    allStatuses.map(status =>
                                        <div key={status.id} className='settings-status-list-item'>
                                            {status.name}
                                            <button 
                                            onClick={() => removeStatus(status.id)}
                                            className='settings-status-list-remove'
                                            >remove</button>
                                        </div>
                                    )
                                }
                            </div>
                            {/* add status form */}
                            <form onSubmit={addNewStatus} className='settings-status-form'>
                                <input
                                    className='settings-status-form-input'
                                    value={newStatusName}
                                    onChange={handleNewStatusNameChange}
                                />
                                <input
                                    className='settings-status-form-slider'
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={newStatusPrecentageValue}
                                    onChange={handleNewStatusPrecentageValueChange}
                                />
                                <div> {newStatusPrecentageValue ? newStatusPrecentageValue : 0} % </div>
                                <button type="submit" className='settings-status-form-button'> add </button>
                            </form>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Settings;
