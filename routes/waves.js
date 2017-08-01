import { collect, first, fix_ints } from '../db/neo4j'
import { name_sort } from '../util/sorting'

const waves = (app, get_session) => {
  
  app.route('/waves')
    .get((req, res) => {
      const session = get_session()
      session
        .run('MATCH (wave:Wave) return wave')
        .then(result => {
          session.close()
          const waves = collect('wave', result.records, name_sort)
          res.send({waves})
        })
    })
  
  app.route('/waves/:id')
    .get((req, res) => {
      const id = req.params.id
      const session = get_session()
      
      session
        .run(`
          MATCH (wave:Wave{id: $id})<-[released:Released]-(expansion:Expansion)
          RETURN wave, released, expansion`,
          {id}
        )
        .then(result => {
          session.close()
          
          const wave = first('wave', result.records)
          if (wave) {
            const expansions = result.records.map(record => {
              return fix_ints({
                ...record.get('expansion').properties,
                ...record.get('released').properties
              })
            }).sort(name_sort)
            
            res.send({
              ...wave,
              expansions
            })
          } else {
            res.status(404).end()
          }
        })
    })
  
}

export default waves