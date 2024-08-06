import { useContext } from 'react'

import { ToolContext } from 'providers/ToolProvider'

export const useToolContext = () => {
  const context = useContext(ToolContext)
  if (!context) {
    throw new Error('useToolContext must be used within a ToolProvider')
  }
  return context
}
