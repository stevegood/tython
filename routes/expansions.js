
const items_by_type = (records, type) => records
  .filter(record => record.get('item').labels[0] === type)
  .map((record) => {
    const item = record.get('item')
    
    if (item.properties.points) {
      item.properties.points = item.properties.points.toNumber()
    }
    
    return {
      ...item.properties
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
            const { properties } = record.get('expansion')
            return {
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
          `MATCH (expansion:Expansion {id: $id})-[:Contains]->(item)
           RETURN expansion, item`,
           { id }
        )
        .then(result => {
          console.log(result.summary)
          if (result.records.length > 0) {
            const expansion = result.records[0].get('expansion')
            const ships = items_by_type(result.records, 'Ship')
            const pilots = items_by_type(result.records, 'Pilot')
            const upgrades = items_by_type(result.records, 'Upgrade')
              
            session.close()
            
            res.send({
              ...expansion.properties,
              pilots,
              ships,
              upgrades
            })
          } else {
            res.status(404).end()
          }
        })
    })
  
}

export default expansions