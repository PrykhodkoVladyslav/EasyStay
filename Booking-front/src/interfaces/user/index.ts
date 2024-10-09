import { City } from "interfaces/city";
import {ICitizenship} from "interfaces/citizenship";

export interface User {
    id: number;
    // Id
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": number;
    email: string;
    // Roles
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    firstName: string;
    lastName: string;
    photo: string;
    isLocked: boolean;
}

export interface IRealtorInformation {
    fullName: string;
    email: string;
    description: string;
    phoneNumber: string;
    dateOfBirth: Date;
    citizenship: ICitizenship;
    gender: IGender;
    address: string;
    city: City;
}

export interface IUpdateRealtorInformation {
    description: string;
    phoneNumber: string;
    dateOfBirth: Date;
    citizenshipId: number;
    genderId: number;
    address: string;
    cityId: number;
}

export interface IGender {
    id: number;
    name: string;
}

// export interface GenderInfo {
//     id: number;
//     name: string;
// }

export interface UserState {
    location: string;
    user: User | null;
    token: string | null;
}

export interface SignInResponse {
    token: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface Registration {
    firstName: string;
    lastName: string;
    image?: File | null;
    email: string;
    username: string;
    password: string;
    type: string;
}

export interface CreateAdmin {
    firstName: string;
    lastName: string;
    image?: File | null;
    email: string;
    username: string;
    password: string;
}

export interface BlockUserRequest {
    id: number;
    lockoutEndUtc: Date;
}

export interface UnlockUserRequest {
    id: number;
}

export interface ISendResetPasswordEmailRequest {
    email: string;
}

export interface IResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
}
