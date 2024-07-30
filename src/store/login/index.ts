// import { useDispatch, useSelector, useStore } from 'react-redux';
import { store } from '../index';
import { IAuthReducer, RolesType } from '../../utils/interfaces/ILoginStore';
import { authorizeReducer, noAuthorizeReducer, signInReducer, signOutReducer } from './reducer'
import { ubicacionXDepartamento } from '../../utils/GeneralUtils';
import { createListenerMiddleware } from '@reduxjs/toolkit'


const signIn = (name: string, username: string, token: string, rol: string[], expire:number, sucursales:number[], foto:string) => {
    let userLogin:IAuthReducer = {
        isLogin:true,
        tokenValid:true,
        token:token,
        username:username,
        name:name,
        rol:rol,
        expire:expire,
        sucursales: sucursales,
        foto: foto,
    }
    store.dispatch(signInReducer(userLogin));
}

const signOut = () => {
    store.dispatch(signOutReducer());
}

const authorized = () => {
    store.dispatch(noAuthorizeReducer());
}

const noAuthorized = () => {
    store.dispatch(authorizeReducer());
}

const getAuth = () => {
    return store.getState().AuthReducer;
}

const updateToken = (token:string) => {
    const authSession = getAuth();
    if (authSession.isLogin) {
        signIn((authSession.name || ''),(authSession.username || ''),(token||''), (authSession.rol || []),
        (authSession.expire || 0),(authSession.sucursales || []), (authSession.foto || ""));
    }
    return store.getState().AuthReducer;
}

const esOficial = () => {
    const auth = getAuth();
    const aRol = auth.rol || [];
    const rolFind = aRol.find(element => (element ===RolesType.ADMIN || element ===RolesType.GERENTE || element ===RolesType.JEFE ))
    return rolFind===undefined;
}


const listenAuth = () => {
    const listenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: noAuthorizeReducer,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('Todo added: ', action)
    console.log('Todo added: ', listenerApi)

   
  },
})
}

export { signOut, signIn, getAuth,updateToken,esOficial, authorized, noAuthorized,listenAuth }
