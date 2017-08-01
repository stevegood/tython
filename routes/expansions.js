import { collect, first, fix_ints } from '../db/neo4j'
import { name_sort } from '../util/sorting'

const items_by_type = (records, type) => records
  .filter(record => record.get('item').labels[0] === type)
  .map((record) => {
    const item = record.get('item')
    
    return fix_ints({
      ...item.properties
    })
  })

const expansions = (app, get_session) => {
  
  app.route('/expansions')
    .get((req, res) => {
      const session = get_session()
      session
        .run('MATCH (expansion:Expansion) RETURN expansion')
        .then(result => {
          let expansions = collect('expansion', result.records, name_sort)
          res.send({expansions})
          session.close()
        })
    })
    
  app.route('/expansions/:id')
    .get((req, res) => {
      const id = req.params.id
      const session = get_session()
      session
        .run(
          `MATCH (expansion:Expansion {id: $id})-[:Contains]->(item)
           RETURN expansion, item`,
           { id }
        )
        .then(result => {
          session.close()
          const expansion = first('expansion', result.records)
          if (expansion) {
            const ships = items_by_type(result.records, 'Ship')
            const pilots = items_by_type(result.records, 'Pilot')
            const upgrades = items_by_type(result.records, 'Upgrade')
            
            res.send(fix_ints({
              ...expansion,
              pilots,
              ships,
              upgrades
            }))
          } else {
            res.status(404).end()
          }
        })
    })
  
}

export default expansions