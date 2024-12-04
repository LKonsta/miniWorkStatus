import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import "./../styles/Alert.scss";
import { AlertType } from '../types/defaultTypes';

interface AlertContextType {
    Alert: (newAlert: AlertType) => void;
};

interface TimedAlert {
    id: number,
    alert: AlertType,
    fadeOut: false
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [alerts, setAlerts] = useState<TimedAlert[]>([]);

    const Alert = (alert: AlertType) => {
        if (alerts.find(a => a.alert.message === alert.message)) {
            return;
        }
        
        if (alerts.length >= 5) {
            setAlerts((prev) => prev.slice(1));
        }
        const newAlert: TimedAlert = {
            id: Date.now(),
            fadeOut: false,
            alert,
        };
        setAlerts((prev) => [...prev, newAlert])

        setTimeout(() => {
            setAlerts((alerts) =>
                alerts.map((alert) =>
                    alert.id === newAlert.id ? { ...alert, fadeOut: true } : alert
                )
            );
        }, 3500);

        setTimeout(() => {
            setAlerts((alerts) => alerts.filter((alert) => alert.id !== newAlert.id));
        }, 4500);
    };

    const alertPortal = ReactDOM.createPortal(
        <div className="alert-container">
            {alerts.map((alert) => {
                return (
                    <div
                        key={alert.id}
                        className={`alert ${alert.alert.type} ${alert.fadeOut ? 'fade-out' : 'visible'}`}
                    >
                        {alert.alert.message}
                    </div>
                );
            })}
        </div>
    ,
    document.body)

    return (
        <AlertContext.Provider value={{ Alert }}>
            {children}
            {alertPortal}
        </AlertContext.Provider>
    );
};



export const useAlertContext = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlertContext must be used within HideProvider');
    }
    return context;

};