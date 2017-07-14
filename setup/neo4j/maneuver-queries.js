import {
  create_query,
  transform
} from './query-utils'
/*
 * From https://github.com/guidokessels/xwing-data/blob/master/schemas/ships.json
 * Key: non_huge.properties.maneuvers.items.items.description
 * 
 * This array is a representation of a ship' maneuvers at a particular speed.
 * 
 * Each value on this array references a different maneuver depending on its
 * index, which maps according to the following list:
 *   00 = Left Turn             (LT)
 *   01 = Left Bank             (LB)
 *   02 = Straight              (ST)
 *   03 = Right Bank            (RB)
 *   04 = Right Turn            (RT)
 *   05 = Koiogran Turn         (KT)
 *   06 = Segnor's Loop Left    (SL)
 *   07 = Segnor's Loop Right   (SR)
 *   08 = Tallon Roll Left      (TL)
 *   09 = Tallon Roll Right     (TR)
 *   10 = Backwards Left Bank   (BLB)
 *   11 = Backwards Straight    (BST)
 *   12 = Backwards Right Bank  (BRB)
 * 
 * Possible values in this array range from 0 to 3 and mean the following:
 *   0 = Maneuver unavailable   (-)
 *   1 = White maneuver         (W)
 *   2 = Green maneuver         (G)
 *   3 = Red maneuver           (R)
 * 
 * This array may be as short as required to provide accurate data, meaning
 * that a missing value for a particular maneuver type indicates that said
 * maneuver is not available to that particular ship at that particular speed.
 *
 * Legend: All 0 are "Unavailable" and denoted with a -
 * [
 *    [ 0, 0, 0, 0, 0, 0 ], // Speed 0: -   , -   , -   , -   , -   , -
 *    [ 0, 2, 2, 2, 0, 0 ], // Speed 1: -   , GLB , GST , GRB , -   , -
 *    [ 1, 1, 2, 1, 1, 0 ], // Speed 2: WLT , WLB , GST , WRB , WRT , -
 *    [ 1, 1, 1, 1, 1, 0 ], // Speed 3: WLT , WLB , WST , WRB , WRT , -
 *    [ 0, 0, 1, 0, 0, 3 ]  // Speed 4: -   , -   , WST , -   , -   , RKT
 * ]
 */

// I need this so I can use the map method easier
const speeds = [ 0, 1, 2, 3, 4, 5 ]

const colors = [
 'Unavailable',           // 0
 'White',                 // 1
 'Green',                 // 2
 'Red'                    // 3
]
 
const directions = [
  'Left Turn',            // 0
  'Left Bank',            // 1
  'Straight',             // 2
  'Right Bank',           // 3
  'Right Turn',           // 4
  'Koiogran Turn',        // 5
  'Segnor\'s Loop Left',  // 6
  'Segnor\'s Loop Right', // 7
  'Tallon Roll Left',     // 8
  'Tallon Roll Right',    // 9
  'Backwards Left Bank',  // 10
  'Backwards Straight',   // 11
  'Backwards Right Bank'  // 12
]

/**
 * Creates a maneuver object
 * @param  {number} speed    speed index
 * @param  {number} color    color index
 * @param  {number} maneuver maneuver index
 * @return {object}          maneuver object
 */
const as_maneuver = (speed, color_index, direction_index) => {
  const color = colors[color_index]
  const direction = directions[direction_index]
  
  return transform({
    name: `${speed} ${color} ${direction}`,
    speed,
    color,
    color_index,
    direction,
    direction_index
  }, 'ma')
}

const create_maneuvers = () => {
  let queries = []
  
  speeds.forEach( speed => {
    colors.forEach((c, c_ix) => {
      if ( c_ix > 0 ) {
        queries = queries.concat( directions.map( (d, d_ix) => create_query(
          'Maneuver',
          as_maneuver(speed, c_ix, d_ix)
        )))
      }
    })
  })
  
  return queries
}

export {
  as_maneuver,
  create_maneuvers
}