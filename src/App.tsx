
import './App.scss';

import { AlertProvider } from './components/context/AlertContext';
import MiniStatus from './MiniStatus/MiniStatus';


const App: React.FC = () => {

    

    return (
        <AlertProvider>
            <MiniStatus />
        </AlertProvider>
    );
};

export default App;
