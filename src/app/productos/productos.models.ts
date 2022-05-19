import { ICategoriaProducto } from '../categorias-productos/categorias-productos.models';

export interface IProducto {
    id: number;
    descripcion: string;
    stock: number;
    cantidadMinima: number;
    preciosVenta: IPrecios[];
    categoria: ICategoriaProducto;
    activo: boolean;
}

export interface IProductoUpdate {
    id: number;
    descripcion: string;
    stock: number;
    cantidadMinima: number;
    precioVenta: number;
    categoriaId: number;
    activo: boolean;
}

export interface IQuickProducto {
    descripcion: string;
    cantidadMinima: number;
    precioVenta: number;
    categoriaId: number;
}

export interface IPrecios {
    id: number;
    fecha: Date;
    precio: number;
    producto: IProducto;
}

export function getLastPrecioVenta(producto: IProducto): number {
    const lastPrecio = producto.preciosVenta.reduce((a, b) => a.fecha > b.fecha ? a : b);
    if (lastPrecio) {
        return lastPrecio.precio;
    }
    return 0;
}
