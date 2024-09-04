import { Hotel } from "interfaces/hotel";

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
}

// export interface ILocation {
//     latitude: number;
//     longitude: number;
// }

export interface UserState {
    // location: ILocation | null;
    user: User | null;
    token: string | null;
    // favoriteHotels: Hotel[];
}

export interface LoginResponse {
    token: string;
}

export interface SignIn {
    token: string;
}

export interface Registration {
    firstName: string;
    lastName: string;
    image: File | null;
    email: string;
    username: string;
    password: string;
    type: string;
}
