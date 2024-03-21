import {Firestore, FieldValue} from "@google-cloud/firestore"

type TranslationContentDoc = {
  id: string
  content: string
}

type TranslationMetaDoc = {
  // todo how to get the id for a document that just gets created?
  // id: string
  translationContentId: string
  totalCharacters: number
  error?: boolean
  errorAtChars?: number
  type: "standard" | "table" | "updated"
  // todo how does firestore handle dates?
  date: Date
}

class TranslationDocHandler {
  constructor(public db: Firestore) {}

  collectionRef(userId: string) {
    return this.db.collection("users").doc(userId).collection("translations")
  }

  async create(
    userId: string,
    data: Pick<TranslationMetaDoc, "type" | "translationContentId" | "totalCharacters"> & {content: string},
  ) {
    // 1st step create newTranslationContentDoc
    const translationContentId = "123"
    // 2nd step updateUserDoc
    const translation: TranslationMetaDoc = {
      translationContentId,
      totalCharacters: data.totalCharacters,
      type: data.type,
      // todo how does firestore handle dates?
      date: new Date(),
    }
    await this.collectionRef(userId).doc().create(translation)
  }

  async registerError(
    ids: {userId: string; translationId: string},
    data: Pick<Required<TranslationMetaDoc>, "error" | "errorAtChars">,
  ) {
    await this.collectionRef(ids.userId).doc(ids.translationId).update(data)
  }
}
