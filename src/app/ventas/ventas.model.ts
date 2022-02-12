import { ICliente } from '../clientes/clientes.models';
import { IProducto } from '../productos/productos.models';

export interface IVentas {
  id: number;
  total: number;
  nomTarjeta: string;
  numTarjeta: string;
  cantCuotas: number;
  fecha: Date;
  cliente: ICliente;
  itemsVentas: ItemsVentas[];
}

export interface ItemsVentas {
  id: number;
  cantidad: number;
  ventaId: number;
  producto: IProducto;
}
