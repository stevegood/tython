import hash from 'string-hash'

const is_valid_value = (value) => {
  if (value === null || value === undefined) return false
  let value_type = typeof value
  
  if (value_type === 'object' && Array.isArray(value)) value_type = 'array'
  
  switch (value_type) {
    case 'string':
      if (value.trim() === '') return false
      
      // check for csv
      const list = value.split(',')
      if (list.length === 0) return false
      if (list.filter(it => it !== '' || it !== null).length === 0) return false
      break
    case 'array':
      if (value.length === 0) return false
      break
  }
  
  return true
}

const clean_string = (value) => {
  if (typeof value !== 'string') return value
  return value.replace(/'/g, "\\'")
}

const clean_up_obj = (obj) => {
  let clean = {}
  const keys = Object.keys(obj)
  
  keys.forEach(key => {
    let value = obj[key]
    let value_type = typeof value
    if (value_type === 'object' && Array.isArray(value)) value_type = 'array'
    
    let should_add = true
    
    if (is_valid_value(value)) {
      switch (value_type) {
        case 'string':
          value = clean_string(value)
          break
        case 'array':
          value = value.filter(it => it !== undefined && it !== null).map(clean_string)
          break
      }
    } else {
      should_add = false
    }
    
    if (should_add) clean[key] = value
  })
  
  return {
    ...clean
  }
}

const parse_obj_to_string = (obj) => Object.keys(obj)
  .filter(key => obj[key] !== null && obj[key] !== undefined)
  .map(key =>{
    const dv = obj[key]
    if (is_valid_value(dv)) {
      const value = isNaN(dv) ? `'${dv}'` : dv
      return `${key}: ${value}`
    }
  }).join(', ').trim()

const create_query = (type, data) => {
  const obj = clean_up_obj(data)
  let query = `CREATE (:${type} {`
  query += parse_obj_to_string(obj)
  
  if (query[query.length - 1] === ',') {
    query = query.substr(0, query.length-1)
  }
  
  query += '})'
  
  return query
}

const create_relationship_query = (left_type, relationship, right_type, left, right, data) => {
  const rel_data = data ? `{${parse_obj_to_string(data)}}` : ''
  
  return `
    MATCH (l:${left_type}{id: '${left.id}'}), (r:${right_type}{id: '${right.id}'})
    CREATE (l)-[:${relationship}${rel_data}]->(r)
  `
}

const transform = (item, prefix) => {
  const id = `${prefix}${hash(item.name)}`
  const xdid = item.id
  return {
    ...item,
    id,
    xdid
  }
}

export {
  create_query,
  create_relationship_query,
  transform
}