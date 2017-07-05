import setup_env from './config/env'
import setup_neo4j from './setup/neo4j'
import setup_mongodb from './setup/mongodb'

setup_env()
  .then(setup_neo4j)
  .then(setup_mongodb)
  .then(() => console.log('Dev setup complete...'))