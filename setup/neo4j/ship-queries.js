import hash from 'string-hash'
import { ships } from 'xwing-data-module'
import {
  create_query,
  create_relationship_query,
  transform
} from './query-utils'
import { as_maneuver } from './maneuver-queries'

const as_ship = (item) => {
  let ship = {...item}
  
  delete ship.actions
  delete ship.maneuvers
  
  return transform({
    ...ship
  }, 'sh')
}

const create_ships = () => ships.map(it => create_query('Ship', as_ship(it)))

const create_ship_relationships = () => {
  let queries = []
  
  ships
    .filter(ship => ship.actions && ship.actions.length > 0)
    .forEach(ship => {
      const sh_id = `sh${hash(ship.name)}`
      queries = queries.concat(ship.actions.map(action => (
        create_relationship_query(
          'Ship',
          'Performs',
          'Action',
          {id: sh_id},
          {id: `ac${hash(action)}`}
        )
      )))
      
      // maneuvers
      ship.maneuvers.forEach((speed, speed_index) => {
        speed.forEach((color, direction) => {
            const maneuver = as_maneuver(speed_index, color, direction)
            queries.push(create_relationship_query(
              'Ship',
              'Executes',
              'Maneuver',
              { id: sh_id },
              { id: maneuver.id }
            ))
          })
      })
    })
  
  return queries
}

export {
  create_ships,
  create_ship_relationships
}