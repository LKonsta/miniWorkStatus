import React, { useState } from "react";
import unitService from '../services/unit';
import {Bases}  from "./Base";
import Modal from "./Modal";
import { UnitType, BaseType, StatusType, CategoryType, MiniStatusType } from '../components/types/defaultTypes';
import { useBaseContext } from "./context/BaseContext";
import { useStatusContext } from "./context/StatusContext";
import CalculatePercentage from './CalculatePercentage';
import DrawPercentage from './DrawPercentage';

import { FaPlus } from "react-icons/fa";
import './styles/InputFields.scss';
import './styles/NewUnit.scss';
import Select, { SingleValue } from 'react-select';
import UnitDropdown from "./UnitDropdown";


type NewUnitPropsType = {
    armyId: string,
    sortedCategories: CategoryType[],
    currentCategory?: CategoryType,
    addUnit: any,
}


const NewUnit: React.FC<NewUnitPropsType> = ({ armyId, currentCategory, sortedCategories, addUnit }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = () => { setModalOpen(!modalOpen); };

    const { allBases } = useBaseContext();
    const { allStatuses } = useStatusContext();

    const nullUnit: UnitType = {
        name: "",
        info: "",
        miniAmount: 1,
        miniStatus: [{
            id: 1,
            baseId: allBases[0].id,
            statusId: allStatuses[0].id
        }],
        categoryId: (currentCategory)
            ? (currentCategory.id)
            : ((sortedCategories.length > 0) ? (sortedCategories[0].id) : ("0")),
        armyId: armyId
    };

    const [newUnit, setNewUnit] = useState<UnitType>(nullUnit);

    const [newUnitDefaultBaseId, setNewUnitDefaultBaseId] = useState<string>(nullUnit.miniStatus[0].baseId);
    const [newUnitDefaultStatusId, setNewUnitDefaultStatusId] = useState<string>(nullUnit.miniStatus[0].statusId);

    const handleUnitChange = (field: keyof UnitType, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setNewUnit(prevUnit => ({
            ...prevUnit, [field]: event.target.value
        }));
    };

    const handleUnitCategoryChange = (selectedOption: SingleValue<{ value: string, label: string}>) => {
        selectedOption ? 
        setNewUnit(prevUnit => ({
            ...prevUnit, categoryId: selectedOption.value
        }))
        :
        null;
    };

    const handleUnitAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const miniAmount = event.target.value;
        refreshStatusList({ miniAmount });
    };

    const handleMiniStatusChange = (field: keyof MiniStatusType, event: React.ChangeEvent<HTMLSelectElement>) => {
        if (field === "baseId") {
            const baseId = event.target.value;
            setNewUnitDefaultBaseId(baseId)
            refreshStatusList({ baseId })
        } else {
            const statusId = event.target.value;
            setNewUnitDefaultStatusId(statusId)
            refreshStatusList({ statusId })
        };
    }

    const refreshStatusList = (props?: { miniAmount?: number; baseId?: string; statusId?: string }) => {
        const mAmount = (props?.miniAmount) ? props?.miniAmount : newUnit.miniAmount;
        const mBases = props?.baseId || newUnitDefaultBaseId;
        const mStatus = props?.statusId || newUnitDefaultStatusId;
        
        const miniStatusList: MiniStatusType[] = Array.from({ length: mAmount }, (v, i) => ({
            id: i + 1,
            baseId: mBases,
            statusId: mStatus,
        }));
        if (miniStatusList.length === 0) {
            setNewUnit(prevUnit => ({
                ...prevUnit,
                miniStatus: [],
                miniAmount: 0
            }));
        } else {
            setNewUnit(prevUnit => ({
                ...prevUnit,
                miniStatus: miniStatusList,
                miniAmount: mAmount
            })); 
        };
    };

    const configureBase = (mini: { id: number }, newBase: string) => {
        const newMiniStatusList = newUnit.miniStatus.map((miniStatus) => {
            if (miniStatus.id === mini.id) {
                return { ...miniStatus, baseId: newBase };
            }
            return miniStatus;
        });
        setNewUnit(prevUnit => ({
            ...prevUnit, miniStatus: newMiniStatusList
        }));
    };

    const addNewUnit = async () => {
        if (newUnit.categoryId === "0") {
            setNewUnit(prevUnit => ({
                ...prevUnit, categoryId: sortedCategories[0].id
            }));
        };
        await addUnit(newUnit);
        setNewUnit(nullUnit);
        setNewUnitDefaultBaseId(nullUnit.miniStatus[0].baseId);
        setNewUnitDefaultBaseId(nullUnit.miniStatus[0].statusId);
    };

    const openModal = () => {
        setNewUnit(nullUnit);
        setNewUnitDefaultBaseId(nullUnit.miniStatus[0].baseId);
        setNewUnitDefaultStatusId(nullUnit.miniStatus[0].statusId);
        toggleModal();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewUnit();
        toggleModal();
    }

    // React Select field configurations
    const categoryOptions = sortedCategories.map(category => ({
        value: category.id,
        label: category.name
    }));
    const selectedCategory = (currentCategory)
        ? (categoryOptions.find(category => category.value === currentCategory.id))
        : (categoryOptions.find(category => category.value === newUnit.categoryId));
    const filteredCategoryOptions = categoryOptions.filter(category => category.value !== (selectedCategory ? selectedCategory.value : null));

    return (
        <Modal
            ModalButton={
                <FaPlus
                    size={25}
                    className="outer-right-box-button"
                    onClick={openModal}
                />
            }
            ModalHeader={"New unit"}
            ModalContent={
                <form onSubmit={handleSubmit}>
                    <div className="inner-container">
                        <div className="inner-container-header">
                            <div className="category-input-select">
                                <Select 
                                    className={"select"}
                                    classNamePrefix={"react-select"}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({...base, zIndex: 9999}) }}
                                    isSearchable={false}

                                    options={filteredCategoryOptions}
                                    value={selectedCategory || null}
                                    onChange={handleUnitCategoryChange}
                                />
                            </div>
                        </div>
                        <div className="inner-container-content-column">
                            <div className="edit">
                                <div className="edit-unit">
                                    <input className="edit-unit-amount"
                                        type="number"
                                        value={newUnit.miniAmount}
                                        onChange={handleUnitAmountChange}
                                    />
                                    <div className="edit-unit-name">
                                        <input
                                            type="text"
                                            value={newUnit.name}
                                            onChange={(e) => handleUnitChange("name", e)}
                                        />
                                        <div className="edit-unit-name-info">
                                            -
                                            <input 
                                                type="text"
                                                value={newUnit.info}
                                                onChange={(e) => handleUnitChange("info", e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="outer-right-box">
                                        <div className='inner-right-box-item'>
                                            <DrawPercentage value={CalculatePercentage.calculatePercentage([newUnit])} />
                                        </div>
                                    </div>
                                </div>
                                <>
                                    {(newUnit.miniAmount > 0) ? (
                                        <>
                                            <div className="edit-unit-dropdown">
                                                <UnitDropdown
                                                    unit={newUnit}
                                                    configureOptions={allBases}
                                                    configureMini={configureBase}
                                                />
                                            </div>
                                            <div className="config">
                                                <select
                                                    className="config-select"
                                                    name="bases"
                                                    id="bases"
                                                    onChange={(e) => handleMiniStatusChange("baseId", e)}
                                                >
                                                    {allBases.map(base => (
                                                        <option
                                                            key={base.id}
                                                            value={base.id}>
                                                            {base.name} {base.shape}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    className="config-select"
                                                    name="status"
                                                    id="status"
                                                    onChange={(e) => handleMiniStatusChange("statusId", e)}
                                                >
                                                    {allStatuses.map(status => (
                                                        <option key={status.id} value={status.id}>
                                                            {status.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                        </div>
                                    )}
                                    <div className="end-field">
                                        <div className="add-button">
                                            <button type="submit">add</button>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                </form>
            }
            open={modalOpen}
            setOpen={setModalOpen}
        />
    );
};

export default NewUnit;