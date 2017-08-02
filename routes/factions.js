import { collect, first } from '../db/neo4j'
import { name_sort, skill_sort } from '../util/sorting'

const factions = (app, get_session) => {
  app.route('/factions')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (faction:Faction) RETURN faction')
        .then(result => {
          session.close()
          const factions = collect('faction', result.records, name_sort)
          res.send({ factions })
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
          session.close()
          const faction = first('faction', result.records)
          if (faction) {
            const pilots = collect('pilot', result.records, skill_sort)
            
            res.send({
              ...faction,
              pilots
            })
          } else {
            res.status(404).end()
          }
        })
    })
}

export default factions