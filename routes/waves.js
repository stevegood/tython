import { fix_ints } from '../db/neo4j'

const waves = (app, get_session) => {
  
  app.route('/waves')
    .get((req, res) => {
      res.status(404).end()
    })
  
  app.route('/waves/:id')
    .get((req, res) => {
      res.status(404).end()
    })
  
}

export default waves