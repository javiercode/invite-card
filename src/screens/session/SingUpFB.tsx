import React, { useEffect, useState } from "react"
import {
  View, Dimensions, DeviceEventEmitter, StyleSheet, Image
} from "react-native"

import { Button, Chip, Dialog, Portal, Text, TextInput } from "react-native-paper"
import NotificacionUtil from "../../utils/NotificacionUtil";
import ThemeStyle from "../../utils/styles/ThemeStyle";
import Color from "../../utils/styles/Color";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { infoNotificacion, successNotificacion, errorNotificacion } = NotificacionUtil

interface ISingUpProps {
}

const SingUpFB: React.FC<ISingUpProps> = ({ }: ISingUpProps) => {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    onLogout();
  })

  const getResponseInfo = (error: any, result: any) => {
    if (error) {
      //Alert for the Error
      console.log('Error fetching data: ' + error.toString());
    } else {
      //response alert
      console.log(JSON.stringify(result));
      setUserName('Welcome ' + result.name);
      setToken('User Token: ' + result.id);
      setProfilePic(result.picture.data.url);
    }
  };

  const onLogout = () => {
    //Clear the state after logout
    setUserName('');
    setToken('');
    setProfilePic('');
  };

  return (
    <View style={{ display: 'flex' }}>
      {profilePic ? (
        <Image
          source={{ uri: profilePic }}
          style={styleFB.imageStyle}
        />
      ) : null}
      <Text style={styleFB.textStyle}> {userName} </Text>
      <Text style={styleFB.textStyle}> {token} </Text>
      <LoginButton
        // readPermissions={['public_profile']}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log(error);
            console.log('Login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('Login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data: any) => {
              console.log(data.accessToken.toString());
              const processRequest = new GraphRequest(
                '/me?fields=name,picture.type(large)',
                null,
                getResponseInfo,
              );

              new GraphRequestManager()
                .addRequest(processRequest).start();
            });
          }
        }}
        onLogoutFinished={onLogout}
      />
    </View>
  )
}

export default SingUpFB;

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
  username: {
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


const styleFB = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 10,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});