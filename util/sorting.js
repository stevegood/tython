const simple_sort = (key, a, b) => {
  if (a[key] < b[key]) return -1
  if (a[key] > b[key]) return 1
  return 0
}

const name_sort = (a, b) => simple_sort('name', a, b)
const skill_sort = (a, b) => simple_sort('skill', a, b)
const speed_sort = (a, b) => simple_sort('speed', a, b)

export {
  simple_sort,
  name_sort,
  skill_sort,
  speed_sort
}