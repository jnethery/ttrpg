import React from 'react'

import { MapSegment, MapMeta } from 'types/mapSegments'

import { Panel } from 'components/Layout'
import { SelectedTraversalInfo } from './SelectedTraversalInfo'
import { SelectedSegmentInfo } from './SelectedSegmentInfo'

export interface SelectedSegmentInspectorProps {
  meta: MapMeta
  selectedSegment: MapSegment | null
  destinationSelectedSegment: MapSegment | null
  interimSegments: MapSegment[]
  updateSegment: (segment: MapSegment) => void
}

export const SelectedSegmentInspector: React.FC<
  SelectedSegmentInspectorProps
> = ({
  meta,
  selectedSegment,
  destinationSelectedSegment,
  interimSegments,
  updateSegment,
}) => {
  return (
    <Panel>
      <Panel>
        <SelectedSegmentInfo
          title={'Origin'}
          segment={selectedSegment}
          updateSegment={updateSegment}
        />
        {destinationSelectedSegment && (
          <SelectedSegmentInfo
            title={'Destination'}
            segment={destinationSelectedSegment}
            updateSegment={updateSegment}
          />
        )}
      </Panel>
      {selectedSegment && destinationSelectedSegment && (
        <SelectedTraversalInfo
          meta={meta}
          origin={selectedSegment}
          destination={destinationSelectedSegment}
          interim={interimSegments}
        />
      )}
    </Panel>
  )
}
