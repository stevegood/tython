import hash from 'string-hash'
import { upgrades } from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  transform
} from './query-utils'

const as_upgrade = (item) => {
  let upgrade = {...item}
  
  delete upgrade.slot
  
  return transform({
    ...upgrade
  }, 'up')
}

const create_upgrades = () => upgrades.map(it => create_query('Upgrade', as_upgrade(it)))

const create_upgrade_relationships = () => {
  let queries = []
  
  queries = queries.concat(upgrades.map(upgrade => {
    const up_id = `up${hash(upgrade.name)}`
    return create_relationship_query(
      'Upgrade',
      'Fits',
      'Slot',
      { id: up_id },
      { id: `sl${hash(upgrade.slot)}` }
    )
  }))
  
  return queries
}

export {
  create_upgrades,
  create_upgrade_relationships
}