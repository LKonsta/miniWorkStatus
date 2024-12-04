import React, { useState } from "react";
import unitService from './../services/unit';
import {Bases}  from "./Base";
import Modal from "./Modal";
import { UnitType, BaseType, StatusType, CategoryType, MiniStatusType, AlertType } from '../components/types/defaultTypes';
import { useBaseContext } from "./context/BaseContext";
import { useStatusContext } from "./context/StatusContext";
import { useAlertContext } from "./../../components/context/AlertContext";
import CalculatePercentage from './CalculatePercentage';
import DrawPercentage from './DrawPercentage';

import { FaPlus } from "react-icons/fa";
import './styles/EditUnit.scss';
import './styles/Container.scss';
import './styles/Unit.scss';
import './styles/CustomComponents.scss';
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
    const { Alert } = useAlertContext();

    const maxLength = {
        name: 35,
        info: 100,
    }

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

    const handleUnitChange = (field: keyof UnitType, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const maxFieldLength = maxLength[field];

        if (event.target.value.length < maxFieldLength) {
            setNewUnit(prevUnit => ({
                ...prevUnit, [field]: event.target.value
            }));
        } else {
            Alert({
                message: field + " is too long (max " + maxFieldLength + " characters)",
                type: "info"
            })
        }
        
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

    const handleMiniStatusBaseChange = (selectedOption: SingleValue<{ value: string, label: string }>) => {
        if (selectedOption) {
            const baseId = selectedOption.value;
            setNewUnitDefaultBaseId(baseId)
            refreshStatusList({ baseId })
        };
    };

    const handleMiniStatusStatusChange = (selectedOption: SingleValue<{ value: string, label: string }>) => {
        if (selectedOption) {
            const statusId = selectedOption.value;
            setNewUnitDefaultStatusId(statusId)
            refreshStatusList({ statusId })
        };
    };

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
    // Header|Category select field 
    const categoryOptions = sortedCategories.map(category => ({
        value: category.id,
        label: category.name
    }));
    const selectedCategory = (currentCategory)
        ? (categoryOptions.find(category => category.value === currentCategory.id))
        : (categoryOptions.find(category => category.value === newUnit.categoryId));
    const filteredCategoryOptions = categoryOptions.filter(category => category.value !== (selectedCategory ? selectedCategory.value : null));

    // Base select field
    const baseOptions = allBases.map(base => ({
        value: base.id,
        label: (base.name + " " + base.shape)
    }));
    const selectedBase = (newUnit.miniStatus.length > 0)
        ? (baseOptions.find(base => base.value === newUnit.miniStatus[0].baseId))
        : (baseOptions.find(base => base.value === allBases[0].id));

    // Status select field
    const statusOptions = allStatuses.map(status => ({
        value: status.id,
        label: status.name
    }));
    const selectedStatus = (newUnit.miniStatus.length > 0)
        ? (statusOptions.find(status => status.value === newUnit.miniStatus[0].statusId))
        : (statusOptions.find(status => status.value === allStatuses[0].id));

    return (
        <Modal
            ModalButton={
                <FaPlus
                    size={25}
                    className="button"
                    onClick={openModal}
                />
            }
            ModalHeader={"New unit"}
            ModalContent={
                <form
                    className="edit-unit-container"
                    onSubmit={handleSubmit}
                >
                    <div className="inner-container">
                        <div className="inner-header">
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
                        <div className="content-wrapper">
                            <div className="edit">
                                <div className="edit-unit">
                                    <div className="amount">
                                        <input
                                            className="amount-input"
                                            type="number"
                                            
                                            value={newUnit.miniAmount}
                                            onChange={handleUnitAmountChange}
                                        />
                                    </div>
                                    <div className="name">
                                        <input
                                            className="string-input"
                                            type="text"
                                            placeholder="name"
                                            value={newUnit.name}
                                            onChange={(e) => handleUnitChange("name", e)}
                                        />
                                        <div className="info">
                                            <input
                                                className="info-input"
                                                type="text"
                                                placeholder="info"
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
                                        </>
                                    ) : (
                                        <div>
                                        </div>
                                    )}
                                    
                                </>
                            </div>
                        </div>
                    </div>
                    <div className="inner-container">
                        <div className="content-wrapper">
                            <div className="edit-config">
                                <div className="config-fields">
                                    <div className="description">
                                        default base size:
                                    </div>
                                    <div className="default-input-select">
                                        <Select
                                            className={"select"}
                                            classNamePrefix={"react-select"}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            isSearchable={true}
                                            options={baseOptions}
                                            value={selectedBase || null}
                                            onChange={handleMiniStatusBaseChange}
                                        />
                                    </div>
                                    <div className="description">
                                        default status:
                                    </div>
                                    <div className="default-input-select">
                                        <Select
                                            className={"select"}
                                            classNamePrefix={"react-select"}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            isSearchable={true}
                                            options={statusOptions}
                                            value={selectedStatus || null}
                                            onChange={handleMiniStatusStatusChange}
                                        />
                                    </div>
                                </div>
                                <div className="config-end">
                                    <button
                                        className="accept-btn"
                                        type="submit"
                                    >Add</button>
                                </div>
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