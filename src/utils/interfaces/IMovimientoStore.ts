import { IGaleria } from "./IMovimiento";



export interface IGaleriaReducer {
  idTarea: string;
  galeriaList: IGaleria[];
}

export interface IGaleriaStore {
  idTarea: string;
  galeriaList: IGaleria;
}

export interface IAddAction {
  type: string
  payload: IGaleriaStore
}

export interface IClearAction{
  type: string
  payload: string
}