export interface IDataCliente {
  id: string;
  nombre: string;
  telefono1: string;
  telefono2: string;
  direccion: string;
  ci: string;
  complemento: string;
  extension: string;
  comentario: string;
  estado: string;
  fechaRegistro: string;  
  usuarioRegistro: string,
  sucursalRegistro:number;
  latitud:number;
  longitud:number;
  NRO?:number;
}

export interface IDataForm {
  nombre: string,
  telefono1: string,
  telefono2: string,
  direccion: string,
  ci: string,
  complemento: string,
  extension: string,
  comentario: string,
  latitud: number | string,
  longitud: number | string,
}

export interface IFormError {
  nombre: string,
  telefono1: string,
  telefono2: string,
  direccion: string,
  ci: string,
  complemento: string,
  extension: string,
  comentario: string,
  latitud: string,
  longitud: string,
}

export interface IFormSetError {
  nombre: any,
  telefono1: any,
  telefono2: any,
  direccion: any,
  ci: any,
  complemento: any,
  extension: any,
  comentario: any,
  latitud: any,
  longitud: any,
}

export enum EnumExtensionCliente {
  CH='Chuquisaca',
  LP='La Paz',
  CB='Cochabamba',
  OR='Oruro',
  PT='Potosí',
  TJ='Tarija',
  SC='Santa Cruz',
  BE='Beni',
  PD='Pando',
  PE='Persona Extranjera',
}