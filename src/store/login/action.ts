import { ReducerType } from "../../utils/interfaces/ILoginStore";


const signInAction = (name:string,username:string,token:string,rol:string[],expire:number, sucursales:number[],departamento:number) =>{

  let signIn = {
    type:ReducerType.SIGN_IN,
    payload:{
      isLogin:true,
      username:username,
      name:name,
      token:token,
      rol:rol,
      expire:expire,
      sucursales:sucursales,
      departamento:departamento,
    }
  }
  // localStorage.setItem('auth', JSON.stringify(signIn)): TODO:LOCALSTORAGE
  return signIn;
}
const signOutAction = () =>{
  let signOut = {
    type:ReducerType.SIGN_OUT,
    payload:{
      isLogin:false
    }
  }
  // localStorage.setItem('auth', JSON.stringify(signOut)) //  TODO:LOCALSTORAGE
  return signOut;
}

export { signOutAction,signInAction}