export interface IUserLogin {
    username: string,
    password: string
}

export interface IUserData {
    id?: number;
    name: string;
    email: string;
    password?: string;
    updatePassword?: boolean;
    active?: boolean;
    roles?: IRoleData[];
}

export interface IRoleData {
    name: string;
}