import { getContext } from 'lib/lists/context'

// Minimum difficult is -6, maximum difficulty is 20,
// corresponding to an average mean DC of 5 and 30
export const getConditionDifficulty = () => {
  const { conditions } = getContext()
  let difficulty = 0
  if (conditions) {
    // Light conditions contribute up to 10 to the DC
    if (conditions.includes('bright')) {
      difficulty += -2
    }
    if (conditions.includes('dim')) {
      difficulty += 5
    }
    if (conditions.includes('dark')) {
      difficulty += 10
    }

    // Visibility conditions contribute up to 10 to the DC
    if (conditions.includes('clear')) {
      difficulty += -2
    } else if (conditions.includes('overcast')) {
      difficulty += 0
    } else if (conditions.includes('cloudy')) {
      difficulty += 5
    } else if (conditions.includes('misty')) {
      difficulty += 8
    } else if (conditions.includes('foggy')) {
      difficulty += 10
    }

    if (conditions.includes('dry')) {
      difficulty += -2
    } else if (conditions.includes('drizzling')) {
      difficulty += 2
    } else if (
      conditions.includes('raining') &&
      conditions.includes('flurrying')
    ) {
      difficulty += 5
    } else if (
      conditions.includes('pouring') &&
      conditions.includes('snowing')
    ) {
      difficulty += 8
    } else if (
      conditions.includes('pelting') &&
      conditions.includes('blizzarding')
    ) {
      difficulty += 9
    } else if (conditions.includes('hailing')) {
      difficulty += 10
    }
  }
  return difficulty
}
