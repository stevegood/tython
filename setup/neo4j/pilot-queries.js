import hash from 'string-hash'
import { pilots } from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  transform
} from './query-utils'

const pilot_id = (pilot) => 'pi' + hash(`${pilot.name}${pilot.xdid || pilot.id}`)

const as_pilot = (item) => {
  let pilot = {...item}
  const id = pilot_id(pilot)
  const xdid = pilot.id
  
  delete pilot.faction
  delete pilot.ship
  delete pilot.slots
  
  return {
    ...pilot,
    id,
    xdid
  }
}

const create_pilots = () => pilots.map(it => create_query('Pilot', as_pilot(it)))

const create_pilot_relationships = () => {
  let queries = []
  
  
  pilots.forEach(pilot => {
    const pi_id = pilot_id(pilot)
    // flies ship
    queries.push(create_relationship_query(
      'Pilot',
      'Flies',
      'Ship',
      { id:  pi_id },
      { id: `sh${hash(pilot.ship)}` }
    ))
    
    if (pilot.slots) {
      queries = queries.concat(pilot.slots.map(slot => create_relationship_query(
        'Pilot',
        'Has',
        'Slot',
        { id: pi_id },
        { id: `sl${hash(slot)}` }
      )))
    }
    
    queries.push(create_relationship_query(
      'Pilot',
      'Aligns',
      'Faction',
      { id: pi_id },
      { id: `fa${hash(pilot.faction)}` }
    ))
  })
  
  return queries
}

export {
  create_pilots,
  create_pilot_relationships,
  pilot_id
}