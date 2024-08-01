import React, { CSSProperties } from 'react'

import { MapSegment, MapMeta } from 'types/mapSegments'

interface SelectedTraversalInfoProps {
  origin: MapSegment
  destination: MapSegment
  interim: MapSegment[]
  meta: MapMeta
}

export const SelectedTraversalInfo: React.FC<SelectedTraversalInfoProps> = ({
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
