import hash from 'string-hash'
import romanize from 'romanize'
import {
  create_query,
  transform
} from './query-utils'

const waves = [{
  xdid: 1
}, {
  xdid: 2
}, {
  xdid: 3
}, {
  xdid: 4
}, {
  xdid: 5
}, {
  xdid: 6
}, {
  xdid: 7
}, {
  xdid: 8
}, {
  xdid: 9
}, {
  xdid: 10
}, {
  xdid: 11
}]

const as_wave = (item) => transform({
  ...item,
  name: romanize(item.xdid)
}, 'wv')

const create_waves = () => waves.map(wave => create_query('Wave', as_wave(wave)))

export {
  create_waves
}