import hash from 'string-hash'
import { upgrades } from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  transform
} from './query-utils'

const get_slots = () => Array.from(new Set(
  upgrades.map(upgrade => upgrade.slot)
))

const as_slot = (slot) => transform({
  name: slot
}, 'sl')

const create_slots = () => get_slots().map(slot => create_query('Slot', as_slot(slot)))

export {
  create_slots
}