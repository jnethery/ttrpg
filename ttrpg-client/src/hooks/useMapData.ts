import { useState, useEffect } from 'react'
import { MapData, MapDataSchema } from 'schemas/mapData'
import { MapContext } from 'types/mapContexts'
import { config } from 'config'

interface UseMapDataProps {
  context: MapContext
}

export const useMapData = ({ context }: UseMapDataProps) => {
  const [mapData, setMapData] = useState<MapData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams()
    params.append('context', context)

    fetch(`${config.server.host}:${config.server.port}/mapSegments?${params}`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = MapDataSchema.parse(data)
        setMapData(parsedData)
      })
      .catch((error) => {
        console.error('Error fetching map data:', error)
        setError(true)
      })
  }, [context])

  return { mapData, error }
}
