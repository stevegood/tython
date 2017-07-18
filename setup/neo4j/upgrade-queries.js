import { upgrades } from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  item_id,
  transform
} from './query-utils'

const as_upgrade = (item) => {
  let upgrade = {...item}
  
  delete upgrade.slot
  
  return transform({
    ...upgrade
  }, 'up')
}

const create_upgrades = () => {
  console.log('Upgrades: building queries...')
  return upgrades.map(it => create_query('Upgrade', as_upgrade(it)))
}

const create_upgrade_relationships = () => {
  console.log('Upgrades: building relationship queries...')
  let queries = []
  
  queries = queries.concat(upgrades.map(upgrade => {
    const up_id = item_id(upgrade, 'up')
    return create_relationship_query(
      'Upgrade',
      'Fits',
      'Slot',
      { id: up_id },
      { id: item_id({name: upgrade.slot}, 'sl') }
    )
  }))
  
  return queries
}

export {
  create_upgrades,
  create_upgrade_relationships
}
