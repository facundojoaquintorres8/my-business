export interface IUsuario{
  id: number;
  usuario: string;
  clave: string;
  rol: string;
  activo: string;
}

export interface IUsuarioClave{
  id: number,
  claveVieja: string,
  claveNueva: string,
  claveNuevaRepetida: string

}

export interface IUsuarioLogin{
  usuario: string,
  clave: string
}
