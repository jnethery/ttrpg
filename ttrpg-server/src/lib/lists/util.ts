import { RandomList } from 'types/lists'

export const arrayToRandomList = (array: string[]): RandomList =>
  array.map((item) => {
    return {
      value: item,
      probability: 1 / array.length,
    }
  })
