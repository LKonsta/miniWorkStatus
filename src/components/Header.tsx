import NewArmy from './NewArmy';
import Settings from './Settings';
import "./styles/Header.scss"

const Header: React.FC = () => {
    return (
        <div className="header">
            <h1 className="title">Mini Status</h1>
            <Settings />
            <NewArmy />
        </div>
    );
};

export default Header;