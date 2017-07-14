import setup_env from './config/env'
import setup_neo4j from './setup/neo4j'

setup_env()
  .then(setup_neo4j)
  .then(() => {
    console.log('Prod setup complete...')
    process.exit(0)
  })