import React, { CSSProperties } from 'react'
import { useTheme } from '@mui/material/styles'

import { Panel, Button, TwoColumnListItem } from 'components/Layout'
import { useMapContext } from 'hooks/useMapContext'
import { Divider, Typography, List } from '@mui/material'

export const SaveLoadButtons: React.FC = () => {
  const theme = useTheme()
  const { refetch } = useMapContext()

  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  }

  return (
    <div style={style}>
      <Button style={{ flex: 1 }} onClick={refetch}>
        Refetch
      </Button>
      <div
        style={{
          display: 'flex',
          gap: theme.spacing(2),
        }}
      >
        <Button style={{ flex: 1 }}>Save</Button>
        <Button style={{ flex: 1 }}>Load</Button>
      </div>
    </div>
  )
}

export const SettingsInspector: React.FC = () => {
  return (
    <Panel elevation={2}>
      <Panel elevation={3}>
        <Typography variant="h6">Grid Settings</Typography>
        <Divider />
        <List>
          <TwoColumnListItem label="Length (miles)" value="20" />
          <TwoColumnListItem label="Width (miles)" value="20" />
          <TwoColumnListItem label="Grid Increments" value="4" />
        </List>
      </Panel>
      <Panel elevation={3}>
        <Typography variant="h6">Topographical Settings</Typography>
        <Divider />
        <List>
          <TwoColumnListItem label="Local Max Height (feet)" value="2000" />
          <TwoColumnListItem label="Local Min Height (feet)" value="-2000" />
        </List>
      </Panel>
      <Panel elevation={3}>
        <Typography variant="h6">Units</Typography>
        <Divider />
        <List>
          <TwoColumnListItem label="Lateral Units" value="miles" />
          <TwoColumnListItem label="Vertical Units" value="feet" />
        </List>
      </Panel>
      <Panel elevation={3}>
        <SaveLoadButtons />
      </Panel>
    </Panel>
  )
}
