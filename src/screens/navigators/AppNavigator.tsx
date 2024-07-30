import React, { useEffect, createContext, useState } from "react";
import { DeviceEventEmitter, Dimensions, View, Text, SafeAreaView, Modal, Pressable } from 'react-native'
import { DrawerActions, NavigationContainer, useFocusEffect } from "@react-navigation/native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { signInReducer, signOutReducer } from '../../store/login/reducer'

import PropTypes from 'prop-types'
import Screens from "../../utils/Screens";
import Utils from '../../utils/NumeralUtil'
import { getAuth, listenAuth, signOut } from "../../store/login";
import MenuSideBar from "./MenuSideBar";
import HeaderRight from "./HeaderRight";
import { INavigation } from "../../utils/interfaces/IGeneral";
// import HeaderLeft from "./HeaderLeft";
// import Settings from "../configuracion";
import Logout from "../session/Logout";
import Login from "../session/Login";
import ToAuthorized from "../session/ToAuthorized";
import { MenuPathEnum } from "../../utils/enums/Login.enum";
import { ReducerType } from "../../utils/interfaces/ILoginStore";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import HeaderGo from "./HeaderGo";
// import HeaderBack from "./HeaderBack";
import Color from "../../utils/styles/Color";
// import TabMovimiento from "../movimiento/Tab";
// import ListMovimiento from "../movimiento/List";
import Test from "../test";
import Test1 from "../test1";
import Test2 from "../test2";
import HeaderBack from "./HeaderBack";

const { width, height } = Dimensions.get("window");

const AuthContext = createContext(null);
const styleHeader: NativeStackNavigationOptions = {
  statusBarColor: Color.secondary,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AppNavigator = (props: any) => {
  const [isLogin, setIsLogin] = useState(getAuth().isLogin)
  const [tokenValido, setTokenValido] = useState(true)

  useEffect(() => {
    listenersEvents();
  }, [isLogin])



  const listenersEvents = () => {
    DeviceEventEmitter.addListener(ReducerType.SIGN_IN, (seconds) => {
      setIsLogin(getAuth().isLogin);
    })

    DeviceEventEmitter.addListener(ReducerType.SIGN_OUT, () => {
      setIsLogin(false);
    })

    DeviceEventEmitter.addListener(ReducerType.TOKEN_VALID, () => {
      setTokenValido(true);
    })

    DeviceEventEmitter.addListener(ReducerType.TOKEN_INVALID, () => {
      setTokenValido(false);
    })

    // Create the middleware instance and methods
    // listenAuth()


  }

  function Logout({ navigation }: any) {
    useEffect(() => {
      signOut()
      DeviceEventEmitter.emit(ReducerType.SIGN_OUT);
    })
    return (
      <SafeAreaView style={{ backgroundColor: Color.primary }}>
        <Text>Cerrar Sesión</Text>
      </SafeAreaView>
    );
  }


  const MovNavigation: React.FC<INavigation> = ({ navigation }) => {
    return (
      <Stack.Navigator initialRouteName={MenuPathEnum.MOVIMIENTO_HOME}
        screenOptions={styleHeader} >
        <Stack.Screen options={{
          title: 'Movimientos',
          headerShown: false
        }}
          name={MenuPathEnum.SETTINGS_HOME} component={Test} />
        <Stack.Screen options={{
          // headerRight: () => (
          //   <HeaderBack navigation={navigation} icon={"arrow-left-bottom"} />
          // ),
          // headerShown:false,

          title: 'Compra'
        }}
          name={MenuPathEnum.JORNADA_HOME} component={Test1} />

        <Stack.Screen options={{
          title: 'Compra'
        }} name={MenuPathEnum.CLIENTE_HOME} component={Test2}/>
        <Stack.Screen options={{
          headerShown: false
        }}
          name={MenuPathEnum.LOGOUT} component={Logout} />
      </Stack.Navigator>
    );
  }


  return (
    <>
      {isLogin && !tokenValido &&
        <ToAuthorized />}
      <NavigationContainer>
        <Stack.Navigator>
          {isLogin ?
            <Stack.Screen
              name={MenuPathEnum.MOVIMIENTO_HOME}
              component={MovNavigation}
              options={{ headerShown: false }}
            />
            :
            // <Login />
            // <NavigationContainer>
            <Stack.Screen name="Profile" options={{ headerShown: false }} component={Login} />


          }
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

AppNavigator.propTypes = {}

export default AppNavigator;