import React, { useState } from 'react';
import unitService from '../services/unit';
import { UnitType, BaseType, StatusType } from '../components/types/defaultTypes';
import EditUnit from './EditUnit';
import Bases from './Base';
import { useUnitContext } from './context/UnitContext';
import { useStatusContext } from './context/StatusContext';

const UnitMiniAmount: React.FC<{ miniAmount?: number; }> = ({ miniAmount = 0}) => (
    <div>
        {miniAmount}
    </div>
);

const UnitNameInfo: React.FC<{ name?: string; info?: string; }> = ({ name = '-undefined-', info = null }) => (
    <div>
        <div>
            <div>{name}</div>
            {info}
        </div>
    </div>
);

const UnitMiniStatus: React.FC<UnitType> = (unit) => {
    const { allStatuses } = useStatusContext();
    const { modifyUnit } = useUnitContext();
    const [open, setOpen] = useState(false);

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
            <button onClick={() => setOpen(!open)} type="button">
                {open ? '⤊' : '⤋'}
            </button>
            {open && (
                <div>
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
            )}
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
    return (
        <div>
            <div className='unit-table-amount'>
                <UnitMiniAmount miniAmount={unit.miniAmount} />
            </div>
            <div className='unit-table-name'>
                <UnitNameInfo name={unit.name} info={unit.info} />
            </div>
            <div className='unit-table-dropdown'>
                <UnitMiniStatus {...unit} />
            </div>
            <div className='unit-table-right-button'>
                
            </div>
            <div className='unit-table-right-button'>
                <UnitRemove {...unit} />
            </div>
        </div>
    );
};

export default Unit;
