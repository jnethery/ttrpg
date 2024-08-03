import {
  TwoDimensionalCoordinates,
  TwoDimensionalCoordinatesString,
} from 'types/coordinates'

export const normalizeValue = (
  value: number,
  min: number,
  max: number,
): number => {
  return (value - min) / (max - min)
}

export const coordinateStringToCoordinates = (
  coordinateString: TwoDimensionalCoordinatesString,
): TwoDimensionalCoordinates => {
  const [x, y] = coordinateString.split(',').map((value) => parseInt(value))
  return { x, y }
}

export const calculateLinearDistance = (
  origin: TwoDimensionalCoordinates | TwoDimensionalCoordinatesString,
  destination: TwoDimensionalCoordinates | TwoDimensionalCoordinatesString,
) => {
  const originCoordinates =
    typeof origin === 'string' ? coordinateStringToCoordinates(origin) : origin
  const destinationCoordinates =
    typeof destination === 'string'
      ? coordinateStringToCoordinates(destination)
      : destination

  return Math.sqrt(
    Math.pow(destinationCoordinates.x - originCoordinates.x, 2) +
      Math.pow(destinationCoordinates.y - originCoordinates.y, 2),
  )
}

export const getLineCoordinates = ({
  origin,
  destination,
  transpose = false,
}: {
  origin: TwoDimensionalCoordinates | TwoDimensionalCoordinatesString
  destination: TwoDimensionalCoordinates | TwoDimensionalCoordinatesString
  transpose?: boolean
}): TwoDimensionalCoordinates[] => {
  const coordinates: TwoDimensionalCoordinates[] = []

  const originCoordinates =
    typeof origin === 'string' ? coordinateStringToCoordinates(origin) : origin
  const destinationCoordinates =
    typeof destination === 'string'
      ? coordinateStringToCoordinates(destination)
      : destination

  const dx = destinationCoordinates.x - originCoordinates.x
  const dy = destinationCoordinates.y - originCoordinates.y
  if (Math.abs(dy) > Math.abs(dx)) {
    // Try again, but swap the coordinates and transpose the result.
    return getLineCoordinates({
      origin: { x: originCoordinates.y, y: originCoordinates.x },
      destination: { x: destinationCoordinates.y, y: destinationCoordinates.x },
      transpose: true,
    })
  }
  // Slope formula.
  const slope = dy / dx
  const intercept = originCoordinates.y - slope * originCoordinates.x

  const continuationCondition =
    dx > 0
      ? (i: number) => i <= destinationCoordinates.x
      : (i: number) => i >= destinationCoordinates.x

  for (
    let i = originCoordinates.x;
    continuationCondition(i);
    dx > 0 ? i++ : i--
  ) {
    const j = Math.round(slope * i + intercept)
    coordinates.push(transpose ? { x: j, y: i } : { x: i, y: j })
  }
  return coordinates
}
