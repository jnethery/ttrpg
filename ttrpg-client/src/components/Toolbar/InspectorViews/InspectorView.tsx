import { useToolContext } from 'hooks/useToolContext'

import { SelectedSegmentInspector } from './SelectedSegmentInspector'
import { BrushSettingsInspector } from './BrushSettingsInspector'
import { EyeDropperInspector } from './EyeDropperInspector'

export const InspectorView: React.FC = () => {
  const { selectedTool } = useToolContext()

  if (selectedTool === 'pointer') {
    return <SelectedSegmentInspector />
  } else if (selectedTool === 'brush') {
    return <BrushSettingsInspector />
  } else if (selectedTool === 'eyedropper') {
    return <EyeDropperInspector />
  }
  return (
    <div>
      {selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} inspector
      not implemented
    </div>
  )
}
