import React from 'react'
import { Container } from '@mui/material'

import { Panel } from 'components/Layout'
import { useMapContext } from 'hooks/useMapContext'

import { SegmentInfo } from './SegmentInfo'

export const EyeDropperInspector: React.FC = () => {
  const { inspectedSegment } = useMapContext()

  return (
    <Panel elevation={2}>
      <Container
        style={{
          padding: 5,
        }}
      >
        <SegmentInfo title={'Selected'} segment={inspectedSegment} />
      </Container>
    </Panel>
  )
}
