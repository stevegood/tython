import { get_session } from '../db/neo4j'
import get_queries from './neo4j/queries'

const execute_query = (session, query) => new Promise((fulfill, reject) => {
  session.run(query).then(fulfill)
})

const setup_neo4j = () => new Promise((fulfill, reject) => {
  console.log('Setting up dev neo4j...')
  const queries = get_queries()
  const session = get_session()
  
  queries.forEach(query => execute_query(session, query).then(() => {
    if (queries[queries.length - 1] === query) {
      console.log('Closing neo4j session...')
      session.close()
      console.log('Closed neo4j session.')
      fulfill()
    }
  }))
})

export default setup_neo4j