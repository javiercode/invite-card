export enum ReducerType {
  SIGN_IN = 'login@SIGN_IN',
  SIGN_OUT = 'login@SIGN_OUT',
  TOKEN_VALID = 'login@TOKEN_VALID',
  TOKEN_INVALID = 'login@TOKEN_INVALID',
}

export interface IAuthReducer {
  isLogin: boolean;
  tokenValid: boolean;
  token?: string;
  username?: string;
  rol?: string[]; // 'Oficial / Ejecutivo','Jefe / Encargado','Gerente','Administrador'
  expire?: number;
  name?: string;
  sucursales?: number[];
  foto?: string;
}

export interface AuthAction {
  type: string
  payload: IAuthReducer
}

export enum RolesType {
  ADMIN = 'ADM',
  GERENTE = 'GER',
  JEFE = 'JEF',
  OFICIAL = 'OFI'
}

export type ResponseLogin = {
  success: boolean;
  message: string;
};