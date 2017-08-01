import { collect, first } from '../db/neo4j'
import { name_sort } from '../util/sorting'

const actions = (app, get_session) => {
  app.route('/actions')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (action:Action) RETURN action')
        .then(result => {
          session.close()
          const actions = collect('action', result.records, name_sort)
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
          session.close()
          const action = first('action', result.records)
          if (action) {
            const ships = collect('ship', result.records, name_sort)
            res.send({ ...action, ships })
          } else {
            res.status(404).end()
          }
        })
    })
}

export default actions