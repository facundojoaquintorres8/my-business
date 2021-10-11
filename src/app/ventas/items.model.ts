import {IProductoUpdate} from '../productos/productos.models';


export interface  Items{
    id: number;
    cantPedida: number;
    VentaId: number;
    ProductoId: number;
    Producto: IProductoUpdate;
}
