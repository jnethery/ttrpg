import { MapSegment } from 'types/mapSegments'
import { cascadeWater, getNeighboringSegments } from 'lib/mapSegments'

const mapHeights: number[][] = [
  [4, 3, 4],
  [3, 2, 2],
  [1, 3, 4],
]

const mapSegments: MapSegment[][] = Array.from(
  { length: 3 },
  (_v: number, j: number) =>
    Array.from({ length: 3 }, (_v: number, i: number) => ({
      coordinates: { x: i, y: j, z: mapHeights[j][i] },
      waterDepth: 0,
      terrain: 'rock',
    })),
)

describe('getNeighboringSegments', () => {
  it('should return 3 neighbors for {0, 0}', () => {
    expect(getNeighboringSegments(0, 0, mapSegments)).toHaveLength(3)
  })
})

describe('cascadeWater', () => {
  it('should cascade from {0, 0} to {0, 2}', () => {
    const { x, y, z } = cascadeWater(0, 0, mapSegments)
    expect(x).toBe(0)
    expect(y).toBe(2)
    expect(z).toBe(1)
  })

  it('should cascade from {2, 0} to either {1, 2} or {0, 2}', () => {
    const { x, y, z } = cascadeWater(0, 0, mapSegments)
    if (x === 1 && y === 2) {
      expect(x).toBe(1)
      expect(y).toBe(2)
      expect(z).toBe(3)
    } else {
      expect(x).toBe(0)
      expect(y).toBe(2)
      expect(z).toBe(1)
    }
  })
})
