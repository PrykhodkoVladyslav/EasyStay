export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
}

export interface UserState {
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
    image: File | null;
    email: string;
    username: string;
    password: string;
    type: string;
}
