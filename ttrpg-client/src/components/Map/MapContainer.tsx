import { MapContext } from 'types/mapContexts'
import { useMapData } from 'hooks/useMapData'

import { MapContent } from './MapContent'

interface MapContainerProps {
  context: MapContext
}

export const MapContainer: React.FC<MapContainerProps> = ({ context }) => {
  const { segments, setSegments, meta, refetch, error } = useMapData({
    context,
  })

  if (error) {
    return <div>Error fetching map data</div>
  }

  if (!meta || !segments) {
    return <div>Loading...</div>
  }

  return (
    <MapContent
      meta={meta}
      segments={segments}
      setSegments={setSegments}
      refetch={refetch}
    />
  )
}
