import neo4j from 'neo4j-driver'

let driver

const get_driver = () => {
  if (!driver) {
    const {
      GRAPHENEDB_BOLT_PASSWORD,
      GRAPHENEDB_BOLT_URL,
      GRAPHENEDB_BOLT_USER,
      NEO4J_USERNAME,
      NEO4J_PASSWORD,
      NEO4J_URL
    } = process.env
    const auth = neo4j.auth.basic(
      GRAPHENEDB_BOLT_USER || NEO4J_USERNAME,
      GRAPHENEDB_BOLT_PASSWORD || NEO4J_PASSWORD
    )
    const url = (GRAPHENEDB_BOLT_URL || NEO4J_URL) || 'bolt://localhost'
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

const fix_ints = (obj) => {
  let obj_out = {...obj}
  const keys = Object.keys(obj_out)
  
  keys.forEach(key => {
    let value = obj_out[key]
    if (value.low !== undefined && value.high !== undefined) {
      value = value.toNumber()
    }
    obj_out[key] = value
  })
  
  return {...obj_out}
}

export {
  fix_ints,
  get_driver,
  get_session
}
