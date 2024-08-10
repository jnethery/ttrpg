import { useState, useEffect, useCallback, useRef } from 'react'

import { MapMeta, MapSegmentDictionary, MapDataSchema } from 'types/mapSegments'
import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import { MapContext } from 'types/mapContexts'
import { config } from 'config'

interface UseMapDataProps {
  context: MapContext
}

const defaultMeta: MapMeta = {
  localMinHeight: -1,
  localMaxHeight: 10,
  globalMaxHeight: -1,
  globalMinHeight: 10,
  width: 3,
  length: 3,
  gridIncrements: 10,
  lateralUnits: 'feet',
  verticalUnits: 'feet',
}

export const useMapData = ({ context }: UseMapDataProps) => {
  const [meta, setMeta] = useState<MapMeta | null>(defaultMeta)
  const prevMeta = useRef<MapMeta | null>(null)

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
    console.log({ meta, prevMeta, segments, drawableSegments })
    if (meta && JSON.stringify(prevMeta.current) !== JSON.stringify(meta)) {
      const expandedSegments = getExpandedSegments({
        width: meta.width,
        length: meta.length,
        gridIncrements: meta.gridIncrements,
        segments: segments ?? {},
      })

      if (
        Object.keys(expandedSegments).length !==
        Object.keys(segments ?? {}).length
      ) {
        setSegments(expandedSegments)
      }

      // Redraw all segments when the meta changes
      const newDrawableSegments = Object.entries(expandedSegments).reduce(
        (acc, [key, segment]) => {
          const coordinateString = key as TwoDimensionalCoordinatesString
          acc[coordinateString] = {
            ...segment,
            dirty: true,
          }
          return acc
        },
        {} as DrawableMapSegmentDictionary,
      )
      setDrawableSegments(newDrawableSegments)
    }
    prevMeta.current = meta
  }, [meta, segments, setDrawableSegments])

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

const getExpandedSegments = ({
  width,
  length,
  gridIncrements,
  segments,
}: {
  width: number
  length: number
  gridIncrements: number
  segments: MapSegmentDictionary
}) => {
  const expandedSegments = { ...segments }
  for (let x = 0; x < width * gridIncrements; x++) {
    for (let y = 0; y < length * gridIncrements; y++) {
      const coordinateString = `${x},${y}` as TwoDimensionalCoordinatesString
      if (!expandedSegments[coordinateString]) {
        expandedSegments[coordinateString] = {
          coordinates: { x, y, z: 0 },
          terrain: 'grass',
          waterDepth: 0,
        }
      }
    }
  }
  return expandedSegments
}
