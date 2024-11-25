import { Bases } from "./Base";
import CalculatePercentage from "./CalculatePercentage";
import { useStatusContext } from "./context/StatusContext";
import { UnitType } from "./types/defaultTypes";
import './styles/UnitDropdown.scss';

type UnitMiniStatusPropsType = {
    unit: UnitType,
    modifyUnit: any,
};

const UnitDropdown: React.FC<UnitMiniStatusPropsType> = ({ unit, modifyUnit }) => {
    const { allStatuses } = useStatusContext();

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
                <div className="base-field-container">
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
                <div className="status-info">
                    {allStatuses.map((status) => (
                        <div className="status-info-item">
                            <div
                                className="status-info-item-color"
                                style={{ backgroundColor: CalculatePercentage.calculatePercentageColor(status.percentage) }}
                            >
                            </div>
                            <div className="status-info-item-name">
                                { status.name }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UnitDropdown;