import { collect, first } from '../db/neo4j'
import { name_sort } from '../util/sorting'

const upgrades = (app, get_session) => {
  app.route('/upgrades')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (upgrade:Upgrade) RETURN upgrade')
        .then(result => {
          session.close()
          const upgrades = collect('upgrade', result.records, name_sort)
          res.send({ upgrades })
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
          session.close()
          const upgrade = first('upgrade', result.records)
          if (upgrade) {
            const pilots = collect('pilot', result.records, name_sort)
            res.send({ ...upgrade, pilots })
          } else {
            res.status(404).end()
          }
        })
    })
}

export default upgrades