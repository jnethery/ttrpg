import React, { CSSProperties } from 'react'
import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface PanelProps {
  children: React.ReactNode
  elevation?: number
  style?: CSSProperties
}

export const Panel: React.FC<PanelProps> = ({ children, style, elevation }) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={elevation}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        ...style,
      }}
    >
      {children}
    </Paper>
  )
}
