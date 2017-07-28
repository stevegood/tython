import { fix_ints } from '../db/neo4j'

const actions = (app, get_session) => {
  app.route('/actions')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (action:Action) RETURN action')
        .then(result => {
          const actions = result.records
            .map(record => fix_ints(record.get('action').properties))
            
          session.close()
          res.send({actions})
        })
    })
  
  app.route('/actions/:id')
}

export default actions