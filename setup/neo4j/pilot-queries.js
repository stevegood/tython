import hash from 'string-hash'
import { pilots } from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  transform
} from './query-utils'

const as_pilot = (item) => {
  let pilot = {...item}
  
  delete pilot.faction
  delete pilot.ship
  delete pilot.slots
  
  return transform({
    ...pilot
  }, 'pi')
}

const create_pilots = () => pilots.map(it => create_query('Pilot', as_pilot(it)))

const create_pilot_relationships = () => {
  let queries = []
  
  
  pilots.forEach(pilot => {
    const pi_id = `pi${hash(pilot.name)}`
    // flies ship
    queries.push(create_relationship_query(
      'Pilot',
      'Flies',
      'Ship',
      { id:  pi_id },
      { id: `sh${hash(pilot.ship)}` }
    ))
  })
  
  return queries
}

export {
  create_pilots,
  create_pilot_relationships
}