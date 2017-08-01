import { collect, first } from '../db/neo4j'

const ships = (app, get_session) => {
  app.route('/ships')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (ship:Ship) RETURN ship')
        .then(result => {
          const ships = collect('ship', result.records)
            
          session.close()
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
          const ship = first('ship', result.records)
          if (ship) {
            const pilots = collect(
              'pilot',
              result.records,
              (a, b) => a.skill === b.skill ? 0 : (a.skill > b.skill ? 1 : -1)
            )
            
            const actions = collect(
              'action',
              result.records,
              (a, b) => a.name > b.name
            )
            
            const maneuvers = collect(
              'maneuver',
              result.records,
              (a, b) => a.speed === b.speed ? 0 : (a.speed > b.speed ? 1 : -1)
            )
            
            session.close()
            res.send({
              ...ship,
              actions,
              maneuvers,
              pilots
            })
          } else {
            session.close()
            res.status(404).end()
          }
        })
    })
}

export default ships