import { collect, first } from '../db/neo4j'
import { name_sort } from '../util/sorting'

const slots = (app, get_session) => {
  app.route('/slots')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (slot:Slot) RETURN slot')
        .then(result => {
          session.close()
          const slots = collect('slot', result.records, name_sort)
          res.send({ slots })
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
          session.close()
          
          const slot = first('slot', result.records)
          if (slot) {
            const upgrades = collect('upgrade', result.records, name_sort)
            res.send({ ...slot, upgrades })
          } else {
            res.status(404).end()
          }
        })
    })
}

export default slots