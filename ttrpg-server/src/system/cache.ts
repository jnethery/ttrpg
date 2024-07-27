import NodeCache from 'node-cache'

const cache = new NodeCache()

export const invalidate = (key: string) => {
  cache.del(key)
}

export const set = <T>(key: string, value: T) => {
  cache.set(key, value)
}

export const get = <T>(key: string): T | undefined => {
  return cache.get(key) as T | undefined
}
