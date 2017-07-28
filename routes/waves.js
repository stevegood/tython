import { fix_ints } from '../db/neo4j'

const waves = (app, get_session) => {
  
  app.route('/waves')
    .get((req, res) => {
      const session = get_session()
      session
        .run('MATCH (wave:Wave) return wave')
        .then(result => {
          const waves = result.records.map(record => {
            const { properties } = record.get('wave')
            return fix_ints({
              ...properties
            })
          })
          
          session.close()
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
          if (result.records.length > 0) {
            const wave = result.records[0].get('wave').properties
            const expansions = result.records.map(record => {
              return fix_ints({
                ...record.get('expansion').properties,
                ...record.get('released').properties
              })
            })
            
            session.close()
            res.send(fix_ints({
              ...wave,
              expansions
            }))
          } else {
            session.close()
            res.status(404).end()
          }
        })
    })
  
}

export default waves