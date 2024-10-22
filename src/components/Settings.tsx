import { useState, useEffect } from 'react';
import baseService from '../services/bases';
import statusService from '../services/status';
import Modal from '../components/Modal';
import { BaseType, StatusType } from './types/defaultTypes';
import { useBaseContext } from './context/BaseContext';
import { useStatusContext } from './context/StatusContext';

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
    const [newStatusPrecentageValue, setNewStatusPrecentageValue] = useState < string > ('');

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
                        <div>
                            {allBases.length > 0 &&
                                allBases.map(base =>
                                    <div key={base.id}>
                                        {base.shape} {base.name}
                                        <button onClick={() => removeBase(base.id)}>
                                            remove
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        {/* add base form */}
                        <form onSubmit={addNewBase}>
                            <select
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
                                    type="number"
                                    value={newBaseWidth}
                                    onChange={handleNewBaseWidthChange}
                                />
                                <input
                                    type="number"
                                    value={newBaseHeight}
                                    onChange={handleNewBaseHeightChange}
                                />
                            </div>
                            <button type="submit"> add </button>
                        </form>
                        {/* status list */}
                        <div>
                            {allStatuses.length > 0 &&
                                allStatuses.map(status =>
                                    <div key={status.id}>
                                        {status.name}
                                        <button onClick={() => removeStatus(status.id)}>
                                            remove
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        {/* add status form */}
                        <form onSubmit={addNewStatus}>
                            <input
                                value={newStatusName}
                                onChange={handleNewStatusNameChange}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={newStatusPrecentageValue}
                                onChange={handleNewStatusPrecentageValueChange}
                            />
                            <div> {newStatusPrecentageValue} % </div>
                            <button type="submit"> add </button>
                        </form>
                    </div>
                }
            />
        </div>
    );
};

export default Settings;
