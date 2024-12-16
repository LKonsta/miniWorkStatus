import './styles/Loading.scss';
import { useAlertContext } from './context/AlertContext';

const Loading: React.FC = () => {
    const { Alert } = useAlertContext();

    return (
        <div className="loading">
            <div className="loading-spinner" />
        </div>
    )
};

export default Loading;