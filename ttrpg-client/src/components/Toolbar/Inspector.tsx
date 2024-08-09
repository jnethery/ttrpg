import React from 'react'
import { useTheme } from '@mui/material/styles'

import { Panel, Button } from 'components/Layout'

interface InspectorProps {
  refetch: () => void
  children: React.ReactNode
}

interface SaveLoadButtonProps {
  refetch: () => void
}

export const SaveLoadButtons: React.FC<SaveLoadButtonProps> = ({ refetch }) => {
  const theme = useTheme()

  return (
    <Panel elevation={2}>
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
    </Panel>
  )
}

export const Inspector: React.FC<InspectorProps> = ({ refetch, children }) => {
  const theme = useTheme()

  return (
    <Panel
      elevation={1}
      style={{
        width: 300,
        gap: theme.spacing(2),
      }}
    >
      <SaveLoadButtons refetch={refetch} />
      {children}
    </Panel>
  )
}
