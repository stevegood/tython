
const items_by_type = (records, type) => records
  .filter(record => record.get('item').labels[0] === type)
  .map((record) => {
    const item = record.get('item')
    return {
      ...item.properties,
      id: item.identity.low
    }
  })

const expansions = (app, get_session) => {
  
  app.route('/expansions')
    .get((req, res) => {
      const session = get_session()
      session
        .run('MATCH (expansion:Expansion) RETURN expansion')
        .then(result => {
          let expansions = result.records.map(record => {    
            const { identity, properties } = record.get('expansion')
            return {
              id: identity.low,
              ...properties
            }
          })
          
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
          `MATCH (expansion:Expansion)-[:Contains]->(item)
           WHERE ID(expansion) = ${id}
           RETURN expansion, item`
        )
        .then(result => {
          const expansion = result.records[0].get('expansion')
          const ships = items_by_type(result.records, 'Ship')
          const pilots = items_by_type(result.records, 'Pilot')
          const upgrades = items_by_type(result.records, 'Upgrade')
            
          session.close()
          
          res.send({
            id: expansion.identity.low,
            ...expansion.properties,
            pilots,
            ships,
            upgrades
          })
        })
    })
  
}

export default expansions