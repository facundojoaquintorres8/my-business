export interface IUsuario{
  id: number;
  usuario: string;
  password: string;
  rol: string;
  activo: string;
}


export interface IUsuarioPassword{
  id: number,
  password: string
}

export interface IUsuarioLogin{
  usuario: string,
  password: string
}
