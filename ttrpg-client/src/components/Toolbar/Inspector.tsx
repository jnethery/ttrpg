import React from 'react'
import { useTheme } from '@mui/material/styles'

import { Panel } from 'components/Layout'

interface InspectorProps {
  children: React.ReactNode
}

export const Inspector: React.FC<InspectorProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <Panel
      elevation={1}
      style={{
        width: 400,
        gap: theme.spacing(2),
      }}
    >
      {children}
    </Panel>
  )
}
