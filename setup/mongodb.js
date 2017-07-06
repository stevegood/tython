import hash from 'string-hash'
import { MongoClient } from 'mongodb'
import mongodb_url from '../db/mongodb'

const collection_data = {
  collections: [{
    owner: "stevegood",
    expansions: [{
      id: `ex${hash("Punishing One")}`,
      name: "Punishing One"
    }],
    pilots: [],
    ships: [],
    upgrades: []
  }],
  squads: [{
    name: "Worlds list",
    owner: "stevegood",
    faction: "scum",
    points: 98,
    pilots: [{
      id: `pi${hash("Dengar")}`,
      name: "Dengar",
      points: 33,
      upgrades: [{
        id: `up${hash("Expertise")}`,
        name: "Expertise",
        points: 4
      }, {
        id: `up${hash("Plasma Torpedoes")}`,
        name: "Plasma Torpedoes",
        points: 3
      }, {
        id: `up${hash("Unhinged Astromech")}`,
        name: "Unhinged Astromech",
        points: 1
      }, {
        id: `up${hash("Punishing One")}`,
        name: "Punishing One",
        points: 12
      }, {
        id: `up${hash("Extra Munitions")}`,
        name: "Extra Munitions",
        points: 2
      }, {
        id: `up${hash("K4 Security Droid")}`,
        name: "K4 Security Droid",
        points: 3
      }, {
        id: `up${hash("Guidance Chips")}`,
        name: "Guidance Chips",
        points: 0
      }]
    }, {
      id: `pi${hash("Tel Trevura")}`,
      name: "Tel Trevura",
      points: 30,
      upgrades: [{
        id: `up${hash("Veteran Instincts")}`,
        name: "Veteran Instincts",
        points: 4
      }, {
        id: `up${hash("Plasma Torpedoes")}`,
        name: "Plasma Torpedoes",
        points: 3
      }, {
        id: `up${hash("Unhinged Astromech")}`,
        name: "Unhinged Astromech",
        points: 1
      }, {
        id: `up${hash("Extra Munitions")}`,
        name: "Extra Munitions",
        points: 2
      }, {
        id: `up${hash("K4 Security Droid")}`,
        name: "K4 Security Droid",
        points: 3
      }, {
        id: `up${hash("Guidance Chips")}`,
        name: "Guidance Chips",
        points: 0
      }]
    }]
  }]
}

const collection_names = Object.keys(collection_data)

const setup_mongodb = () => new Promise((fulfill, reject) => {
  console.log('Setting up dev mongodb...')
  
  MongoClient.connect(mongodb_url(), (err, db) => {
    if (err) return reject(err)
    
    console.log('MongoDB connected...')
    
    collection_names.forEach(collection_name => {
      drop_collection({db, collection_name})
        .then(fill_collection)
        .then(() => {
          if ((collection_names[collection_names.length-1] === collection_name)) {
            console.log('Closing MongoDB connection...')
            db.close()
            console.log('Connection closed.')
            fulfill()
          }
        })
    })
  })
})

const drop_collection = ({db, collection_name}) => new Promise((fulfill, reject) => {
  console.log('Dropping collection:', collection_name)
  db.collection(collection_name, (err, collection) => {
    if (err) return reject(err)
    
    collection.remove({}, (err, removed) => {
      if (err) return reject(err)
      
      console.log('Dropped collection:', collection_name)
      fulfill({db, collection_name})
    })
  })
})

const fill_collection = ({db, collection_name}) => new Promise((fulfill, reject) => {
  console.log('Filling collection:', collection_name)
  const docs = collection_data[collection_name]
  
  if (docs.length) {
    db.collection(collection_name)
      .insertMany(docs)
      .then(() => fulfill({db, collection_name}))
  } else {
    fulfill({db, collection_name})
  }
})

export default setup_mongodb