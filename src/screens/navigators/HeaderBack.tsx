import React from "react"
// import { Entypo } from "@expo/vector-icons";
import {View,StyleSheet,Image} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { MenuPathEnum } from "../../utils/enums/Login.enum";
import { INavigationBack, INavigationGo } from "../../utils/interfaces/IGeneral";
import Color from "../../utils/styles/Color";

const HeaderBack: React.FC<INavigationBack> = ({ navigation,  icon }) => {
  const BASE_PATH = '../../assets/icons/';
  const proileImage = 'Menu.png';

  const openCloseDrawer = () => {
    navigation.goBack()
  }

  return (
      <View>
        <IconButton size={30} icon={icon} onPress={() => {openCloseDrawer()}} />
      </View>
  )
}

const style = StyleSheet.create({
  icono: {
    tintColor:Color.gray,
    width:30,
    height:30,
  },
  
})

export default HeaderBack;