import {
  getCharacters as getAll,
  getCharacter as get,
  createCharacter as create,
  updateCharacter as update,
} from 'models/characters'
import { Character, HydratedCharacter } from 'types/characters'
import { hydrateDBCharacter } from 'utils/characters'

export const getCharacter = async (
  id: string,
): Promise<HydratedCharacter | null> => {
  const character = await get(id)
  if (!character) {
    return null
  }
  return hydrateDBCharacter(character)
}

export const getCharacters = async (): Promise<HydratedCharacter[]> => {
  const characters = await getAll()
  return characters.map((character) => hydrateDBCharacter(character))
}

export const createCharacter = async (
  character: Character,
): Promise<HydratedCharacter> => {
  const newCharacter = await create(character)
  return hydrateDBCharacter(newCharacter)
}

export const updateCharacter = async (
  id: string,
  character: Partial<Character>,
): Promise<HydratedCharacter | null> => {
  const updatedCharacter = await update(id, character)
  if (!updatedCharacter) {
    return null
  }
  return hydrateDBCharacter(updatedCharacter)
}
