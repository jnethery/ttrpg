export const arrayToRandomList = (array: string[]) =>
  array.map((item) => {
    return {
      value: item,
      probability: 1,
    }
  })
