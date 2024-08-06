import React, { createContext, useState } from 'react'

import { Tool, BrushSettings } from 'types/tools'

type ToolContextType = {
  brushSettings: BrushSettings
  selectedTool: Tool
  setSelectedTool: React.Dispatch<React.SetStateAction<Tool>>
  setBrushSettings: React.Dispatch<React.SetStateAction<BrushSettings>>
}

export const ToolContext = createContext<ToolContextType | undefined>(undefined)

interface ToolProviderProps {
  children: React.ReactNode
}

export const ToolProvider: React.FC<ToolProviderProps> = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState<Tool>('pointer')
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    size: 1,
  })

  const value = {
    brushSettings,
    selectedTool,
    setBrushSettings,
    setSelectedTool,
  }

  return <ToolContext.Provider value={value}>{children}</ToolContext.Provider>
}
