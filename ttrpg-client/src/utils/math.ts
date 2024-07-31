import { TwoDimensionalCoordinates } from 'types/coordinates'

export const normalizeValue = (
  value: number,
  min: number,
  max: number,
): number => {
  return (value - min) / (max - min)
}

export const getLineCoordinates = ({
  origin,
  destination,
  transpose = false,
}: {
  origin: TwoDimensionalCoordinates
  destination: TwoDimensionalCoordinates
  transpose?: boolean
}): TwoDimensionalCoordinates[] => {
  const coordinates: TwoDimensionalCoordinates[] = []

  const dx = destination.x - origin.x
  const dy = destination.y - origin.y
  if (Math.abs(dy) > Math.abs(dx)) {
    // Try again, but swap the coordinates and transpose the result.
    return getLineCoordinates({
      origin: { x: origin.y, y: origin.x },
      destination: { x: destination.y, y: destination.x },
      transpose: true,
    })
  }
  // Slope formula.
  const slope = dy / dx
  const intercept = origin.y - slope * origin.x

  const continuationCondition =
    dx > 0
      ? (i: number) => i <= destination.x
      : (i: number) => i >= destination.x

  for (let i = origin.x; continuationCondition(i); dx > 0 ? i++ : i--) {
    const j = Math.round(slope * i + intercept)
    coordinates.push(transpose ? { x: j, y: i } : { x: i, y: j })
  }
  return coordinates
}
