import {IUsuario} from '../usuarios/usuarios.models'

export interface ILoginUser{
  user: IUsuario;
  token: string;
}
export interface ITokenUser{
  id: number;
  usuario: string;
  rol: string;
  activo: string;
}
