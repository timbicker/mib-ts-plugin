import * as crypto from "crypto"

// Example usage
// const key = Buffer.from("mibisthebestcompanyintheworld", "utf8") // 256-bit key
const key = Buffer.alloc(32)
key.write("mibisthebestcompanyintheworld", 0, "utf-8")

// Convert the string to a buffer, ensuring it's exactly 16 bytes
// If the string is shorter, it's padded; if longer, it's truncated
const iv = Buffer.alloc(16)
iv.write("hello, world", 0, "utf-8")
// const iv = Buffer.from("1234", "utf-8")

// Function to encrypt a string with a given key and IV
function encryptString(text: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")
  return encrypted
}

// Function to decrypt a string with a given key and IV
function decryptString(encryptedText: string): string {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
  let decrypted = decipher.update(encryptedText, "hex", "utf8")
  decrypted += decipher.final("utf8")
  return decrypted
}

const delimiter = "|||"

export function createEncryptedToken(args: {userId: string; customerId: string}): string {
  const date = new Date().toISOString()
  const stringToEncrypt = JSON.stringify(args) + delimiter + date
  return encryptString(stringToEncrypt)
}

export function decryptToken(token: string): {userId: string; customerId: string} | null {
  const decryptedToken = decryptString(token)
  const [jsonString, isoDate] = decryptedToken.split(delimiter)

  const nowDate = new Date()
  const tokenDate = new Date(isoDate)
  const diffInSeconds = Math.floor((nowDate.getTime() - tokenDate.getTime()) / 1000)
  if (diffInSeconds > 60) return null
  return JSON.parse(jsonString)
}
