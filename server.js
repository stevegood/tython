import express from 'express'
import bodyParser from 'body-parser'
import setup_env from './config/env'
import { get_session } from './db/neo4j'
import {
  expansions,
  pilots
} from './routes'

setup_env()

const app = express()
const port = process.env.PORT || 3999

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

expansions(app, get_session)
pilots(app, get_session)

app.listen(port)

console.log('Listening on port ', port)