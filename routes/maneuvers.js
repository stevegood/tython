import { collect, first, fix_ints } from '../db/neo4j'
import { name_sort, speed_sort } from '../util/sorting'

const capitalize = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`

const collect_maneuvers = (result) => {
  const maneuvers = []
  
  result.records.forEach(record => {
    const maneuver = fix_ints(record.get('maneuver').properties)
    
    if (maneuver && maneuvers.filter(m => m.id === maneuver.id).length === 0) {
      const m_records = result.records.filter(rec => 
        rec.get('maneuver').properties.id === maneuver.id
      )
      const ships = collect('ship', m_records, name_sort)
      maneuvers.push({ ...maneuver, ships })
    }
  })
  
  return maneuvers.sort(speed_sort)
}

const maneuvers = (app, get_session) => {
  app.route('/maneuvers')
    .get((req, res) => {
      const session = get_session()
      
      session
        .run('MATCH (maneuver:Maneuver)<-[:Executes]-(:Ship) RETURN maneuver')
        .then(result => {
          const maneuvers = collect('maneuver', result.records, speed_sort)
          res.send({maneuvers})
        })
    })
  
  app.route('/maneuvers/:id')
    .get((req, res) => {
      const session = get_session()
      const id = req.params.id
      
      session
        .run(`
          MATCH (maneuver:Maneuver{id: $id})<-[:Executes]-(ship:Ship)
          RETURN maneuver, ship
        `, {id})
        .then(result => {
          session.close()
          const maneuver = first('maneuver', result.records)
          
          if(maneuver) {
            const ships = collect('ship', result.records, name_sort)
            
            res.send({
              ...maneuver,
              ships
            })
          } else {
            res.status(404).end()
          }
        })
    })
  
  app.route('/maneuvers/with-speed/:speed')
    .get((req, res) => {
      const session = get_session()
      const speed = parseInt(req.params.speed)
      
      session
        .run(`
          MATCH (maneuver:Maneuver{speed: $speed})<-[:Executes]-(ship:Ship)
          RETURN maneuver, ship
        `, {speed})
        .then(result => {
          const maneuvers = collect_maneuvers(result)
          session.close()
          res.send({maneuvers})
        })
    })
    
  app.route('/maneuvers/with-direction/:direction')
    .get((req, res) => {
      const session = get_session()
      const direction = req.params.direction
      
      session
        .run(`
          MATCH (maneuver:Maneuver{direction: $direction})<-[:Executes]-(ship:Ship)
          RETURN maneuver, ship
        `, {direction})
        .then(result => {
          const maneuvers = collect_maneuvers(result)
          session.close()
          res.send({maneuvers})
        })
    })
    
  app.route('/maneuvers/with-color/:color')
    .get((req, res) => {
      const session = get_session()
      const color = req.params.color
      
      session
        .run(`
          MATCH (maneuver:Maneuver{color: $color})<-[:Executes]-(ship:Ship)
          RETURN maneuver, ship
        `, {color})
        .then(result => {
          const maneuvers = collect_maneuvers(result)
          session.close()
          res.send({maneuvers})
        })
    })
    
  app.route('/maneuvers/with-speed/:speed/and-direction/:direction')
    .get((req, res) => {
      const session = get_session()
      const speed = parseInt(req.params.speed)
      const direction = req.params.direction
      
      session
        .run(`
          MATCH (maneuver:Maneuver{speed: $speed, direction: $direction})<-[:Executes]-(ship:Ship)
          RETURN maneuver, ship
        `, {speed, direction})
        .then(result => {
          const maneuvers = collect_maneuvers(result)
          session.close()
          res.send({maneuvers})
        })
    })
    
  app.route('/maneuvers/with-speed/:speed/and-color/:color')
    .get((req, res) => {
      const session = get_session()
      const speed = parseInt(req.params.speed)
      const color = capitalize(req.params.color)
      
      session
        .run(`
          MATCH (maneuver:Maneuver{speed: $speed, color: $color})<-[:Executes]-(ship:Ship)
          RETURN maneuver, ship
        `, {speed, color})
        .then(result => {
          const maneuvers = collect_maneuvers(result)
          session.close()
          res.send({maneuvers})
        })
    })
    
  app.route('/maneuvers/with-speed/:speed/and-color/:color/and-direction/:direction')
    .get((req, res) => {
      const session = get_session()
      const speed = parseInt(req.params.speed)
      const color = capitalize(req.params.color)
      const direction = req.params.direction
      
      session
        .run(`
          MATCH (maneuver:Maneuver{speed: $speed, color: $color, direction: $direction})<-[:Executes]-(ship:Ship)
          RETURN maneuver, ship
        `, {speed, color, direction})
        .then(result => {
          const maneuvers = collect_maneuvers(result)
          session.close()
          res.send({maneuvers})
        })
    })
  
}

export default maneuvers