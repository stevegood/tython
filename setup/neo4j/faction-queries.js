import hash from 'string-hash'
import { pilots } from 'xwing-data-module'
import {
  create_query,
  transform
} from './query-utils'

const factions = Array.from(new Set(pilots.map(pilot => pilot.faction)))

const as_faction = (faction) => transform({
  name: faction
}, 'fa')

const create_factions = () => factions.map(faction => create_query('Faction', as_faction(faction)))

export {
  create_factions
}