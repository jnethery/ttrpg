import {
  getAbilityRacialModifier,
  getAbilityScoreModifier,
} from '../../src/utils/modifiers'

describe('getAbilityRacialModifier', () => {
  const testCases = [
    { ability: 'strength', race: 'human', subrace: undefined, expected: 1 },
    { ability: 'strength', race: 'elf', subrace: undefined, expected: 0 },
    { ability: 'strength', race: 'dwarf', subrace: 'mountain', expected: 2 },
    { ability: 'strength', race: 'dwarf', subrace: 'hill', expected: 0 },
    { ability: 'strength', race: 'dwarf', subrace: undefined, expected: 0 },
  ] as const

  testCases.forEach(({ ability, race, subrace, expected }) => {
    it(`should return ${expected} for ability: ${ability}, race: ${race}, subrace: ${subrace}`, () => {
      expect(getAbilityRacialModifier(ability, race, subrace)).toBe(expected)
    })
  })
})

describe('getAbilityScoreModifier', () => {
  const testScoresAndModifiers = [
    [1, -5],
    [2, -4],
    [3, -4],
    [4, -3],
    [5, -3],
    [6, -2],
    [7, -2],
    [8, -1],
    [9, -1],
    [10, 0],
    [11, 0],
    [12, 1],
    [13, 1],
    [14, 2],
    [15, 2],
    [16, 3],
    [17, 3],
    [18, 4],
    [19, 4],
    [20, 5],
    [21, 5],
    [22, 6],
    [23, 6],
    [24, 7],
    [25, 7],
    [26, 8],
    [27, 8],
    [28, 9],
    [29, 9],
    [30, 10],
  ]

  for (const [score, modifier] of testScoresAndModifiers) {
    it(`should return a modifier of ${modifier} for a score of ${score}`, () => {
      expect(getAbilityScoreModifier(score)).toBe(modifier)
    })
  }
})
