import { useState, useEffect } from "react";
import unitService from '../services/unit';
import Modal from "./Modal";
import Bases from "./Base";
import { UnitType, BaseType, StatusType, CategoryType, MiniStatusType } from './types/defaultTypes';


const EditUnit: React.FC<UnitType> = ( unit ) => {
    const modal_header = `Editing: ${unit.name}`;

    const unitEdit: UnitType = unit

    const [newUnitName, setNewUnitName] = useState < string > (unit.name);
    const [newUnitInfo, setNewUnitInfo] = useState < string > (unit.info);
    const [newUnitMiniAmount, setNewUnitMiniAmount] = useState<number>(unit.miniAmount);
    const [newMiniStatus, setNewMiniStatus] = useState<MiniStatusType[]>(unit.miniStatus);
    const [newUnitCategory, setNewUnitCategory] = useState < string > (unit.categoryId);
    const [newUnitBases, setNewUnitBases] = useState < number > ((unit.miniStatus) ? (Object.values(unit.miniStatus[0])[1]) : (1));
    const [newInitialStatus, setNewInitialStatus] = useState < number > ((unit.miniStatus) ? (Object.values(unit.miniStatus[0])[2]) : (1));

    const handleUnitNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUnitName(event.target.value);
    };

    const handleUnitInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUnitInfo(event.target.value);
    };

    const handleUnitMiniAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUnitMiniAmount(Number(event.target.value));
        const amount = Number(event.target.value);
        initBases({ amount });
    };

    const handleUnitCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUnitCategory(event.target.value);
    };

    const handleUnitBaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUnitBases(Number(event.target.value));
        const bases = Number(event.target.value);
        initBases({ bases });
    };

    const handleInitialStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewInitialStatus(Number(event.target.value));
        const status = Number(event.target.value);
        initBases({ status });
    };

    const initBases = (props: { amount?: number; bases?: number; status?: number }) => {
        const mAmount = props.amount ?? newUnitMiniAmount;
        const mBases = props.bases ?? newUnitBases;
        const mStatus = props.status ?? newInitialStatus;

        let miniStatusList = [];
        for (let i = 0; i < mAmount; i++) {
            const miniStatusObject = {
                id: i + 1,
                baseId: mBases,
                statusId: mStatus,
            };
            miniStatusList.push(miniStatusObject);
        }
        setNewMiniStatus(miniStatusList);
    };

    const configureBase = (mini: any, newBase: number) => { // Adjust type for mini based on actual type
        const newMiniStatusList = newMiniStatus.map((miniStatus) => {
            if (miniStatus.id === mini.id) {
                return {
                    ...miniStatus,
                    baseId: newBase,
                };
            }
            return miniStatus;
        });
        setNewMiniStatus(newMiniStatusList);
    };

    const modifyUnit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newAllUnits = props.allUnits.map((unit) => {
            if (unit.id === props.unit.id) {
                const unitObject = {
                    name: newUnitName,
                    info: newUnitInfo,
                    miniAmount: newUnitMiniAmount,
                    miniStatus: newMiniStatus,
                    categoryId: newUnitCategory,
                    armyId: props.unit.armyId,
                };
                unitService.update(props.unit.id, unitObject);
                return unitObject;
            }
            return unit;
        });
        props.setAllUnits(newAllUnits);
    };

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
                            {props.allBases.map(base => (
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
                            {props.allCategories.map(category => (
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
                            {props.allStatuses.map(status => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>

                        <Bases
                            miniStatus={newMiniStatus}
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
    );
};

export default EditUnit;
