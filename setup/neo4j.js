import { get_session } from '../db/neo4j'
import get_queries from './neo4j/queries'

const execute_query = (session, query) => new Promise(fulfill => {
  console.log(`Running: ${query}`)
  session.run(query).then(fulfill)
})

const setup_neo4j = () => new Promise(fulfill => {
  console.log('Setting up neo4j...')
  get_queries().then(queries => {
    const session = get_session()
    
    queries.forEach(query => execute_query(session, query).then(() => {
      console.log(`Done: ${query}`)
      if (queries[queries.length - 1] === query) {
        console.log('Closing neo4j session...')
        session.close()
        console.log('Closed neo4j session.')
        fulfill()
      }
    }))
  })
})

export default setup_neo4j
