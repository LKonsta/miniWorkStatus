import React, { useEffect, useState } from 'react';
import './App.scss';
import ArmyList from './components/ArmyList';
import Header from './components/Header';
import { BaseProvider } from './components/context/BaseContext';
import { StatusProvider } from './components/context/StatusContext';
import { ArmyType } from './components/types/defaultTypes';
import armyService from './services/army';
import Loading from './components/Loading';

const App: React.FC = () => {
    const [loadingArmies, setLoadingArmies] = useState(true);
    const [allArmies, setAllArmies] = useState<ArmyType[]>([]);

    useEffect(() => {
        const fetchArmies = async () => {
            setLoadingArmies(true);
            const initialArmies = await armyService.getAll();
            setAllArmies(initialArmies);
            setLoadingArmies(false);
        };
        fetchArmies();
    }, []);

    const addArmy = async (newArmy: ArmyType) => {
        const returnedArmy = await armyService.create(newArmy);
        setAllArmies((prevArmies) => [...prevArmies, returnedArmy]);
        return returnedArmy;
    };

    const modifyArmy = async (id: string, updatedArmy: ArmyType) => {
        const returnedArmy = await armyService.update(id, updatedArmy);
        setAllArmies((prevArmies) =>
            prevArmies.map((army) => (army.id === id ? returnedArmy : army))
        );
    };

    const removeArmy = async (id: string) => {
        await armyService.remove(id);
        setAllArmies((prevArmies) => prevArmies.filter((army) => army.id !== id));
    };

    while (loadingArmies) {
        return (
            <BaseProvider>
                <StatusProvider>
                    <Loading />
                </StatusProvider>
            </BaseProvider>
        );
    };

    return (
        <BaseProvider>
            <StatusProvider>
                <Header
                    addArmy={addArmy}
                />
                <ArmyList
                    allArmies={allArmies}
                    modifyArmy={modifyArmy}
                    removeArmy={removeArmy}
                />
            </StatusProvider>
        </BaseProvider>
    );
};

export default App;
