export const getCanvasCoordinate = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
  dimensions: { width: number; height: number },
) => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return {
    x: Math.floor(x / dimensions.width),
    y: Math.floor(y / dimensions.height),
  }
}
