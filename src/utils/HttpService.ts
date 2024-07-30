import { Alert, DeviceEventEmitter, ToastAndroid } from 'react-native';
import { authorized, getAuth, noAuthorized, signIn, signOut, updateToken } from '../store/login';
import { MessageResponse, ResponseFetch } from './interfaces/IGeneral';
import { useNavigation } from '@react-navigation/native';
import { MenuPathEnum } from './enums/Login.enum';
import { ReducerType } from './interfaces/ILoginStore';


const urlBase = ("https://api-kiosko-production.up.railway.app/kiosko/api/v1");
// const urlBase = ("http://192.168.0.13:5000/kiosko/api/v1");
async function postService(url: string, data: any): Promise<MessageResponse> {
  return methodService('POST', url, data);
};
async function getService(url: string,): Promise<MessageResponse> {
  return methodService('GET', url, {});
};
async function putService(url: string, data: any): Promise<MessageResponse> {
  return methodService('PUT', url, data);
};
async function deleteService(url: string): Promise<MessageResponse> {
  return methodService('DELETE', url, {});
};


async function methodService(type: string, url: string, dataPost: any): Promise<MessageResponse> {
  let result = { success: false, message: "Error al conectarse con el servidor", code: 0 } as MessageResponse;

  try {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuth().token}`
    }
    let response = null;
    if (type == 'POST' || type == 'PUT') {
      response = await fetch(urlBase + url, {
        method: type,
        headers: headers,
        body: JSON.stringify(dataPost)
      });
    } else {
      console.log("url GET",urlBase + url)
      response = await fetch(urlBase + url, {
        method: type,
        headers: headers,
      });
    }

    if (response && response.ok && response?.headers) {
      let authorization = response.headers.get('authorization') as string;
      updateToken(authorization);
      result = await response.json() as MessageResponse;
      ToastAndroid.showWithGravityAndOffset(
        result.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }else{
      switch (response.status) {
        case 401:
          result.message = "Demasiado tiempo inactivo, vuelva a loguearse";
          DeviceEventEmitter.emit(ReducerType.TOKEN_INVALID);
          break;
        case 500:
          result.message = "Error interno, vuelva a intentarlo";
          break;
        case 400:
          result.message = "Petición incorrecta, reintente otra vez";
          break;
      }
    }
    
    return result;
  } catch (error) {
    const response: MessageResponse = { success: false, message: 'Error de conexion', code: 0 };
    console.error('error message: ', error);
    return response;
  }
};



async function doLogin(user: string, password: string): Promise<MessageResponse> {
  let response: MessageResponse = { success: false, message: 'Error de conexion', code: 0 };
  try {

    const username = user.toLocaleLowerCase();
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    console.log("login",urlBase + '/login')
    const result = await fetch(urlBase + '/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username: username, password: password })
    });

    console.log("-------------------------------------------------");
    
    if (result.ok && result.status == 200) {
      const resultJson = await result.json();
      console.log("login",resultJson);

      if (result && result?.headers && result?.headers) {
        let authorization = result.headers.get('authorization') as string;
        const resFoto =await getService("/usuario/getFoto/"+username);
        console.log("resFoto",resFoto)
        const resFotoJson =  resFoto.data!=undefined?resFoto.data:"";
        console.log("resFotoData",resFotoJson)
        signIn(resultJson.data.NOMBRE, username, authorization, resultJson.data.ROL, 10000, resultJson.data.SUCURSALES, resFotoJson);
        // //Foto
        // getService("/usuario/getFoto/"+getAuth().username).then(async(resFoto:any)=>{
        //   // const resultJson = await resFoto.json();
        //   // console.log("foto",resultJson)
        //   // console.log("foto",resFoto)
        //   // console.log("foto","resultJson")
        //   signIn(resultJson.data.NOMBRE, username, authorization, resultJson.data.ROL, 10000, resultJson.data.SUCURSALES, resFoto);
        // })
        updateToken(authorization);
      }
1
      if (resultJson.success) {
        response = resultJson;
      }
    } else {
      response.message = "Servicio no disponible: " + result.statusText;
    }

  } catch (error) {
    response.message = "servicio no disponbile";
  }
  ToastAndroid.showWithGravityAndOffset(
    response.message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
  return response;
};


export {
  postService,
  getService,
  putService,
  deleteService,
  doLogin
};