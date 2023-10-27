import axios from "axios"
import {Plan, User} from "./types"

export const host = "https://api-proxy.osc-fr1.scalingo.io" //http://localhost:5000/

class Api {
  async getSessionInfo(apiKeyInput: string) {
    const result = await axios.get<User>(`${host}/api/v1/getuser?api_key=${apiKeyInput}`)
    return result.data
  }

  async getPlans() {
    const result = await axios.get<Plan[]>(`${host}/api/v1/getplans`)
    return result.data
  }
}

export const api = new Api()
