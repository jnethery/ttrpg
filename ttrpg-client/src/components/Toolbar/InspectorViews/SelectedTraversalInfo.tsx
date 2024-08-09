import React, { CSSProperties } from 'react'

import { MapSegment, MapMeta } from 'types/mapSegments'
import { calculateLinearDistance } from 'utils/math'
import { calculateTerrainChange, calculateVisibility } from 'utils/terrain'

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

  const { minElevation, maxElevation, minElevationChange, maxElevationChange } =
    calculateTerrainChange(origin, destination, interim)
  const destinationVisible = calculateVisibility(origin, destination, interim)

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
      <div>
        Is Destination Visible from Origin: {destinationVisible ? 'Yes' : 'No'}
      </div>
    </div>
  )
}
