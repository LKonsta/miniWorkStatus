import React, { useState } from 'react';
import unitService from '../services/unit';
import { UnitType, BaseType, StatusType, CategoryType } from '../components/types/defaultTypes';
import EditUnit from './EditUnit';
import {Bases} from './Base';
import { useStatusContext } from './context/StatusContext';
import "./styles/Unit.scss"
import { useBaseContext } from './context/BaseContext';
import CalculatePercentage from './CalculatePercentage';
import DrawPercentage from './DrawPercentage';

import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useHideContext } from './context/HideContext';
import UnitDropdown from './UnitDropdown';

type UnitPropsType = {
    unit: UnitType,
    removeUnit: any,
    modifyUnit: any,
    sortedCategories: CategoryType[]
};

const Unit: React.FC<UnitPropsType> = ({ unit, removeUnit, modifyUnit, sortedCategories }) => {
    const { allStatuses } = useStatusContext();

    const [open, setOpen] = useState(false);
    const { isHidden } = useHideContext();

    const configureStatus = (mini: any, newStatus: string) => {
        const newMiniStatusList = unit.miniStatus.map((miniStatus) => {
            if (miniStatus.id === mini.id) {
                return { ...mini, statusId: newStatus };
            }
            return miniStatus;
        });

        const unitObject = { ...unit, miniStatus: newMiniStatusList };

        modifyUnit(unit.id, unitObject);
    };

    return (
        <>
            <div className="unit">
                <div className='unit-amount'>
                    {unit.miniAmount}
                </div>
                <div className='unit-name' onClick={() => setOpen(!open)}>
                    <div>
                        {unit.name}
                        <div className="unit-name-info">
                            {(unit.info) ? (<>- {unit.info}</>) : (<></>)}
                        </div>
                    </div>
                </div>
                <div className="inner-right-box">
                    {(isHidden) ? (
                    <div className='inner-right-box-button-container'>
                        <EditUnit
                            unit={unit}
                            modifyUnit={modifyUnit}
                            removeUnit={removeUnit}
                            sortedCategories={sortedCategories}
                        />
                    </div>
                    ) : (<></>)}
                    <div className='inner-right-box-item'>
                        <DrawPercentage
                            value={CalculatePercentage.calculatePercentage([unit])} />
                    </div>
                    {(isHidden) ? (
                    <div className='inner-right-box-button-container'>
                        <MdDelete
                            size={25}
                            className="inner-right-box-button"
                            onClick={() => removeUnit(unit.id)}
                        />
                    </div>
                    ) : (<></>) }
                </div>
            </div>
            {open && (
                <UnitDropdown
                    unit={unit}
                    configureOptions={allStatuses}
                    configureMini={configureStatus}
                />
            )}
        </>
    );
};

export default Unit;
