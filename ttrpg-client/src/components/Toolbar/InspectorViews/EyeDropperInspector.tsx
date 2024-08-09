import React from 'react'

import { Panel } from 'components/Layout'
import { useMapContext } from 'hooks/useMapContext'

import { SegmentInfo } from './SegmentInfo'

export const EyeDropperInspector: React.FC = () => {
  const { inspectedSegment } = useMapContext()

  return (
    <Panel elevation={2}>
      <Panel elevation={3}>
        <SegmentInfo title={'Selected'} segment={inspectedSegment} />
      </Panel>
    </Panel>
  )
}
