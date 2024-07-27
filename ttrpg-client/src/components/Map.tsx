import { useEffect, useState, CSSProperties } from 'react'
import { z } from 'zod'

// TODO: put port, etc in .env
const PORT = 3009
const HOST = 'http://localhost'

// TODO: Put all this in types directory
const MapDataMetaSchema = z.object({
  globalMaxHeight: z.number(),
  globalMinHeight: z.number(),
  width: z.number(),
  length: z.number(),
  gridIncrements: z.number(),
  lateralUnits: z.string(),
  verticalUnits: z.string(),
})

const MapDataSegmentSchema = z.object({
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
})

const MapDataSchema = z.object({
  meta: MapDataMetaSchema,
  segments: z.array(MapDataSegmentSchema),
})

interface MapMeta {
  globalMaxHeight: number
  globalMinHeight: number
  width: number
  length: number
  gridIncrements: number
  lateralUnits: string
  verticalUnits: string
}

interface MapData {
  meta: MapMeta
  segments: MapSegment[]
}

interface MapSegment {
  coordinates: { x: number; y: number; z: number }
}

function Map() {
  return <MapContainer />
}

function MapContainer() {
  const [mapData, setMapData] = useState<MapData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${HOST}:${PORT}/mapSegments`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = MapDataSchema.parse(data)
        setMapData(parsedData)
      })
      .catch((error) => {
        console.error('Error fetching map data:', error)
        setError(true)
      })
  }, [])

  if (error) {
    return <div>Error fetching map data</div>
  }

  if (!mapData) {
    return <div>Loading...</div>
  }

  return <MapContent mapData={mapData} />
}

const segmentStyleDimensions = {
  width: 5,
  height: 5,
  border: 1,
}

const interpolateColor = (normalizedValue: number): string => {
  const grayValue = Math.round(normalizedValue * 255)
  return `rgba(${grayValue}, ${grayValue}, ${grayValue}, 1)`
}

function MapSegment({ segment, meta }: { segment: MapSegment; meta: MapMeta }) {
  const z = segment.coordinates.z
  const heightRange = meta.globalMaxHeight - meta.globalMinHeight
  const normalizedHeight = (z - meta.globalMinHeight) / heightRange
  const style: CSSProperties = {
    width: segmentStyleDimensions.width,
    height: segmentStyleDimensions.height,
    border: `${segmentStyleDimensions.border}px solid black`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: interpolateColor(normalizedHeight),
    color: z > heightRange / 2 ? 'black' : 'white',
  }
  return <div style={style}></div>
}

function MapContent({ mapData }: { mapData: MapData }) {
  console.log(mapData)
  const { length, width, gridIncrements } = mapData.meta
  const style: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    width:
      (segmentStyleDimensions.width + segmentStyleDimensions.border * 2) *
      width *
      gridIncrements,
    height:
      (segmentStyleDimensions.height + segmentStyleDimensions.border * 2) *
      length *
      gridIncrements,
  }
  const { segments } = mapData
  return (
    <div style={style}>
      {segments.map((segment) => {
        const key = `${segment.coordinates.x}-${segment.coordinates.y}`
        return <MapSegment key={key} meta={mapData.meta} segment={segment} />
      })}
    </div>
  )
}

export default Map
