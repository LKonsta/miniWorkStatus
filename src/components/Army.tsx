import { useState, useEffect } from 'react';

import unitService from '../services/unit';
import categoryService from '../services/category';

import EditArmy from "./EditArmy";
import Unit from "./Unit";
import NewUnit from "./NewUnit";
import DrawPercentage from './DrawPercentage';
import CalculatePercentage from "./CalculatePercentage";

import { ArmyType, CategoryType, UnitType } from './types/defaultTypes'

import "./styles/Army.scss"
import "./styles/Container.scss"
import { BiSolidHide } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Loading from './Loading';
import { useHideContext } from './context/HideContext';

type ArmyCategoryPropsType = {
    category?: CategoryType,
    sortedCategories: CategoryType[],
    units: UnitType[],
    removeUnit: any,
    modifyUnit: any,
};

const ArmyCategory: React.FC<ArmyCategoryPropsType> = ({ category, sortedCategories,  units, removeUnit, modifyUnit }) => {

    const Header = (
        <>
            <p className="inner-container-header-title">
                {category ? category.name : "uncategorized"}
            </p>
            <div className="inner-right-box">
                <div className="inner-right-box-item">
                    <DrawPercentage value={CalculatePercentage.calculatePercentage(units)} />
                </div>
            </div>
        </>
    );

    const Units = (
        <>
            {(units.length != 0) ?
                (units.map((unit) => (
                    <div key={unit.id}>
                        <Unit
                            unit={unit}
                            removeUnit={removeUnit}
                            modifyUnit={modifyUnit}
                            sortedCategories={sortedCategories} />
                        <div className="army-content-category-units-seperator" />
                    </div>
                ))) :
                (<></>)
            }
            <div className="army-content-category-units-empty">

            </div>
        </>
    );

    return (
        <div>
            <div className="inner-container">
                <div className="inner-container-header">
                    {Header}
                </div>
                <div className="inner-container-content-column">
                    {Units}
                </div>
            </div>
        </div>
    );
};

type ArmyPropsType = {
    army: ArmyType,
    removeArmy: any,
    modifyArmy: any,
};

const Army: React.FC<ArmyPropsType> = ({ army, removeArmy, modifyArmy }) => {
    // Loading state
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingUnits, setLoadingUnits] = useState(true);
    const { isHidden } = useHideContext();

    // Categories
    const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
    const sortedCategories = allCategories.length > 0
        ? allCategories.sort((a, b) => a.index - b.index)
        : [];
    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            const initialCategories = await categoryService.getAll(army.id);
            setAllCategories(initialCategories);
            setLoadingCategories(false);
        };
        fetchCategories();
    }, [army.id]);
    const addCategory = async (newCategory: CategoryType) => {
        const returnedCategory = await categoryService.create(newCategory);
        setAllCategories((prevCategories) => [...prevCategories, returnedCategory]);
    };
    const modifyCategory = async (id: string, updatedCategory: CategoryType) => {
        const returnedCategory = await categoryService.update(id, updatedCategory);
        setAllCategories((prevCategories) =>
            prevCategories.map((category) => (category.id === id ? returnedCategory : category))
        );
    };
    const removeCategory = async (id: string) => {
        await categoryService.remove(id);
        setAllCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
    };


    // Units
    const [allUnits, setAllUnits] = useState<UnitType[]>([]);
    const validCategoryIds = allCategories.map(category => category.id);
    const uncategorizedUnits = allUnits.filter(unit => 
        unit.categoryId === null || !validCategoryIds.includes(unit.categoryId!)
    );
    useEffect(() => {
        const fetchUnits = async () => {
            setLoadingUnits(true);
            const initialUnits = await unitService.getAll(army.id);
            setAllUnits(initialUnits);
            setLoadingUnits(false);
        };
        fetchUnits();
    }, []);
    const getUnitsByCategory = (categoryId: string): UnitType[] => {
        const unitList: UnitType[] = allUnits.filter(unit => unit.categoryId === categoryId);
        return unitList;
    };
    const addUnit = async (newUnit: UnitType) => {
        const returnedUnit = await unitService.create(newUnit);
        setAllUnits((prevUnits) => [...prevUnits, returnedUnit]);
    };
    const modifyUnit = async (id: string, updatedUnit: UnitType) => {
        const returnedUnit = await unitService.update(id, updatedUnit);
        setAllUnits((prevUnits) =>
            prevUnits.map((unit) => (unit.id === id ? returnedUnit : unit))
        );
    };
    const removeUnit = async (id: string) => {
        await unitService.remove(id);
        setAllUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== id));
    };

    if (loadingCategories!=false && loadingUnits!=false) { 
        return (
            <Loading />
        )
    };
        
    return (
        <div className="outer-container">
            <div className="outer-container-header">
                <p className="outer-container-header-title">
                    {army.name}
                </p>
                <div className="outer-right-box">
                    <div className="outer-right-box-button-container">
                        <NewUnit
                            armyId={army.id}
                            sortedCategories={sortedCategories}
                            addUnit={addUnit}        
                        />
                    </div>
                    {(isHidden) ? (
                    <div className="outer-right-box-button-container">
                        <EditArmy
                            army={army}
                            modifyArmy={modifyArmy}
                            sortedCategories={sortedCategories}
                            modifyCategory={modifyCategory}
                            addCategory={addCategory}
                            removeCategory={removeCategory}
                        />
                    </div>
                    ) : (<></>)}
                    <div className="outer-right-box-item">
                        <DrawPercentage value={CalculatePercentage.calculatePercentage(allUnits)} />
                    </div>
                    {(isHidden) ? (
                    <div className="outer-right-box-button-container">
                        <MdDelete
                            size={25}
                            className="outer-right-box-button"
                            onClick={() => removeArmy(army.id)}
                        />
                    </div>
                    ) : (<></>)}
                </div>
            </div>
            <div className="outer-container-content-column">
                {sortedCategories.map((category) => (
                    <div key={category.id}>
                        <ArmyCategory
                            category={category}
                            units={getUnitsByCategory(category.id)}
                            removeUnit={removeUnit}
                            modifyUnit={modifyUnit}
                            sortedCategories={sortedCategories}
                        />
                    </div>
                ))}
                {uncategorizedUnits.length > 0
                    ? <div>
                        <ArmyCategory
                            units={uncategorizedUnits}
                            removeUnit={removeUnit}
                            modifyUnit={modifyUnit}
                            sortedCategories={sortedCategories}
                        />
                    </div>
                    : <></>}
            </div>
        </div>
    );
};

export default Army;