import hash from 'string-hash'
import expansions from '../data/expansions'
import {
  create_query,
  create_relationship_query,
  transform
} from './query-utils'

const as_expansion = (item) => {
  let expansion = {...item}
  
  delete expansion.pilots
  delete expansion.ships
  delete expansion.upgrades
  
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
    queries = queries.concat(ex.ships.map(sh => create_relationship_query(
      'Expansion',
      'Contains',
      'Ship',
      {id: ex_id},
      {id: `sh${hash(sh.name)}`},
      { quantity: sh.qty }
    )))
    
    // pilots
    queries = queries.concat(ex.pilots.map(pi => create_relationship_query(
      'Expansion',
      'Contains',
      'Pilot',
      {id: ex_id},
      {id: `pi${hash(pi.name)}`},
      { quantity: pi.qty }
    )))
    
    // upgrades
    queries = queries.concat(ex.upgrades.map(up => create_relationship_query(
      'Expansion',
      'Contains',
      'Upgrade',
      {id: ex_id},
      {id: `up${hash(up.name)}`},
      { quantity: up.qty }
    )))
  })
  
  return queries
}

export {
  create_expansions,
  create_expansion_relationships
}