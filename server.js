import express from 'express'
import bodyParser from 'body-parser'
import MongoClient from 'mongodb'
import setup_env from './config/env'
import { get_session } from './db/neo4j'
import mongodb_url from './db/mongodb'
import {
  collection,
  expansions,
  pilots,
  waves,
  factions,
  actions
} from './routes'

setup_env()
  .then(() => {

    const app = express()
    const port = process.env.PORT || 3999

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    console.log('Connecting to MongoDB...')
    MongoClient.connect(mongodb_url(), (err, db) => {
      if (err) return console.error(err)
      
      collection(app, db)
      expansions(app, get_session)
      pilots(app, get_session)
      waves(app, get_session)
      factions(app, get_session)
      actions(app, get_session)

      app.listen(port)

      console.log('Listening on port', port)
    })

  })