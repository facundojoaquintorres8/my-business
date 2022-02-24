import { IProducto } from "../productos/productos.models";
import { ICliente } from "../clientes/clientes.models";

export interface IVenta {
  id: number;
  fecha: Date;
  cliente: ICliente;
  ventasItems: IVentaItem[];
}

export interface IVentaItem {
  id: number;
  precio: number;
  cantidad: number;
  producto: IProducto;
}

export interface IVentaCreate {
  fecha: Date;
  cliente: ICliente;
  itemsVentas: IVentaItem[];
}
