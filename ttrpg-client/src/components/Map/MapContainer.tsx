import { MapContext } from 'types/mapContexts'
import { useMapData } from 'hooks/useMapData'

import { MapContent } from './MapContent'

interface MapContainerProps {
  context: MapContext
}

export const MapContainer: React.FC<MapContainerProps> = ({ context }) => {
  const {
    segments,
    setSegments,
    drawableSegments,
    setDrawableSegments,
    meta,
    setMeta,
    refetch,
    error,
  } = useMapData({
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
      setMeta={setMeta}
      segments={segments}
      drawableSegments={drawableSegments}
      setSegments={setSegments}
      setDrawableSegments={setDrawableSegments}
      refetch={refetch}
    />
  )
}
