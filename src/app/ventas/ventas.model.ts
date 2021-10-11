import {ICliente} from '../clientes/clientes.models';
import {Items} from './items.model';


export interface  IVentas{
  id: number;
  total: number;
  nomTarjeta: string;
  numTarjeta: string;
  cantCuotas: number;
  fechaVenta: Date;
  activa: boolean;
  ClienteDni: number;
  cliente: ICliente;
}

export interface IDetailVenta{
  id: number;
  total: number;
  nomTarjeta: string;
  numTarjeta: string;
  cantCuotas: number;
  fechaVenta: Date;
  activa: boolean;
  ClienteDni: number;
  Items: Items[];
  Cliente: ICliente;

}
