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
      res.status(404).end()
    })
  
}

export default waves