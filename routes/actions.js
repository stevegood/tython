import { fix_ints } from '../db/neo4j'

const actions = (app, get_session) => {
  app.route('/actions')
  
  app.route('/actions/:id')
}

export default actions