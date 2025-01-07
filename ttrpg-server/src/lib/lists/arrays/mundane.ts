import { RandomListItem } from 'types/lists'

export interface MundaneProps {
  description: string
}

export interface RandomMundaneListItem extends RandomListItem {
  props: () => MundaneProps
}

export type RandomMundaneList = RandomMundaneListItem[]

export const mundaneValueFunction = async (
  props: MundaneProps,
): Promise<string> => {
  return `
    <ul>
      <li>${props.description}</li>
    </ul>
  `
}

export const mundane: RandomMundaneList = [
  {
    value: mundaneValueFunction,
    probability: 1,
    props: () => {
      return {
        description: 'it seems quiet and peaceful',
      }
    },
  },
]
