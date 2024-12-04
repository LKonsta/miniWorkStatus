import './styles/Loading.scss';
import { useAlertContext } from './context/AlertContext';

const Loading: React.FC = () => {
    const { Alert } = useAlertContext();

    return (
        <div className="loading" onClick={() => Alert({ message: "clicked", type: "error" })}>
            <div className="loading-spinner" />
        </div>
    )
};

export default Loading;