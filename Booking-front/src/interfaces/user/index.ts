import { ICitizenship } from "interfaces/citizenship";
import {City} from "interfaces/city";

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

export interface IRealtorInformation {
    fullName: string;
    email: string;
    description?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    address?: string;
    citizenship?: ICitizenship;
    gender?: IGender;
    country?: IRealtorInformationCountry;
    city?: IRealtorInformationCity;
}

export interface IUpdateRealtorInformation {
    description: string;
    phoneNumber: string;
    dateOfBirth: string;
    citizenshipId: number;
    genderId: number;
    address: string;
    cityId: number;
}

export interface IRealtorInformationCountry {
    id: number;
    name: string;
}

export interface IRealtorInformationCity {
    id: number;
    name: string;
}

export interface IGender {
    id: number;
    name: string;
}

export interface IRealtorDetails {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    photo: string;
    rating: number;
    phoneNumber?: string;
    description?: string;
    dateOfBirth?: string;
    address?: string;
    citizenship?: ICitizenship;
    gender: IGender;
    city: City;
}
