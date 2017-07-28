import { fix_ints } from '../db/neo4j'

const factions = (app, get_session) => {
  app.route('/factions')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (faction:Faction) RETURN faction')
        .then(result => {
          const factions = result.records
            .map(record => fix_ints(record.get('faction').properties))
          
          session.close()
          res.send({
            factions
          })
        })
    })
  
  app.route('/factions/:id')
    .get((req, res) => {
      const session = get_session()
      const id = req.params.id
      
      session
        .run(`
          MATCH (faction:Faction{id: $id})<-[aligns:Aligns]-(pilot:Pilot)
          RETURN faction, aligns, pilot`,
          {id}
        )
        .then(result => {
          if (result.records.length > 0) {
            const faction = result.records[0].get('faction').properties
            const pilots = result.records
              .map(record => fix_ints(record.get('pilot').properties))
            
            res.send(fix_ints({
              ...faction,
              pilots
            }))
          } else {
            session.close()
            res.status(404).end()
          }
        })
    })
}

export default factions