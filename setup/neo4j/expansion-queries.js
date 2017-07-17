import hash from 'string-hash'
import romanize from 'romanize'
import {
  pilots,
  ships,
  sources as expansions,
  upgrades
} from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  item_id,
  transform
} from './query-utils'

const as_expansion = (item) => {
  let expansion = {...item}
  
  delete expansion.contents
  delete expansion.released
  delete expansion.release_date
  delete expansion.announce_date
  delete expansion.wave
  
  return transform({
    ...expansion
  }, 'ex')
}

const create_expansions = () => expansions.map(it => create_query('Expansion', as_expansion(it)))
const create_expansion_relationships = () => {
  let queries = []
  
  expansions.forEach(ex => {
    const ex_id = item_id(ex, 'ex')
    
    // ships
    queries = queries.concat(Object.keys(ex.contents.ships)
      .map(id => ships.filter(ship => `${ship.id}` === `${id}`)[0])
      .map(ship => create_relationship_query(
        'Expansion',
        'Contains',
        'Ship',
        {id: ex_id},
        {id: item_id(ship, 'sh')},
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
        {id: item_id(pilot, 'pi')},
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
        {id: item_id(upgrade, 'up')},
        {quantity: ex.contents.upgrades[`${upgrade.id}`]}
      ))
    )
  
    // waves
    if (ex.wave) {
      const released_meta = {
        released: ex.released ? true : false,
        release_date: ex.release_date,
        announcement_date: ex. announcement_date || ex.announce_date
      }
      
      console.log(released_meta)
      
      queries.push(create_relationship_query(
        'Expansion',
        'Released',
        'Wave',
        {id: ex_id},
        {id: item_id({name: romanize(ex.wave)}, 'wv')},
        released_meta
      ))
    }
  })
  
  return queries
}

export {
  create_expansions,
  create_expansion_relationships
}