import { MongoClient } from 'mongodb'
import mongodb_url from '../db/mongodb'

const collection_data = {
  collections: [{
    "owner": "stevegood",
    "expansions": [
      "595d591f82cfa10d304f1fca",
      "595d591f82cfa10d304f1fcb",
      "595d591f82cfa10d304f1fcc",
      "595d591f82cfa10d304f1fcd",
      "595d591f82cfa10d304f1fce"
    ],
    "pilots": [
      "595d591f82cfa10d304f1fca",
      "595d591f82cfa10d304f1fcb",
      "595d591f82cfa10d304f1fcc",
      "595d591f82cfa10d304f1fcd",
      "595d591f82cfa10d304f1fce"
    ],
    "ships": [
      "595d591f82cfa10d304f1fca",
      "595d591f82cfa10d304f1fcb",
      "595d591f82cfa10d304f1fcc",
      "595d591f82cfa10d304f1fcd",
      "595d591f82cfa10d304f1fce"
    ],
    "upgrades": [
      "595d591f82cfa10d304f1fca",
      "595d591f82cfa10d304f1fcb",
      "595d591f82cfa10d304f1fcc",
      "595d591f82cfa10d304f1fcd",
      "595d591f82cfa10d304f1fce"
    ]
  }],
  squads: [{
    "owner": "stevegood",
    "faction": "scum",
    "name": "Worlds list",
    "points": 98,
    "pilots": [{
      "pilot": "595d591f82cfa10d304f1fcf",
      "upgrades": [
        "595d591f82cfa10d304f1fca",
        "595d591f82cfa10d304f1fcb"
      ]
    }, {
      "pilot": "595d591f82cfa10d304f1fcx",
      "upgrades": [
        "595d591f82cfa10d304f1fca",
        "595d591f82cfa10d304f1fcb"
      ]
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