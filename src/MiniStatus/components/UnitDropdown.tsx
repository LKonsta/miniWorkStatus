import { Bases } from "./Base";
import CalculatePercentage from "./CalculatePercentage";
import { useStatusContext } from "./context/StatusContext";
import { BaseType, StatusType, UnitType } from "./types/defaultTypes";
import './styles/UnitDropdown.scss';

type UnitMiniStatusPropsType = {
    unit: UnitType,
    configureOptions: StatusType[] | BaseType[],
    configureMini: any,
};

const UnitDropdown: React.FC<UnitMiniStatusPropsType> = ({ unit, configureOptions, configureMini }) => {
    const { allStatuses } = useStatusContext();

    return (
        <>
            <div className="unit-dropdown">
                <div className="base-field-container">
                    {unit.miniStatus ? (
                        <Bases
                            miniStatuses={unit.miniStatus}
                            configureOptions={configureOptions}
                            configureMini={configureMini}
                        />
                    ) : (
                        '--none--'
                    )}
                </div>
                <div className="status-info-container">
                    {allStatuses.map((status) => (
                        <div className="status" key={status.id}>
                            <div
                                className="status-color"
                                style={{ backgroundColor: CalculatePercentage.calculatePercentageColor(status.percentage) }}
                            >
                            </div>
                            <div className="status-name">
                                { status.name }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UnitDropdown;