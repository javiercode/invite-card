import React, { useEffect, useState } from "react"
import {
  View, Dimensions, DeviceEventEmitter, StyleSheet
} from "react-native"

import { signOut } from "../../store/login"
import { Button, Chip, Dialog, Portal, Text, TextInput } from "react-native-paper"
import { IDataUser } from "../../utils/interfaces/IUser";
import { doLogin, postService } from "../../utils/HttpService";
import NotificacionUtil from "../../utils/NotificacionUtil";
import { ReducerType, ResponseLogin } from "../../utils/interfaces/ILoginStore";
import { ErrorMensajesEnum } from "../../utils/Mensajes";
import ThemeStyle from "../../utils/styles/ThemeStyle";
import Color from "../../utils/styles/Color";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { infoNotificacion, successNotificacion, errorNotificacion } = NotificacionUtil



interface ISingUpProps {
  // login: (path: string) => void,
}
let initDto: IDataUser = {
  username: "",
  nombre: "",
  correo: "",
  password: "",
  codFacebook: ""
};
const SingUp: React.FC<ISingUpProps> = ({ }: ISingUpProps) => {
  
  const [erroApi, setErrorApi] = React.useState<string>("");
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const [createDto, setCreateDto] = useState<IDataUser>(initDto);

  useEffect(() => {
    signOut()
  })

  const onChangeInput = (value: string, input: string) => {
    let dto = createDto;
    // let regex = new RegExp(regexError[input as keyof IDataUser]);
    // if (regex.test(value)) {
    if (true) {
      dto[input as keyof IDataUser] = value;
      setCreateDto(dto);

    } else {

    }
    console.log(dto)
  };

  const saveUser = () => {
    try {
      if (createDto.username !== "" && createDto.correo !== "" && createDto.password !== ""
        && createDto.nombre !== "" && erroApi=="") {

        createDto.correo = createDto.correo.toLocaleLowerCase();
        createDto.username = createDto.username.toLocaleLowerCase();
        postService("/usuario/create", createDto).then((result) => {
          console.log("result.message", result.message)
          // setErrorApi(result.success ? "" : result.message);
          if (result.success) {
            //                 getList();
            doLogin(createDto.username, createDto.password).then((response: ResponseLogin) => {
              if (response.success) {
                successNotificacion("bienvenido");
                DeviceEventEmitter.emit(ReducerType.SIGN_IN)
              } else {
                errorNotificacion("No se inicio sesión: " + ErrorMensajesEnum.USUARIO_ICORRECTO)
              }
            }).finally(() => {
              setLoading(false)
            })
          }
        });
      } else {
        // setErrorApi("Completar el formulario, porfavor!");
      }
    } catch (error) {
      console.error(error)
    }
  };

  const showDialog = () => {
    setVisible(true)
    console.log("true")
  };

  const hideDialog = () => setVisible(false);



  return (
    <View>
      <Button
        loading={loading}
        icon="arrow-up-bold-circle-outline"
        mode="contained"
        style={styles.btnIngresar}
        onPress={showDialog}
      >
        Registrar
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <View style={styles.formControl}>
              <Text variant="displayMedium">Registrarse</Text>
              <TextInput
                mode="outlined"
                label="Usuario"
                placeholder="usuario"
                style={styles.username}
                onChangeText={text => onChangeInput(text, "username")}
              />
              <TextInput
                mode="outlined"
                label="nombre"
                placeholder="Nombre"
                onChangeText={text => onChangeInput(text, "nombre")}
              />
              <TextInput
                mode="outlined"
                label="correo"
                placeholder="Correo"
                onChangeText={text => onChangeInput(text, "correo")}
              />
              <TextInput
                mode="outlined"
                label="password"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => onChangeInput(text, "password")}
              />
              <TextInput
                mode="outlined"
                label="Confirmación Password"
                placeholder="Confirmación Password"
                secureTextEntry={true}
                onChangeText={text => {setErrorApi( createDto.password.toString()!=text?"Las contraseñas no coinciden!":"")}}
                error={erroApi!=""} 
              />
              <Chip icon="alert-circle" onPress={()=>setErrorApi("")} 
                style={{ display: erroApi !== "" ? "flex" : "none", backgroundColor: Color.error }} 
                textStyle={{ color: Color.white }} >{erroApi }</Chip>
              <Button
                loading={loading}
                icon="arrow-right-bold-circle-outline"
                mode="contained"
                style={styles.btnIngresar}
                onPress={() => saveUser()}
              >
                Guardar
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  )
}

export default SingUp;

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
    color: Color.black
    // textTransform:'uppercase'
  },
  username:{
    textTransform:'lowercase'
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
