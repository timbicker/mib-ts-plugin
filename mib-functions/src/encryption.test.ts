import {createEncryptedToken, decryptToken} from "./encryption"

test("can encrypt", () => {
  const token = createEncryptedToken({userId: "tim", customerId: "123"})
  const decrypted = decryptToken(token)
  expect(decrypted).toBeTruthy()
  expect(decrypted).toEqual({userId: "tim", customerId: "123"})
})
