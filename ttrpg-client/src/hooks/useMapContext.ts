import { useContext } from 'react'

import { MapContext } from 'providers/MapProvider'

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider')
  }
  return context
}
