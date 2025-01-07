import { getListItemFromKey } from 'lib/lists/evaluate'
import {
  RandomLocationListItem,
  locationValueFunction,
} from 'lib/lists/arrays/location'

export const generateLocation = async (): Promise<RandomLocationListItem> => {
  const location = (await getListItemFromKey(
    'location',
  )) as RandomLocationListItem | null

  if (!location) {
    return {
      value: locationValueFunction,
      probability: 1,
      props: () => {
        return {
          description: 'a nondescript location',
          smell: 'nothing in particular',
          sound: 'silence',
          shelterLists: {
            sizeList: [],
            exposureList: [],
            visibilityList: [],
            occupancyList: [],
          },
        }
      },
    }
  }

  return location
}
