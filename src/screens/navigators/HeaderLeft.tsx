import React from "react"
// import { Entypo } from "@expo/vector-icons";
import {View,StyleSheet,Image} from 'react-native';
import { Avatar, Button, IconButton  } from 'react-native-paper';
import { INavigationMenu } from "../../utils/interfaces/IGeneral";
import Color from "../../utils/styles/Color";

const HeaderLeft: React.FC<INavigationMenu> = ({ navigation }) => {
  const BASE_PATH = '../../assets/icons/';
  const proileImage = 'Menu.png';

  const openCloseDrawer = () => {
    navigation.toggleDrawer()
  }

  return (
      <View>
        {/* <Button 
          // icon={() => (
          //   <Image
          //     source={require(BASE_PATH + proileImage)}
          //     style={style.icono}
          //   />
          // )}
          icon={"menu"} color={Color.white}
         onPress={openCloseDrawer}>
            <IconButton name="warning" size={24} color="#fff" />
        </Button> */}

        <IconButton
    icon="menu"
    color={Color.secondary}
    size={30}
    onPress={openCloseDrawer}
  />

      </View>
  )
}

const style = StyleSheet.create({
  icono: {
    tintColor:Color.gray,
    width:30,
    height:30,
    color:Color.secondary
  },
  
})

export default HeaderLeft

