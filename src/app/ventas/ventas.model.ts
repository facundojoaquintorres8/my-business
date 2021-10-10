import {ICliente} from '../clientes/clientes.models';


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
