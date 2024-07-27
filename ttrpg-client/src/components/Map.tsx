import { useEffect, useState, CSSProperties } from 'react'
import { z } from 'zod'

// TODO: put port, etc in .env
const PORT = 3009
const HOST = 'http://localhost'

const terrains = ['rock', 'forest'] as const
const TerrainSchema = z.enum(terrains)
type Terrain = z.infer<typeof TerrainSchema>

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
  waterDepth: z.number(),
  terrain: TerrainSchema,
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
  waterDepth: number
  terrain: Terrain
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

const calculateTerrainColor = (
  grayScaleColor: [number, number, number],
  segment: MapSegment,
): [number, number, number] => {
  if (segment.terrain === 'rock' && segment.waterDepth === 0) {
    return grayScaleColor
  } else if (segment.terrain === 'forest') {
    return [grayScaleColor[0], 255, grayScaleColor[2]]
  } else if (segment.waterDepth > 0) {
    return [grayScaleColor[0], grayScaleColor[1], 255]
  }
  return grayScaleColor
}

const calculateHeightColor = (
  normalizedValue: number,
): [number, number, number] => {
  const grayValue = Math.round(normalizedValue * 255)
  return [grayValue, grayValue, grayValue]
}

function MapSegment({ segment, meta }: { segment: MapSegment; meta: MapMeta }) {
  const z = segment.coordinates.z
  const heightRange = meta.globalMaxHeight - meta.globalMinHeight
  const normalizedHeight = (z - meta.globalMinHeight) / heightRange
  const grayScaleColor = calculateHeightColor(normalizedHeight)
  const terrainColor = calculateTerrainColor(grayScaleColor, segment)
  const backgroundColor = `rgba(${terrainColor[0]}, ${terrainColor[1]}, ${terrainColor[2]}, 1)`
  const style: CSSProperties = {
    width: segmentStyleDimensions.width,
    height: segmentStyleDimensions.height,
    border: `${segmentStyleDimensions.border}px solid black`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor,
    color: z > heightRange / 2 ? 'black' : 'white',
  }
  return (
    <div
      style={style}
      onClick={() => alert(JSON.stringify({ meta, segment }))}
    ></div>
  )
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
