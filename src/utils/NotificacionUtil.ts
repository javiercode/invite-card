// import Toast from 'react-native-toast-message'

import { ToastAndroid } from "react-native";

export default  {
  infoNotificacion:(str:string)=> {
    // Toast.show({
    //   type: 'info',
    //   text1: str
    // });
  },
  info2Notificacion:(str:string, str2:string)=> {
    // Toast.show({
    //   type: 'info',
    //   text1: str,
    //   text2: str2,
    // });
  },
  successNotificacion:(str:string)=> {
    // Toast.show({
    //   type: 'success',
    //   text1: str
    // });
  },  
  success2Notificacion:(str:string,str2:string)=> {
    // Toast.show({
    //   type: 'success',
    //   text1: str,
    //   text2: str2,
    // });
  },
  errorNotificacion:(str:string)=> {
    ToastAndroid.showWithGravityAndOffset(
      str,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );    
  },  
};
