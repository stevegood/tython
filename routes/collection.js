const collection = (app, db) => {
  app.route('/collection/:userid')
    .get((req, res) => {
      const userid = req.params.userid
      db.collection('collections')
        .find({userid})
        .limit(1)
        .next((err, doc) => {
          if (err) return res.send({err})
          if (!doc) {
            res.status(404)
            res.send({status: 404, message: 'No collection found'})
          } else {
            res.send({collection: doc})
          }
        })
    })
}

export default collection