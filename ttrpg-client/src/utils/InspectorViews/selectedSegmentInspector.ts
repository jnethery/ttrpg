import { SelectedSegmentInspectorProps } from 'components/Toolbar/InspectorViews/SelectedSegmentInspector'

export const isSelectedSegmentInspectorProps = (
  props: unknown,
): props is SelectedSegmentInspectorProps => {
  return (props as SelectedSegmentInspectorProps).updateSegment !== undefined
}
