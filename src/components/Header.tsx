import NewArmy from './NewArmy';
import Settings from './Settings';
import "./Header.scss"


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