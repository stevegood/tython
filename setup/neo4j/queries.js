import { create_actions } from './action-queries'
import {
  create_expansions,
  create_expansion_relationships
} from './expansion-queries'
import {
  create_pilots,
  create_pilot_relationships
} from './pilot-queries'
import {
  create_ships,
  create_ship_relationships
} from './ship-queries'
import { create_slots } from './slot-queries'
import {
  create_upgrades,
  create_upgrade_relationships
} from './upgrade-queries'

const get_queries = () => [
  'MATCH (e)-[r]->(n) DELETE r',
  'MATCH (n) DELETE n'
].concat(
  create_actions(),
  create_expansions(),
  create_ships(),
  create_slots(),
  create_pilots(),
  create_upgrades(),
  create_expansion_relationships(),
  create_pilot_relationships(),
  create_ship_relationships(),
  create_upgrade_relationships()
)

export default get_queries