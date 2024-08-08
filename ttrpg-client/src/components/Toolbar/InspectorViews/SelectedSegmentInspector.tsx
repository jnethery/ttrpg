import React from 'react'
import { Container } from '@mui/material'

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
    originCoordinateString,
    destinationCoordinateString,
    interimCoordinateStrings,
    segments,
  } = useMapContext()

  return (
    <Panel elevation={2}>
      <Container
        style={{
          padding: 5,
        }}
      >
        <SelectedSegmentInfo
          title={'Origin'}
          segment={
            originCoordinateString ? segments[originCoordinateString] : null
          }
          updateSegment={updateSegment}
        />
        {destinationCoordinateString && (
          <SelectedSegmentInfo
            title={'Destination'}
            segment={
              destinationCoordinateString
                ? segments[destinationCoordinateString]
                : null
            }
            updateSegment={updateSegment}
          />
        )}
      </Container>
      {originCoordinateString &&
        segments[originCoordinateString] &&
        destinationCoordinateString &&
        segments[destinationCoordinateString] && (
          <SelectedTraversalInfo
            meta={meta}
            origin={segments[originCoordinateString]}
            destination={segments[destinationCoordinateString]}
            interim={interimCoordinateStrings.map((interimCoordinateString) => {
              return segments[interimCoordinateString]
            })}
          />
        )}
    </Panel>
  )
}
