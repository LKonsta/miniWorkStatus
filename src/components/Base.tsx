import { useState } from "react";
import CalculatePercentage from "./CalculatePercentage";
import { MiniStatusType, BaseType, StatusType } from "./types/defaultTypes";
import { useStatusContext } from "./context/StatusContext";
import { useBaseContext } from "./context/BaseContext";
import "./styles/Base.scss"
import Select, {SingleValue} from "react-select";


interface BasesProps {
    miniStatuses: MiniStatusType[];
    configureMini: any;
    configureOptions: (StatusType | BaseType)[]
}

const Bases: React.FC<BasesProps> = ({ miniStatuses, configureMini, configureOptions }) => {
    return (
        <div className="base-field">
            {miniStatuses.map(miniStatus => (
                <div key={miniStatus.id} className="base-container">
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

    const color = status ? CalculatePercentage.calculatePercentageColor( status.percentage ): 'rgb(255, 255, 255)';

    const handleConfigureMiniChange = (selectedOption: SingleValue<{ value: string, label: string}>) => {
        selectedOption ? 
        (configureMini(miniStatus, selectedOption.value)
        )
        :
        null;
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
    // react select field configurations
    const options = configureOptions.map(option => ({
        value: option.id,
        label: option.name
    }));
    const selectedOption = options.find(option => option.value === (isBaseType ? miniStatus.baseId : miniStatus.statusId)); 
    return (
        <div>
            <div
                className="base"
                style={style}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
                <Select
                    value={selectedOption}
                    options={options}
                    onChange={handleConfigureMiniChange}
                />
            )}
        </div>
    );
}

const DrawDummy: React.FC<{width: number, height: number, shape: string}> = ({ width, height, shape }) => {
    const color = 'rgb(0, 0, 0)'
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
        <div
            className="dummy-base"
            style={style}>            
        </div>
    )
}

export {Bases, DrawDummy};
