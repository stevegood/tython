const mongodb_url = () => {
  const {
    MONGODB_DATABASE,
    MONGODB_HOST,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_PORT
  } = process.env

  const host = MONGODB_HOST || 'localhost'
  const port = MONGODB_PORT || 27017

  console.log('\n** MongoDB ************************')
  console.log('    host:', host)
  console.log('    port:', port)
  console.log('    database:', MONGODB_DATABASE)
  console.log('***********************************\n')

  return `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${host}:${port}/${MONGODB_DATABASE}?authMechanism=DEFAULT`
}

export default mongodb_url