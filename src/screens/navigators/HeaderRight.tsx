import React from "react"
// import { Feather } from "@expo/vector-icons"
import { Button,SafeAreaView,Image ,View,  Platform, Text, StyleSheet,TouchableOpacity,TouchableHighlight, Dimensions } from 'react-native';
import NavBarStyle from "../../utils/styles/NavBarStyle"
import { useDrawerStatus } from '@react-navigation/drawer';
import Screens from "../../utils/Screens";

const { JORNADA: SOLICITUD } = Screens
const { width, height } = Dimensions.get("window");
const HeaderRight = () => {
  return (
    <View style={style.sectionStyle}>
      
        <Image style={style.sizeImg}
            source={
              require('../../assets/icons/logo.png')
            }
        />
      <View style={style.seccion}>
          <Text style={style.textoLogo1} >{"Evaluación"}</Text>
          <Text style={style.textoLogo2} >{"Crediticia"}</Text>
      </View>
      
      
    </View>
  )
}

const style = StyleSheet.create({
  seccion: {
    paddingLeft:10,
  },
  seccion2: {
    alignSelf: 'stretch'
  },
  textoLogo1: {
    fontSize:(width*0.028)
  },
  textoLogo2: {
    fontSize:(width*0.028),
    // fontSize:12,
    fontWeight:'bold'
  },
  sizeImg: {
    marginLeft:10,
    width: 35,
    height: 35,
    resizeMode: "stretch",
  },
  sectionStyle: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    
    backgroundColor: '#fff',
    textShadowColor:'blue',
    // borderWidth: 0.5,
    // borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 8,
},
})

export default HeaderRight