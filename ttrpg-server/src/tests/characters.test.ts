import { getProficiencyBonus } from 'utils/characters'

describe('getProficiencyBonus', () => {
  const testLevelsAndBonuses = [
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 3],
    [6, 3],
    [7, 3],
    [8, 3],
    [9, 4],
  ]

  for (const [level, bonus] of testLevelsAndBonuses) {
    it(`should return a bonus of ${bonus} for a level of ${level}`, () => {
      expect(getProficiencyBonus(level)).toBe(bonus)
    })
  }
})
