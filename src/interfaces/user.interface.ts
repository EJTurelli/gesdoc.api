export interface IUser {
    id: number;
    surname: string;
    name: string;
    cuil: string;
    email: string;
    status: string;
    rol: string;
}

export interface IUserData {
    surname?: string;
    name?: string;
    cuil?: string;
    email?: string;
    status?: string;
    rol?: string;
}

export enum UserRol {
    administrator = 'administrador',
    official = 'funcionario',
};

export enum UserStatus {
    enabled = 'habilitado',
    disabled = 'deshabilitado',
};