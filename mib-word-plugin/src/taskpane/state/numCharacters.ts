let numTranslatedCharacters = 0

export function getNumTranslatedCharacters() {
  return numTranslatedCharacters
}

export function incTranslatedCharacters(num: number) {
  numTranslatedCharacters += num
}

export function setTranslatedCharacters(num: number) {
  numTranslatedCharacters = num
}

export function resetTranslatedCharacters() {
  numTranslatedCharacters = 0
}
