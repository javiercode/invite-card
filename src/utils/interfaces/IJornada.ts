export interface IResultJornada {
  inicio:string,
  fin:string,
  fecha:string,
}

export enum JornadaTipoEnum {
  INICIO = 'INICIO',
  FIN = 'FIN',
  SEGUIMIENTO = 'SEGUIMIENTO',
}