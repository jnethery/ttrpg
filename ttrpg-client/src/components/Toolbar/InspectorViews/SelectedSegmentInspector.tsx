import React from 'react'

import { MapSegment } from 'types/mapSegments'
import { Panel } from 'components/Layout'
import { useMapContext } from 'hooks/useMapContext'

import { SelectedTraversalInfo } from './SelectedTraversalInfo'
import { SelectedSegmentInfo } from './SelectedSegmentInfo'

export interface SelectedSegmentInspectorProps {
  updateSegment: (segment: MapSegment) => void
}

export const SelectedSegmentInspector: React.FC<
  SelectedSegmentInspectorProps
> = ({ updateSegment }) => {
  const {
    meta,
    selectedSegmentCoordinateString,
    destinationSegmentCoordinateString,
    interimCoordinateStrings,
    segments,
  } = useMapContext()

  return (
    <Panel>
      <Panel>
        <SelectedSegmentInfo
          title={'Origin'}
          segment={
            selectedSegmentCoordinateString
              ? segments[selectedSegmentCoordinateString]
              : null
          }
          updateSegment={updateSegment}
        />
        {destinationSegmentCoordinateString && (
          <SelectedSegmentInfo
            title={'Destination'}
            segment={
              destinationSegmentCoordinateString
                ? segments[destinationSegmentCoordinateString]
                : null
            }
            updateSegment={updateSegment}
          />
        )}
      </Panel>
      {selectedSegmentCoordinateString &&
        segments[selectedSegmentCoordinateString] &&
        destinationSegmentCoordinateString &&
        segments[destinationSegmentCoordinateString] && (
          <SelectedTraversalInfo
            meta={meta}
            origin={segments[selectedSegmentCoordinateString]}
            destination={segments[destinationSegmentCoordinateString]}
            interim={interimCoordinateStrings.map((interimCoordinateString) => {
              return segments[interimCoordinateString]
            })}
          />
        )}
    </Panel>
  )
}
