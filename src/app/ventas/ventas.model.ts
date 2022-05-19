import { IProducto } from '../productos/productos.models';
import { ICliente } from '../clientes/clientes.models';

export interface IVenta {
    id: number;
    fecha: Date;
    cliente: ICliente;
    formaPago: FormaPagoEnum;
    porcentajeDescuento: number;
    total: number;
    ventasItems: IVentaItem[];
}

export interface IVentaItem {
    id: number;
    cantidad: number;
    producto: IProducto;
}

export interface IVentaCreate {
    fecha: Date;
    cliente: ICliente;
    formaPago: FormaPagoEnum;
    porcentajeDescuento: number;
    total: number;
    ventasItems: IVentaItem[];
}

export enum FormaPagoEnum {
    EFECTIVO,
    'Efectivo' = EFECTIVO,
    TRANSFERENCIA,
    'Transferencia' = TRANSFERENCIA,
    TARJETA_DE_CREDITO,
    'Tarjeta de Crédito' = TARJETA_DE_CREDITO,
    TARJETA_DE_DEBITO,
    'Tarjeta de Débito' = TARJETA_DE_DEBITO,
    OTRO,
    'Otro' = OTRO
}