export interface ICliente {
    dni: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    direccion: string;
    tipo: string;
    activo: boolean;
}

export interface IQuickCliente {
    dni: number;
    nombre: string;
    apellido: string;
    tipo: string;
    telefono?: string;
}
