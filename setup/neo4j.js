import { get_session } from '../db/neo4j'

const setup_neo4j = () => new Promise((fulfill, reject) => {
  console.log('Setting up dev neo4j...')
  const session = get_session()
  
  // TODO: create and return dev data
  
  session.close()
  fulfill({
    expansions: []
  })
})

export default setup_neo4j