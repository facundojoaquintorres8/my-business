import { IProducto } from '../productos/productos.models';
import { IProveedor } from '../proveedores/proveedores.models';

export interface ICompra {
    id: number;
    fecha: Date;
    proveedor: IProveedor;
    comprasItems: ICompraItem[];
}

export interface ICompraItem {
    id: number;
    precio: number;
    cantidad: number;
    producto: IProducto;
}

export interface ICompraCreate {
    fecha: Date;
    proveedor: IProveedor;
    itemsCompras: ICompraItem[];
}
