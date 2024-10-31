import React, { useState } from "react";
import unitService from '../services/unit';
import {Bases}  from "./Base";
import Modal from "./Modal";
import { UnitType, BaseType, StatusType, CategoryType, MiniStatusType } from '../components/types/defaultTypes';
import { useBaseContext } from "./context/BaseContext";
import { useStatusContext } from "./context/StatusContext";
import { useCategoryContext } from "./context/CategoryContext";
import { useUnitContext } from "./context/UnitContext";


const NewUnit: React.FC<{ armyId: string; }> = ({ armyId }) => {
    const { allBases } = useBaseContext();
    const { allStatuses } = useStatusContext();
    const { allCategories } = useCategoryContext();
    const { addUnit } = useUnitContext();

    const [newUnitName, setNewUnitName] = useState<string>('');
    const [newUnitInfo, setNewUnitInfo] = useState < string > ('');
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState < number > (1);
    const [newUnitCategory, setNewUnitCategory] = useState < string > ('null');
    const [newUnitBases, setNewUnitBases] = useState < string > ("1");
    const [newInitialStatus, setNewInitialStatus] = useState < string > ("1");
    const [newMiniStatus, setNewMiniStatus] = useState<MiniStatusType[]> ([
        {
            id: 1,
            baseId: (allBases.length > 0) ? (allBases[0].id) : ("null"),
            statusId: (allStatuses.length > 0) ? (allStatuses[0].id) : ("null"),
        }
    ]);

    const handleUnitNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUnitName(event.target.value);
        initBases();
    };

    const handleUnitInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUnitInfo(event.target.value);
    };

    const handleUnitMiniAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseInt(event.target.value, 10);
        setNewUnitMiniAmount(amount);
        initBases({ amount });
    };

    const handleUnitCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUnitCategory(event.target.value);
    };

    const handleUnitBaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUnitBases(event.target.value);
        initBases({ bases: event.target.value });
    };

    const handleInitialStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewInitialStatus(event.target.value);
        initBases({ status: event.target.value });
    };

    const initBases = (props?: { amount?: number; bases?: string; status?: string }) => {
        console.log("taala")
        const mAmount = props?.amount || newUnitMiniAmount;
        const mBases = props?.bases || newUnitBases;
        const mStatus = props?.status || newInitialStatus;

        const miniStatusList: MiniStatusType[] = Array.from({ length: mAmount }, (v, i) => ({
            id: i + 1,
            baseId: mBases,
            statusId: mStatus,
        }));

        setNewMiniStatus(miniStatusList);
    };

    const configureBase = (mini: { id: number }, newBase: string) => {
        const newMiniStatusList = newMiniStatus.map((miniStatus) => {
            if (miniStatus.id === mini.id) {
                return { ...miniStatus, baseId: newBase };
            }
            return miniStatus;
        });
        setNewMiniStatus(newMiniStatusList);
    };

    const addNewUnit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const unitObject = {
            name: newUnitName,
            info: newUnitInfo,
            miniAmount: newUnitMiniAmount,
            miniStatus: newMiniStatus,
            categoryId: (newUnitCategory === 'null') ? allCategories[0].id : newUnitCategory,
            armyId: armyId,
        };
        await addUnit(unitObject);
        
        setNewUnitName('');
        setNewUnitInfo('');
        setNewUnitMiniAmount(1);
        setNewInitialStatus("1");
        setNewUnitBases("1");
        setNewUnitCategory('null');
        setNewMiniStatus([{
            id: 1,
            baseId: (allBases.length > 0) ? (allBases[0].id) : ("null"),
            statusId: (allStatuses.length > 0) ? (allStatuses[0].id) : ("null"),
        }]);
        
    };

    return (
        <div>
            <Modal
                ModalButton={"add new unit"}
                ModalHeader={"New unit"}
                ModalContent={
                    <form onSubmit={addNewUnit}>
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
                            type="number"
                            value={newUnitMiniAmount}
                            onChange={handleUnitMiniAmountChange}
                        />
                        <select
                            key="4"
                            name="bases"
                            id="bases"
                            onChange={handleUnitBaseChange}
                        >
                            {allBases.map(base => (
                                <option key={base.id} value={base.id}>
                                    {base.name} {base.shape}
                                </option>
                            ))}
                        </select>
                        <select
                            key="5"
                            name="category"
                            id="category"
                            onChange={handleUnitCategoryChange}
                        >
                            {allCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            key="6"
                            name="initialStatus"
                            id="initialStatus"
                            onChange={handleInitialStatusChange}
                        >
                            {allStatuses.map(status => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                        {(newUnitMiniAmount > 0) ? (
                            <Bases
                                miniStatuses={newMiniStatus}
                                configureMini={configureBase}
                                configureOptions={allBases}
                            />
                        ) : (
                            <div>
                            </div>
                        )}
                        <div>
                            <button type="submit">add</button>
                        </div>
                    </form>
                }
            />
        </div>
    );
};

export default NewUnit;