export interface IDataUser {
  username:string,
  nombre:string,
  correo:string,
  password:string,
  codFacebook:string
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