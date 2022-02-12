export interface IProveedor {
  id: number;
  cuitDni: number;
  razonSocial: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  activo: boolean;
}
