import { getLineCoordinates } from 'utils/math'
import { TwoDimensionalCoordinates } from 'types/coordinates'

describe('getLineCoordinates', () => {
  it('should return correct coordinates for a simple line', () => {
    const origin: TwoDimensionalCoordinates = { x: 0, y: 0 }
    const destination: TwoDimensionalCoordinates = { x: 5, y: 5 }
    const expectedCoordinates: TwoDimensionalCoordinates[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
    ]
    expect(getLineCoordinates({ origin, destination })).toEqual(
      expectedCoordinates,
    )
  })

  it('should handle transposition correctly', () => {
    const origin: TwoDimensionalCoordinates = { x: 0, y: 0 }
    const destination: TwoDimensionalCoordinates = { x: 3, y: 6 }
    const expectedCoordinates: TwoDimensionalCoordinates[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
    ]
    expect(getLineCoordinates({ origin, destination })).toEqual(
      expectedCoordinates,
    )
  })

  it('should handle negative slopes', () => {
    const origin: TwoDimensionalCoordinates = { x: 5, y: 5 }
    const destination: TwoDimensionalCoordinates = { x: 0, y: 0 }
    const expectedCoordinates: TwoDimensionalCoordinates[] = [
      { x: 5, y: 5 },
      { x: 4, y: 4 },
      { x: 3, y: 3 },
      { x: 2, y: 2 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ]
    expect(getLineCoordinates({ origin, destination })).toEqual(
      expectedCoordinates,
    )
  })

  it('should handle negative transposition correctly', () => {
    const origin: TwoDimensionalCoordinates = { x: 0, y: 0 }
    const destination: TwoDimensionalCoordinates = { x: 1, y: -2 }
    const expectedCoordinates: TwoDimensionalCoordinates[] = [
      { x: 0, y: 0 },
      { x: 1, y: -1 },
      { x: 1, y: -2 },
    ]
    expect(getLineCoordinates({ origin, destination })).toEqual(
      expectedCoordinates,
    )
  })

  it('should handle vertical lines', () => {
    const origin: TwoDimensionalCoordinates = { x: 2, y: 0 }
    const destination: TwoDimensionalCoordinates = { x: 2, y: 5 }
    const expectedCoordinates: TwoDimensionalCoordinates[] = [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 2, y: 5 },
    ]
    expect(getLineCoordinates({ origin, destination })).toEqual(
      expectedCoordinates,
    )
  })

  it('should handle horizontal lines', () => {
    const origin: TwoDimensionalCoordinates = { x: 0, y: 2 }
    const destination: TwoDimensionalCoordinates = { x: 5, y: 2 }
    const expectedCoordinates: TwoDimensionalCoordinates[] = [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ]
    expect(getLineCoordinates({ origin, destination })).toEqual(
      expectedCoordinates,
    )
  })
})
