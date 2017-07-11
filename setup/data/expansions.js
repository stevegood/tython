const expansions = [{
  name: 'Core Set',
  pilots: [{
    name: 'Luke Skywalker',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Biggs Darklighter',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Red Squadron Pilot',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Rookie Pilot',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: '"Mauler Mithel"',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: '"Dark Curse"',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: '"Night Beast"',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: 'Black Squadron Pilot',
    faction: 'Galactic Empire',
    qty: 2
  }, {
    name: 'Obsidian Squadron Pilot',
    faction: 'Galactic Empire',
    qty: 2
  }, {
    name: 'Academy Pilot',
    faction: 'Galactic Empire',
    qty: 2
  }],
  upgrades: [, {
    name: 'Determination',
    qty: 1
  }, {
    name: 'Marksmanship',
    qty: 1
  }, {
    name: 'R2-D2',
    qty: 1
  }, {
    name: 'R2-F2',
    qty: 1
  }, {
    name: 'Proton Torpedoes',
    qty: 1
  }],
  ships: [{
    name: 'X-Wing',
    qty: 1
  }, {
    name: 'TIE Fighter',
    qty: 2
  }]
}, {
  name: 'The Force Awakens Core Set',
  pilots: [{
    name: 'Poe Dameron',
    faction: 'Resistance',
    qty: 1
  }, {
    name: '"Blue Ace"',
    faction: 'Resistance',
    qty: 1
  }, {
    name: 'Red Squadron Veteran',
    faction: 'Resistance',
    qty: 1
  }, {
    name: 'Blue Squadron Novice',
    faction: 'Resistance',
    qty: 1
  }, {
    name: '"Omega Ace"',
    faction: 'First Order',
    qty: 1
  }, {
    name: '"Epsilon Leader"',
    faction: 'First Order',
    qty: 1
  }, {
    name: '"Zeta Ace"',
    faction: 'First Order',
    qty: 1
  }, {
    name: 'Omega Squadron Pilot',
    faction: 'First Order',
    qty: 2
  }, {
    name: 'Zeta Squadron Pilot',
    faction: 'First Order',
    qty: 2
  }, {
    name: 'Epsilon Squadron Pilot',
    faction: 'First Order',
    qty: 2
  }],
  upgrades: [{
    name: 'BB-8',
    qty: 1
  }, {
    name: 'R5-X3',
    qty: 1
  }, {
    name: 'Wired',
    qty: 1
  }, {
    name: 'Weapons Guidance',
    qty: 1
  }, {
    name: 'Proton Torpedos',
    qty: 1
  }],
  ships: [{
    name: 'T-70 X-Wing',
    qty: 1
  }, {
    name: 'TIE/fo Fighter',
    qty: 2
  }]
}, {
  name: 'X-Wing',
  wave: 'I',
  ships: [{
    name: 'X-Wing',
    qty: 1
  }],
  pilots: [{
    name: 'Wedge Antilles',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Garven Dreis',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Red Squadron Pilot',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Rookie Pilot',
    faction: 'Rebel Alliance',
    qty: 1
  }],
  upgrades: [{
    name: 'Expert Handling',
    qty: 1
  }, {
    name: 'Marksmanship',
    qty: 1
  }, {
    name: 'R5 Astromech',
    qty: 1
  }, {
    name: 'R5-K6',
    qty: 1
  }, {
    name: 'Proton Torpedos',
    qty: 1
  }]
}, {
  name: 'TIE Fighter',
  wave: 'I',
  ships: [{
    name: 'TIE Fighter',
    qty: 1
  }],
  pilots: [{
    name: '"Howlrunner"',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: '"Backstabber"',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: '"Winged Gundark"',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: 'Black Squadron Pilot',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: 'Obsidian Squadron Pilot',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: 'Academy Pilot',
    faction: 'Galactic Empire',
    qty: 1
  }],
  upgrades: [{
    name: 'Determination',
    qty: 1
  }, {
    name: 'Swarm Tactics',
    qty: 1
  }]
}, {
  name: 'Y-Wing',
  wave: 'I',
  ships: [{
    name: 'Y-Wing',
    qty: 1
  }],
  pilots: [{
    name: 'Horton Salm',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: '"Dutch" Vander',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Gray Squadron Pilot',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Gold Squadron Pilot',
    faction: 'Rebel Alliance',
    qty: 1
  }],
  upgrades: [{
    name: 'R2 Astromech',
    qty: 1
  }, {
    name: 'R5-D8',
    qty: 1
  }, {
    name: 'Proton Torpedoes',
    qty: 2
  }, {
    name: 'Ion Cannon Turret',
    qty: 1
  }]
}, {
  name: 'TIE Advanced',
  wave: 'I',
  ships: [{
    name: 'TIE Advanced',
    qty: 1
  }],
  pilots: [{
    name: 'Darth Vader',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: 'Maarek Stele',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: 'Storm Squadron Pilot',
    faction: 'Galactic Empire',
    qty: 1
  }, {
    name: 'Tempest Squadron Pilot',
    faction: 'Galactic Empire',
    qty: 1
  }],
  upgrades: [{
    name: 'Squad Leader',
    qty: 1
  }, {
    name: 'Expert Handling',
    qty: 1
  }, {
    name: 'Swarm Tactics',
    qty: 1
  }, {
    name: 'Cluster Missiles',
    qty: 1
  }, {
    name: 'Concussion Missiles',
    qty: 1
  }]
}, {
  name: 'Millennium Falcon',
  wave: 'II',
  ships: [{
    name: 'YT-1300',
    qty: 1
  }],
  pilots: [{
    name: 'Han Solo',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Lando Calrissian',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Chewbacca',
    faction: 'Rebel Alliance',
    qty: 1
  }, {
    name: 'Outer Rim Smuggler',
    faction: 'Rebel Alliance',
    qty: 1
  }],
  upgrades: [{
    name: 'Draw Their Fire',
    qty: 1
  }, {
    name: 'Elusiveness',
    qty: 1
  }, {
    name: 'Veteran Instincts',
    qty: 1
  }, {
    name: 'Assault Missiles',
    qty: 1
  }, {
    name: 'Concussion Missiles',
    qty: 1
  }, {
    name: 'Chewbacca',
    qty: 1
  }, {
    name: 'Luke Skywalker',
    qty: 1
  }, {
    name: 'Nien Nunb',
    qty: 1
  }, {
    name: 'Weapons Engineer',
    qty: 1
  }, {
    name: 'Millennium Falcon',
    qty: 1
  }, {
    name: 'Engine Upgrade',
    qty: 2
  }, {
    name: 'Shield Upgrade',
    qty: 2
  }]
}, {
  name: 'Punishing One',
  wave: 'VIII',
  pilots: [{
    name:'Dengar',
    faction: 'Scum and Villainy',
    qty: 1
  }, {
    name: 'Tel Trevura',
    faction: 'Scum and Villainy',
    qty: 1
  }, {
    name: 'Manaroo',
    faction: 'Scum and Villainy',
    qty: 1
  }, {
    name: 'Contracted Scout',
    faction: 'Scum and Villainy',
    qty: 1
  }],
  ships: [{
    name: 'JumpMaster 5000',
    qty: 1
  }],
  upgrades: [{
    name: 'Rage',
    qty: 1
  }, {
    name: 'Attanni Mindlink',
    qty: 2
  }, {
    name: 'Plasma Torpedoes',
    qty: 1
  }, {
    name: '"Gonk"',
    qty: 1
  }, {
    name: 'Boba Fett',
    qty: 1
  }, {
    name: 'Dengar',
    qty: 1
  }, {
    name: 'R5-P8',
    qty: 1
  }, {
    name: 'Overclocked R4',
    qty: 2
  }, {
    name: 'Punishing One',
    qty: 1
  }, {
    name: 'Guidance Chips',
    qty: 2
  }, {
    name: 'Feedback Array',
    qty: 1
  }]
}]

export default expansions