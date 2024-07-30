import React from "react"
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";
import Color from "../../utils/styles/Color";

const NotAuthorized = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:50}}>No se puede ingresar a la app en modo root.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.error,
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize:150
  },
 
});
export default NotAuthorized;