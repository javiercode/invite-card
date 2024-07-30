import { StyleSheet } from 'react-native'
import Color from './Color'

const NavBarStyle = StyleSheet.create({
  title: {
    color: Color.white, 
    fontWeight: '200'
  },
  headerRight: {
    marginRight: 10,
    color: Color.white
  }
})

export default NavBarStyle