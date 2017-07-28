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
    .get((req, res) => {
      const session = get_session()
      const id = req.params.id
      
      session
        .run(`
          MATCH (action:Action{id: $id})<-[:Performs]-(ship:Ship)
          RETURN action, ship`,
          {id}
        )
        .then(result => {
          if (result.records.length > 0) {
            const action = result.records[0].get('action').properties
            const ships = result.records
              .map(record => fix_ints(record.get('ship').properties))
              
            session.close()
            res.send(fix_ints({
              ...action,
              ships
            }))
          } else {
            session.close()
            res.status(404).end()
          }
        })
    })
}

export default actions