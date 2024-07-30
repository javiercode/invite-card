import React, { useEffect } from "react"
import {
  Text
} from "react-native"

import { signOut } from "../../store/login"

const Logout = () => {
  useEffect(() => {
    signOut()
  })

  return (
    <Text>Cerrar Sesión</Text>
  )
}

export default Logout