import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useTheme } from '@mui/material/styles'

import { Tool } from 'types/tools'
import { Tile } from 'components/Layout'
import { useToolContext } from 'hooks/useToolContext'

interface ToolTileProps {
  tool: Tool
  icon: IconDefinition
}

export const ToolTile: FC<ToolTileProps> = ({ tool, icon }) => {
  const theme = useTheme()
  const { selectedTool, setSelectedTool } = useToolContext()

  return (
    <Tile
      dimensions={{
        height: 50,
        width: 50,
        border: 1,
      }}
      children={<FontAwesomeIcon icon={icon} />}
      selectionOptions={
        selectedTool == tool
          ? {
              selected: true,
              selectionStyle: {
                borderColor: theme.palette.primary.main,
              },
            }
          : undefined
      }
      onClick={() => setSelectedTool(tool)}
    />
  )
}
