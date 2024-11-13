import NewArmy from './NewArmy';
import Settings from './Settings';
import "./styles/Header.scss"

type HeaderPropsType = {
    addArmy: any,
}

const Header: React.FC<HeaderPropsType> = ({ addArmy }) => {
    return (
        <div className="header">
            <h1 className="title">Mini Status</h1>
            <Settings />
            <NewArmy addArmy={addArmy} />
        </div>
    );
};

export default Header;