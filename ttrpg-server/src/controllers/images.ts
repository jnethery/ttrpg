import { getImage as get } from 'models/images'
import { DBImage } from 'types/images'
import { hydrateDBCharacter } from 'utils/characters'

export const getImage = async (id: string): Promise<DBImage | null> => {
  const image = await get(id)
  if (!image) {
    return null
  }
  return image
}
