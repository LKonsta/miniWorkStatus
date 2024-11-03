import NewArmy from './NewArmy';
import Settings from './Settings';
import "./Header.scss"
import { CategoryProvider } from './context/CategoryContext';

const Header: React.FC = () => {
    return (
        <div className="header">
            <h1 className="title">Mini Status</h1>
            <Settings />
            <CategoryProvider armyId = "placeholder">
                <NewArmy />
            </CategoryProvider>
        </div>
    );
};

export default Header;