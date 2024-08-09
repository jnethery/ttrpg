import React from 'react'
import { Container, Slider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useToolContext } from 'hooks/useToolContext'
import { Panel } from 'components/Layout'
import { SegmentInfo } from './SegmentInfo'
import { useMapContext } from 'hooks/useMapContext'

export const BrushSettingsInspector: React.FC = () => {
  const theme = useTheme()
  const { brushSettings, setBrushSettings } = useToolContext()
  const { inspectedSegment, setInspectedSegment } = useMapContext()

  return (
    <Panel elevation={2}>
      <Panel elevation={3}>
        <SegmentInfo
          title={'Brush Settings'}
          updateSegment={setInspectedSegment}
          segment={inspectedSegment}
        />
      </Panel>
      <Panel elevation={3}>
        <Container style={{ padding: theme.spacing(1) }}>
          <Typography id="input-slider" gutterBottom>
            Brush Size ({brushSettings.size} tile
            {brushSettings.size === 1 ? '' : 's'})
          </Typography>
          <Slider
            style={{
              width: '90%',
            }}
            aria-labelledby="input-slider"
            value={brushSettings.size}
            min={1}
            max={5}
            onChange={(_, value) => {
              setBrushSettings((prev) => ({
                ...prev,
                size: value as number,
              }))
            }}
          />
        </Container>
      </Panel>
    </Panel>
  )
}
