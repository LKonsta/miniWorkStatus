import React, { useEffect, useState } from 'react';
import ArmyList from './components/ArmyList';
import Header from './components/Header';
import { BaseProvider } from './components/context/BaseContext';
import { StatusProvider } from './components/context/StatusContext';
import { HideProvider } from './components/context/HideContext';
import { ArmyType } from './components/types/defaultTypes';
import armyService from './services/army';
import Loading from './../components/Loading';

import { useAlertContext } from './../components/context/AlertContext';

const MiniStatus: React.FC = () => {
    const [loadingArmies, setLoadingArmies] = useState(true);
    const [allArmies, setAllArmies] = useState<ArmyType[]>([]);
    const { Alert } = useAlertContext();

    useEffect(() => {
        const fetchArmies = async () => {
            setLoadingArmies(true);
            await armyService.getAll()
                .then(result => setAllArmies(result))
                .catch(error => Alert({ message: error.message, type: "error" }));
            setLoadingArmies(false);
        };
        fetchArmies();
    }, []);

    const addArmy = async (newArmy: ArmyType) => {
        try {
            const result = await armyService.create(newArmy); 
            setAllArmies((prevArmies) => [...prevArmies, result]); 
            return result; 
        } catch (error) {
            Alert({ message: error, type: "error" }); 
        };
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

    return (
        <HideProvider>
            <BaseProvider>
                <StatusProvider>
                        {(loadingArmies) ? (
                            <Loading />
                        ) : (
                            <>
                                <Header
                                    allArmies={allArmies}
                                    addArmy={addArmy}
                                />
                                <ArmyList
                                    allArmies={allArmies}
                                    modifyArmy={modifyArmy}
                                    removeArmy={removeArmy}
                                />
                            </>
                        )}
                </StatusProvider>
            </BaseProvider>
        </HideProvider>
    )
};

export default MiniStatus;

