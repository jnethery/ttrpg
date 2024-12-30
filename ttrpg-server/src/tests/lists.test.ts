import { evaluateList } from 'lib/lists/evaluate'
import { RandomList } from 'types/lists'

const iterations = 10000

const testListProbability = (
  testList: RandomList,
  expectedProbabilities: { [key: string]: number },
  tolerance: number,
  context?: object,
) => {
  const counts: { [key: string]: number } = {}

  // Initialize counts
  for (const key in expectedProbabilities) {
    counts[key] = 0
  }

  // Run the evaluation multiple times
  for (let i = 0; i < iterations; i++) {
    const value = evaluateList([...testList], context) as string
    counts[value]++
  }

  // Calculate ratios
  const ratios: { [key: string]: number } = {}
  for (const key in counts) {
    ratios[key] = counts[key] / iterations
  }

  // Check the ratios against expected probabilities
  for (const key in expectedProbabilities) {
    const expected = expectedProbabilities[key]
    const actual = ratios[key]
    expect(actual).toBeGreaterThan(expected - tolerance)
    expect(actual).toBeLessThan(expected + tolerance)
  }
}

describe('testListProbability', () => {
  it(`should return "A" ~90% of the time and "B" ~10% of the time.`, () => {
    const testList: RandomList = [
      { value: 'A', probability: 0.9 },
      { value: 'B', probability: 0.1 },
    ]
    testListProbability(testList, { A: 0.9, B: 0.1 }, 0.05)
  })

  it(`should return "A" ~50% of the time and "B" ~50% of the time.`, () => {
    const testList: RandomList = [
      { value: 'A', probability: 0.5 },
      { value: 'B', probability: 0.5 },
    ]
    testListProbability(testList, { A: 0.5, B: 0.5 }, 0.05)
  })

  it(`should return "A" ~90% of the time with dynamic probability.`, () => {
    const testList: RandomList = [
      {
        value: 'A',
        probability: (context) => {
          const { num1, num2 } = context as { num1: number; num2: number }
          return num1 / num2
        },
      },
      {
        value: 'B',
        probability: 0.1,
      },
    ]
    testListProbability(testList, { A: 0.9, B: 0.1 }, 0.05, {
      num1: 9,
      num2: 10,
    })
  })
})
