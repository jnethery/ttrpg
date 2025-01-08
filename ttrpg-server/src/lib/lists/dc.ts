// TODO: Add support for skew and advantage or disadvantage depending on the type of check
export const getDC = (): number => {
  return Math.floor(Math.random() * 20) + 1
}

const weight = (
  target: number,
  current: number,
  skew: number,
  minimum: number,
  maximum: number,
): number => {
  // Adjust these parameters to fine-tune the curve
  const variance = (maximum - minimum) / 8
  // Center the distribution around the target
  const mean = target
  // Adjust current with skew
  return Math.exp(
    -Math.pow(current + skew - mean, 2) / (2 * Math.pow(variance, 2)),
  )
}

function generateNormalDistribution(mean: number, stdDev: number): number {
  let u1 = 0,
    u2 = 0
  // Convert [0,1) to (0,1)
  while (u1 === 0) u1 = Math.random()
  while (u2 === 0) u2 = Math.random()
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
  return z0 * stdDev + mean
}

const getValidSides = (sides: number): number => {
  const validSides = [2, 4, 6, 8, 10, 12, 20, 100]
  for (const validSide of validSides) {
    if (sides <= validSide) {
      return validSide
    }
  }
  return sides
}

export const getRandomDiceString = (
  minCount: number,
  maxCount: number,
  minSides: number,
  maxSides: number,
  minModifier: number = 0,
  maxModifier: number = 0,
): string => {
  const count = Math.floor(Math.random() * (maxCount - minCount + 1) + minCount)
  const sides = getValidSides(
    Math.floor(Math.random() * (maxSides - minSides + 1) + minSides),
  )
  const modifier = Math.floor(
    Math.random() * (maxModifier - minModifier + 1) + minModifier,
  )
  let diceString = `${count}d${sides}`
  if (modifier > 0) {
    diceString += ` + ${modifier}`
  } else if (modifier < 0) {
    diceString += ` - ${Math.abs(modifier)}`
  }
  return diceString
}

export const getDistributedDC = ({
  mean,
  min = 1,
  max = 30,
}: {
  mean?: number
  min?: number
  max?: number
}): number => {
  const center = mean !== undefined ? mean : (min + max) / 2
  const stdDev = (max - min) / 6 // Approx. 99.7% of values will fall within [min, max]

  let value = generateNormalDistribution(center, stdDev)

  // Ensure the value is within the specified range
  value = Math.max(min, Math.min(max, value))

  return Math.round(value)
}
