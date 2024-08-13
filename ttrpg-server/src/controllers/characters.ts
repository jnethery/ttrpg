import {
  getCharacters as getAll,
  getCharacter as get,
  createCharacter as create,
  updateCharacter as update,
} from 'models/characters'
import {
  Character,
  HydratedCharacter,
  CHARACTER_TEMPLATE,
  DBCharacter,
} from 'types/characters'
import { hydrateDBCharacter } from 'utils/characters'

const getTestCharacter = (): HydratedCharacter => {
  const character: DBCharacter = {
    ...CHARACTER_TEMPLATE,
    id: 'test',
    name: 'Test Character',
  }
  return hydrateDBCharacter(character)
}

export const getCharacter = async (
  id: string,
): Promise<HydratedCharacter | null> => {
  // Testing for rapid iteration
  if (id === 'test') {
    return getTestCharacter()
  }

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
