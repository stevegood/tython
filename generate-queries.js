import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import get_queries from './setup/neo4j/queries'

const file_path = path.resolve('./out')

const write_query = (query, name) => new Promise((fulfill, reject) => {
  const file_name = `${name}.cql`
  fs.writeFile(`${file_path}/${file_name}`, query.trim(), (err) => {
    if (err) return reject(err)
    fulfill(`${file_path}/${file_name}`)
  })
})

const clean_dirs = () => new Promise(fulfill => rimraf(file_path, fulfill))

const mk_out_dir = () => new Promise(fulfill => fs.mkdir(file_path, fulfill))

const export_queries = queries => new Promise((fulfill, reject) => {
  console.log(`About to write ${queries.length} queries to file(s)...`)
  queries.forEach((query, i) => {
    const file_name = `${i}.cql`
    write_query(query, i)
      .then(file_written => {
        if (i === queries.length-1) {
          console.log(`Wrote ${i+1} queries to file!`)
          fulfill(queries)
        }
      })
      .catch(reject)
  })
})

clean_dirs()
  .then(mk_out_dir)
  .then(get_queries)
  .then(export_queries)
  .then(() => console.log('Done!'))
  .catch(err => console.error(err))