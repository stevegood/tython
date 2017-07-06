import hash from 'string-hash'
import { get_session } from '../db/neo4j'

const d = {
  punishing_one: {
    id: `ex${hash('Punishing One')}`,
    name: 'Punishing One'
  },
  jumpmaster: {
    id: `sh${hash('Jumpmaster 5000')}`,
    name: 'Jumpmaster 5000'
  },
  dengar: {
    id: `pi${hash('Dengar')}`,
    name: 'Dengar',
    points: 33
  },
  tel: {
    id: `pi${hash('Tel Trevura')}`,
    name: 'Tel Trevura',
    points: 30
  }
}

const create_query = (type, data) => {
  let query = `CREATE (:${type} {`
  query += Object.keys(data).map(key =>{
    const value = isNaN(data[key]) ? `'${data[key]}'` : data[key]
    return `${key}: ${value}`
  }).join(', ')
  query += '})'
  
  return query
}

const create_relationship_query = (left_type, relationship, right_type, left, right) => {
  return `
    MATCH (l:${left_type}{id: '${left.id}'}), (r:${right_type}{id: '${right.id}'})
    CREATE (l)-[:${relationship}]->(r)
  `
}

const queries = [
  'MATCH (e)-[r]->(n) DELETE r',
  'MATCH (n) DELETE n',
  create_query('Expansion', d.punishing_one),
  
  create_query('Ship', d.jumpmaster),
  create_relationship_query('Expansion', 'Contains', 'Ship', d.punishing_one, d.jumpmaster),
  
  create_query('Pilot', d.dengar),
  create_relationship_query('Expansion', 'Contains', 'Pilot', d.punishing_one, d.dengar),
  
  create_query('Pilot', d.tel),
  create_relationship_query('Expansion', 'Contains', 'Pilot', d.punishing_one, d.tel)
]

const setup_neo4j = () => new Promise((fulfill, reject) => {
  console.log('Setting up dev neo4j...')
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

const execute_query = (session, query) => new Promise((fulfill, reject) => {
  console.log('Executing query:', query)
  session.run(query).then(fulfill)
})

export default setup_neo4j