import { ICategoriaProducto } from "../categorias-productos/categorias-productos.models";
import { IProveedor } from "../proveedores/proveedores.models";

export interface IProducto {
  id: number;
  descripcion: string;
  stock: number;
  cantidadMinima: number;
  precioVenta: number;
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

export interface IPrecios {
  id: number;
  fecha: Date;
  precio: number;
  producto: IProducto;
  proveedor: IProveedor;
}