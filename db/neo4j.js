import neo4j from 'neo4j-driver'

let driver

const get_driver = () => {
  if (!driver) {
    const { NEO4J_USERNAME, NEO4J_PASSWORD, NEO4J_URL } = process.env
    const auth = neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
    const url = NEO4J_URL || 'bolt://localhost'
    driver = neo4j.driver( url, auth)
    
    console.log('\n*** neo4j ************************')
    console.log('    host:', url)
    console.log('************************************\n')
    
  }
  return driver
}

const get_session = () => {
  return get_driver().session()
}

export {
  get_driver,
  get_session
}
