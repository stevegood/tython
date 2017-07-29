import { fix_ints } from '../db/neo4j'

const upgrades = (app, get_session) => {
  app.route('/upgrades')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (upgrade:Upgrade) RETURN upgrade')
        .then(result => {
          const upgrades = result.records
            .map(record => fix_ints(record.get('upgrade').properties))
            
          session.close()
          res.send({
            upgrades
          })
        })
    })
    
  app.route('/upgrades/:id')
    .get((req, res) => {
      const session = get_session()
      const id = req.params.id
      
      session
        .run(`
          MATCH (upgrade:Upgrade{id: $id})-[:Fits]->(:Slot)<-[:Has]-(pilot:Pilot)
          RETURN upgrade, pilot`,
          {id}
        )
        .then(result => {
          if (result.records.length > 0) {
            const upgrade = result.records[0].get('upgrade').properties
            const pilots = result.records
              .map(record => fix_ints(record.get('pilot').properties))
            
            session.close()
            res.send(fix_ints({
              ...upgrade,
              pilots
            }))
          } else {
            session.close()
            res.status(404).end()
          }
        })
    })
}

export default upgrades