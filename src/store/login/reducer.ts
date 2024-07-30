import { createSlice } from '@reduxjs/toolkit';
import { AuthAction, IAuthReducer } from '../../utils/interfaces/ILoginStore';

let initialState:IAuthReducer = {
    isLogin: false,
    tokenValid: false,
    rol:[],
    sucursales:[]
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signInReducer: (state = initialState,action:AuthAction) => {
        let userLogin:IAuthReducer = {
          isLogin:true,
          tokenValid:true,
          token:action.payload.token,
          username:action.payload.username,
          name:action.payload.name,
          rol:action.payload.rol,
          expire:action.payload.expire,
          sucursales: action.payload.sucursales,
          foto: action.payload.foto,
      }
    state = userLogin;
    return state;
    },
    signOutReducer: (state:any) => {
      state = initialState;
      return state; 
    },
    noAuthorizeReducer: (state:any) => {
      let stateInvalid:IAuthReducer = state
      stateInvalid.tokenValid = false;
      state = stateInvalid;
      return state;
    },
    authorizeReducer: (state:any) => {
      let stateInvalid:IAuthReducer = state
      stateInvalid.tokenValid = true;
      state = stateInvalid;
      return state;
    },
  },
}) 


export const { signInReducer, signOutReducer,noAuthorizeReducer,authorizeReducer } = loginSlice.actions;
export default loginSlice.reducer;