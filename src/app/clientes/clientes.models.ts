import {TipoCliente} from '../util/tipoCliente';
export interface ICliente{
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    tipoCliente: TipoCliente;
    activo: boolean;
}
