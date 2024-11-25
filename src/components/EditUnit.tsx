import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Bases } from "./Base";
import { UnitType, BaseType, StatusType, CategoryType, MiniStatusType } from './types/defaultTypes';
import { useUnitContext } from './context/UnitContext';
import { useCategoryContext } from "./context/CategoryContext";
import { useBaseContext } from "./context/BaseContext";
import { useStatusContext } from "./context/StatusContext";

import { IoMdSettings } from "react-icons/io";

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
    const { sortedStatuses } = useStatusContext();

    const [unitToEdit, setUnitToEdit] = useState<UnitType>(unit);

    const initialBaseId = (unit.miniStatus.length > 0)
        ? (unit.miniStatus[0].baseId)
        : (allBases[0].id);
    const [unitToEditDefaultBaseId, setUnitToEditDefaultBaseId] = useState<string>(initialBaseId);
    const initialStatusId = (unit.miniStatus.length > 0)
        ? (unit.miniStatus[0].statusId)
        : (sortedStatuses[0].id);
    const [unitToEditDefaultStatusId, setUnitToEditDefaultStatusId] = useState<string>(initialStatusId);

    const handleUnitChange = (field: keyof UnitType, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setUnitToEdit(prevUnit => ({
            ...prevUnit, [field]: event.target.value
        }));
    };

    const handleUnitCategoryChange = (categoryId: string) => {
        setUnitToEdit(prevUnit => ({
            ...prevUnit, categoryId: categoryId
        }));
    };

    const handleUnitAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const miniAmount = event.target.value;
        refreshStatusList({ miniAmount });
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

    return (
        <Modal
            ModalButton={
                <IoMdSettings
                    size={25}
                    className="inner-right-box-button"
                    onClick={openModal}
                />
            }
            ModalHeader={"Editing (" + unit.name + ")"}
            ModalContent={
                <form onSubmit={handleSubmit}>
                    {/* 
                    <CustomSelect
                        style=""
                        options={sortedCategories}
                        selectedValue={unitToEdit.categoryId}
                        onSelect={handleUnitCategoryChange}
                    />
                    */}
                    <input
                        type="number"
                        value={unitToEdit.miniAmount}
                        onChange={handleUnitAmountChange}
                    />
                    <input
                        type="text"
                        value={unitToEdit.name}
                        onChange={(e) => handleUnitChange("name", e)}
                    />
                    <input
                        type="text"
                        value={unitToEdit.info}
                        onChange={(e) => handleUnitChange("info", e)}
                    />
                    <select
                        name="category"
                        id="category"
                        value={unitToEdit.categoryId}
                        onChange={(e) => handleUnitChange("categoryId", e)}
                    >
                        {sortedCategories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select
                        name="bases"
                        id="bases"
                        value={unitToEditDefaultBaseId}
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
                        name="status"
                        id="status"
                        value={unitToEditDefaultStatusId}
                        onChange={(e) => handleMiniStatusChange("statusId", e)}
                    >
                        {sortedStatuses.map(status => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>

                    {(unitToEdit.miniAmount > 0) ? (
                        <Bases
                            miniStatuses={unitToEdit.miniStatus}
                            configureMini={configureBase}
                            configureOptions={allBases}
                        />
                    ) : (
                        <div>
                        </div>
                    )}
                    <button onClick={deleteUnit}> remove </button>
                    <button type="submit">apply</button>
                </form>
            }
            open={modalOpen}
            setOpen={setModalOpen}
        />
    );
};

export default EditUnit;
