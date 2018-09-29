
export interface ILocation {
    Id: string,
    Country: ICountry,
    Province: IProvince,
    District: IDistrict,
    Street: string,
    Display: string,
    KeySearchs: string[],
}
export interface ICountry {
    Id: string,
    Value: number,
    Name: string,
    NationalCode: string,

}
export interface IProvince {
    Id: string,
    Name: string,
}
export interface IDistrict {
    Id: string,
    Name: string,
    Keysearchs: string[],
}