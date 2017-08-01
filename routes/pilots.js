import { collect, fix_ints } from '../db/neo4j'
import { name_sort } from '../util/sorting'

const pilots = (app, get_session) => {
  
  app.route('/pilots')
    .get((req, res) => {
      const session = get_session()
      session
        .run('MATCH (pilot:Pilot) RETURN pilot')
        .then(result => {
          let pilots = collect('pilot', result.records, name_sort)
          
          session.close()
          res.send({pilots})
        })
    })
    
  app.route('/pilots/:id')
    .get((req, res) => {
      const id = req.params.id
      const session = get_session()
      session
        .run(`
          MATCH
            p=(pilot:Pilot{ id: $id })-[flies:Flies]->(ship:Ship),
            f=(pilot)-[aligns:Aligns]->(faction:Faction),
            s=(pilot)-[has:Has]->(slot:Slot),
            u=(slot)<-[fits:Fits]-(upgrade:Upgrade)
          RETURN p, f, s, u
          `,
          {id}
        )
        .then(result => {
          session.close()
          
          if (result.records.length > 0) {
            let pilot
            let ship
            let faction
            let slots = []
            let upgrades = []
            
            result.records.forEach(record => {
              if (!pilot) {
                pilot = fix_ints(record.get('p').start.properties)
              }
              
              if (!ship) {
                ship = fix_ints(record.get('p').end.properties)
              }
              
              if (!faction) {
                faction = record.get('f').end.properties
              }
              
              const slot = record.get('s')
              if (slot) {
                const slot_props = slot.end.properties
                if (slots.filter(_slot => _slot.id === slot_props.id).length === 0) {
                  slots.push({...fix_ints(slot_props), upgrades: []})
                }
                
              }
              
              const upgrade = record.get('u')
              if (upgrade) {
                if (upgrades.filter(_upgrade => _upgrade.id === upgrade.end.properties.id).length === 0) {
                  upgrades.push(upgrade)
                }
              }
            })
            
            slots.sort(name_sort)
            upgrades.sort(name_sort)
            
            upgrades
              .filter(upgrade => (
                !upgrade.end.properties.faction
                || upgrade.end.properties.faction === faction.name
              ))
              .forEach(upgrade => {
                slots
                  .filter(slot => slot.id === upgrade.start.properties.id)[0]
                  .upgrades.push(fix_ints(upgrade.end.properties))  
              })
            
            res.send({
              ...pilot,
              faction,
              ship,
              slots
            })
          } else {
            res.status(404).end()
          }
        })
    })
  
}

export default pilots
