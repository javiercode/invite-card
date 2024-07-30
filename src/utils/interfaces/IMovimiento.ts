import { IProducto } from "./IProducto";
import { ILocation } from "./IGeneral";

export interface IMovimiento {
  id: number;
  codProducto: number;
  fecha: Date;
  monto: number;
  estado: string;
  fechaRegistro: string;  
  usuarioRegistro: string,
  sucursalRegistro:number;
  producto:IProducto;
  fechaModificacion?: string;  
  usurioModificacion?: string,
  sucursalModificacion?:number;
  NRO?:number;
}

export interface IDataForm {
  tipo: string;
  codCliente: string;
  responsable: string;
  fecha: string;
  recordatorio: string;
  motivo: string;
  referencia: string;
}

export interface IDataEditForm {
  tipo: string;
  responsable: string;
  fecha: string;
  recordatorio: string;
  motivo: string;
  referencia: string;
}

export interface IFormError {
  tipo: string,
  codCliente: string,
  recordatorio: string,
  motivo: string,
  referencia: string,
}

export interface IFormSetError {
  tipo: any,
  codCliente: any,
  recordatorio: any,
  motivo: any,
  referencia: any,
  fecha?: any,
}

export interface IFormEditSetError {
  tipo: any,
  recordatorio: any,
  motivo: any,
  referencia: any,
}

export enum TipoTareaEnum {
  GESTION_OF_CENTRAL='Gestiones de oficina',
  LLAMADA_COBRANZA='Llamada de cobranza',
  LLAMADA_MERCADEO='Llamada de mercadeo',
  REVISION_CARPETA='Revisión de carpeta',
  VISITA_COBRANZA='Visita de cobranza',
  VISITA_MERCADEO='Visita de mercadeo',
  VISITA_DOMICILIO='Visita de domicilio',
  VISITA_DOM_NEG_LAB='Visita domicilio y negocio/laboral',
  VISITA_NEGOCIO_LABORAL='Visita negocio/laboral',
}


export interface IGaleria {
  path: string,
  fileName: string,
  type: string,
  ubicacion: ILocation,
  fecha: string,
  blob?:string,
}