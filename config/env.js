import { config } from 'dotenv'

const setup_env = () => new Promise((fulfill, reject) => {
  console.log('Setting up env...')
  config()
  fulfill()
})

export default setup_env