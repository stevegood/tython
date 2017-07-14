import hash from 'string-hash'
import romanize from 'romanize'
import {
  pilots,
  ships,
  sources as expansions,
  upgrades
} from 'xwing-data-module'
import { pilot_id } from './pilot-queries'
import {
  create_query,
  create_relationship_query,
  transform
} from './query-utils'

const as_expansion = (item) => {
  let expansion = {...item}
  
  delete expansion.contents
  
  return transform({
    ...expansion
  }, 'ex')
}

const create_expansions = () => expansions.map(it => create_query('Expansion', as_expansion(it)))
const create_expansion_relationships = () => {
  let queries = []
  
  expansions.forEach(ex => {
    const ex_id = `ex${hash(ex.name)}`
    
    // ships
    queries = queries.concat(Object.keys(ex.contents.ships)
      .map(id => ships.filter(ship => `${ship.id}` === `${id}`)[0])
      .map(ship => create_relationship_query(
        'Expansion',
        'Contains',
        'Ship',
        {id: ex_id},
        {id: `sh${hash(ship.name)}`},
        {quantity: ex.contents.ships[`${ship.id}`]}
      ))
    )
      
    // pilots
    queries = queries.concat(Object.keys(ex.contents.pilots)
      .map(id => pilots.filter(pilot => `${pilot.id}` === `${id}`)[0])
      .map(pilot => create_relationship_query(
        'Expansion',
        'Contains',
        'Pilot',
        {id: ex_id},
        {id: pilot_id(pilot)},
        {quantity: ex.contents.pilots[`${pilot.id}`]}
      ))
    )
    
    // upgrades
    queries = queries.concat(Object.keys(ex.contents.upgrades)
      .map(id => upgrades.filter(upgrade => `${upgrade.id}` === `${id}`)[0])
      .map(upgrade => create_relationship_query(
        'Expansion',
        'Contains',
        'Upgrade',
        {id: ex_id},
        {id: `up${hash(upgrade.name)}`},
        {quantity: ex.contents.upgrades[`${upgrade.id}`]}
      ))
    )
  
    // waves
    if (ex.wave) {
      queries.push(create_relationship_query(
        'Expansion',
        'Released',
        'Wave',
        {id: ex_id},
        {id: `wv${hash(romanize(ex.wave))}`}
      ))
    }
  })
  
  return queries
}

export {
  create_expansions,
  create_expansion_relationships
}