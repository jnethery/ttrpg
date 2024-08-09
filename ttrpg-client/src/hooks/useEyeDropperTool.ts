import { getCanvasCoordinate } from 'utils/canvas'
import { useMapContext } from 'hooks/useMapContext'

export const useEyeDropperTool = ({
  canvasRef,
  dimensions,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
}) => {
  const { segments, setInspectedSegment } = useMapContext()

  const handleEyeDropperTool = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const coordinate = getCanvasCoordinate(event, canvasRef, dimensions)
    if (coordinate) {
      const segment = segments[`${coordinate.x},${coordinate.y}`]
      if (segment) {
        setInspectedSegment(segment)
      }
    }
  }
  return { handleEyeDropperTool }
}
