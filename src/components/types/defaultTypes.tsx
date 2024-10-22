export interface ArmyType {
    id: string;
    name: string;
}

export interface BaseType {
    id: string;
    name: string;
    shape: string;
    width: number;
    height: number;
}

export interface StatusType {
    id: string;
    name: string;
    percentage: number;
}

export interface CategoryType {
    id: string;
    name: string;
    index: number;
    armyId: string;
}

export interface MiniStatusType {
    id: number;
    baseId: string;
    statusId: string;
}

export interface UnitType {
    id: string;
    name: string;
    info: string;
    miniAmount: number;
    miniStatus: MiniStatusType[]
    categoryId: string;
    armyId: string;
}