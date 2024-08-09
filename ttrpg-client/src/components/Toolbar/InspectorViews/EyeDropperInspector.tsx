import React from 'react'
import { Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Panel } from 'components/Layout'
import { useMapContext } from 'hooks/useMapContext'

import { SegmentInfo } from './SegmentInfo'

export const EyeDropperInspector: React.FC = () => {
  const theme = useTheme()
  const { inspectedSegment } = useMapContext()

  return (
    <Panel elevation={2}>
      <Container
        style={{
          padding: theme.spacing(1),
        }}
      >
        <SegmentInfo title={'Selected'} segment={inspectedSegment} />
      </Container>
    </Panel>
  )
}
