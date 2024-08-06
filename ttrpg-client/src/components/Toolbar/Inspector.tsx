import React from 'react'

import { Panel } from 'components/Layout'

interface InspectorProps {
  refetch: () => void
  children: React.ReactNode
}

interface SaveLoadButtonProps {
  refetch: () => void
}

export const SaveLoadButtons: React.FC<SaveLoadButtonProps> = ({ refetch }) => {
  return (
    <Panel>
      <button style={{ flex: 1 }} onClick={refetch}>
        Refetch
      </button>
      <div
        style={{
          display: 'flex',
          gap: 10,
        }}
      >
        <button style={{ flex: 1 }}>Save</button>
        <button style={{ flex: 1 }}>Load</button>
      </div>
    </Panel>
  )
}

export const Inspector: React.FC<InspectorProps> = ({ refetch, children }) => {
  return (
    <Panel
      style={{
        width: 300,
        gap: 10,
      }}
    >
      <SaveLoadButtons refetch={refetch} />
      {children}
    </Panel>
  )
}
