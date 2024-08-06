import React from 'react'
import { Container, Slider, Typography } from '@mui/material'

import { useToolContext } from 'hooks/useToolContext'
import { Panel } from 'components/Layout'

export const BrushSettingsInspector: React.FC = () => {
  const { brushSettings, setBrushSettings } = useToolContext()

  return (
    <Panel elevation={2}>
      <Container style={{ padding: 5 }}>
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
          max={50}
          onChange={(_, value) => {
            setBrushSettings((prev) => ({
              ...prev,
              size: value as number,
            }))
          }}
        />
      </Container>
    </Panel>
  )
}
