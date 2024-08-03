import { Character, DBCharacter } from 'types/characters'
import { deepMerge } from 'utils/deepMerge'
import { get, set, invalidate } from 'system/cache'
import { db } from 'system/db'

const TABLE = 'characters'
const BASE_CACHE_KEY = TABLE

export const createCharacter = async (
  character: Character,
): Promise<DBCharacter> => {
  const [newCharacter] = await db(TABLE).insert(character).returning('*')
  invalidate(BASE_CACHE_KEY)
  return newCharacter
}

export const updateCharacter = async (
  id: string,
  character: Partial<Character>,
): Promise<DBCharacter | null> => {
  const existingCharacter = await getCharacter(id)
  if (!existingCharacter) {
    return null
  }
  const [updatedCharacter] = await db(TABLE)
    .where({ id })
    .update(deepMerge(existingCharacter, character))
    .returning('*')
  invalidate(BASE_CACHE_KEY)
  set(`${BASE_CACHE_KEY}:${id}`, updatedCharacter)
  return updatedCharacter
}

export const getCharacter = async (id: string): Promise<DBCharacter | null> => {
  const cachedCharacter = get<DBCharacter>(`${BASE_CACHE_KEY}:${id}`)
  if (cachedCharacter) {
    return cachedCharacter
  }

  const character = await db(TABLE).where({ id }).first()
  set(`${BASE_CACHE_KEY}:${id}`, character)
  return character
}

export const getCharacters = async (): Promise<DBCharacter[]> => {
  const cachedCharacters = get<DBCharacter[]>(BASE_CACHE_KEY)
  if (cachedCharacters) {
    return cachedCharacters
  }

  const characters = await db(TABLE)

  set(BASE_CACHE_KEY, characters)
  return characters
}
