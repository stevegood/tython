import hash from 'string-hash'
import { pilots, ships } from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  item_id,
  transform
} from './query-utils'

const as_pilot = (item) => {
  let pilot = {...item}
  
  delete pilot.faction
  delete pilot.ship
  delete pilot.slots
  
  return transform({...pilot}, 'pi')
}

const create_pilots = () => pilots.map(it => create_query('Pilot', as_pilot(it)))

const create_pilot_relationships = () => {
  let queries = []
  
  
  pilots.forEach(pilot => {
    const pi_id = item_id(pilot, 'pi')
    const ship = ships.filter(ship => ship.name === pilot.ship)[0]
    // flies ship
    queries.push(create_relationship_query(
      'Pilot',
      'Flies',
      'Ship',
      { id:  pi_id },
      { id: item_id(ship, 'sh') }
    ))
    
    if (pilot.slots) {
      queries = queries.concat(pilot.slots.map(slot => create_relationship_query(
        'Pilot',
        'Has',
        'Slot',
        { id: pi_id },
        { id: item_id({name: slot}, 'sl') }
      )))
    }
    
    queries.push(create_relationship_query(
      'Pilot',
      'Aligns',
      'Faction',
      { id: pi_id },
      { id: item_id({name: pilot.faction}, 'fa') }
    ))
  })
  
  return queries
}

export {
  create_pilots,
  create_pilot_relationships
}