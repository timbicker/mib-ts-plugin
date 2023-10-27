import React, {useEffect, useState} from "react"
import {User} from "./types"
import {api} from "./api"

export function useAuth() {
  const [user, setUser] = useState<User>({
    monthlyCharacters: 0,
    remainingCharacters: 0,
    planActive: 0,
    name: "Tim",
    email: "timbicker@gmail.com",
  })
  const [authorized, setAuthorized] = useState(true)
  const [apiKeyInput, setApiKeyInput] = React.useState("")

  const handleUser = userData => {
    setUser(userData)
  }

  const [isUpdatingSession, setIsUpdatingSession] = useState(false)

  // check ApiKey when starting
  const updateSession = async () => {
    if (!apiKeyInput) return
    setIsUpdatingSession(true)
    try {
      const userData = await api.getSessionInfo(apiKeyInput)
      setAuthorized(true)
      handleUser(userData)
    } catch (error) {
      setAuthorized(false)
      if (error.response) {
        setAuthorized(false)
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
      console.log(error.config)
    } finally {
      setIsUpdatingSession(false)
    }
  }

  useEffect(() => {
    updateSession()
  }, [apiKeyInput])

  const handleApiKeyInput = event => {
    setApiKeyInput(event.target.value)
  }

  return {
    user,
    authorized,
    apiKeyInput,
    setApiKeyInput,
    handleApiKeyInput,
    updateSession,
    isUpdatingSession,
  }
}
