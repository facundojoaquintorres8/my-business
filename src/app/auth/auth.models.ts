import { IUsuario } from '../usuarios/usuarios.models';

export interface ILoginUser {
    user: IUsuario;
    token: string;
}

export interface ISessionUser {
    id: number;
    usuario: string;
    rol: string;
    activo: string;
}
