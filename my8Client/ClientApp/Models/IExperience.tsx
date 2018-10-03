export interface IExperience {
    Id: string,
    Title: string,
    CompanyName: string,
    Location: Location,
    FromDate: Date,
    FromMonth?: number,
    FromYear?: number,
    isCurrentlyWorkHere: boolean,
    ToDate?: Date,
    ToMonth?: number,
    ToYear?: number,
    Industry?: any,
    WorkAs: string,
    Description: string,
    PersonId: string,
    CreatedTime: number,
    UpdatedTime: number,

}
//<AppendNewHere>