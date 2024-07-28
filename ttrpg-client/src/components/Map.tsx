import React, { useEffect, useState, CSSProperties } from 'react'

import {
  MapSegment,
  MapMeta,
  MapData,
  MapDataSchema,
} from '../types/mapSegments'

// TODO: put port, etc in .env
const PORT = 3009
const HOST = 'http://localhost'

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
  grayScaleColor: number,
  segment: MapSegment,
): [number, number, number] => {
  if (segment.waterDepth > 0) {
    const baseColor = [28, 54, 133]
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (segment.terrain === 'rock') {
    const baseColor = [143, 141, 123]
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (segment.terrain === 'grass') {
    const baseColor = [78, 143, 61]
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (segment.terrain === 'forest') {
    const baseColor = [51, 84, 35]
    return shiftColorLightness(baseColor, grayScaleColor)
  }
  return [grayScaleColor, grayScaleColor, grayScaleColor]
}

const shiftColorLightness = (
  color: number[],
  lightness: number,
): [number, number, number] => {
  // Blend the grayValue with the base color
  const red = Math.round(color[0] * (lightness / 255))
  const green = Math.round(color[1] * (lightness / 255))
  const blue = Math.round(color[2] * (lightness / 255))
  return [red, green, blue]
}

const calculateHeightColor = (
  normalizedValue: number,
): [number, number, number] => {
  const grayValue = Math.round(normalizedValue * 255)

  return [grayValue, grayValue, grayValue]
}

interface MapSegmentTileProps {
  selected: boolean
  segment: MapSegment
  meta: MapMeta
  onClick: (event: React.MouseEvent, segment: MapSegment) => void
}

const MapSegmentTile: React.FC<MapSegmentTileProps> = ({
  selected,
  segment,
  meta,
  onClick,
}) => {
  const z = segment.coordinates.z
  const heightRange = meta.localMaxHeight - meta.localMinHeight
  const normalizedHeight = (z - meta.localMinHeight) / heightRange
  const grayScaleColor = calculateHeightColor(normalizedHeight)
  const terrainColor = selected
    ? [255, 242, 0]
    : calculateTerrainColor(grayScaleColor[0], segment)
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
  return <div onClick={(event) => onClick(event, segment)} style={style}></div>
}

interface MapSegmentsContainerProps {
  selectedSegments: MapSegment[]
  segments: MapSegment[]
  meta: MapMeta
  onClick: (event: React.MouseEvent, segment: MapSegment) => void
}

const MapSegmentsContainer: React.FC<MapSegmentsContainerProps> = ({
  selectedSegments,
  segments,
  meta,
  onClick,
}) => {
  const { width, length, gridIncrements } = meta
  const style: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '0 0 auto',
    width:
      (segmentStyleDimensions.width + segmentStyleDimensions.border * 2) *
      width *
      gridIncrements,
    height:
      (segmentStyleDimensions.height + segmentStyleDimensions.border * 2) *
      length *
      gridIncrements,
  }
  return (
    <div style={style}>
      {segments.map((segment) => {
        const key = `${segment.coordinates.x}-${segment.coordinates.y}`
        return (
          <MapSegmentTile
            selected={
              !!selectedSegments.find(
                (selectedSegment) =>
                  selectedSegment.coordinates.x === segment.coordinates.x &&
                  selectedSegment.coordinates.y === segment.coordinates.y,
              )
            }
            key={key}
            onClick={onClick}
            meta={meta}
            segment={segment}
          />
        )
      })}
    </div>
  )
}

const SelectedSegmentInfo: React.FC<{
  title: string
  segment: MapSegment | null
}> = ({ title, segment }) => {
  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }
  const coordinatesString = segment
    ? `location: {${segment.coordinates.x}, ${
        segment.coordinates.y
      }}, height: ${segment.coordinates.z.toFixed(2)}`
    : 'location: N/A, height: N/A'
  return (
    <div style={style}>
      <div>{title}</div>
      <div>{coordinatesString}</div>
      <div>Water Depth: {segment?.waterDepth?.toFixed(2) ?? 'N/A'}</div>
      <div>Terrain: {segment?.terrain ?? 'N/A'}</div>
    </div>
  )
}

interface SelectedTraversalInfoProps {
  origin: MapSegment
  destination: MapSegment
  interim: MapSegment[]
  meta: MapMeta
}

const SelectedTraversalInfo: React.FC<SelectedTraversalInfoProps> = ({
  origin,
  destination,
  interim,
  meta,
}) => {
  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  // TODO: Track this with a state variable
  // TODO: Move this to a utils file
  const calculateLinearDistance = (
    origin: { x: number; y: number },
    destination: { x: number; y: number },
  ) => {
    return Math.sqrt(
      Math.pow(destination.x - origin.x, 2) +
        Math.pow(destination.y - origin.y, 2),
    )
  }

  // TODO: Track this with a state variable
  // TODO: Move this to a utils file
  const calculateTerrainChange = (
    origin: MapSegment,
    destination: MapSegment,
    interim: MapSegment[],
  ) => {
    let minElevation = origin.coordinates.z
    let maxElevation = origin.coordinates.z
    let previousElevation = null
    let minElevationChange = 0
    let maxElevationChange = 0
    for (const segment of [origin, ...interim, destination]) {
      if (segment.coordinates.z < minElevation) {
        minElevation = segment.coordinates.z
      }
      if (segment.coordinates.z > maxElevation) {
        maxElevation = segment.coordinates.z
      }
      if (previousElevation) {
        const elevationChange = segment.coordinates.z - previousElevation
        if (elevationChange < minElevationChange) {
          minElevationChange = elevationChange
        }
        if (elevationChange > maxElevationChange) {
          maxElevationChange = elevationChange
        }
      }
      previousElevation = segment.coordinates.z
    }
    return {
      minElevation,
      maxElevation,
      minElevationChange,
      maxElevationChange,
    }
  }

  const { minElevation, maxElevation, minElevationChange, maxElevationChange } =
    calculateTerrainChange(origin, destination, interim)

  return (
    <div style={style}>
      <div>Traversal Info:</div>
      <div>
        Distance:{' '}
        {calculateLinearDistance(
          origin.coordinates,
          destination.coordinates,
        ).toFixed(2)}{' '}
        {meta.lateralUnits}
      </div>
      <div>
        Elevation Change: {minElevationChange.toFixed(2)} to{' '}
        {maxElevationChange.toFixed(2)} {meta.verticalUnits}
      </div>
      <div>
        Elevation Range: {minElevation.toFixed(2)} to {maxElevation.toFixed(2)}{' '}
        {meta.verticalUnits}
      </div>
    </div>
  )
}

interface SelectedSegmentContainerProps {
  meta: MapMeta
  selectedSegment: MapSegment | null
  destinationSelectedSegment: MapSegment | null
  interimSegments: MapSegment[]
}

const SelectedSegmentContainer: React.FC<SelectedSegmentContainerProps> = ({
  meta,
  selectedSegment,
  destinationSelectedSegment,
  interimSegments,
}) => {
  const style: CSSProperties = {
    display: 'flex',
    gap: 20,
    flexDirection: 'column',
    width: 300,
    flex: '0 0 auto',
  }
  return (
    <div style={style}>
      <SelectedSegmentInfo title={'Origin'} segment={selectedSegment} />
      {destinationSelectedSegment && (
        <SelectedSegmentInfo
          title={'Destination'}
          segment={destinationSelectedSegment}
        />
      )}
      {selectedSegment && destinationSelectedSegment && (
        <SelectedTraversalInfo
          meta={meta}
          origin={selectedSegment}
          destination={destinationSelectedSegment}
          interim={interimSegments}
        />
      )}
    </div>
  )
}

function MapContent({ mapData }: { mapData: MapData }) {
  const [selectedSegment, setSelectedSegment] = useState<MapSegment | null>(
    null,
  )
  const [destinationSelectedSegment, setDestinationSelectedSegment] =
    useState<MapSegment | null>(null)
  const [interimSegments, setInterimSegments] = useState<MapSegment[]>([])

  const handleClick = (event: React.MouseEvent, segment: MapSegment) => {
    if (event.shiftKey) {
      if (
        selectedSegment &&
        !(
          segment.coordinates.x === selectedSegment.coordinates.x &&
          segment.coordinates.y === selectedSegment.coordinates.y
        )
      ) {
        setDestinationSelectedSegment(segment)
      }
    } else {
      setSelectedSegment(segment)
      setDestinationSelectedSegment(null)
    }
  }

  useEffect(() => {
    // TODO: Move this line drawing to a utils file
    // Calculate the
    if (selectedSegment && destinationSelectedSegment) {
      // Calculate the segments between the two coordinates
      const dx =
        destinationSelectedSegment.coordinates.x - selectedSegment.coordinates.x
      const dy =
        destinationSelectedSegment.coordinates.y - selectedSegment.coordinates.y
      const slope = dy / dx
      const intercept =
        selectedSegment.coordinates.y - slope * selectedSegment.coordinates.x
      const segments = []
      const continuationCondition =
        dx > 0
          ? (i: number) => i <= destinationSelectedSegment.coordinates.x
          : (i: number) => i >= destinationSelectedSegment.coordinates.x
      for (
        let i = selectedSegment.coordinates.x;
        continuationCondition(i);
        dx > 0 ? i++ : i--
      ) {
        const j = Math.round(slope * i + intercept)
        console.log(i, j)
        segments.push(
          mapData.segments.find(
            (segment) =>
              segment.coordinates.x === i && segment.coordinates.y === j,
          ),
        )
      }
      console.log(segments)
      setInterimSegments(segments.filter((segment) => segment !== undefined))
      // Handle cases for 0 dx or dy
    } else {
      setInterimSegments([])
    }
  }, [selectedSegment, destinationSelectedSegment, mapData.segments])

  const style: CSSProperties = {
    display: 'flex',
    gap: 10,
  }

  return (
    <div style={style}>
      <MapSegmentsContainer
        selectedSegments={[
          selectedSegment,
          destinationSelectedSegment,
          ...interimSegments,
        ].filter((segment) => segment !== null)}
        segments={mapData.segments}
        meta={mapData.meta}
        onClick={handleClick}
      />
      <SelectedSegmentContainer
        meta={mapData.meta}
        interimSegments={interimSegments}
        destinationSelectedSegment={destinationSelectedSegment}
        selectedSegment={selectedSegment}
      />
    </div>
  )
}

export default Map
