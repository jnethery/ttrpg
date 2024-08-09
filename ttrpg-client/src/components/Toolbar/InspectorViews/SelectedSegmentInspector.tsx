import React from 'react'

import { Panel } from 'components/Layout'
import { useMapContext } from 'hooks/useMapContext'

import { SelectedTraversalInfo } from './SelectedTraversalInfo'
import { SegmentInfo } from './SegmentInfo'

export const SelectedSegmentInspector: React.FC = () => {
  const {
    meta,
    originCoordinateString,
    destinationCoordinateString,
    interimCoordinateStrings,
    segments,
  } = useMapContext()

  return (
    <Panel elevation={2}>
      <Panel elevation={3}>
        <SegmentInfo
          title={'Selected Origin'}
          segment={
            originCoordinateString ? segments[originCoordinateString] : null
          }
        />
      </Panel>
      {destinationCoordinateString && (
        <Panel elevation={3}>
          <SegmentInfo
            title={'Destination'}
            segment={
              destinationCoordinateString
                ? segments[destinationCoordinateString]
                : null
            }
          />
        </Panel>
      )}
      {originCoordinateString &&
        segments[originCoordinateString] &&
        destinationCoordinateString &&
        segments[destinationCoordinateString] && (
          <Panel elevation={3}>
            <SelectedTraversalInfo
              meta={meta}
              origin={segments[originCoordinateString]}
              destination={segments[destinationCoordinateString]}
              interim={interimCoordinateStrings.map(
                (interimCoordinateString) => {
                  return segments[interimCoordinateString]
                },
              )}
            />
          </Panel>
        )}
    </Panel>
  )
}
