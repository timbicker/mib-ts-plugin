import React from "react"
import {Menu} from "./Menu/Menu"
import {useAuth} from "../../state/useAuth"
import {InvalidKeyMenu} from "./InvalidKeyMenu"

export function AuthContainer() {
  const auth = useAuth()

  if (!auth.authorized) {
    return <InvalidKeyMenu auth={auth} />
  }

  return <Menu auth={auth} />
}
