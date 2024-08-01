import React, { CSSProperties } from 'react'

import { colorConfig } from 'types/colors'

interface PanelProps {
  children: React.ReactNode
  style?: CSSProperties
}

export const Panel: React.FC<PanelProps> = ({ children, style }) => {
  return (
    <div
      style={{
        background: colorConfig.panel.rgbString,
        border: '2px solid',
        borderColor: colorConfig.dark.rgbString,
        borderRadius: 15,
        color: colorConfig.dark.rgbString,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        padding: 5,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
