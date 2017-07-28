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
}

export default slots