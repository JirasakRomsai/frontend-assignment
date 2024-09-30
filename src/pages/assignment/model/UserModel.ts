interface IHair {
    color: string;
    type: string;
}

interface ICoordinates {
    lat: number;
    lng: number;
}

interface IAddress {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: ICoordinates;
    country: string;
}

interface IBank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface ICompanyAddress {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: ICoordinates;
    country: string;
}

interface Company {
    department: string;
    name: string;
    title: string;
    address: ICompanyAddress;
}

interface ICrypto {
    coin: string;
    wallet: string;
    network: string;
}

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: IHair;
    ip: string;
    address: IAddress;
    macAddress: string;
    university: string;
    bank: IBank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}

/* Summary */
interface HairSummary {
    [color: string]: number;
}

interface AddressUserSummary {
    [key: string]: string;
}

interface DepartmentSummary {
    male: number;
    female: number;
    ageRange: string;
    hair: HairSummary;
    addressUser: AddressUserSummary;
}

interface IDepartmentGroupSummary {
    [department: string]: DepartmentSummary;
}


export type {
    IUser,
    IDepartmentGroupSummary
}