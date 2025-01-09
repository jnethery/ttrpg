import { getListItemFromKey } from 'lib/lists/evaluate'
import { RandomLocationListItem } from 'lib/lists/arrays/location'
import { locationValueFunction } from 'lib/lists/arrays/locations'

export const generateLocation = async (): Promise<RandomLocationListItem> => {
  const location = (await getListItemFromKey(
    'location',
  )) as RandomLocationListItem | null

  if (!location) {
    return {
      value: locationValueFunction,
      probability: 1,
      props: async () => {
        return {
          description: 'a nondescript location',
          smell: 'nothing in particular',
          sound: 'silence',
          shelterLists: {
            probability: 0,
          },
        }
      },
    }
  }

  return location
}
