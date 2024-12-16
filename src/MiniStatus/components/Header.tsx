import NewArmy from './NewArmy';
import BasesAndStatuses from './BasesAndStatuses';
import { useHideContext } from './context/HideContext';
import "./styles/Header.scss";

import { TbEyeCog } from "react-icons/tb";
import { ArmyType } from './types/defaultTypes';

type HeaderPropsType = {
    allArmies: ArmyType[],
    addArmy: any,
}

const Header: React.FC<HeaderPropsType> = ({ allArmies, addArmy }) => {
    

    const HideButton: React.FC = () => {
        const { isHidden, toggleHide } = useHideContext();
        return (
            <TbEyeCog
                size={20}
                className={(isHidden) ? "hide-button" : "hide-button-hide"}
                onClick={() => toggleHide()}
            />
        );
    };

    return (
        <div className="site-header">
            <h1 className="site-title">Mini Status</h1>
            <BasesAndStatuses />
            <NewArmy allArmies={allArmies} addArmy={addArmy} />
            <HideButton />      
        </div>
    );
};

export default Header;