import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { SafeAreaView,
    StyleSheet,
    Image,
    Text } from 'react-native';
import Screens from "../../utils/Screens";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
  } from '@react-navigation/drawer';
import { getAuth } from '../../store/login';
import Color from "../../utils/styles/Color";
import { Avatar } from "react-native-paper";

const MenuSideBar = (props:any) => {
  const BASE_PATH = '../../assets/icons/';
  const proileImage = 'user.png';
  const USERNAME = getAuth().name;
  const [aRol, setARol] = useState(getAuth().rol? getAuth().rol:"" );
  const [username, setUsername] = useState(USERNAME || "");
  const [iniciales, setIniciales] = useState("");

  useEffect(() => {
  }, [])

  const test=()=>{
    console.log("props",props)
    console.log("props descriptors",props.descriptors["CERRAR SESIóN-76gpkwgBJEy-ndUvCmxZ7"])
    console.log("props navigation",props.navigation)
    console.log("props state",props.state)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Avatar.Icon size={150} icon="account" style={styles.profileIcon} color={Color.white}/>
      <Text style={styles.textUser}>
        {USERNAME?.toLocaleUpperCase()}
        </Text>
      <DrawerContentScrollView {...props} style={styles.textItem}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={styles.textFooter}>
        Experiencia Mype
      </Text>
      <Text style={styles.textFooter}>
        Banco Ganadero - 2022
      </Text>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    profileIcon: {
      marginTop:50,
      resizeMode: 'center',
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      alignSelf: 'center',
      backgroundColor:Color.secondary,
    },
    sideMenuProfileIcon: {
      resizeMode: 'center',
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      alignSelf: 'center',
    },
    iconStyle: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
    },
    customItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },  
    textUser: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
      margin:20,
      textAlign:'center',
      color:Color.black,
      fontWeight:'bold'
    },
    textFooter: {
      fontSize: 16,
      textAlign: 'center',
      color: Color.black
    },
    textItem: {
      fontSize: 20,
      textAlign: 'center',
      color: Color.black
    }
  });
  

export default MenuSideBar