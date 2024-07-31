import { CSSProperties, useEffect, useState } from 'react'

import { MapMeta, MapSegment } from 'types/mapSegments'
import { MapData } from 'schemas/mapData'
import { getLineCoordinates } from 'utils/math'

import { MapTilesContainer } from './MapTilesContainer'

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
      <div>
        Water Depth:{' '}
        <input
          type="text"
          placeholder="0.00"
          value={segment?.waterDepth?.toFixed(2) ?? 'N/A'}
        />
      </div>
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

export function MapContent({
  mapData,
  refetch,
}: {
  mapData: MapData
  refetch: () => void
}) {
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
    if (selectedSegment && destinationSelectedSegment) {
      const coordinates = getLineCoordinates({
        origin: selectedSegment.coordinates,
        destination: destinationSelectedSegment.coordinates,
      })
      const segments = coordinates
        .map(({ x, y }) =>
          mapData.segments.find(
            (segment) =>
              segment.coordinates.x === x && segment.coordinates.y === y,
          ),
        )
        .filter((segment) => segment !== undefined)
      setInterimSegments(segments)
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
      <MapTilesContainer
        selectedSegments={[
          selectedSegment,
          destinationSelectedSegment,
          ...interimSegments,
        ].filter((segment) => segment !== null)}
        segments={mapData.segments}
        meta={mapData.meta}
        onClick={handleClick}
      />
      {/* TODO: Convert the bottom into a collapsible Toolbar component */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <button onClick={refetch}>Refetch</button>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <button style={{ flex: 1 }}>Save</button>
          <button style={{ flex: 1 }}>Load</button>
        </div>
        <SelectedSegmentContainer
          meta={mapData.meta}
          interimSegments={interimSegments}
          destinationSelectedSegment={destinationSelectedSegment}
          selectedSegment={selectedSegment}
        />
      </div>
    </div>
  )
}
