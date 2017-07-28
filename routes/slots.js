import { fix_ints } from '../db/neo4j'

const slots = (app, get_session) => {
  app.route('/slots')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (slot:Slot) RETURN slot')
        .then(result => {
          const slots = result.records
            .map(record => fix_ints(record.get('slot').properties))
            
          session.close()
          res.send({
            slots
          })
        })
    })
  
  app.route('/slots/:id')
    .get((req, res) => {
      const session = get_session()
      const id = req.params.id
      
      session
        .run(`
          MATCH (slot:Slot{id: $id})<-[:Fits]-(upgrade:Upgrade)
          RETURN slot, upgrade`,
          {id}
        )
        .then(result => {
          if (result.records.length > 0) {
            
            const slot = result.records[0].get('slot').properties
            const upgrades = result.records
              .map(record => fix_ints(record.get('upgrade').properties))
            
            session.close()
            res.send(fix_ints({
              ...slot,
              upgrades
            }))
            
          } else {
            session.close()
            res.status(404).end()
          }
        })
    })
}

export default slots