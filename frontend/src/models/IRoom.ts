export interface RoomInterface {
    ID: number;
    Number: string;
    Name: string;
    TypeID: number;
    Type: TypeInterface;
    BuildingID: number;
    Building: BuildingInterface;
    ServiceDayID: number;
    ServiceDay: ServiceDayInterface;
    PeriodID: number;
    Period: PeriodInterface;
    EmployeeID: number;
    Employee: EmployeeInterface;

}

export interface EmployeeInterface {
    ID: number;
    First_Name: string;
    Last_Name: string;
    Email: string;
    Password: string;
}

export interface TypeInterface {
    ID: number;
    Name: string;
    Price: number;
}

export interface BuildingInterface {
    ID: number; 
    Name: string;
}

export interface ServiceDayInterface {
    ID: number;
    Day: string;
}

export interface PeriodInterface {
    ID: number;
    Time: string;
}
