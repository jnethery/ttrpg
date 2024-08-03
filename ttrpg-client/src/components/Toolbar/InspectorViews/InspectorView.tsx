import { Tool } from 'types/tools'

import { isSelectedSegmentInspectorProps } from 'utils/InspectorViews/selectedSegmentInspector'

import {
  SelectedSegmentInspectorProps,
  SelectedSegmentInspector,
} from './SelectedSegmentInspector'

type SomeOtherViewProps = {
  test: string
}

interface InspectorViewProps {
  tool: Tool
  props: SelectedSegmentInspectorProps | SomeOtherViewProps
}

export const InspectorView: React.FC<InspectorViewProps> = ({
  tool,
  props,
}) => {
  if (tool === 'pointer') {
    if (isSelectedSegmentInspectorProps(props)) {
      const {
        meta,
        selectedSegment,
        destinationSelectedSegment,
        interimSegments,
        updateSegment,
      } = props
      return (
        <SelectedSegmentInspector
          meta={meta}
          selectedSegment={selectedSegment}
          destinationSelectedSegment={destinationSelectedSegment}
          interimSegments={interimSegments}
          updateSegment={updateSegment}
        />
      )
    }
  }
  return (
    <div>
      {tool.charAt(0).toUpperCase() + tool.slice(1)} inspector not implemented
    </div>
  )
}
