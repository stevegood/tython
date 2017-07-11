import hash from 'string-hash'
import {
  create_query,
  transform
} from './query-utils'

const waves = [{
  name: 1
}, {
  name: 2
}, {
  name: 3
}, {
  name: 4
}, {
  name: 5
}, {
  name: 6
}, {
  name: 7
}, {
  name: 8
}, {
  name: 9
}, {
  name: 10
}, {
  name: 11
}]

const as_wave = (item) => transform({...item}, 'wv')

const create_waves = () => waves.map(wave => create_query('Wave', as_wave(wave)))

export {
  create_waves
}