export const randomizeArray = <T>(array: T[]): T[] =>
  array.sort(() => Math.random() - Math.random())
