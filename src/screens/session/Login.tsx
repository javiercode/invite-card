import React, { useEffect, useState } from "react"
import { TouchableWithoutFeedback, View, Text, Pressable, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, DeviceEventEmitter, Keyboard, ScrollView, SafeAreaView, ImageBackground } from 'react-native';

import { Snackbar, Button, ActivityIndicator, Portal, Dialog, Provider, TextInput as TextInputP, Text as TextP } from 'react-native-paper';
import isEmpty from "lodash.isempty"
// import Toast from 'react-native-toast-message';

import ThemeStyle from "../../utils/styles/ThemeStyle";
import { ReducerType, ResponseLogin } from "../../utils/interfaces/ILoginStore";
import { doLogin, getService, postService } from "../../utils/HttpService";
import NotificacionUtil from "../../utils/NotificacionUtil";
import { ErrorMensajesEnum } from "../../utils/Mensajes";
import Color from "../../utils/styles/Color";
import SingUp from "./SingUp";
import { getAuth } from "../../store/login";
import SingUpFB from './SingUpFB';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { infoNotificacion, successNotificacion, errorNotificacion } = NotificacionUtil


let regexError: "^[a-zA-Z0-9]{0,5}$";


export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notificacion, setNotificacion] = useState(false)
  const [textoNotificacion, setTextoNotificacion] = useState("")
  const [loading, setLoading] = useState(false)

  const logUrl = '../../assets/images/logoSimple.png';
  const backgroundImg = '../../assets/images/backgroundDefault.jpg';

  useEffect(() => {
  }, [])

  const onChangeUser = (texto: string) => {
    let regex = new RegExp(regexError);
    if (regex.test(texto)) {
      // setUsername(texto.toLocaleUpperCase())
      setUsername(texto)
    } else {
      errorNotificacion("Error Validación: " + ErrorMensajesEnum.USUARIO_INVALIDO)
    }
  }

  const handleSubmit = () => {
    if (!isEmpty(username) && !isEmpty(password)) {
      setLoading(true)
      doLogin(username, password).then((response: ResponseLogin) => {
        if (response.success) {
          successNotificacion("bienvenido");
          DeviceEventEmitter.emit(ReducerType.SIGN_IN)
        } else {
          errorNotificacion("No se inicio sesión: " + ErrorMensajesEnum.USUARIO_ICORRECTO)
        }
      }).finally(async() => {
        setLoading(false)
      })
    } else {
      errorNotificacion("complete los campos: " + ErrorMensajesEnum.USUARIO_INVALIDO)
    }
    // const data = new FormData(event.currentTarget);
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require(backgroundImg)} style={{ flex: 1, justifyContent: "center" }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View >
                <Image source={require(logUrl)} style={styles.logo} />
                <Text style={styles.titulo}>Bolivia Avanza</Text>
              </View>
              <View style={styles.subcontainer}>
                <TextInput
                  style={styles.user}
                  placeholderTextColor={Color.secondaryVariant}
                  placeholder={'Nombre de usuario'}
                  value={username}
                  onChangeText={(username) => onChangeUser(username)}
                />
                <TextInput
                  style={styles.textbox}
                  secureTextEntry={true}
                  placeholderTextColor={Color.secondaryVariant}
                  placeholder={'Contraseña'}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
                <Button
                  loading={loading}
                  icon="arrow-right-bold-circle-outline"
                  mode="contained"
                  style={styles.btnIngresar}
                  onPress={() => handleSubmit()}
                >
                  Ingresar
                </Button>
                <SingUp />
                {/* <SingUpFB /> */}

                <Snackbar
                  visible={notificacion}
                  onDismiss={() => {
                    setNotificacion(false)
                  }}
                  action={{
                    label: 'Ocultar',
                    onPress: () => {
                      // Do something
                    },
                  }}>
                  {textoNotificacion}
                </Snackbar>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: 250.0, height: 186.0,
    flex: 1,
    backgroundColor: 'white',
    resizeMode: 'contain'
  },
  logo: {
    width: 293, height: 130,
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: windowWidth,
    maxWidth: 500,
    height: windowHeight - 50,
    paddingTop: windowHeight * 0.08,
    borderRadius: 10,
  },
  titulo: {
    width: 323,
    height: 45,
    fontFamily: "Montserrat",
    fontSize: 42,
    fontWeight: "bold",
    fontStyle: "normal",
    color: ThemeStyle.SECONDARY_COLOR,
    alignSelf: 'center',
    marginTop: 20,
    textAlign: "center"
  },
  subtitulo: {
    width: 226,
    height: 13,
    marginTop: 10,
    fontSize: 10,
    color: ThemeStyle.SECONDARY_COLOR,
    textAlign: "center"
  },
  textbox: {
    width: 324,
    height: 48,
    borderRadius: 19,
    borderColor: ThemeStyle.PRIMARY_COLOR,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: ThemeStyle.BACKGROUND_COLOR_SECONDARY,
    marginTop: 5,
    color: Color.black
  },
  user: {
    width: 324,
    height: 48,
    borderRadius: 19,
    borderColor: ThemeStyle.PRIMARY_COLOR,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: ThemeStyle.BACKGROUND_COLOR_SECONDARY,
    marginTop: 50,
    color: Color.black,
    textTransform: 'lowercase'
  },
  btnIngresar: {
    height: 56,
    borderRadius: 19,
    borderColor: ThemeStyle.PRIMARY_COLOR,
    backgroundColor: Color.secondary,
    marginTop: 20,
    justifyContent: "center",
  },
  btnRegistrar: {
    height: 56,
    borderRadius: 19,
    borderColor: ThemeStyle.PRIMARY_COLOR,
    backgroundColor: Color.secondary,
    marginTop: 20,
    justifyContent: "center",
  },
  textBtn: {
    color: ThemeStyle.BACKGROUND_COLOR_SECONDARY,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  subcontainer: {
    // paddingTop: 20<<,
  },
  formControl: {
    margin: 2,
    width: '95%',
    paddingLeft: '4%'
  },
});