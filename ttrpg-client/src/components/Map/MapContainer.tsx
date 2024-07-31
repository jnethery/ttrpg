import { MapContext } from 'types/mapContexts'
import { useMapData } from 'hooks/useMapData'

import { MapContent } from './MapContent'

interface MapContainerProps {
  context: MapContext
}

export const MapContainer: React.FC<MapContainerProps> = ({ context }) => {
  const { mapData, error } = useMapData({ context })

  if (error) {
    return <div>Error fetching map data</div>
  }

  if (!mapData) {
    return <div>Loading...</div>
  }

  return <MapContent mapData={mapData} />
}
