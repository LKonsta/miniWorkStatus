import { useEffect, useState } from 'react';

import categoryService from './../services/category';
import unitService from './../services/unit';

import CalculatePercentage from "./CalculatePercentage";
import DrawPercentage from './DrawPercentage';
import EditArmy from "./EditArmy";
import NewUnit from "./NewUnit";
import Unit from "./Unit";

import { ArmyType, CategoryType, UnitType } from './types/defaultTypes';

import { MdDelete } from "react-icons/md";
import Loading from './../../components/Loading';
import totalAmount from './TotalAmount';
import { useHideContext } from './context/HideContext';
import "./styles/Army.scss";
import "./styles/Container.scss";

type ArmyCategoryPropsType = {
    army: ArmyType,
    addUnit?: any,
    category?: CategoryType,
    sortedCategories: CategoryType[],
    units: UnitType[],
    removeUnit: any,
    modifyUnit: any,
};

const ArmyCategory: React.FC<ArmyCategoryPropsType> = ({ army, addUnit, category, sortedCategories,  units, removeUnit, modifyUnit }) => {
    const [hideCategory, setHideCategory] = useState<boolean>(false);
    const toggleHideCategory = () => { setHideCategory(!hideCategory) };

    const Header = (
        <>
            <div
                className="inner-header-title"
                onClick={() => toggleHideCategory()}
            >
                <div>
                    {category ? category.name : "uncategorized"}
                </div>
                <div className="header-amount">
                    ({totalAmount(units)})
                </div>
            </div>
            <div className="right-box-header">
                <div className="button-container">
                    <NewUnit
                        armyId={army.id}
                        sortedCategories={sortedCategories}
                        currentCategory={category}
                        addUnit={addUnit}
                    />
                </div>
                <div className="item">
                    <DrawPercentage value={CalculatePercentage.calculatePercentage(units)} />
                </div>
            </div>
        </>
    );

    const Units = (
        <div className={!hideCategory ? "dropdown-show" : "dropdown-hide"}>
            {(units.length != 0)  ?
                (units.map((unit, i, {length}) => (
                    <div key={unit.id}>
                        <Unit
                            last={length - 1 === i}
                            unit={unit}
                            removeUnit={removeUnit}
                            modifyUnit={modifyUnit}
                            sortedCategories={sortedCategories} />
                    </div>
                ))) :
                (<div className="empty"></div>)
            }
        </div>
    );

    return (
        <div>
            <div className="inner-container">
                <div className="inner-header">
                    {Header}
                </div>
                <div className="content-wrapper">
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
    const sortedCategories = allCategories.sort((a, b) => a.index - b.index);

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
    const sortedUnits = allUnits.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        if (a.info < b.info) return 1;
        if (a.info > b.info) return -1;
    });
    const validCategoryIds = allCategories.map(category => category.id);
    const uncategorizedUnits = sortedUnits.filter(unit => 
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
        const unitList: UnitType[] = sortedUnits.filter(unit => unit.categoryId === categoryId);
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

    if (loadingCategories && loadingUnits) { 
        return (
            <Loading />
        )
    };
        
    return (
        <div className="outer-container">
            <div className="header">
                <div className="header-title">
                    <div>
                        {army.name}
                    </div>
                    <div className="header-amount">
                        ({totalAmount(allUnits)})
                    </div>
                </div>
                <div className="right-box-header">
                    <div className="button-container">
                        <NewUnit
                            armyId={army.id}
                            sortedCategories={sortedCategories}
                            addUnit={addUnit}        
                        />
                    </div>
                    {(isHidden) ? (
                    <div className="button-container">
                        <EditArmy
                            army={army}
                            modifyArmy={modifyArmy}
                            removeArmy={removeArmy}
                            sortedCategories={sortedCategories}
                            modifyCategory={modifyCategory}
                            addCategory={addCategory}
                            removeCategory={removeCategory}
                        />
                    </div>
                    ) : (<></>)}
                    <div className="item">
                        <DrawPercentage value={CalculatePercentage.calculatePercentage(allUnits)} />
                    </div>
                    {(isHidden) ? (
                    <div className="button-container">
                        <MdDelete
                            size={25}
                            className="button"
                            onClick={() => removeArmy(army.id)}
                        />
                    </div>
                    ) : (<></>)}
                </div>
            </div>
            <div className="content-wrapper">
                {sortedCategories.map((category) => (
                    <div key={category.id}>
                        <ArmyCategory
                            army={army}
                            addUnit={addUnit}
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
                            army={army}
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