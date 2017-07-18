const pilots = (app, get_session) => {
  
  app.route('/pilots')
    .get((req, res) => {
      const session = get_session()
      session
        .run('MATCH (pilot:Pilot) RETURN pilot')
        .then(result => {
          let pilots = result.records.map( record => {
            const { properties } = record.get('pilot')
            return {
              ...properties
            }
          })
          
          session.close()
          res.send({pilots: pilots})
        })
    })
  
}

export default pilots
