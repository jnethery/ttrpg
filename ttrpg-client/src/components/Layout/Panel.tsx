import React, { CSSProperties } from 'react'
import { Paper } from '@mui/material'

interface PanelProps {
  children: React.ReactNode
  elevation?: number
  style?: CSSProperties
}

export const Panel: React.FC<PanelProps> = ({ children, style, elevation }) => {
  return (
    <Paper
      elevation={elevation}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        padding: 5,
        margin: 5,
        ...style,
      }}
    >
      {children}
    </Paper>
  )
}
