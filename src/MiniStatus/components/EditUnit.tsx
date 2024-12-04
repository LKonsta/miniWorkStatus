import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Bases } from "./Base";
import { UnitType, BaseType, StatusType, CategoryType, MiniStatusType } from './types/defaultTypes';
import { useAlertContext } from "./../../components/context/AlertContext";
import { useBaseContext } from "./context/BaseContext";
import { useStatusContext } from "./context/StatusContext";

import { IoMdSettings } from "react-icons/io";
import CalculatePercentage from "./CalculatePercentage";
import DrawPercentage from "./DrawPercentage";
import './styles/EditUnit.scss';
import './styles/Container.scss';
import './styles/Unit.scss';
import './styles/CustomComponents.scss';
import Select, { SingleValue } from 'react-select';
import UnitDropdown from "./UnitDropdown";

type EditUnitPropsType = {
    unit: UnitType,
    modifyUnit: any,
    removeUnit: any,
    sortedCategories: CategoryType[],
};

const EditUnit: React.FC<EditUnitPropsType> = ({ unit, modifyUnit, removeUnit, sortedCategories }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = () => { setModalOpen(!modalOpen); };
    const { allBases } = useBaseContext();
    const { allStatuses } = useStatusContext();
    const { sortedStatuses } = useStatusContext();
    const { Alert } = useAlertContext();

    const [unitToEdit, setUnitToEdit] = useState<UnitType>(unit);

    const initialBaseId = (unit.miniStatus.length > 0)
        ? (unit.miniStatus[0].baseId)
        : (allBases[0].id);
    const [unitToEditDefaultBaseId, setUnitToEditDefaultBaseId] = useState<string>(initialBaseId);
    const initialStatusId = (unit.miniStatus.length > 0)
        ? (unit.miniStatus[0].statusId)
        : (sortedStatuses[0].id);
    const [unitToEditDefaultStatusId, setUnitToEditDefaultStatusId] = useState<string>(initialStatusId);

    const handleUnitChange = (field: keyof UnitType, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const maxFieldLength = maxLength[field];

        if (event.target.value.length < maxFieldLength) {
            setUnitToEdit(prevUnit => ({
                ...prevUnit, [field]: event.target.value
            }));
        } else {
            Alert({
                message: field + " is too long (max " + maxFieldLength + " characters)",
                type: "info"
            })
        }

    };

    const handleUnitCategoryChange = (selectedOption: SingleValue<{ value: string, label: string }>) => {
        selectedOption ?
            setUnitToEdit(prevUnit => ({
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
            setUnitToEditDefaultBaseId(baseId)
            refreshStatusList({ baseId })
        };
    };

    const handleMiniStatusStatusChange = (selectedOption: SingleValue<{ value: string, label: string }>) => {
        if (selectedOption) {
            const statusId = selectedOption.value;
            setUnitToEditDefaultStatusId(statusId)
            refreshStatusList({ statusId })
        };
    };

    const handleMiniStatusChange = (field: keyof MiniStatusType, event: React.ChangeEvent<HTMLSelectElement>) => {
        if (field === "baseId") {
            const baseId = event.target.value;
            setUnitToEditDefaultBaseId(baseId)
            refreshStatusList({ baseId })
        } else {
            const statusId = event.target.value;
            setUnitToEditDefaultStatusId(statusId)
            refreshStatusList({ statusId })
        };
    };

    const refreshStatusList = (props?: { miniAmount?: number; baseId?: string; statusId?: string }) => {
        const mAmount = (props?.miniAmount) ? props?.miniAmount : unitToEdit.miniAmount;
        const mBases = props?.baseId || unitToEditDefaultBaseId;
        const mStatus = props?.statusId || unitToEditDefaultStatusId;

        const miniStatusList: MiniStatusType[] = Array.from({ length: mAmount }, (v, i) => ({
            id: i + 1,
            baseId: mBases,
            statusId: mStatus,
        }));
        if (miniStatusList.length === 0) {
            setUnitToEdit(prevUnit => ({
                ...prevUnit,
                miniStatus: [],
                miniAmount: 0
            }));
        } else {
            setUnitToEdit(prevUnit => ({
                ...prevUnit,
                miniStatus: miniStatusList,
                miniAmount: mAmount
            }));
        };
    };

    const configureBase = (mini: { id: number }, newBase: string) => {
        const newMiniStatusList = unitToEdit.miniStatus.map((miniStatus) => {
            if (miniStatus.id === mini.id) {
                return { ...miniStatus, baseId: newBase };
            }
            return miniStatus;
        });
        setUnitToEdit(prevUnit => ({
            ...prevUnit, miniStatus: newMiniStatusList
        }));
    };

    const deleteUnit = async () => {
        await removeUnit(unitToEdit.id);
        toggleModal();
    }

    const addUnitEdits = async () => {
        await modifyUnit(unitToEdit.id, unitToEdit);
    };

    const openModal = () => {
        setUnitToEdit(unit);
        toggleModal();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addUnitEdits();
        toggleModal();
    };

    // React Select field configurations
    // Header|Category select field 
    const categoryOptions = sortedCategories.map(category => ({
        value: category.id,
        label: category.name
    }));
    const selectedCategory = (categoryOptions.find(category => category.value === unitToEdit.categoryId));
    const filteredCategoryOptions = categoryOptions.filter(category => category.value !== (selectedCategory ? selectedCategory.value : null));

    // Base select field
    const baseOptions = allBases.map(base => ({
        value: base.id,
        label: (base.name + " " + base.shape)
    }));
    const selectedBase = (unitToEdit.miniStatus.length > 0)
        ? (baseOptions.find(base => base.value === unitToEdit.miniStatus[0].baseId))
        : (baseOptions.find(base => base.value === allBases[0].id));

    // Status select field
    const statusOptions = allStatuses.map(status => ({
        value: status.id,
        label: status.name
    }));
    const selectedStatus = (unitToEdit.miniStatus.length > 0)
        ? (statusOptions.find(status => status.value === unitToEdit.miniStatus[0].statusId))
        : (statusOptions.find(status => status.value === allStatuses[0].id));

    return (

         <Modal
            ModalButton={
                <IoMdSettings
                    size={25}
                    className="button"
                    onClick={openModal}
                />
            }
            ModalHeader={"Editing (" + unit.name + ")"}
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
                                            
                                            value={unitToEdit.miniAmount}
                                            onChange={handleUnitAmountChange}
                                        />
                                    </div>
                                    <div className="name">
                                        <input
                                            className="string-input"
                                            type="text"
                                            placeholder="name"
                                            value={unitToEdit.name}
                                            onChange={(e) => handleUnitChange("name", e)}
                                        />
                                        <div className="info">
                                            <input
                                                className="info-input"
                                                type="text"
                                                placeholder="info"
                                                value={unitToEdit.info}
                                                onChange={(e) => handleUnitChange("info", e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="outer-right-box">
                                        <div className='inner-right-box-item'>
                                            <DrawPercentage value={CalculatePercentage.calculatePercentage([unitToEdit])} />
                                        </div>
                                    </div>
                                </div>
                                <>
                                    {(unitToEdit.miniAmount > 0) ? (
                                        <>
                                            <div className="edit-unit-dropdown">
                                                <UnitDropdown
                                                    unit={unitToEdit}
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
                                        className="warning-btn"
                                        onClick={() => deleteUnit()}
                                    >Remove</button>
                                    <button
                                        className="accept-btn"
                                        type="submit"
                                    >Apply</button>
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

export default EditUnit;
