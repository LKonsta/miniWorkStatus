import React, { useState } from 'react';
import unitService from '../services/unit';
import { UnitType, BaseType, StatusType } from '../components/types/defaultTypes';
import EditUnit from './EditUnit';
import {Bases} from './Base';
import { useUnitContext } from './context/UnitContext';
import { useStatusContext } from './context/StatusContext';
import "./Unit.scss"
import { useBaseContext } from './context/BaseContext';
import CalculatePercentage from './CalculatePercentage';
import DrawPercentage from './DrawPercentage';

import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";


const UnitMiniAmount: React.FC<{ miniAmount?: number; }> = ({ miniAmount = 0}) => (
    <div>
        {miniAmount}
    </div>
);

const UnitNameInfo: React.FC<{ name?: string; info?: string; }> = ({ name = '-undefined-', info = null }) => (
    <div>
        {name}
        <div className="unit-name-info">
            {(info) ? (<>- {info}</>) : (<></>) }
        </div>
    </div>
);

const UnitMiniStatus: React.FC<UnitType> = (unit) => {
    const { allStatuses } = useStatusContext();
    const { modifyUnit } = useUnitContext();
    

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
        <div>
            <div className="unit-dropdown">
                <div className="unit-dropdown-base-box">
                    {unit.miniStatus ? (
                        <Bases
                            miniStatuses={unit.miniStatus}
                            configureOptions={allStatuses}
                            configureMini={configureStatus}
                        />
                    ) : (
                        '--none--'
                    )}
                </div>
                <div className="unit-dropdown-status-info">
                    {allStatuses.map((status) => (
                        <div className="unit-dropdown-status-info-item">
                            <div
                                className="unit-dropdown-status-info-item-color"
                                style={{ backgroundColor: CalculatePercentage.calculatePercentageColor(status.percentage) }}
                            >
                            </div>
                            <div className="unit-dropdown-status-info-item-name">
                                { status.name }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Unit: React.FC<UnitType> = (unit) => {
    const { removeUnit } = useUnitContext();
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="unit">
                <div className='unit-amount'>
                    <UnitMiniAmount miniAmount={unit.miniAmount} />
                </div>
                <div className='unit-name' onClick={() => setOpen(!open)}>
                    <UnitNameInfo name={unit.name} info={unit.info} />
                </div>
                <div className="inner-right-box">
                    <div className='inner-right-box-button-container'>
                        <EditUnit {...unit} />
                    </div>
                    <div className='inner-right-box-item'>
                        <DrawPercentage value={ CalculatePercentage.calculateUnitPercentage(unit) } />
                    </div>
                    <div className='inner-right-box-button-container'>
                        <MdDelete
                            size={25}
                            className="inner-right-box-button"
                            onClick={() => removeUnit(unit.id)}
                        />
                    </div>
                </div>
            </div>
            {open && (
                <UnitMiniStatus {...unit} />
            )}
        </>
    );
};

export default Unit;
