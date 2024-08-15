import { useState } from 'react'
import { Typography } from '@mui/material'

import { Character } from 'types/characters'
import { Panel, Button } from 'components/Layout'
import { useCharacter } from 'hooks/useCharacter'

const getRollResults = (numRolls: number, denominator: number) => {
  return Array.from(
    { length: numRolls },
    () => Math.floor(Math.random() * denominator) + 1,
  )
}

const sumRolls = (rolls: number[]) => {
  return rolls.reduce((acc, curr) => acc + curr, 0)
}

const roll = (numRolls: number, denominator: number) => {
  const rolls = getRollResults(numRolls, denominator)
  const sum = sumRolls(rolls)
  return { rolls, sum }
}

const doAttackAndDamage = (_attacker: Character | null, target: Character) => {
  // If the attacker has multiple weapons, we need an algorithm to determine which weapon to use

  const attackRoll = roll(1, 20)
  const isCritical = attackRoll.rolls.includes(20)
  const damageRoll = roll(isCritical ? 2 : 1, 6)
  const hit = attackRoll.sum >= target.ac

  return {
    attackRoll: attackRoll.sum,
    hit,
    isCritical,
    damageRolls: damageRoll.rolls,
    damage: hit ? damageRoll.sum : 0,
  }
}

// TODO: Make these damage levels per damage type. For now, assume slashing.
const woundLevels = {
  1: 'Scraped',
  5: 'Nicked',
  20: 'Cut',
  50: 'Slashed',
  75: 'Gashed',
  100: 'Rent',
  150: 'Severed',
}

const woundAreas = [
  { name: 'Head', probability: 0.15 },
  { name: 'Torso', probability: 0.35 },
  { name: 'Left Arm', probability: 0.1 },
  { name: 'Right Arm', probability: 0.1 },
  { name: 'Left Leg', probability: 0.15 },
  { name: 'Right Leg', probability: 0.15 },
]

const getWoundLevel = (damage: number, maxHitPoints: number) => {
  const percentDamage = (damage / maxHitPoints) * 100
  console.log({
    woundLevels: Object.entries(woundLevels).sort(
      ([thresholdA], [thresholdB]) => {
        return Number(thresholdA) - Number(thresholdB)
      },
    ),
  })

  const woundLevel = Object.entries(woundLevels)
    .sort(([thresholdA], [thresholdB]) => {
      return Number(thresholdB) - Number(thresholdA)
    })
    .find(([threshold, _]) => percentDamage >= Number(threshold))

  if (woundLevel) {
    // To get the wound area, get a probability from 0 to 1, randomly sort the wound areas, and find the first wound area that has a probability greater than the random number.
    // If an area is not found, try again.
    let woundArea = null
    while (!woundArea) {
      const woundAreaProbability = Math.random()
      woundArea = woundAreas
        .sort(() => Math.random() - 0.5)
        .find(({ probability }) => woundAreaProbability < probability)
    }
    return `${woundLevel[1]} ${woundArea?.name}`
  }

  return null
}

export const Lab = () => {
  // TODO: Move this id to a query param
  const { character, setCharacter } = useCharacter({ id: '1' })
  const [numRolls, setNumRolls] = useState(1)
  const [attackRoll, setAttackRoll] = useState<number | null>(0)
  const [wounds, setWounds] = useState<string[]>([])
  const [rollResult, setRollResult] = useState<string>('')
  if (character) {
    character.ac = 14
  }

  return (
    <Panel elevation={0}>
      <Typography variant="h1">Experimental Tests</Typography>
      <Typography variant="h2">Character</Typography>
      <pre>{JSON.stringify(character, null, 2)}</pre>
      <Panel elevation={1}>
        <Button
          onClick={() => {
            if (!character) {
              return null
            }
            const attackAndDamageResult = doAttackAndDamage(null, character)
            if (attackAndDamageResult.damage > 0) {
              const woundLevel = getWoundLevel(
                attackAndDamageResult.damage,
                character.maxHitPoints,
              )
              if (woundLevel) {
                setWounds([...wounds, woundLevel])
              }
              setCharacter({
                ...character,
                hitPoints: Math.max(
                  0,
                  character.hitPoints - attackAndDamageResult.damage,
                ),
              })
            }
            setRollResult(JSON.stringify(attackAndDamageResult))
          }}
        >
          Roll Attack & Damage ({numRolls}d20)
        </Button>
        <Typography variant="body1">Result: {rollResult}</Typography>
        <Typography variant="body1">
          Wounds: {JSON.stringify(wounds)}
        </Typography>
      </Panel>
    </Panel>
  )
}
