import { db } from 'system/db'
import { Character, CHARACTER_TEMPLATE, DBCharacter } from 'types/characters'
import { deepMerge } from 'utils/deepMerge'
import { get, set, invalidate } from 'system/cache'

const COLLECTION = 'characters'
const BASE_CACHE_KEY = COLLECTION

export const createCharacter = async (
  character: Character,
): Promise<DBCharacter> => {
  const docRef = await db.collection(COLLECTION).add({ character })
  const newCharacter = {
    id: docRef.id,
    ...character,
  }
  invalidate(BASE_CACHE_KEY)
  return newCharacter
}

export const updateCharacter = async (
  id: string,
  character: Partial<Character>,
): Promise<DBCharacter | null> => {
  const docRef = db.collection(COLLECTION).doc(id)
  const doc = await docRef.get()
  if (!doc.exists) {
    return null
  }
  await docRef.set(character, { merge: true })
  const data = doc.data() as Character
  const updatedCharacter = {
    ...CHARACTER_TEMPLATE,
    id,
    ...deepMerge<Partial<Character>>(data, character),
  }
  invalidate(BASE_CACHE_KEY)
  invalidate(`${BASE_CACHE_KEY}:${id}`)
  return updatedCharacter
}

export const getCharacter = async (id: string): Promise<DBCharacter | null> => {
  const cachedCharacter = get<DBCharacter>(`${BASE_CACHE_KEY}:${id}`)
  if (cachedCharacter) {
    return cachedCharacter
  }

  const doc = await db.collection(COLLECTION).doc(id).get()
  if (!doc.exists) {
    return null
  }
  const character = {
    ...CHARACTER_TEMPLATE,
    id: doc.id,
    ...doc.data(),
  }
  set(`${BASE_CACHE_KEY}:${id}`, character)
  return character
}

export const getCharacters = async (): Promise<DBCharacter[]> => {
  // TODO: Add filtering to this
  const cachedCharacters = get<DBCharacter[]>(BASE_CACHE_KEY)
  if (cachedCharacters) {
    return cachedCharacters
  }

  const snapshot = await db.collection(COLLECTION).get()
  const characters: DBCharacter[] = []
  if (snapshot.empty) {
    return characters
  }
  snapshot.forEach((doc) => {
    characters.push({
      ...CHARACTER_TEMPLATE,
      id: doc.id,
      ...doc.data(),
    })
  })

  set(BASE_CACHE_KEY, characters)
  return characters
}
