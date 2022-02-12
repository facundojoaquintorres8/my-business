export interface IUsuario {
  id: number;
  usuario: string;
  clave: string;
  rol: string;
  activo: string;
}

export interface IUser {
  id: number;
  usuario: string;
  rol: string;
  activo: string;
}

export interface IUsuarioClave {
  id: number;
  claveVieja: string;
  claveNueva: string;
}

export interface IUsuarioLogin {
  usuario: string;
  clave: string;
}

