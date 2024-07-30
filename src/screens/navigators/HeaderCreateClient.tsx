import React from "react"
// import { Entypo } from "@expo/vector-icons";
import {View,StyleSheet,Image} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { MenuPathEnum } from "../../utils/enums/Login.enum";
import { INavigation } from "../../utils/interfaces/IGeneral";
import Color from "../../utils/styles/Color";

const HeaderCreateCliente: React.FC<INavigation> = ({ navigation }) => {
  const BASE_PATH = '../../assets/icons/';
  const proileImage = 'Menu.png';

  const handlePlus = () => {
    navigation.navigate(MenuPathEnum.PRODUCTO)
  }

  return (
      <View>
        <IconButton size={30} icon="account-plus" onPress={() => {handlePlus()}} />
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

export default HeaderCreateCliente;