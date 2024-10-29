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


const UnitMiniAmount: React.FC<{ miniAmount?: number; }> = ({ miniAmount = 0}) => (
    <div>
        {miniAmount}
    </div>
);

const UnitNameInfo: React.FC<{ name?: string; info?: string; }> = ({ name = '-undefined-', info = null }) => (
    <div>
        {name}
        <div className="unit-name-info">
            - {info}
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
        </div>
    );
};

const UnitRemove: React.FC<UnitType> = (unit) => {
    const { removeUnit } = useUnitContext();

    return (
        <div>
            <button onClick={() => removeUnit(unit.id)}> X </button>
        </div>
    );
};



const Unit: React.FC<UnitType> = (unit) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="unit">
                <div className='unit-amount'>
                    <UnitMiniAmount miniAmount={unit.miniAmount} />
                </div>
                <div className='unit-name'>
                    <UnitNameInfo name={unit.name} info={unit.info} />
                </div>
                <div className="unit-right">
                    <div className='unit-right-bases'>
                        <button onClick={() => setOpen(!open)} type="button">
                            {open ? '⤊' : '⤋'}
                        </button>
                    </div>
                    <div className='unit-right-edit'>
                        <button>edit</button>
                    </div>
                    <div className="unit-right-percentage">
                        <DrawPercentage value={ CalculatePercentage.calculateUnitPercentage(unit) } />
                    </div>
                    <div className='unit-right-remove'>
                        <UnitRemove {...unit} />
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
