import React from 'react';
import { ArmyProvider } from './components/context/ArmyContext';
import { BaseProvider } from './components/context/BaseContext';
import { StatusProvider } from './components/context/StatusContext';
import NewArmy from './components/NewArmy';
import ArmyList from './components/ArmyList';
import Header from './components/Header';
import './App.scss'

const App: React.FC = () => {
    return (
        <ArmyProvider>
            <BaseProvider>
                <StatusProvider>
                    <Header />
                    <ArmyList />
                </StatusProvider>
            </BaseProvider>
        </ArmyProvider>
    );
};

export default App;
