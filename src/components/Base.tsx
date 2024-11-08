import { useState } from "react";
import CalculatePercentage from "./CalculatePercentage";
import { MiniStatusType, BaseType, StatusType } from "./types/defaultTypes";
import { useStatusContext } from "./context/StatusContext";
import { useBaseContext } from "./context/BaseContext";
import "./Base.scss"


interface BasesProps {
    miniStatuses: MiniStatusType[];
    configureMini: any;
    configureOptions: (StatusType | BaseType)[]
}

const Bases: React.FC<BasesProps> = ({ miniStatuses, configureMini, configureOptions }) => {
    return (
        <div className="base-box">
            {miniStatuses.map(miniStatus => (
                <div key={miniStatus.id} className="base-box-border">
                    <DrawBase
                        miniStatus={miniStatus}
                        configureMini={configureMini}
                        configureOptions={configureOptions}
                    />
                </div>
            ))}
        </div>
    );
}

interface DrawBaseProps {
    miniStatus: MiniStatusType;
    configureMini: any;
    configureOptions: (StatusType | BaseType)[]
}

const DrawBase: React.FC<DrawBaseProps> = ({ miniStatus, configureMini, configureOptions }) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const { allBases } = useBaseContext();
    const { sortedStatuses } = useStatusContext();


    const isBaseType = (configureOptions[0].shape !== undefined)

    const defaultBase: BaseType = {
        id: "1",
        name: "null",
        shape: "square",
        width: 20,
        height: 20,
    }

    const base = allBases.find(x => x.id === miniStatus.baseId) || defaultBase;
    const status = sortedStatuses.find(x => x.id === miniStatus.statusId);

    const color = status ? CalculatePercentage.calculatePercentageColor( status.percentage ): 'rgb(0, 0, 0)';

    const handleConfigureMiniChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        configureMini(miniStatus, event.target.value);
        setDropdownOpen(!dropdownOpen);
    }
    const style = base.shape === "square" ? {
        width: base.width * 2,
        height: base.height * 2,
        backgroundColor: color
    } : {
        width: base.width * 2,
        height: base.height * 2,
        backgroundColor: color,
        borderRadius: "50%"
    };
    return (
        <div>
            <button
                className="base"
                style={style}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                type="button"
            />
            {dropdownOpen && (
                <div>
                    <select
                        name="settings"
                        id="settings"
                        onChange={handleConfigureMiniChange}
                        value={(isBaseType)?(miniStatus.baseId):(miniStatus.statusId)}
                    >
                        {configureOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

const DrawDummy: React.FC<{width: number, height: number, shape: string}> = ({ width, height, shape }) => {
    const color = 'g(255, 0, 0)'
    const style = shape === "square" ? {
        width: width * 2,
        height: height * 2,
        backgroundColor: color
    } : {
        width: width * 2,
        height: height * 2,
        backgroundColor: color,
        borderRadius: "50%"
    };
    
    return (
        <div>
            <button style = {style}></button>            
        </div>
    )
}

export {Bases, DrawDummy};
