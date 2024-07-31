import React from 'react'

import { MapContext } from 'types/mapContexts'

import { MapContainer } from './MapContainer'

interface MapProps {
  context: MapContext
}

export const Map: React.FC<MapProps> = ({ context }) => {
  return <MapContainer context={context} />
}
