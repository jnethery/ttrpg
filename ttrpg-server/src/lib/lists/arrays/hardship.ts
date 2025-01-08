import { getListItem } from 'lib/lists/evaluate'
import { RandomListItem } from 'types/lists'

interface HardshipProps {
  description: string
}

export interface RandomHardshipListItem extends RandomListItem {
  props: () => Promise<HardshipProps>
}

export type RandomHardshipList = RandomHardshipListItem[]

export const hardshipValueFunction = async (
  props: HardshipProps,
): Promise<string> => {
  return `
    <ul>
      <li>${props.description}</li>
    </ul>
  `
}

export const conditionChange = [
  { value: 'gets lower', probability: 1 / 12 },
  { value: 'stays the same', probability: 10 / 12 },
  { value: 'gets higher', probability: 1 / 12 },
]

export const hardship: RandomHardshipList = [
  {
    value: hardshipValueFunction,
    probability: 1,
    props: async () => {
      const visibilityChange = await getListItem(conditionChange)
      const precipitationSizeChange = await getListItem(conditionChange)
      const precipitationAmountChange = await getListItem(conditionChange)
      const temperatureChange = await getListItem(conditionChange)
      return {
        description: `
        <ul>
          <li>Visibility ${visibilityChange ? visibilityChange.value : 'stays the same'}</li> 
          <li>Precipitation Size ${precipitationSizeChange ? precipitationSizeChange.value : 'stays the same'}</li>
          <li>Precipitation Amount ${precipitationAmountChange ? precipitationAmountChange.value : 'stays the same'}</li>
          <li>Temperature ${temperatureChange ? temperatureChange.value : 'stays the same'}</li>
        </ul>
        `,
      }
    },
  },
]
