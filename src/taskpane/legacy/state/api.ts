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

  async translate(options: {apiKeyInput: string; text: string; targetLang: string; translationOptions: any}) {
    const {apiKeyInput, text, targetLang, translationOptions} = options
    const url = `${host}/api/v1/deepl?api_key=${apiKeyInput}&text=${encodeURIComponent(
      text,
    )}&target_lang=${targetLang}&split_sentences=${translationOptions.splitSentences}&preserve_formatting=${
      translationOptions.preserveFormatting
    }&formality=${translationOptions.formality}&tag_handling=${
      translationOptions.tagHandling
    }&non_splitting_tags${translationOptions.non_splitting_tags}`

    const response = await axios.get(url)
    const detectedSourceLang = response.data.translation.detectedSourceLang
    const translatedMatchesMonostring = response.data.translation.text
    return {detectedSourceLang, translatedMatchesMonostring}
  }
}

export const api = new Api()
