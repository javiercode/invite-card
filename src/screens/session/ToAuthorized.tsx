import React, { useEffect, useState } from "react"
import { DeviceEventEmitter, Dimensions, Image, Keyboard, Modal, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, IconButton, Snackbar, Text, TextInput } from "react-native-paper";
import Color from "../../utils/styles/Color";
import ThemeStyle from "../../utils/styles/ThemeStyle";
import NotificacionUtil from "../../utils/NotificacionUtil";
import { ErrorMensajesEnum } from "../../utils/Mensajes";
import { ReducerType, ResponseLogin } from "../../utils/interfaces/ILoginStore";
import isEmpty from "lodash.isempty";
import { doLogin } from "../../utils/HttpService";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { infoNotificacion, successNotificacion, errorNotificacion } = NotificacionUtil


const ToAuthorized = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notificacion, setNotificacion] = useState(false)
  const [textoNotificacion, setTextoNotificacion] = useState("")
  const [loading, setLoading] = useState(false)

  const bgUrl = '../../assets/images/inicio.png';
  const logUrl = '../../assets/images/Logo1.png';
  const backgroundImg = '../../assets/images/backgroundDefault.jpg';
  let regexError: "^[a-zA-Z0-9]{0,5}$";

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
          DeviceEventEmitter.emit(ReducerType.TOKEN_VALID)
        } else {
          errorNotificacion("No se inicio sesión: " + ErrorMensajesEnum.USUARIO_ICORRECTO)
        }
      }).finally(() => {
        setLoading(false)
      })
    } else {
      errorNotificacion("complete los campos: " + ErrorMensajesEnum.USUARIO_INVALIDO)
    }
    // const data = new FormData(event.currentTarget);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          console.log("Modal has been closed.");
          // setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 }}>
          <Card style={{height:350}}>
            <Card.Title
              title="LOGIN"
              subtitle={"Expiro tu sesión, vuelve a ingresar"}
              titleStyle={{ fontSize: 16 }}
              subtitleStyle={{ fontWeight: 'bold' }}
              left={(props) => <IconButton size={30} icon="clipboard-arrow-right" color={Color.white}
                style={{ backgroundColor: Color.secondary }} />}

            />
            <Card.Content>
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
            </Card.Content>
          </Card>
        </View>

        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          
        </TouchableWithoutFeedback> */}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: ThemeStyle.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    color: Color.black
  },
  logo: {
    width: 293, height: 36,
    marginTop: 33,
    alignSelf: 'center',
  },
  titulo: {
    width: 323,
    height: 28,
    fontFamily: "Montserrat",
    fontSize: 28,
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
  btnIngresar: {
    width: 324,
    height: 56,
    borderRadius: 19,
    borderColor: ThemeStyle.PRIMARY_COLOR,
    backgroundColor: Color.secondary,
    marginTop: 30,
    justifyContent: "center",
  },
});
export default ToAuthorized;