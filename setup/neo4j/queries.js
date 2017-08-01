import { create_actions } from './action-queries'
import {
  create_expansions,
  create_expansion_relationships
} from './expansion-queries'
import { create_factions } from './faction-queries'
import { create_maneuvers } from './maneuver-queries'
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
import { create_waves } from './wave-queries'

const get_queries = () => new Promise(fulfill => {
  const queries = [
    'MATCH (e)-[r]->(n) DELETE r',
    'MATCH (n) DELETE n'
  ].concat(
    create_actions(),
    create_expansions(),
    create_factions(),
    create_maneuvers(),
    create_pilots(),
    create_ships(),
    create_slots(),
    create_upgrades(),
    create_waves(),
    create_expansion_relationships(),
    create_pilot_relationships(),
    create_ship_relationships(),
    create_upgrade_relationships(),
    ['MATCH (n) WHERE size((n)--())=0 DELETE (n)'] // delete nodes without relationships
  )
  
  fulfill(queries)
})

export default get_queries