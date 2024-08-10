import { useState, useEffect, useCallback } from 'react'

import { MapMeta, MapSegmentDictionary, MapDataSchema } from 'types/mapSegments'
import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import { MapContext } from 'types/mapContexts'
import { config } from 'config'

interface UseMapDataProps {
  context: MapContext
}

export const useMapData = ({ context }: UseMapDataProps) => {
  const [meta, setMeta] = useState<MapMeta | null>(null)
  const [segments, setSegments] = useState<MapSegmentDictionary | null>(null)
  // TODO: Add multiple copies of drawableSegments to allow for undo/redo
  const [drawableSegments, setDrawableSegments] =
    useState<DrawableMapSegmentDictionary | null>(null)
  const [error, setError] = useState(false)

  const fetchData = useCallback(() => {
    const params = new URLSearchParams()
    params.append('context', context)

    fetch(`${config.server.host}:${config.server.port}/mapSegments?${params}`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = MapDataSchema.parse(data)
        setMeta(parsedData.meta)
        setSegments(parsedData.segments)
        const newDrawableSegments = Object.entries(parsedData.segments).reduce(
          (acc, [key, segment]) => {
            const coordinateString = key as TwoDimensionalCoordinatesString
            acc[coordinateString] = {
              ...segment,
              dirty: true,
              selected: drawableSegments?.[coordinateString]?.selected ?? false,
            }
            return acc
          },
          {} as DrawableMapSegmentDictionary,
        )
        setDrawableSegments(newDrawableSegments)
      })
      .catch((error) => {
        console.error('Error fetching map data:', error)
        setError(true)
      })
  }, [context])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    meta,
    setMeta,
    segments,
    drawableSegments,
    setSegments,
    setDrawableSegments,
    error,
    refetch: fetchData,
  }
}
