import { creature } from './creature'
import { direction } from './direction'
import { doing } from './doing'
import { encounterDifficulty } from './encounterDifficulty'
import { event } from './event'
import { location } from './location'
import { mundane } from './mundane'
import { wants } from './wants'
import smells from './smells'
import sounds from './sounds'
import shelters from './shelter'

export default {
  creature,
  direction,
  doing,
  encounterDifficulty,
  event,
  location,
  mundane,
  wants,
  ...smells,
  ...sounds,
  ...shelters,
}
