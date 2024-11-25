import NewArmy from './NewArmy';
import Settings from './Settings';
import { useHideContext } from './context/HideContext';
import "./styles/Header.scss"

import { TbEyeCog } from "react-icons/tb";

type HeaderPropsType = {
    addArmy: any,
}

const Header: React.FC<HeaderPropsType> = ({ addArmy }) => {
    

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
        <div className="header">
            <h1 className="title">Mini Status</h1>
            <Settings />
            <NewArmy addArmy={addArmy} />
            <HideButton />      
        </div>
    );
};

export default Header;