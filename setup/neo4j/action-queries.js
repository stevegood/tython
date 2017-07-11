import hash from 'string-hash'
import { ships } from 'xwing-data-module'
import {
  create_query,
  transform
} from './query-utils'

const as_action = (action) => transform({
  name: action
}, 'ac')

const get_actions = () => {
  let actions = []
  ships
    .filter(ship => ship.actions && ship.actions.length > 0)
    .forEach(ship => actions = actions.concat(ship.actions))
    
  return actions
}

const create_actions = () => Array.from(
  new Set(get_actions()))
    .map(action => create_query('Action', as_action(action))
)

export {
  create_actions
}
  
