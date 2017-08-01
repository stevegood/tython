import { collect, first } from '../db/neo4j'
import { name_sort, skill_sort, speed_sort} from '../util/sorting'

const ships = (app, get_session) => {
  app.route('/ships')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (ship:Ship) RETURN ship')
        .then(result => {
          session.close()
          const ships = collect('ship', result.records, name_sort)
          res.send({ships})
        })
    })
  
  app.route('/ships/:id')
    .get((req, res) => {
      const session = get_session()
      const id = req.params.id
      
      session
        .run(`
          MATCH
            (action:Action)<-[:Performs]-(ship:Ship{id: $id})<-[:Flies]-(pilot:Pilot),
            (ship)-[:Executes]->(maneuver:Maneuver)
          RETURN ship, action, pilot, maneuver
        `, {id})
        .then(result => {
          session.close()
          const ship = first('ship', result.records)
          if (ship) {
            const pilots = collect('pilot', result.records, skill_sort)
            const actions = collect('action', result.records, name_sort)
            const maneuvers = collect('maneuver', result.records, speed_sort)
            
            res.send({ ...ship, actions, maneuvers, pilots })
          } else {
            res.status(404).end()
          }
        })
    })
}

export default ships