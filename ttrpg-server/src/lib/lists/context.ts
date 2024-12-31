import { ListContext } from 'types/lists'

export const setContext = (context: ListContext) => {
  Object.assign(GlobalContext, { ...GlobalContext, ...context })
}

export const getContext = (): ListContext => {
  return GlobalContext
}

export const GlobalContext: ListContext = {}
