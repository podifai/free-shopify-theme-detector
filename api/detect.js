const axios = require('axios');
const cheerio = require('cheerio');

class ShopifyThemeDetectorV2 {
  constructor() {
    this.themeFingerprints = {
      // Abode (ID: 1918)
      'Abode': {
        css: [
          'abode-theme',
          'abode__',
          'abode-',
          'abode-header',
          'abode'
        ],
        js: [
          'abode.js',
          'abode.theme.js',
          'abode.js'
        ],
        html: [
          '"Abode"',
          'abode-theme',
          'data-abode',
          'data-abode'
        ],
        paths: [
          '/assets/abode',
          '/assets/abode'
        ]
      },

      // Aesthetic (ID: 2514)
      'Aesthetic': {
        css: [
          'aesthetic-theme',
          'aesthetic__',
          'aesthetic-',
          'aesthetic-header',
          'aesthetic'
        ],
        js: [
          'aesthetic.js',
          'aesthetic.theme.js',
          'aesthetic.js'
        ],
        html: [
          '"Aesthetic"',
          'aesthetic-theme',
          'data-aesthetic',
          'data-aesthetic'
        ],
        paths: [
          '/assets/aesthetic',
          '/assets/aesthetic'
        ]
      },

      // Agile (ID: 2346)
      'Agile': {
        css: [
          'agile-theme',
          'agile__',
          'agile-',
          'agile-header',
          'agile'
        ],
        js: [
          'agile.js',
          'agile.theme.js',
          'agile.js'
        ],
        html: [
          '"Agile"',
          'agile-theme',
          'data-agile',
          'data-agile'
        ],
        paths: [
          '/assets/agile',
          '/assets/agile'
        ]
      },

      // Aisle (ID: 2378)
      'Aisle': {
        css: [
          'aisle-theme',
          'aisle__',
          'aisle-',
          'aisle-header',
          'aisle'
        ],
        js: [
          'aisle.js',
          'aisle.theme.js',
          'aisle.js'
        ],
        html: [
          '"Aisle"',
          'aisle-theme',
          'data-aisle',
          'data-aisle'
        ],
        paths: [
          '/assets/aisle',
          '/assets/aisle'
        ]
      },

      // Alchemy (ID: 657)
      'Alchemy': {
        css: [
          'alchemy-theme',
          'alchemy__',
          'alchemy-',
          'alchemy-header',
          'alchemy'
        ],
        js: [
          'alchemy.js',
          'alchemy.theme.js',
          'alchemy.js'
        ],
        html: [
          '"Alchemy"',
          'alchemy-theme',
          'data-alchemy',
          'data-alchemy'
        ],
        paths: [
          '/assets/alchemy',
          '/assets/alchemy'
        ]
      },

      // Align (ID: 1966)
      'Align': {
        css: [
          'align-theme',
          'align__',
          'align-',
          'align-header',
          'align'
        ],
        js: [
          'align.js',
          'align.theme.js',
          'align.js'
        ],
        html: [
          '"Align"',
          'align-theme',
          'data-align',
          'data-align'
        ],
        paths: [
          '/assets/align',
          '/assets/align'
        ]
      },

      // Amber (ID: 2217)
      'Amber': {
        css: [
          'amber-theme',
          'amber__',
          'amber-',
          'amber-header',
          'amber'
        ],
        js: [
          'amber.js',
          'amber.theme.js',
          'amber.js'
        ],
        html: [
          '"Amber"',
          'amber-theme',
          'data-amber',
          'data-amber'
        ],
        paths: [
          '/assets/amber',
          '/assets/amber'
        ]
      },

      // Andaman (ID: 1390)
      'Andaman': {
        css: [
          'andaman-theme',
          'andaman__',
          'andaman-',
          'andaman-header',
          'andaman'
        ],
        js: [
          'andaman.js',
          'andaman.theme.js',
          'andaman.js'
        ],
        html: [
          '"Andaman"',
          'andaman-theme',
          'data-andaman',
          'data-andaman'
        ],
        paths: [
          '/assets/andaman',
          '/assets/andaman'
        ]
      },

      // Area (ID: 2436)
      'Area': {
        css: [
          'area-theme',
          'area__',
          'area-',
          'area-header',
          'area'
        ],
        js: [
          'area.js',
          'area.theme.js',
          'area.js'
        ],
        html: [
          '"Area"',
          'area-theme',
          'data-area',
          'data-area'
        ],
        paths: [
          '/assets/area',
          '/assets/area'
        ]
      },

      // Artisan (ID: 856)
      'Artisan': {
        css: [
          'artisan-theme',
          'artisan__',
          'artisan-',
          'artisan-header',
          'artisan'
        ],
        js: [
          'artisan.js',
          'artisan.theme.js',
          'artisan.js'
        ],
        html: [
          '"Artisan"',
          'artisan-theme',
          'data-artisan',
          'data-artisan'
        ],
        paths: [
          '/assets/artisan',
          '/assets/artisan'
        ]
      },

      // Artist (ID: 2277)
      'Artist': {
        css: [
          'artist-theme',
          'artist__',
          'artist-',
          'artist-header',
          'artist'
        ],
        js: [
          'artist.js',
          'artist.theme.js',
          'artist.js'
        ],
        html: [
          '"Artist"',
          'artist-theme',
          'data-artist',
          'data-artist'
        ],
        paths: [
          '/assets/artist',
          '/assets/artist'
        ]
      },

      // Ascension (ID: 3223)
      'Ascension': {
        css: [
          'ascension-theme',
          'ascension__',
          'ascension-',
          'ascension-header',
          'ascension'
        ],
        js: [
          'ascension.js',
          'ascension.theme.js',
          'ascension.js'
        ],
        html: [
          '"Ascension"',
          'ascension-theme',
          'data-ascension',
          'data-ascension'
        ],
        paths: [
          '/assets/ascension',
          '/assets/ascension'
        ]
      },

      // Ascent (ID: 2989)
      'Ascent': {
        css: [
          'ascent-theme',
          'ascent__',
          'ascent-',
          'ascent-header',
          'ascent'
        ],
        js: [
          'ascent.js',
          'ascent.theme.js',
          'ascent.js'
        ],
        html: [
          '"Ascent"',
          'ascent-theme',
          'data-ascent',
          'data-ascent'
        ],
        paths: [
          '/assets/ascent',
          '/assets/ascent'
        ]
      },

      // Atelier (ID: 3621)
      'Atelier': {
        css: [
          'atelier-theme',
          'atelier__',
          'atelier-',
          'atelier-header',
          'atelier'
        ],
        js: [
          'atelier.js',
          'atelier.theme.js',
          'atelier.js'
        ],
        html: [
          '"Atelier"',
          'atelier-theme',
          'data-atelier',
          'data-atelier'
        ],
        paths: [
          '/assets/atelier',
          '/assets/atelier'
        ]
      },

      // Athens (ID: 1608)
      'Athens': {
        css: [
          'athens-theme',
          'athens__',
          'athens-',
          'athens-header',
          'athens'
        ],
        js: [
          'athens.js',
          'athens.theme.js',
          'athens.js'
        ],
        html: [
          '"Athens"',
          'athens-theme',
          'data-athens',
          'data-athens'
        ],
        paths: [
          '/assets/athens',
          '/assets/athens'
        ]
      },

      // Atlantic (ID: 566)
      'Atlantic': {
        css: [
          'atlantic-theme',
          'atlantic__',
          'atlantic-',
          'atlantic-header',
          'atlantic'
        ],
        js: [
          'atlantic.js',
          'atlantic.theme.js',
          'atlantic.js'
        ],
        html: [
          '"Atlantic"',
          'atlantic-theme',
          'data-atlantic',
          'data-atlantic'
        ],
        paths: [
          '/assets/atlantic',
          '/assets/atlantic'
        ]
      },

      // Atom (ID: 1974)
      'Atom': {
        css: [
          'atom-theme',
          'atom__',
          'atom-',
          'atom-header',
          'atom'
        ],
        js: [
          'atom.js',
          'atom.theme.js',
          'atom.js'
        ],
        html: [
          '"Atom"',
          'atom-theme',
          'data-atom',
          'data-atom'
        ],
        paths: [
          '/assets/atom',
          '/assets/atom'
        ]
      },

      // Aurora (ID: 1770)
      'Aurora': {
        css: [
          'aurora-theme',
          'aurora__',
          'aurora-',
          'aurora-header',
          'aurora'
        ],
        js: [
          'aurora.js',
          'aurora.theme.js',
          'aurora.js'
        ],
        html: [
          '"Aurora"',
          'aurora-theme',
          'data-aurora',
          'data-aurora'
        ],
        paths: [
          '/assets/aurora',
          '/assets/aurora'
        ]
      },

      // Automation (ID: 1664)
      'Automation': {
        css: [
          'automation-theme',
          'automation__',
          'automation-',
          'automation-header',
          'automation'
        ],
        js: [
          'automation.js',
          'automation.theme.js',
          'automation.js'
        ],
        html: [
          '"Automation"',
          'automation-theme',
          'data-automation',
          'data-automation'
        ],
        paths: [
          '/assets/automation',
          '/assets/automation'
        ]
      },

      // Avante (ID: 1667)
      'Avante': {
        css: [
          'avante-theme',
          'avante__',
          'avante-',
          'avante-header',
          'avante'
        ],
        js: [
          'avante.js',
          'avante.theme.js',
          'avante.js'
        ],
        html: [
          '"Avante"',
          'avante-theme',
          'data-avante',
          'data-avante'
        ],
        paths: [
          '/assets/avante',
          '/assets/avante'
        ]
      },

      // Avatar (ID: 909)
      'Avatar': {
        css: [
          'avatar-theme',
          'avatar__',
          'avatar-',
          'avatar-header',
          'avatar'
        ],
        js: [
          'avatar.js',
          'avatar.theme.js',
          'avatar.js'
        ],
        html: [
          '"Avatar"',
          'avatar-theme',
          'data-avatar',
          'data-avatar'
        ],
        paths: [
          '/assets/avatar',
          '/assets/avatar'
        ]
      },

      // Avenue (ID: 865)
      'Avenue': {
        css: [
          'avenue-theme',
          'avenue__',
          'avenue-',
          'avenue-header',
          'avenue'
        ],
        js: [
          'avenue.js',
          'avenue.theme.js',
          'avenue.js'
        ],
        html: [
          '"Avenue"',
          'avenue-theme',
          'data-avenue',
          'data-avenue'
        ],
        paths: [
          '/assets/avenue',
          '/assets/avenue'
        ]
      },

      // Azzel (ID: 3107)
      'Azzel': {
        css: [
          'azzel-theme',
          'azzel__',
          'azzel-',
          'azzel-header',
          'azzel'
        ],
        js: [
          'azzel.js',
          'azzel.theme.js',
          'azzel.js'
        ],
        html: [
          '"Azzel"',
          'azzel-theme',
          'data-azzel',
          'data-azzel'
        ],
        paths: [
          '/assets/azzel',
          '/assets/azzel'
        ]
      },

      // Banjo (ID: 1967)
      'Banjo': {
        css: [
          'banjo-theme',
          'banjo__',
          'banjo-',
          'banjo-header',
          'banjo'
        ],
        js: [
          'banjo.js',
          'banjo.theme.js',
          'banjo.js'
        ],
        html: [
          '"Banjo"',
          'banjo-theme',
          'data-banjo',
          'data-banjo'
        ],
        paths: [
          '/assets/banjo',
          '/assets/banjo'
        ]
      },

      // Barcelona (ID: 2324)
      'Barcelona': {
        css: [
          'barcelona-theme',
          'barcelona__',
          'barcelona-',
          'barcelona-header',
          'barcelona'
        ],
        js: [
          'barcelona.js',
          'barcelona.theme.js',
          'barcelona.js'
        ],
        html: [
          '"Barcelona"',
          'barcelona-theme',
          'data-barcelona',
          'data-barcelona'
        ],
        paths: [
          '/assets/barcelona',
          '/assets/barcelona'
        ]
      },

      // Baseline (ID: 910)
      'Baseline': {
        css: [
          'baseline-theme',
          'baseline__',
          'baseline-',
          'baseline-header',
          'baseline'
        ],
        js: [
          'baseline.js',
          'baseline.theme.js',
          'baseline.js'
        ],
        html: [
          '"Baseline"',
          'baseline-theme',
          'data-baseline',
          'data-baseline'
        ],
        paths: [
          '/assets/baseline',
          '/assets/baseline'
        ]
      },

      // Bazaar (ID: 1448)
      'Bazaar': {
        css: [
          'bazaar-theme',
          'bazaar__',
          'bazaar-',
          'bazaar-header',
          'bazaar'
        ],
        js: [
          'bazaar.js',
          'bazaar.theme.js',
          'bazaar.js'
        ],
        html: [
          '"Bazaar"',
          'bazaar-theme',
          'data-bazaar',
          'data-bazaar'
        ],
        paths: [
          '/assets/bazaar',
          '/assets/bazaar'
        ]
      },

      // Be Yours (ID: 1399)
      'Be Yours': {
        css: [
          'be-yours-theme',
          'be-yours__',
          'be-yours-',
          'be-yours-header',
          'beyours'
        ],
        js: [
          'be-yours.js',
          'be-yours.theme.js',
          'beyours.js'
        ],
        html: [
          '"Be Yours"',
          'be-yours-theme',
          'data-be-yours',
          'data-beyours'
        ],
        paths: [
          '/assets/be-yours',
          '/assets/beyours'
        ]
      },

      // Berlin (ID: 2138)
      'Berlin': {
        css: [
          'berlin-theme',
          'berlin__',
          'berlin-',
          'berlin-header',
          'berlin'
        ],
        js: [
          'berlin.js',
          'berlin.theme.js',
          'berlin.js'
        ],
        html: [
          '"Berlin"',
          'berlin-theme',
          'data-berlin',
          'data-berlin'
        ],
        paths: [
          '/assets/berlin',
          '/assets/berlin'
        ]
      },

      // Bespoke (ID: 2732)
      'Bespoke': {
        css: [
          'bespoke-theme',
          'bespoke__',
          'bespoke-',
          'bespoke-header',
          'bespoke'
        ],
        js: [
          'bespoke.js',
          'bespoke.theme.js',
          'bespoke.js'
        ],
        html: [
          '"Bespoke"',
          'bespoke-theme',
          'data-bespoke',
          'data-bespoke'
        ],
        paths: [
          '/assets/bespoke',
          '/assets/bespoke'
        ]
      },

      // Beyond (ID: 939)
      'Beyond': {
        css: [
          'beyond-theme',
          'beyond__',
          'beyond-',
          'beyond-header',
          'beyond'
        ],
        js: [
          'beyond.js',
          'beyond.theme.js',
          'beyond.js'
        ],
        html: [
          '"Beyond"',
          'beyond-theme',
          'data-beyond',
          'data-beyond'
        ],
        paths: [
          '/assets/beyond',
          '/assets/beyond'
        ]
      },

      // Blockshop (ID: 606)
      'Blockshop': {
        css: [
          'blockshop-theme',
          'blockshop__',
          'blockshop-',
          'blockshop-header',
          'blockshop'
        ],
        js: [
          'blockshop.js',
          'blockshop.theme.js',
          'blockshop.js'
        ],
        html: [
          '"Blockshop"',
          'blockshop-theme',
          'data-blockshop',
          'data-blockshop'
        ],
        paths: [
          '/assets/blockshop',
          '/assets/blockshop'
        ]
      },

      // Blum (ID: 1839)
      'Blum': {
        css: [
          'blum-theme',
          'blum__',
          'blum-',
          'blum-header',
          'blum'
        ],
        js: [
          'blum.js',
          'blum.theme.js',
          'blum.js'
        ],
        html: [
          '"Blum"',
          'blum-theme',
          'data-blum',
          'data-blum'
        ],
        paths: [
          '/assets/blum',
          '/assets/blum'
        ]
      },

      // Boost (ID: 863)
      'Boost': {
        css: [
          'boost-theme',
          'boost__',
          'boost-',
          'boost-header',
          'boost'
        ],
        js: [
          'boost.js',
          'boost.theme.js',
          'boost.js'
        ],
        html: [
          '"Boost"',
          'boost-theme',
          'data-boost',
          'data-boost'
        ],
        paths: [
          '/assets/boost',
          '/assets/boost'
        ]
      },

      // Borders (ID: 2491)
      'Borders': {
        css: [
          'borders-theme',
          'borders__',
          'borders-',
          'borders-header',
          'borders'
        ],
        js: [
          'borders.js',
          'borders.theme.js',
          'borders.js'
        ],
        html: [
          '"Borders"',
          'borders-theme',
          'data-borders',
          'data-borders'
        ],
        paths: [
          '/assets/borders',
          '/assets/borders'
        ]
      },

      // Boundless (ID: 766)
      'Boundless': {
        css: [
          'boundless-theme',
          'boundless__',
          'boundless-',
          'boundless-header',
          'boundless'
        ],
        js: [
          'boundless.js',
          'boundless.theme.js',
          'boundless.js'
        ],
        html: [
          '"Boundless"',
          'boundless-theme',
          'data-boundless',
          'data-boundless'
        ],
        paths: [
          '/assets/boundless',
          '/assets/boundless'
        ]
      },

      // Boutique (ID: 3051)
      'Boutique': {
        css: [
          'boutique-theme',
          'boutique__',
          'boutique-',
          'boutique-header',
          'boutique'
        ],
        js: [
          'boutique.js',
          'boutique.theme.js',
          'boutique.js'
        ],
        html: [
          '"Boutique"',
          'boutique-theme',
          'data-boutique',
          'data-boutique'
        ],
        paths: [
          '/assets/boutique',
          '/assets/boutique'
        ]
      },

      // Brava (ID: 2148)
      'Brava': {
        css: [
          'brava-theme',
          'brava__',
          'brava-',
          'brava-header',
          'brava'
        ],
        js: [
          'brava.js',
          'brava.theme.js',
          'brava.js'
        ],
        html: [
          '"Brava"',
          'brava-theme',
          'data-brava',
          'data-brava'
        ],
        paths: [
          '/assets/brava',
          '/assets/brava'
        ]
      },

      // Broadcast (ID: 868)
      'Broadcast': {
        css: [
          'broadcast-theme',
          'broadcast__',
          'broadcast-',
          'broadcast-header',
          'broadcast'
        ],
        js: [
          'broadcast.js',
          'broadcast.theme.js',
          'broadcast.js'
        ],
        html: [
          '"Broadcast"',
          'broadcast-theme',
          'data-broadcast',
          'data-broadcast'
        ],
        paths: [
          '/assets/broadcast',
          '/assets/broadcast'
        ]
      },

      // Brooklyn (ID: 730)
      'Brooklyn': {
        css: [
          'brooklyn-theme',
          'brooklyn__',
          'brooklyn-',
          'brooklyn-header',
          'brooklyn'
        ],
        js: [
          'brooklyn.js',
          'brooklyn.theme.js',
          'brooklyn.js'
        ],
        html: [
          '"Brooklyn"',
          'brooklyn-theme',
          'data-brooklyn',
          'data-brooklyn'
        ],
        paths: [
          '/assets/brooklyn',
          '/assets/brooklyn'
        ]
      },

      // Bullet (ID: 1114)
      'Bullet': {
        css: [
          'bullet-theme',
          'bullet__',
          'bullet-',
          'bullet-header',
          'bullet'
        ],
        js: [
          'bullet.js',
          'bullet.theme.js',
          'bullet.js'
        ],
        html: [
          '"Bullet"',
          'bullet-theme',
          'data-bullet',
          'data-bullet'
        ],
        paths: [
          '/assets/bullet',
          '/assets/bullet'
        ]
      },

      // California (ID: 691)
      'California': {
        css: [
          'california-theme',
          'california__',
          'california-',
          'california-header',
          'california'
        ],
        js: [
          'california.js',
          'california.theme.js',
          'california.js'
        ],
        html: [
          '"California"',
          'california-theme',
          'data-california',
          'data-california'
        ],
        paths: [
          '/assets/california',
          '/assets/california'
        ]
      },

      // Cama (ID: 2204)
      'Cama': {
        css: [
          'cama-theme',
          'cama__',
          'cama-',
          'cama-header',
          'cama'
        ],
        js: [
          'cama.js',
          'cama.theme.js',
          'cama.js'
        ],
        html: [
          '"Cama"',
          'cama-theme',
          'data-cama',
          'data-cama'
        ],
        paths: [
          '/assets/cama',
          '/assets/cama'
        ]
      },

      // Canopy (ID: 732)
      'Canopy': {
        css: [
          'canopy-theme',
          'canopy__',
          'canopy-',
          'canopy-header',
          'canopy'
        ],
        js: [
          'canopy.js',
          'canopy.theme.js',
          'canopy.js'
        ],
        html: [
          '"Canopy"',
          'canopy-theme',
          'data-canopy',
          'data-canopy'
        ],
        paths: [
          '/assets/canopy',
          '/assets/canopy'
        ]
      },

      // Capital (ID: 812)
      'Capital': {
        css: [
          'capital-theme',
          'capital__',
          'capital-',
          'capital-header',
          'capital'
        ],
        js: [
          'capital.js',
          'capital.theme.js',
          'capital.js'
        ],
        html: [
          '"Capital"',
          'capital-theme',
          'data-capital',
          'data-capital'
        ],
        paths: [
          '/assets/capital',
          '/assets/capital'
        ]
      },

      // Carbon (ID: 1985)
      'Carbon': {
        css: [
          'carbon-theme',
          'carbon__',
          'carbon-',
          'carbon-header',
          'carbon'
        ],
        js: [
          'carbon.js',
          'carbon.theme.js',
          'carbon.js'
        ],
        html: [
          '"Carbon"',
          'carbon-theme',
          'data-carbon',
          'data-carbon'
        ],
        paths: [
          '/assets/carbon',
          '/assets/carbon'
        ]
      },

      // Cascade (ID: 859)
      'Cascade': {
        css: [
          'cascade-theme',
          'cascade__',
          'cascade-',
          'cascade-header',
          'cascade'
        ],
        js: [
          'cascade.js',
          'cascade.theme.js',
          'cascade.js'
        ],
        html: [
          '"Cascade"',
          'cascade-theme',
          'data-cascade',
          'data-cascade'
        ],
        paths: [
          '/assets/cascade',
          '/assets/cascade'
        ]
      },

      // Cello (ID: 2328)
      'Cello': {
        css: [
          'cello-theme',
          'cello__',
          'cello-',
          'cello-header',
          'cello'
        ],
        js: [
          'cello.js',
          'cello.theme.js',
          'cello.js'
        ],
        html: [
          '"Cello"',
          'cello-theme',
          'data-cello',
          'data-cello'
        ],
        paths: [
          '/assets/cello',
          '/assets/cello'
        ]
      },

      // Champion (ID: 2010)
      'Champion': {
        css: [
          'champion-theme',
          'champion__',
          'champion-',
          'champion-header',
          'champion'
        ],
        js: [
          'champion.js',
          'champion.theme.js',
          'champion.js'
        ],
        html: [
          '"Champion"',
          'champion-theme',
          'data-champion',
          'data-champion'
        ],
        paths: [
          '/assets/champion',
          '/assets/champion'
        ]
      },

      // Charge (ID: 2063)
      'Charge': {
        css: [
          'charge-theme',
          'charge__',
          'charge-',
          'charge-header',
          'charge'
        ],
        js: [
          'charge.js',
          'charge.theme.js',
          'charge.js'
        ],
        html: [
          '"Charge"',
          'charge-theme',
          'data-charge',
          'data-charge'
        ],
        paths: [
          '/assets/charge',
          '/assets/charge'
        ]
      },

      // Charm (ID: 3312)
      'Charm': {
        css: [
          'charm-theme',
          'charm__',
          'charm-',
          'charm-header',
          'charm'
        ],
        js: [
          'charm.js',
          'charm.theme.js',
          'charm.js'
        ],
        html: [
          '"Charm"',
          'charm-theme',
          'data-charm',
          'data-charm'
        ],
        paths: [
          '/assets/charm',
          '/assets/charm'
        ]
      },

      // Chord (ID: 1584)
      'Chord': {
        css: [
          'chord-theme',
          'chord__',
          'chord-',
          'chord-header',
          'chord'
        ],
        js: [
          'chord.js',
          'chord.theme.js',
          'chord.js'
        ],
        html: [
          '"Chord"',
          'chord-theme',
          'data-chord',
          'data-chord'
        ],
        paths: [
          '/assets/chord',
          '/assets/chord'
        ]
      },

      // Colorblock (ID: 1499)
      'Colorblock': {
        css: [
          'colorblock-theme',
          'colorblock__',
          'colorblock-',
          'colorblock-header',
          'colorblock'
        ],
        js: [
          'colorblock.js',
          'colorblock.theme.js',
          'colorblock.js'
        ],
        html: [
          '"Colorblock"',
          'colorblock-theme',
          'data-colorblock',
          'data-colorblock'
        ],
        paths: [
          '/assets/colorblock',
          '/assets/colorblock'
        ]
      },

      // Colors (ID: 757)
      'Colors': {
        css: [
          'colors-theme',
          'colors__',
          'colors-',
          'colors-header',
          'colors'
        ],
        js: [
          'colors.js',
          'colors.theme.js',
          'colors.js'
        ],
        html: [
          '"Colors"',
          'colors-theme',
          'data-colors',
          'data-colors'
        ],
        paths: [
          '/assets/colors',
          '/assets/colors'
        ]
      },

      // Combine (ID: 1826)
      'Combine': {
        css: [
          'combine-theme',
          'combine__',
          'combine-',
          'combine-header',
          'combine'
        ],
        js: [
          'combine.js',
          'combine.theme.js',
          'combine.js'
        ],
        html: [
          '"Combine"',
          'combine-theme',
          'data-combine',
          'data-combine'
        ],
        paths: [
          '/assets/combine',
          '/assets/combine'
        ]
      },

      // Concept (ID: 2412)
      'Concept': {
        css: [
          'concept-theme',
          'concept__',
          'concept-',
          'concept-header',
          'concept'
        ],
        js: [
          'concept.js',
          'concept.theme.js',
          'concept.js'
        ],
        html: [
          '"Concept"',
          'concept-theme',
          'data-concept',
          'data-concept'
        ],
        paths: [
          '/assets/concept',
          '/assets/concept'
        ]
      },

      // Context (ID: 870)
      'Context': {
        css: [
          'context-theme',
          'context__',
          'context-',
          'context-header',
          'context'
        ],
        js: [
          'context.js',
          'context.theme.js',
          'context.js'
        ],
        html: [
          '"Context"',
          'context-theme',
          'data-context',
          'data-context'
        ],
        paths: [
          '/assets/context',
          '/assets/context'
        ]
      },

      // Copenhagen (ID: 2564)
      'Copenhagen': {
        css: [
          'copenhagen-theme',
          'copenhagen__',
          'copenhagen-',
          'copenhagen-header',
          'copenhagen'
        ],
        js: [
          'copenhagen.js',
          'copenhagen.theme.js',
          'copenhagen.js'
        ],
        html: [
          '"Copenhagen"',
          'copenhagen-theme',
          'data-copenhagen',
          'data-copenhagen'
        ],
        paths: [
          '/assets/copenhagen',
          '/assets/copenhagen'
        ]
      },

      // Cornerstone (ID: 2348)
      'Cornerstone': {
        css: [
          'cornerstone-theme',
          'cornerstone__',
          'cornerstone-',
          'cornerstone-header',
          'cornerstone'
        ],
        js: [
          'cornerstone.js',
          'cornerstone.theme.js',
          'cornerstone.js'
        ],
        html: [
          '"Cornerstone"',
          'cornerstone-theme',
          'data-cornerstone',
          'data-cornerstone'
        ],
        paths: [
          '/assets/cornerstone',
          '/assets/cornerstone'
        ]
      },

      // Craft (ID: 1368)
      'Craft': {
        css: [
          'craft-theme',
          'craft__',
          'craft-',
          'craft-header',
          'craft'
        ],
        js: [
          'craft.js',
          'craft.theme.js',
          'craft.js'
        ],
        html: [
          '"Craft"',
          'craft-theme',
          'data-craft',
          'data-craft'
        ],
        paths: [
          '/assets/craft',
          '/assets/craft'
        ]
      },

      // Crave (ID: 1363)
      'Crave': {
        css: [
          'crave-theme',
          'crave__',
          'crave-',
          'crave-header',
          'crave'
        ],
        js: [
          'crave.js',
          'crave.theme.js',
          'crave.js'
        ],
        html: [
          '"Crave"',
          'crave-theme',
          'data-crave',
          'data-crave'
        ],
        paths: [
          '/assets/crave',
          '/assets/crave'
        ]
      },

      // Creative (ID: 1829)
      'Creative': {
        css: [
          'creative-theme',
          'creative__',
          'creative-',
          'creative-header',
          'creative'
        ],
        js: [
          'creative.js',
          'creative.theme.js',
          'creative.js'
        ],
        html: [
          '"Creative"',
          'creative-theme',
          'data-creative',
          'data-creative'
        ],
        paths: [
          '/assets/creative',
          '/assets/creative'
        ]
      },

      // Creator (ID: 1922)
      'Creator': {
        css: [
          'creator-theme',
          'creator__',
          'creator-',
          'creator-header',
          'creator'
        ],
        js: [
          'creator.js',
          'creator.theme.js',
          'creator.js'
        ],
        html: [
          '"Creator"',
          'creator-theme',
          'data-creator',
          'data-creator'
        ],
        paths: [
          '/assets/creator',
          '/assets/creator'
        ]
      },

      // Dawn (ID: 887)
      'Dawn': {
        css: [
          'dawn-theme',
          'dawn__',
          'dawn-',
          'dawn-header',
          'dawn'
        ],
        js: [
          'dawn.js',
          'dawn.theme.js',
          'dawn.js'
        ],
        html: [
          '"Dawn"',
          'dawn-theme',
          'data-dawn',
          'data-dawn'
        ],
        paths: [
          '/assets/dawn',
          '/assets/dawn'
        ]
      },

      // Debut (ID: 796)
      'Debut': {
        css: [
          'debut-theme',
          'debut__',
          'debut-',
          'debut-header',
          'debut'
        ],
        js: [
          'debut.js',
          'debut.theme.js',
          'debut.js'
        ],
        html: [
          '"Debut"',
          'debut-theme',
          'data-debut',
          'data-debut'
        ],
        paths: [
          '/assets/debut',
          '/assets/debut'
        ]
      },

      // Desert (ID: 3313)
      'Desert': {
        css: [
          'desert-theme',
          'desert__',
          'desert-',
          'desert-header',
          'desert'
        ],
        js: [
          'desert.js',
          'desert.theme.js',
          'desert.js'
        ],
        html: [
          '"Desert"',
          'desert-theme',
          'data-desert',
          'data-desert'
        ],
        paths: [
          '/assets/desert',
          '/assets/desert'
        ]
      },

      // Digital (ID: 2539)
      'Digital': {
        css: [
          'digital-theme',
          'digital__',
          'digital-',
          'digital-header',
          'digital'
        ],
        js: [
          'digital.js',
          'digital.theme.js',
          'digital.js'
        ],
        html: [
          '"Digital"',
          'digital-theme',
          'data-digital',
          'data-digital'
        ],
        paths: [
          '/assets/digital',
          '/assets/digital'
        ]
      },

      // Distinctive (ID: 2431)
      'Distinctive': {
        css: [
          'distinctive-theme',
          'distinctive__',
          'distinctive-',
          'distinctive-header',
          'distinctive'
        ],
        js: [
          'distinctive.js',
          'distinctive.theme.js',
          'distinctive.js'
        ],
        html: [
          '"Distinctive"',
          'distinctive-theme',
          'data-distinctive',
          'data-distinctive'
        ],
        paths: [
          '/assets/distinctive',
          '/assets/distinctive'
        ]
      },

      // District (ID: 735)
      'District': {
        css: [
          'district-theme',
          'district__',
          'district-',
          'district-header',
          'district'
        ],
        js: [
          'district.js',
          'district.theme.js',
          'district.js'
        ],
        html: [
          '"District"',
          'district-theme',
          'data-district',
          'data-district'
        ],
        paths: [
          '/assets/district',
          '/assets/district'
        ]
      },

      // Divide (ID: 2273)
      'Divide': {
        css: [
          'divide-theme',
          'divide__',
          'divide-',
          'divide-header',
          'divide'
        ],
        js: [
          'divide.js',
          'divide.theme.js',
          'divide.js'
        ],
        html: [
          '"Divide"',
          'divide-theme',
          'data-divide',
          'data-divide'
        ],
        paths: [
          '/assets/divide',
          '/assets/divide'
        ]
      },

      // Divine (ID: 2931)
      'Divine': {
        css: [
          'divine-theme',
          'divine__',
          'divine-',
          'divine-header',
          'divine'
        ],
        js: [
          'divine.js',
          'divine.theme.js',
          'divine.js'
        ],
        html: [
          '"Divine"',
          'divine-theme',
          'data-divine',
          'data-divine'
        ],
        paths: [
          '/assets/divine',
          '/assets/divine'
        ]
      },

      // Drop (ID: 1197)
      'Drop': {
        css: [
          'drop-theme',
          'drop__',
          'drop-',
          'drop-header',
          'drop'
        ],
        js: [
          'drop.js',
          'drop.theme.js',
          'drop.js'
        ],
        html: [
          '"Drop"',
          'drop-theme',
          'data-drop',
          'data-drop'
        ],
        paths: [
          '/assets/drop',
          '/assets/drop'
        ]
      },

      // Dwell (ID: 3623)
      'Dwell': {
        css: [
          'dwell-theme',
          'dwell__',
          'dwell-',
          'dwell-header',
          'dwell'
        ],
        js: [
          'dwell.js',
          'dwell.theme.js',
          'dwell.js'
        ],
        html: [
          '"Dwell"',
          'dwell-theme',
          'data-dwell',
          'data-dwell'
        ],
        paths: [
          '/assets/dwell',
          '/assets/dwell'
        ]
      },

      // Eclipse (ID: 3070)
      'Eclipse': {
        css: [
          'eclipse-theme',
          'eclipse__',
          'eclipse-',
          'eclipse-header',
          'eclipse'
        ],
        js: [
          'eclipse.js',
          'eclipse.theme.js',
          'eclipse.js'
        ],
        html: [
          '"Eclipse"',
          'eclipse-theme',
          'data-eclipse',
          'data-eclipse'
        ],
        paths: [
          '/assets/eclipse',
          '/assets/eclipse'
        ]
      },

      // Editions (ID: 457)
      'Editions': {
        css: [
          'editions-theme',
          'editions__',
          'editions-',
          'editions-header',
          'editions'
        ],
        js: [
          'editions.js',
          'editions.theme.js',
          'editions.js'
        ],
        html: [
          '"Editions"',
          'editions-theme',
          'data-editions',
          'data-editions'
        ],
        paths: [
          '/assets/editions',
          '/assets/editions'
        ]
      },

      // Editorial (ID: 827)
      'Editorial': {
        css: [
          'editorial-theme',
          'editorial__',
          'editorial-',
          'editorial-header',
          'editorial'
        ],
        js: [
          'editorial.js',
          'editorial.theme.js',
          'editorial.js'
        ],
        html: [
          '"Editorial"',
          'editorial-theme',
          'data-editorial',
          'data-editorial'
        ],
        paths: [
          '/assets/editorial',
          '/assets/editorial'
        ]
      },

      // Effortless (ID: 1743)
      'Effortless': {
        css: [
          'effortless-theme',
          'effortless__',
          'effortless-',
          'effortless-header',
          'effortless'
        ],
        js: [
          'effortless.js',
          'effortless.theme.js',
          'effortless.js'
        ],
        html: [
          '"Effortless"',
          'effortless-theme',
          'data-effortless',
          'data-effortless'
        ],
        paths: [
          '/assets/effortless',
          '/assets/effortless'
        ]
      },

      // Electro (ID: 2164)
      'Electro': {
        css: [
          'electro-theme',
          'electro__',
          'electro-',
          'electro-header',
          'electro'
        ],
        js: [
          'electro.js',
          'electro.theme.js',
          'electro.js'
        ],
        html: [
          '"Electro"',
          'electro-theme',
          'data-electro',
          'data-electro'
        ],
        paths: [
          '/assets/electro',
          '/assets/electro'
        ]
      },

      // Elixira (ID: 3264)
      'Elixira': {
        css: [
          'elixira-theme',
          'elixira__',
          'elixira-',
          'elixira-header',
          'elixira'
        ],
        js: [
          'elixira.js',
          'elixira.theme.js',
          'elixira.js'
        ],
        html: [
          '"Elixira"',
          'elixira-theme',
          'data-elixira',
          'data-elixira'
        ],
        paths: [
          '/assets/elixira',
          '/assets/elixira'
        ]
      },

      // Elysian (ID: 2578)
      'Elysian': {
        css: [
          'elysian-theme',
          'elysian__',
          'elysian-',
          'elysian-header',
          'elysian'
        ],
        js: [
          'elysian.js',
          'elysian.theme.js',
          'elysian.js'
        ],
        html: [
          '"Elysian"',
          'elysian-theme',
          'data-elysian',
          'data-elysian'
        ],
        paths: [
          '/assets/elysian',
          '/assets/elysian'
        ]
      },

      // Emerge (ID: 833)
      'Emerge': {
        css: [
          'emerge-theme',
          'emerge__',
          'emerge-',
          'emerge-header',
          'emerge'
        ],
        js: [
          'emerge.js',
          'emerge.theme.js',
          'emerge.js'
        ],
        html: [
          '"Emerge"',
          'emerge-theme',
          'data-emerge',
          'data-emerge'
        ],
        paths: [
          '/assets/emerge',
          '/assets/emerge'
        ]
      },

      // Empire (ID: 838)
      'Empire': {
        css: [
          'empire-theme',
          'empire__',
          'empire-',
          'empire-header',
          'empire'
        ],
        js: [
          'empire.js',
          'empire.theme.js',
          'empire.js'
        ],
        html: [
          '"Empire"',
          'empire-theme',
          'data-empire',
          'data-empire'
        ],
        paths: [
          '/assets/empire',
          '/assets/empire'
        ]
      },

      // Emporium (ID: 1854)
      'Emporium': {
        css: [
          'emporium-theme',
          'emporium__',
          'emporium-',
          'emporium-header',
          'emporium'
        ],
        js: [
          'emporium.js',
          'emporium.theme.js',
          'emporium.js'
        ],
        html: [
          '"Emporium"',
          'emporium-theme',
          'data-emporium',
          'data-emporium'
        ],
        paths: [
          '/assets/emporium',
          '/assets/emporium'
        ]
      },

      // Energy (ID: 2717)
      'Energy': {
        css: [
          'energy-theme',
          'energy__',
          'energy-',
          'energy-header',
          'energy'
        ],
        js: [
          'energy.js',
          'energy.theme.js',
          'energy.js'
        ],
        html: [
          '"Energy"',
          'energy-theme',
          'data-energy',
          'data-energy'
        ],
        paths: [
          '/assets/energy',
          '/assets/energy'
        ]
      },

      // Enterprise (ID: 1657)
      'Enterprise': {
        css: [
          'enterprise-theme',
          'enterprise__',
          'enterprise-',
          'enterprise-header',
          'enterprise'
        ],
        js: [
          'enterprise.js',
          'enterprise.theme.js',
          'enterprise.js'
        ],
        html: [
          '"Enterprise"',
          'enterprise-theme',
          'data-enterprise',
          'data-enterprise'
        ],
        paths: [
          '/assets/enterprise',
          '/assets/enterprise'
        ]
      },

      // Envy (ID: 411)
      'Envy': {
        css: [
          'envy-theme',
          'envy__',
          'envy-',
          'envy-header',
          'envy'
        ],
        js: [
          'envy.js',
          'envy.theme.js',
          'envy.js'
        ],
        html: [
          '"Envy"',
          'envy-theme',
          'data-envy',
          'data-envy'
        ],
        paths: [
          '/assets/envy',
          '/assets/envy'
        ]
      },

      // Erickson (ID: 1790)
      'Erickson': {
        css: [
          'erickson-theme',
          'erickson__',
          'erickson-',
          'erickson-header',
          'erickson'
        ],
        js: [
          'erickson.js',
          'erickson.theme.js',
          'erickson.js'
        ],
        html: [
          '"Erickson"',
          'erickson-theme',
          'data-erickson',
          'data-erickson'
        ],
        paths: [
          '/assets/erickson',
          '/assets/erickson'
        ]
      },

      // Essence (ID: 2366)
      'Essence': {
        css: [
          'essence-theme',
          'essence__',
          'essence-',
          'essence-header',
          'essence'
        ],
        js: [
          'essence.js',
          'essence.theme.js',
          'essence.js'
        ],
        html: [
          '"Essence"',
          'essence-theme',
          'data-essence',
          'data-essence'
        ],
        paths: [
          '/assets/essence',
          '/assets/essence'
        ]
      },

      // Essentials (ID: 2482)
      'Essentials': {
        css: [
          'essentials-theme',
          'essentials__',
          'essentials-',
          'essentials-header',
          'essentials'
        ],
        js: [
          'essentials.js',
          'essentials.theme.js',
          'essentials.js'
        ],
        html: [
          '"Essentials"',
          'essentials-theme',
          'data-essentials',
          'data-essentials'
        ],
        paths: [
          '/assets/essentials',
          '/assets/essentials'
        ]
      },

      // Etheryx (ID: 3248)
      'Etheryx': {
        css: [
          'etheryx-theme',
          'etheryx__',
          'etheryx-',
          'etheryx-header',
          'etheryx'
        ],
        js: [
          'etheryx.js',
          'etheryx.theme.js',
          'etheryx.js'
        ],
        html: [
          '"Etheryx"',
          'etheryx-theme',
          'data-etheryx',
          'data-etheryx'
        ],
        paths: [
          '/assets/etheryx',
          '/assets/etheryx'
        ]
      },

      // Eurus (ID: 2048)
      'Eurus': {
        css: [
          'eurus-theme',
          'eurus__',
          'eurus-',
          'eurus-header',
          'eurus'
        ],
        js: [
          'eurus.js',
          'eurus.theme.js',
          'eurus.js'
        ],
        html: [
          '"Eurus"',
          'eurus-theme',
          'data-eurus',
          'data-eurus'
        ],
        paths: [
          '/assets/eurus',
          '/assets/eurus'
        ]
      },

      // Exhibit (ID: 1828)
      'Exhibit': {
        css: [
          'exhibit-theme',
          'exhibit__',
          'exhibit-',
          'exhibit-header',
          'exhibit'
        ],
        js: [
          'exhibit.js',
          'exhibit.theme.js',
          'exhibit.js'
        ],
        html: [
          '"Exhibit"',
          'exhibit-theme',
          'data-exhibit',
          'data-exhibit'
        ],
        paths: [
          '/assets/exhibit',
          '/assets/exhibit'
        ]
      },

      // Expanse (ID: 902)
      'Expanse': {
        css: [
          'expanse-theme',
          'expanse__',
          'expanse-',
          'expanse-header',
          'expanse'
        ],
        js: [
          'expanse.js',
          'expanse.theme.js',
          'expanse.js'
        ],
        html: [
          '"Expanse"',
          'expanse-theme',
          'data-expanse',
          'data-expanse'
        ],
        paths: [
          '/assets/expanse',
          '/assets/expanse'
        ]
      },

      // Express (ID: 885)
      'Express': {
        css: [
          'express-theme',
          'express__',
          'express-',
          'express-header',
          'express'
        ],
        js: [
          'express.js',
          'express.theme.js',
          'express.js'
        ],
        html: [
          '"Express"',
          'express-theme',
          'data-express',
          'data-express'
        ],
        paths: [
          '/assets/express',
          '/assets/express'
        ]
      },

      // Expression (ID: 230)
      'Expression': {
        css: [
          'expression-theme',
          'expression__',
          'expression-',
          'expression-header',
          'expression'
        ],
        js: [
          'expression.js',
          'expression.theme.js',
          'expression.js'
        ],
        html: [
          '"Expression"',
          'expression-theme',
          'data-expression',
          'data-expression'
        ],
        paths: [
          '/assets/expression',
          '/assets/expression'
        ]
      },

      // Fabric (ID: 3622)
      'Fabric': {
        css: [
          'fabric-theme',
          'fabric__',
          'fabric-',
          'fabric-header',
          'fabric'
        ],
        js: [
          'fabric.js',
          'fabric.theme.js',
          'fabric.js'
        ],
        html: [
          '"Fabric"',
          'fabric-theme',
          'data-fabric',
          'data-fabric'
        ],
        paths: [
          '/assets/fabric',
          '/assets/fabric'
        ]
      },

      // Fame (ID: 2101)
      'Fame': {
        css: [
          'fame-theme',
          'fame__',
          'fame-',
          'fame-header',
          'fame'
        ],
        js: [
          'fame.js',
          'fame.theme.js',
          'fame.js'
        ],
        html: [
          '"Fame"',
          'fame-theme',
          'data-fame',
          'data-fame'
        ],
        paths: [
          '/assets/fame',
          '/assets/fame'
        ]
      },

      // Fashionopolism (ID: 141)
      'Fashionopolism': {
        css: [
          'fashionopolism-theme',
          'fashionopolism__',
          'fashionopolism-',
          'fashionopolism-header',
          'fashionopolism'
        ],
        js: [
          'fashionopolism.js',
          'fashionopolism.theme.js',
          'fashionopolism.js'
        ],
        html: [
          '"Fashionopolism"',
          'fashionopolism-theme',
          'data-fashionopolism',
          'data-fashionopolism'
        ],
        paths: [
          '/assets/fashionopolism',
          '/assets/fashionopolism'
        ]
      },

      // Fetch (ID: 1949)
      'Fetch': {
        css: [
          'fetch-theme',
          'fetch__',
          'fetch-',
          'fetch-header',
          'fetch'
        ],
        js: [
          'fetch.js',
          'fetch.theme.js',
          'fetch.js'
        ],
        html: [
          '"Fetch"',
          'fetch-theme',
          'data-fetch',
          'data-fetch'
        ],
        paths: [
          '/assets/fetch',
          '/assets/fetch'
        ]
      },

      // Flawless (ID: 2847)
      'Flawless': {
        css: [
          'flawless-theme',
          'flawless__',
          'flawless-',
          'flawless-header',
          'flawless'
        ],
        js: [
          'flawless.js',
          'flawless.theme.js',
          'flawless.js'
        ],
        html: [
          '"Flawless"',
          'flawless-theme',
          'data-flawless',
          'data-flawless'
        ],
        paths: [
          '/assets/flawless',
          '/assets/flawless'
        ]
      },

      // Flow (ID: 801)
      'Flow': {
        css: [
          'flow-theme',
          'flow__',
          'flow-',
          'flow-header',
          'flow'
        ],
        js: [
          'flow.js',
          'flow.theme.js',
          'flow.js'
        ],
        html: [
          '"Flow"',
          'flow-theme',
          'data-flow',
          'data-flow'
        ],
        paths: [
          '/assets/flow',
          '/assets/flow'
        ]
      },

      // Flux (ID: 3121)
      'Flux': {
        css: [
          'flux-theme',
          'flux__',
          'flux-',
          'flux-header',
          'flux'
        ],
        js: [
          'flux.js',
          'flux.theme.js',
          'flux.js'
        ],
        html: [
          '"Flux"',
          'flux-theme',
          'data-flux',
          'data-flux'
        ],
        paths: [
          '/assets/flux',
          '/assets/flux'
        ]
      },

      // Focal (ID: 714)
      'Focal': {
        css: [
          'focal-theme',
          'focal__',
          'focal-',
          'focal-header',
          'focal'
        ],
        js: [
          'focal.js',
          'focal.theme.js',
          'focal.js'
        ],
        html: [
          '"Focal"',
          'focal-theme',
          'data-focal',
          'data-focal'
        ],
        paths: [
          '/assets/focal',
          '/assets/focal'
        ]
      },

      // Foodie (ID: 918)
      'Foodie': {
        css: [
          'foodie-theme',
          'foodie__',
          'foodie-',
          'foodie-header',
          'foodie'
        ],
        js: [
          'foodie.js',
          'foodie.theme.js',
          'foodie.js'
        ],
        html: [
          '"Foodie"',
          'foodie-theme',
          'data-foodie',
          'data-foodie'
        ],
        paths: [
          '/assets/foodie',
          '/assets/foodie'
        ]
      },

      // Forge (ID: 1492)
      'Forge': {
        css: [
          'forge-theme',
          'forge__',
          'forge-',
          'forge-header',
          'forge'
        ],
        js: [
          'forge.js',
          'forge.theme.js',
          'forge.js'
        ],
        html: [
          '"Forge"',
          'forge-theme',
          'data-forge',
          'data-forge'
        ],
        paths: [
          '/assets/forge',
          '/assets/forge'
        ]
      },

      // Frame (ID: 1716)
      'Frame': {
        css: [
          'frame-theme',
          'frame__',
          'frame-',
          'frame-header',
          'frame'
        ],
        js: [
          'frame.js',
          'frame.theme.js',
          'frame.js'
        ],
        html: [
          '"Frame"',
          'frame-theme',
          'data-frame',
          'data-frame'
        ],
        paths: [
          '/assets/frame',
          '/assets/frame'
        ]
      },

      // Fresh (ID: 908)
      'Fresh': {
        css: [
          'fresh-theme',
          'fresh__',
          'fresh-',
          'fresh-header',
          'fresh'
        ],
        js: [
          'fresh.js',
          'fresh.theme.js',
          'fresh.js'
        ],
        html: [
          '"Fresh"',
          'fresh-theme',
          'data-fresh',
          'data-fresh'
        ],
        paths: [
          '/assets/fresh',
          '/assets/fresh'
        ]
      },

      // Futurer (ID: 3341)
      'Futurer': {
        css: [
          'futurer-theme',
          'futurer__',
          'futurer-',
          'futurer-header',
          'futurer'
        ],
        js: [
          'futurer.js',
          'futurer.theme.js',
          'futurer.js'
        ],
        html: [
          '"Futurer"',
          'futurer-theme',
          'data-futurer',
          'data-futurer'
        ],
        paths: [
          '/assets/futurer',
          '/assets/futurer'
        ]
      },

      // Gain (ID: 2077)
      'Gain': {
        css: [
          'gain-theme',
          'gain__',
          'gain-',
          'gain-header',
          'gain'
        ],
        js: [
          'gain.js',
          'gain.theme.js',
          'gain.js'
        ],
        html: [
          '"Gain"',
          'gain-theme',
          'data-gain',
          'data-gain'
        ],
        paths: [
          '/assets/gain',
          '/assets/gain'
        ]
      },

      // Galleria (ID: 851)
      'Galleria': {
        css: [
          'galleria-theme',
          'galleria__',
          'galleria-',
          'galleria-header',
          'galleria'
        ],
        js: [
          'galleria.js',
          'galleria.theme.js',
          'galleria.js'
        ],
        html: [
          '"Galleria"',
          'galleria-theme',
          'data-galleria',
          'data-galleria'
        ],
        paths: [
          '/assets/galleria',
          '/assets/galleria'
        ]
      },

      // Gem (ID: 2222)
      'Gem': {
        css: [
          'gem-theme',
          'gem__',
          'gem-',
          'gem-header',
          'gem'
        ],
        js: [
          'gem.js',
          'gem.theme.js',
          'gem.js'
        ],
        html: [
          '"Gem"',
          'gem-theme',
          'data-gem',
          'data-gem'
        ],
        paths: [
          '/assets/gem',
          '/assets/gem'
        ]
      },

      // Grid (ID: 718)
      'Grid': {
        css: [
          'grid-theme',
          'grid__',
          'grid-',
          'grid-header',
          'grid'
        ],
        js: [
          'grid.js',
          'grid.theme.js',
          'grid.js'
        ],
        html: [
          '"Grid"',
          'grid-theme',
          'data-grid',
          'data-grid'
        ],
        paths: [
          '/assets/grid',
          '/assets/grid'
        ]
      },

      // Habitat (ID: 1581)
      'Habitat': {
        css: [
          'habitat-theme',
          'habitat__',
          'habitat-',
          'habitat-header',
          'habitat'
        ],
        js: [
          'habitat.js',
          'habitat.theme.js',
          'habitat.js'
        ],
        html: [
          '"Habitat"',
          'habitat-theme',
          'data-habitat',
          'data-habitat'
        ],
        paths: [
          '/assets/habitat',
          '/assets/habitat'
        ]
      },

      // Handmade (ID: 1791)
      'Handmade': {
        css: [
          'handmade-theme',
          'handmade__',
          'handmade-',
          'handmade-header',
          'handmade'
        ],
        js: [
          'handmade.js',
          'handmade.theme.js',
          'handmade.js'
        ],
        html: [
          '"Handmade"',
          'handmade-theme',
          'data-handmade',
          'data-handmade'
        ],
        paths: [
          '/assets/handmade',
          '/assets/handmade'
        ]
      },

      // Handy (ID: 826)
      'Handy': {
        css: [
          'handy-theme',
          'handy__',
          'handy-',
          'handy-header',
          'handy'
        ],
        js: [
          'handy.js',
          'handy.theme.js',
          'handy.js'
        ],
        html: [
          '"Handy"',
          'handy-theme',
          'data-handy',
          'data-handy'
        ],
        paths: [
          '/assets/handy',
          '/assets/handy'
        ]
      },

      // Heritage (ID: 3624)
      'Heritage': {
        css: [
          'heritage-theme',
          'heritage__',
          'heritage-',
          'heritage-header',
          'heritage'
        ],
        js: [
          'heritage.js',
          'heritage.theme.js',
          'heritage.js'
        ],
        html: [
          '"Heritage"',
          'heritage-theme',
          'data-heritage',
          'data-heritage'
        ],
        paths: [
          '/assets/heritage',
          '/assets/heritage'
        ]
      },

      // Highlight (ID: 903)
      'Highlight': {
        css: [
          'highlight-theme',
          'highlight__',
          'highlight-',
          'highlight-header',
          'highlight'
        ],
        js: [
          'highlight.js',
          'highlight.theme.js',
          'highlight.js'
        ],
        html: [
          '"Highlight"',
          'highlight-theme',
          'data-highlight',
          'data-highlight'
        ],
        paths: [
          '/assets/highlight',
          '/assets/highlight'
        ]
      },

      // Honey (ID: 2160)
      'Honey': {
        css: [
          'honey-theme',
          'honey__',
          'honey-',
          'honey-header',
          'honey'
        ],
        js: [
          'honey.js',
          'honey.theme.js',
          'honey.js'
        ],
        html: [
          '"Honey"',
          'honey-theme',
          'data-honey',
          'data-honey'
        ],
        paths: [
          '/assets/honey',
          '/assets/honey'
        ]
      },

      // Horizon (ID: 2481)
      'Horizon': {
        css: [
          'horizon-theme',
          'horizon__',
          'horizon-',
          'horizon-header',
          'horizon'
        ],
        js: [
          'horizon.js',
          'horizon.theme.js',
          'horizon.js'
        ],
        html: [
          '"Horizon"',
          'horizon-theme',
          'data-horizon',
          'data-horizon'
        ],
        paths: [
          '/assets/horizon',
          '/assets/horizon'
        ]
      },

      // Huge (ID: 2158)
      'Huge': {
        css: [
          'huge-theme',
          'huge__',
          'huge-',
          'huge-header',
          'huge'
        ],
        js: [
          'huge.js',
          'huge.theme.js',
          'huge.js'
        ],
        html: [
          '"Huge"',
          'huge-theme',
          'data-huge',
          'data-huge'
        ],
        paths: [
          '/assets/huge',
          '/assets/huge'
        ]
      },

      // Hyper (ID: 3247)
      'Hyper': {
        css: [
          'hyper-theme',
          'hyper__',
          'hyper-',
          'hyper-header',
          'hyper'
        ],
        js: [
          'hyper.js',
          'hyper.theme.js',
          'hyper.js'
        ],
        html: [
          '"Hyper"',
          'hyper-theme',
          'data-hyper',
          'data-hyper'
        ],
        paths: [
          '/assets/hyper',
          '/assets/hyper'
        ]
      },

      // Icon (ID: 686)
      'Icon': {
        css: [
          'icon-theme',
          'icon__',
          'icon-',
          'icon-header',
          'icon'
        ],
        js: [
          'icon.js',
          'icon.theme.js',
          'icon.js'
        ],
        html: [
          '"Icon"',
          'icon-theme',
          'data-icon',
          'data-icon'
        ],
        paths: [
          '/assets/icon',
          '/assets/icon'
        ]
      },

      // Ignite (ID: 3027)
      'Ignite': {
        css: [
          'ignite-theme',
          'ignite__',
          'ignite-',
          'ignite-header',
          'ignite'
        ],
        js: [
          'ignite.js',
          'ignite.theme.js',
          'ignite.js'
        ],
        html: [
          '"Ignite"',
          'ignite-theme',
          'data-ignite',
          'data-ignite'
        ],
        paths: [
          '/assets/ignite',
          '/assets/ignite'
        ]
      },

      // Igloo (ID: 2315)
      'Igloo': {
        css: [
          'igloo-theme',
          'igloo__',
          'igloo-',
          'igloo-header',
          'igloo'
        ],
        js: [
          'igloo.js',
          'igloo.theme.js',
          'igloo.js'
        ],
        html: [
          '"Igloo"',
          'igloo-theme',
          'data-igloo',
          'data-igloo'
        ],
        paths: [
          '/assets/igloo',
          '/assets/igloo'
        ]
      },

      // Impact (ID: 1190)
      'Impact': {
        css: [
          'impact-theme',
          'impact__',
          'impact-',
          'impact-header',
          'impact'
        ],
        js: [
          'impact.js',
          'impact.theme.js',
          'impact.js'
        ],
        html: [
          '"Impact"',
          'impact-theme',
          'data-impact',
          'data-impact'
        ],
        paths: [
          '/assets/impact',
          '/assets/impact'
        ]
      },

      // Impulse (ID: 857)
      'Impulse': {
        css: [
          'impulse-theme',
          'impulse__',
          'impulse-',
          'impulse-header',
          'impulse'
        ],
        js: [
          'impulse.js',
          'impulse.theme.js',
          'impulse.js'
        ],
        html: [
          '"Impulse"',
          'impulse-theme',
          'data-impulse',
          'data-impulse'
        ],
        paths: [
          '/assets/impulse',
          '/assets/impulse'
        ]
      },

      // Infinity (ID: 2061)
      'Infinity': {
        css: [
          'infinity-theme',
          'infinity__',
          'infinity-',
          'infinity-header',
          'infinity'
        ],
        js: [
          'infinity.js',
          'infinity.theme.js',
          'infinity.js'
        ],
        html: [
          '"Infinity"',
          'infinity-theme',
          'data-infinity',
          'data-infinity'
        ],
        paths: [
          '/assets/infinity',
          '/assets/infinity'
        ]
      },

      // Influence (ID: 1536)
      'Influence': {
        css: [
          'influence-theme',
          'influence__',
          'influence-',
          'influence-header',
          'influence'
        ],
        js: [
          'influence.js',
          'influence.theme.js',
          'influence.js'
        ],
        html: [
          '"Influence"',
          'influence-theme',
          'data-influence',
          'data-influence'
        ],
        paths: [
          '/assets/influence',
          '/assets/influence'
        ]
      },

      // Ira (ID: 790)
      'Ira': {
        css: [
          'ira-theme',
          'ira__',
          'ira-',
          'ira-header',
          'ira'
        ],
        js: [
          'ira.js',
          'ira.theme.js',
          'ira.js'
        ],
        html: [
          '"Ira"',
          'ira-theme',
          'data-ira',
          'data-ira'
        ],
        paths: [
          '/assets/ira',
          '/assets/ira'
        ]
      },

      // Iris (ID: 2489)
      'Iris': {
        css: [
          'iris-theme',
          'iris__',
          'iris-',
          'iris-header',
          'iris'
        ],
        js: [
          'iris.js',
          'iris.theme.js',
          'iris.js'
        ],
        html: [
          '"Iris"',
          'iris-theme',
          'data-iris',
          'data-iris'
        ],
        paths: [
          '/assets/iris',
          '/assets/iris'
        ]
      },

      // Kairo (ID: 1843)
      'Kairo': {
        css: [
          'kairo-theme',
          'kairo__',
          'kairo-',
          'kairo-header',
          'kairo'
        ],
        js: [
          'kairo.js',
          'kairo.theme.js',
          'kairo.js'
        ],
        html: [
          '"Kairo"',
          'kairo-theme',
          'data-kairo',
          'data-kairo'
        ],
        paths: [
          '/assets/kairo',
          '/assets/kairo'
        ]
      },

      // Keystone (ID: 2943)
      'Keystone': {
        css: [
          'keystone-theme',
          'keystone__',
          'keystone-',
          'keystone-header',
          'keystone'
        ],
        js: [
          'keystone.js',
          'keystone.theme.js',
          'keystone.js'
        ],
        html: [
          '"Keystone"',
          'keystone-theme',
          'data-keystone',
          'data-keystone'
        ],
        paths: [
          '/assets/keystone',
          '/assets/keystone'
        ]
      },

      // Kidu (ID: 2268)
      'Kidu': {
        css: [
          'kidu-theme',
          'kidu__',
          'kidu-',
          'kidu-header',
          'kidu'
        ],
        js: [
          'kidu.js',
          'kidu.theme.js',
          'kidu.js'
        ],
        html: [
          '"Kidu"',
          'kidu-theme',
          'data-kidu',
          'data-kidu'
        ],
        paths: [
          '/assets/kidu',
          '/assets/kidu'
        ]
      },

      // King (ID: 2948)
      'King': {
        css: [
          'king-theme',
          'king__',
          'king-',
          'king-header',
          'king'
        ],
        js: [
          'king.js',
          'king.theme.js',
          'king.js'
        ],
        html: [
          '"King"',
          'king-theme',
          'data-king',
          'data-king'
        ],
        paths: [
          '/assets/king',
          '/assets/king'
        ]
      },

      // Kingdom (ID: 725)
      'Kingdom': {
        css: [
          'kingdom-theme',
          'kingdom__',
          'kingdom-',
          'kingdom-header',
          'kingdom'
        ],
        js: [
          'kingdom.js',
          'kingdom.theme.js',
          'kingdom.js'
        ],
        html: [
          '"Kingdom"',
          'kingdom-theme',
          'data-kingdom',
          'data-kingdom'
        ],
        paths: [
          '/assets/kingdom',
          '/assets/kingdom'
        ]
      },

      // Koto (ID: 3001)
      'Koto': {
        css: [
          'koto-theme',
          'koto__',
          'koto-',
          'koto-header',
          'koto'
        ],
        js: [
          'koto.js',
          'koto.theme.js',
          'koto.js'
        ],
        html: [
          '"Koto"',
          'koto-theme',
          'data-koto',
          'data-koto'
        ],
        paths: [
          '/assets/koto',
          '/assets/koto'
        ]
      },

      // Label (ID: 773)
      'Label': {
        css: [
          'label-theme',
          'label__',
          'label-',
          'label-header',
          'label'
        ],
        js: [
          'label.js',
          'label.theme.js',
          'label.js'
        ],
        html: [
          '"Label"',
          'label-theme',
          'data-label',
          'data-label'
        ],
        paths: [
          '/assets/label',
          '/assets/label'
        ]
      },

      // Launch (ID: 793)
      'Launch': {
        css: [
          'launch-theme',
          'launch__',
          'launch-',
          'launch-header',
          'launch'
        ],
        js: [
          'launch.js',
          'launch.theme.js',
          'launch.js'
        ],
        html: [
          '"Launch"',
          'launch-theme',
          'data-launch',
          'data-launch'
        ],
        paths: [
          '/assets/launch',
          '/assets/launch'
        ]
      },

      // Local (ID: 1651)
      'Local': {
        css: [
          'local-theme',
          'local__',
          'local-',
          'local-header',
          'local'
        ],
        js: [
          'local.js',
          'local.theme.js',
          'local.js'
        ],
        html: [
          '"Local"',
          'local-theme',
          'data-local',
          'data-local'
        ],
        paths: [
          '/assets/local',
          '/assets/local'
        ]
      },

      // Loft (ID: 846)
      'Loft': {
        css: [
          'loft-theme',
          'loft__',
          'loft-',
          'loft-header',
          'loft'
        ],
        js: [
          'loft.js',
          'loft.theme.js',
          'loft.js'
        ],
        html: [
          '"Loft"',
          'loft-theme',
          'data-loft',
          'data-loft'
        ],
        paths: [
          '/assets/loft',
          '/assets/loft'
        ]
      },

      // Loka (ID: 3440)
      'Loka': {
        css: [
          'loka-theme',
          'loka__',
          'loka-',
          'loka-header',
          'loka'
        ],
        js: [
          'loka.js',
          'loka.theme.js',
          'loka.js'
        ],
        html: [
          '"Loka"',
          'loka-theme',
          'data-loka',
          'data-loka'
        ],
        paths: [
          '/assets/loka',
          '/assets/loka'
        ]
      },

      // Lorenza (ID: 798)
      'Lorenza': {
        css: [
          'lorenza-theme',
          'lorenza__',
          'lorenza-',
          'lorenza-header',
          'lorenza'
        ],
        js: [
          'lorenza.js',
          'lorenza.theme.js',
          'lorenza.js'
        ],
        html: [
          '"Lorenza"',
          'lorenza-theme',
          'data-lorenza',
          'data-lorenza'
        ],
        paths: [
          '/assets/lorenza',
          '/assets/lorenza'
        ]
      },

      // Lumin (ID: 3205)
      'Lumin': {
        css: [
          'lumin-theme',
          'lumin__',
          'lumin-',
          'lumin-header',
          'lumin'
        ],
        js: [
          'lumin.js',
          'lumin.theme.js',
          'lumin.js'
        ],
        html: [
          '"Lumin"',
          'lumin-theme',
          'data-lumin',
          'data-lumin'
        ],
        paths: [
          '/assets/lumin',
          '/assets/lumin'
        ]
      },

      // Lute (ID: 2171)
      'Lute': {
        css: [
          'lute-theme',
          'lute__',
          'lute-',
          'lute-header',
          'lute'
        ],
        js: [
          'lute.js',
          'lute.theme.js',
          'lute.js'
        ],
        html: [
          '"Lute"',
          'lute-theme',
          'data-lute',
          'data-lute'
        ],
        paths: [
          '/assets/lute',
          '/assets/lute'
        ]
      },

      // Luxe (ID: 2779)
      'Luxe': {
        css: [
          'luxe-theme',
          'luxe__',
          'luxe-',
          'luxe-header',
          'luxe'
        ],
        js: [
          'luxe.js',
          'luxe.theme.js',
          'luxe.js'
        ],
        html: [
          '"Luxe"',
          'luxe-theme',
          'data-luxe',
          'data-luxe'
        ],
        paths: [
          '/assets/luxe',
          '/assets/luxe'
        ]
      },

      // Machina (ID: 2883)
      'Machina': {
        css: [
          'machina-theme',
          'machina__',
          'machina-',
          'machina-header',
          'machina'
        ],
        js: [
          'machina.js',
          'machina.theme.js',
          'machina.js'
        ],
        html: [
          '"Machina"',
          'machina-theme',
          'data-machina',
          'data-machina'
        ],
        paths: [
          '/assets/machina',
          '/assets/machina'
        ]
      },

      // Madrid (ID: 2870)
      'Madrid': {
        css: [
          'madrid-theme',
          'madrid__',
          'madrid-',
          'madrid-header',
          'madrid'
        ],
        js: [
          'madrid.js',
          'madrid.theme.js',
          'madrid.js'
        ],
        html: [
          '"Madrid"',
          'madrid-theme',
          'data-madrid',
          'data-madrid'
        ],
        paths: [
          '/assets/madrid',
          '/assets/madrid'
        ]
      },

      // Maker (ID: 765)
      'Maker': {
        css: [
          'maker-theme',
          'maker__',
          'maker-',
          'maker-header',
          'maker'
        ],
        js: [
          'maker.js',
          'maker.theme.js',
          'maker.js'
        ],
        html: [
          '"Maker"',
          'maker-theme',
          'data-maker',
          'data-maker'
        ],
        paths: [
          '/assets/maker',
          '/assets/maker'
        ]
      },

      // Mandolin (ID: 1696)
      'Mandolin': {
        css: [
          'mandolin-theme',
          'mandolin__',
          'mandolin-',
          'mandolin-header',
          'mandolin'
        ],
        js: [
          'mandolin.js',
          'mandolin.theme.js',
          'mandolin.js'
        ],
        html: [
          '"Mandolin"',
          'mandolin-theme',
          'data-mandolin',
          'data-mandolin'
        ],
        paths: [
          '/assets/mandolin',
          '/assets/mandolin'
        ]
      },

      // Maranello (ID: 2186)
      'Maranello': {
        css: [
          'maranello-theme',
          'maranello__',
          'maranello-',
          'maranello-header',
          'maranello'
        ],
        js: [
          'maranello.js',
          'maranello.theme.js',
          'maranello.js'
        ],
        html: [
          '"Maranello"',
          'maranello-theme',
          'data-maranello',
          'data-maranello'
        ],
        paths: [
          '/assets/maranello',
          '/assets/maranello'
        ]
      },

      // Marble (ID: 1907)
      'Marble': {
        css: [
          'marble-theme',
          'marble__',
          'marble-',
          'marble-header',
          'marble'
        ],
        js: [
          'marble.js',
          'marble.theme.js',
          'marble.js'
        ],
        html: [
          '"Marble"',
          'marble-theme',
          'data-marble',
          'data-marble'
        ],
        paths: [
          '/assets/marble',
          '/assets/marble'
        ]
      },

      // Masonry (ID: 450)
      'Masonry': {
        css: [
          'masonry-theme',
          'masonry__',
          'masonry-',
          'masonry-header',
          'masonry'
        ],
        js: [
          'masonry.js',
          'masonry.theme.js',
          'masonry.js'
        ],
        html: [
          '"Masonry"',
          'masonry-theme',
          'data-masonry',
          'data-masonry'
        ],
        paths: [
          '/assets/masonry',
          '/assets/masonry'
        ]
      },

      // Master (ID: 3177)
      'Master': {
        css: [
          'master-theme',
          'master__',
          'master-',
          'master-header',
          'master'
        ],
        js: [
          'master.js',
          'master.theme.js',
          'master.js'
        ],
        html: [
          '"Master"',
          'master-theme',
          'data-master',
          'data-master'
        ],
        paths: [
          '/assets/master',
          '/assets/master'
        ]
      },

      // Mavon (ID: 1979)
      'Mavon': {
        css: [
          'mavon-theme',
          'mavon__',
          'mavon-',
          'mavon-header',
          'mavon'
        ],
        js: [
          'mavon.js',
          'mavon.theme.js',
          'mavon.js'
        ],
        html: [
          '"Mavon"',
          'mavon-theme',
          'data-mavon',
          'data-mavon'
        ],
        paths: [
          '/assets/mavon',
          '/assets/mavon'
        ]
      },

      // Maya (ID: 3500)
      'Maya': {
        css: [
          'maya-theme',
          'maya__',
          'maya-',
          'maya-header',
          'maya'
        ],
        js: [
          'maya.js',
          'maya.theme.js',
          'maya.js'
        ],
        html: [
          '"Maya"',
          'maya-theme',
          'data-maya',
          'data-maya'
        ],
        paths: [
          '/assets/maya',
          '/assets/maya'
        ]
      },

      // Meka (ID: 2845)
      'Meka': {
        css: [
          'meka-theme',
          'meka__',
          'meka-',
          'meka-header',
          'meka'
        ],
        js: [
          'meka.js',
          'meka.theme.js',
          'meka.js'
        ],
        html: [
          '"Meka"',
          'meka-theme',
          'data-meka',
          'data-meka'
        ],
        paths: [
          '/assets/meka',
          '/assets/meka'
        ]
      },

      // Minimal (ID: 380)
      'Minimal': {
        css: [
          'minimal-theme',
          'minimal__',
          'minimal-',
          'minimal-header',
          'minimal'
        ],
        js: [
          'minimal.js',
          'minimal.theme.js',
          'minimal.js'
        ],
        html: [
          '"Minimal"',
          'minimal-theme',
          'data-minimal',
          'data-minimal'
        ],
        paths: [
          '/assets/minimal',
          '/assets/minimal'
        ]
      },

      // Minimalista (ID: 2316)
      'Minimalista': {
        css: [
          'minimalista-theme',
          'minimalista__',
          'minimalista-',
          'minimalista-header',
          'minimalista'
        ],
        js: [
          'minimalista.js',
          'minimalista.theme.js',
          'minimalista.js'
        ],
        html: [
          '"Minimalista"',
          'minimalista-theme',
          'data-minimalista',
          'data-minimalista'
        ],
        paths: [
          '/assets/minimalista',
          '/assets/minimalista'
        ]
      },

      // Minion (ID: 1571)
      'Minion': {
        css: [
          'minion-theme',
          'minion__',
          'minion-',
          'minion-header',
          'minion'
        ],
        js: [
          'minion.js',
          'minion.theme.js',
          'minion.js'
        ],
        html: [
          '"Minion"',
          'minion-theme',
          'data-minion',
          'data-minion'
        ],
        paths: [
          '/assets/minion',
          '/assets/minion'
        ]
      },

      // Mobilia (ID: 464)
      'Mobilia': {
        css: [
          'mobilia-theme',
          'mobilia__',
          'mobilia-',
          'mobilia-header',
          'mobilia'
        ],
        js: [
          'mobilia.js',
          'mobilia.theme.js',
          'mobilia.js'
        ],
        html: [
          '"Mobilia"',
          'mobilia-theme',
          'data-mobilia',
          'data-mobilia'
        ],
        paths: [
          '/assets/mobilia',
          '/assets/mobilia'
        ]
      },

      // Mode (ID: 1578)
      'Mode': {
        css: [
          'mode-theme',
          'mode__',
          'mode-',
          'mode-header',
          'mode'
        ],
        js: [
          'mode.js',
          'mode.theme.js',
          'mode.js'
        ],
        html: [
          '"Mode"',
          'mode-theme',
          'data-mode',
          'data-mode'
        ],
        paths: [
          '/assets/mode',
          '/assets/mode'
        ]
      },

      // Modular (ID: 849)
      'Modular': {
        css: [
          'modular-theme',
          'modular__',
          'modular-',
          'modular-header',
          'modular'
        ],
        js: [
          'modular.js',
          'modular.theme.js',
          'modular.js'
        ],
        html: [
          '"Modular"',
          'modular-theme',
          'data-modular',
          'data-modular'
        ],
        paths: [
          '/assets/modular',
          '/assets/modular'
        ]
      },

      // Modules (ID: 1795)
      'Modules': {
        css: [
          'modules-theme',
          'modules__',
          'modules-',
          'modules-header',
          'modules'
        ],
        js: [
          'modules.js',
          'modules.theme.js',
          'modules.js'
        ],
        html: [
          '"Modules"',
          'modules-theme',
          'data-modules',
          'data-modules'
        ],
        paths: [
          '/assets/modules',
          '/assets/modules'
        ]
      },

      // Mojave (ID: 1497)
      'Mojave': {
        css: [
          'mojave-theme',
          'mojave__',
          'mojave-',
          'mojave-header',
          'mojave'
        ],
        js: [
          'mojave.js',
          'mojave.theme.js',
          'mojave.js'
        ],
        html: [
          '"Mojave"',
          'mojave-theme',
          'data-mojave',
          'data-mojave'
        ],
        paths: [
          '/assets/mojave',
          '/assets/mojave'
        ]
      },

      // Momentum (ID: 1600)
      'Momentum': {
        css: [
          'momentum-theme',
          'momentum__',
          'momentum-',
          'momentum-header',
          'momentum'
        ],
        js: [
          'momentum.js',
          'momentum.theme.js',
          'momentum.js'
        ],
        html: [
          '"Momentum"',
          'momentum-theme',
          'data-momentum',
          'data-momentum'
        ],
        paths: [
          '/assets/momentum',
          '/assets/momentum'
        ]
      },

      // Monaco (ID: 2125)
      'Monaco': {
        css: [
          'monaco-theme',
          'monaco__',
          'monaco-',
          'monaco-header',
          'monaco'
        ],
        js: [
          'monaco.js',
          'monaco.theme.js',
          'monaco.js'
        ],
        html: [
          '"Monaco"',
          'monaco-theme',
          'data-monaco',
          'data-monaco'
        ],
        paths: [
          '/assets/monaco',
          '/assets/monaco'
        ]
      },

      // Monk (ID: 2515)
      'Monk': {
        css: [
          'monk-theme',
          'monk__',
          'monk-',
          'monk-header',
          'monk'
        ],
        js: [
          'monk.js',
          'monk.theme.js',
          'monk.js'
        ],
        html: [
          '"Monk"',
          'monk-theme',
          'data-monk',
          'data-monk'
        ],
        paths: [
          '/assets/monk',
          '/assets/monk'
        ]
      },

      // Mono (ID: 1818)
      'Mono': {
        css: [
          'mono-theme',
          'mono__',
          'mono-',
          'mono-header',
          'mono'
        ],
        js: [
          'mono.js',
          'mono.theme.js',
          'mono.js'
        ],
        html: [
          '"Mono"',
          'mono-theme',
          'data-mono',
          'data-mono'
        ],
        paths: [
          '/assets/mono',
          '/assets/mono'
        ]
      },

      // Monochrome (ID: 3425)
      'Monochrome': {
        css: [
          'monochrome-theme',
          'monochrome__',
          'monochrome-',
          'monochrome-header',
          'monochrome'
        ],
        js: [
          'monochrome.js',
          'monochrome.theme.js',
          'monochrome.js'
        ],
        html: [
          '"Monochrome"',
          'monochrome-theme',
          'data-monochrome',
          'data-monochrome'
        ],
        paths: [
          '/assets/monochrome',
          '/assets/monochrome'
        ]
      },

      // Motion (ID: 847)
      'Motion': {
        css: [
          'motion-theme',
          'motion__',
          'motion-',
          'motion-header',
          'motion'
        ],
        js: [
          'motion.js',
          'motion.theme.js',
          'motion.js'
        ],
        html: [
          '"Motion"',
          'motion-theme',
          'data-motion',
          'data-motion'
        ],
        paths: [
          '/assets/motion',
          '/assets/motion'
        ]
      },

      // Motto (ID: 3039)
      'Motto': {
        css: [
          'motto-theme',
          'motto__',
          'motto-',
          'motto-header',
          'motto'
        ],
        js: [
          'motto.js',
          'motto.theme.js',
          'motto.js'
        ],
        html: [
          '"Motto"',
          'motto-theme',
          'data-motto',
          'data-motto'
        ],
        paths: [
          '/assets/motto',
          '/assets/motto'
        ]
      },

      // Mr.Parker (ID: 567)
      'Mr.Parker': {
        css: [
          'mr-parker-theme',
          'mr-parker__',
          'mr-parker-',
          'mr-parker-header',
          'mrparker'
        ],
        js: [
          'mr-parker.js',
          'mr-parker.theme.js',
          'mrparker.js'
        ],
        html: [
          '"Mr.Parker"',
          'mr-parker-theme',
          'data-mr-parker',
          'data-mrparker'
        ],
        paths: [
          '/assets/mr-parker',
          '/assets/mrparker'
        ]
      },

      // Multi (ID: 2337)
      'Multi': {
        css: [
          'multi-theme',
          'multi__',
          'multi-',
          'multi-header',
          'multi'
        ],
        js: [
          'multi.js',
          'multi.theme.js',
          'multi.js'
        ],
        html: [
          '"Multi"',
          'multi-theme',
          'data-multi',
          'data-multi'
        ],
        paths: [
          '/assets/multi',
          '/assets/multi'
        ]
      },

      // Murmel (ID: 2512)
      'Murmel': {
        css: [
          'murmel-theme',
          'murmel__',
          'murmel-',
          'murmel-header',
          'murmel'
        ],
        js: [
          'murmel.js',
          'murmel.theme.js',
          'murmel.js'
        ],
        html: [
          '"Murmel"',
          'murmel-theme',
          'data-murmel',
          'data-murmel'
        ],
        paths: [
          '/assets/murmel',
          '/assets/murmel'
        ]
      },

      // Narrative (ID: 829)
      'Narrative': {
        css: [
          'narrative-theme',
          'narrative__',
          'narrative-',
          'narrative-header',
          'narrative'
        ],
        js: [
          'narrative.js',
          'narrative.theme.js',
          'narrative.js'
        ],
        html: [
          '"Narrative"',
          'narrative-theme',
          'data-narrative',
          'data-narrative'
        ],
        paths: [
          '/assets/narrative',
          '/assets/narrative'
        ]
      },

      // Neat (ID: 1878)
      'Neat': {
        css: [
          'neat-theme',
          'neat__',
          'neat-',
          'neat-header',
          'neat'
        ],
        js: [
          'neat.js',
          'neat.theme.js',
          'neat.js'
        ],
        html: [
          '"Neat"',
          'neat-theme',
          'data-neat',
          'data-neat'
        ],
        paths: [
          '/assets/neat',
          '/assets/neat'
        ]
      },

      // Nexa (ID: 2820)
      'Nexa': {
        css: [
          'nexa-theme',
          'nexa__',
          'nexa-',
          'nexa-header',
          'nexa'
        ],
        js: [
          'nexa.js',
          'nexa.theme.js',
          'nexa.js'
        ],
        html: [
          '"Nexa"',
          'nexa-theme',
          'data-nexa',
          'data-nexa'
        ],
        paths: [
          '/assets/nexa',
          '/assets/nexa'
        ]
      },

      // Next (ID: 2240)
      'Next': {
        css: [
          'next-theme',
          'next__',
          'next-',
          'next-header',
          'next'
        ],
        js: [
          'next.js',
          'next.theme.js',
          'next.js'
        ],
        html: [
          '"Next"',
          'next-theme',
          'data-next',
          'data-next'
        ],
        paths: [
          '/assets/next',
          '/assets/next'
        ]
      },

      // Nimbus (ID: 3094)
      'Nimbus': {
        css: [
          'nimbus-theme',
          'nimbus__',
          'nimbus-',
          'nimbus-header',
          'nimbus'
        ],
        js: [
          'nimbus.js',
          'nimbus.theme.js',
          'nimbus.js'
        ],
        html: [
          '"Nimbus"',
          'nimbus-theme',
          'data-nimbus',
          'data-nimbus'
        ],
        paths: [
          '/assets/nimbus',
          '/assets/nimbus'
        ]
      },

      // Noblesse (ID: 2546)
      'Noblesse': {
        css: [
          'noblesse-theme',
          'noblesse__',
          'noblesse-',
          'noblesse-header',
          'noblesse'
        ],
        js: [
          'noblesse.js',
          'noblesse.theme.js',
          'noblesse.js'
        ],
        html: [
          '"Noblesse"',
          'noblesse-theme',
          'data-noblesse',
          'data-noblesse'
        ],
        paths: [
          '/assets/noblesse',
          '/assets/noblesse'
        ]
      },

      // Noire (ID: 2926)
      'Noire': {
        css: [
          'noire-theme',
          'noire__',
          'noire-',
          'noire-header',
          'noire'
        ],
        js: [
          'noire.js',
          'noire.theme.js',
          'noire.js'
        ],
        html: [
          '"Noire"',
          'noire-theme',
          'data-noire',
          'data-noire'
        ],
        paths: [
          '/assets/noire',
          '/assets/noire'
        ]
      },

      // Nordic (ID: 2801)
      'Nordic': {
        css: [
          'nordic-theme',
          'nordic__',
          'nordic-',
          'nordic-header',
          'nordic'
        ],
        js: [
          'nordic.js',
          'nordic.theme.js',
          'nordic.js'
        ],
        html: [
          '"Nordic"',
          'nordic-theme',
          'data-nordic',
          'data-nordic'
        ],
        paths: [
          '/assets/nordic',
          '/assets/nordic'
        ]
      },

      // Normcore (ID: 3269)
      'Normcore': {
        css: [
          'normcore-theme',
          'normcore__',
          'normcore-',
          'normcore-header',
          'normcore'
        ],
        js: [
          'normcore.js',
          'normcore.theme.js',
          'normcore.js'
        ],
        html: [
          '"Normcore"',
          'normcore-theme',
          'data-normcore',
          'data-normcore'
        ],
        paths: [
          '/assets/normcore',
          '/assets/normcore'
        ]
      },

      // North (ID: 1460)
      'North': {
        css: [
          'north-theme',
          'north__',
          'north-',
          'north-header',
          'north'
        ],
        js: [
          'north.js',
          'north.theme.js',
          'north.js'
        ],
        html: [
          '"North"',
          'north-theme',
          'data-north',
          'data-north'
        ],
        paths: [
          '/assets/north',
          '/assets/north'
        ]
      },

      // Nostalgia (ID: 2175)
      'Nostalgia': {
        css: [
          'nostalgia-theme',
          'nostalgia__',
          'nostalgia-',
          'nostalgia-header',
          'nostalgia'
        ],
        js: [
          'nostalgia.js',
          'nostalgia.theme.js',
          'nostalgia.js'
        ],
        html: [
          '"Nostalgia"',
          'nostalgia-theme',
          'data-nostalgia',
          'data-nostalgia'
        ],
        paths: [
          '/assets/nostalgia',
          '/assets/nostalgia'
        ]
      },

      // Nova (ID: 3520)
      'Nova': {
        css: [
          'nova-theme',
          'nova__',
          'nova-',
          'nova-header',
          'nova'
        ],
        js: [
          'nova.js',
          'nova.theme.js',
          'nova.js'
        ],
        html: [
          '"Nova"',
          'nova-theme',
          'data-nova',
          'data-nova'
        ],
        paths: [
          '/assets/nova',
          '/assets/nova'
        ]
      },

      // Origin (ID: 1841)
      'Origin': {
        css: [
          'origin-theme',
          'origin__',
          'origin-',
          'origin-header',
          'origin'
        ],
        js: [
          'origin.js',
          'origin.theme.js',
          'origin.js'
        ],
        html: [
          '"Origin"',
          'origin-theme',
          'data-origin',
          'data-origin'
        ],
        paths: [
          '/assets/origin',
          '/assets/origin'
        ]
      },

      // Outsiders (ID: 2896)
      'Outsiders': {
        css: [
          'outsiders-theme',
          'outsiders__',
          'outsiders-',
          'outsiders-header',
          'outsiders'
        ],
        js: [
          'outsiders.js',
          'outsiders.theme.js',
          'outsiders.js'
        ],
        html: [
          '"Outsiders"',
          'outsiders-theme',
          'data-outsiders',
          'data-outsiders'
        ],
        paths: [
          '/assets/outsiders',
          '/assets/outsiders'
        ]
      },

      // Pacific (ID: 705)
      'Pacific': {
        css: [
          'pacific-theme',
          'pacific__',
          'pacific-',
          'pacific-header',
          'pacific'
        ],
        js: [
          'pacific.js',
          'pacific.theme.js',
          'pacific.js'
        ],
        html: [
          '"Pacific"',
          'pacific-theme',
          'data-pacific',
          'data-pacific'
        ],
        paths: [
          '/assets/pacific',
          '/assets/pacific'
        ]
      },

      // Palo Alto (ID: 777)
      'Palo Alto': {
        css: [
          'palo-alto-theme',
          'palo-alto__',
          'palo-alto-',
          'palo-alto-header',
          'paloalto'
        ],
        js: [
          'palo-alto.js',
          'palo-alto.theme.js',
          'paloalto.js'
        ],
        html: [
          '"Palo Alto"',
          'palo-alto-theme',
          'data-palo-alto',
          'data-paloalto'
        ],
        paths: [
          '/assets/palo-alto',
          '/assets/paloalto'
        ]
      },

      // Paper (ID: 1662)
      'Paper': {
        css: [
          'paper-theme',
          'paper__',
          'paper-',
          'paper-header',
          'paper'
        ],
        js: [
          'paper.js',
          'paper.theme.js',
          'paper.js'
        ],
        html: [
          '"Paper"',
          'paper-theme',
          'data-paper',
          'data-paper'
        ],
        paths: [
          '/assets/paper',
          '/assets/paper'
        ]
      },

      // Parallax (ID: 688)
      'Parallax': {
        css: [
          'parallax-theme',
          'parallax__',
          'parallax-',
          'parallax-header',
          'parallax'
        ],
        js: [
          'parallax.js',
          'parallax.theme.js',
          'parallax.js'
        ],
        html: [
          '"Parallax"',
          'parallax-theme',
          'data-parallax',
          'data-parallax'
        ],
        paths: [
          '/assets/parallax',
          '/assets/parallax'
        ]
      },

      // Paris (ID: 2702)
      'Paris': {
        css: [
          'paris-theme',
          'paris__',
          'paris-',
          'paris-header',
          'paris'
        ],
        js: [
          'paris.js',
          'paris.theme.js',
          'paris.js'
        ],
        html: [
          '"Paris"',
          'paris-theme',
          'data-paris',
          'data-paris'
        ],
        paths: [
          '/assets/paris',
          '/assets/paris'
        ]
      },

      // Pesto (ID: 2275)
      'Pesto': {
        css: [
          'pesto-theme',
          'pesto__',
          'pesto-',
          'pesto-header',
          'pesto'
        ],
        js: [
          'pesto.js',
          'pesto.theme.js',
          'pesto.js'
        ],
        html: [
          '"Pesto"',
          'pesto-theme',
          'data-pesto',
          'data-pesto'
        ],
        paths: [
          '/assets/pesto',
          '/assets/pesto'
        ]
      },

      // Piano (ID: 2812)
      'Piano': {
        css: [
          'piano-theme',
          'piano__',
          'piano-',
          'piano-header',
          'piano'
        ],
        js: [
          'piano.js',
          'piano.theme.js',
          'piano.js'
        ],
        html: [
          '"Piano"',
          'piano-theme',
          'data-piano',
          'data-piano'
        ],
        paths: [
          '/assets/piano',
          '/assets/piano'
        ]
      },

      // Pinnacle (ID: 2852)
      'Pinnacle': {
        css: [
          'pinnacle-theme',
          'pinnacle__',
          'pinnacle-',
          'pinnacle-header',
          'pinnacle'
        ],
        js: [
          'pinnacle.js',
          'pinnacle.theme.js',
          'pinnacle.js'
        ],
        html: [
          '"Pinnacle"',
          'pinnacle-theme',
          'data-pinnacle',
          'data-pinnacle'
        ],
        paths: [
          '/assets/pinnacle',
          '/assets/pinnacle'
        ]
      },

      // Pipeline (ID: 739)
      'Pipeline': {
        css: [
          'pipeline-theme',
          'pipeline__',
          'pipeline-',
          'pipeline-header',
          'pipeline'
        ],
        js: [
          'pipeline.js',
          'pipeline.theme.js',
          'pipeline.js'
        ],
        html: [
          '"Pipeline"',
          'pipeline-theme',
          'data-pipeline',
          'data-pipeline'
        ],
        paths: [
          '/assets/pipeline',
          '/assets/pipeline'
        ]
      },

      // Pitch (ID: 3620)
      'Pitch': {
        css: [
          'pitch-theme',
          'pitch__',
          'pitch-',
          'pitch-header',
          'pitch'
        ],
        js: [
          'pitch.js',
          'pitch.theme.js',
          'pitch.js'
        ],
        html: [
          '"Pitch"',
          'pitch-theme',
          'data-pitch',
          'data-pitch'
        ],
        paths: [
          '/assets/pitch',
          '/assets/pitch'
        ]
      },

      // Polyform (ID: 2493)
      'Polyform': {
        css: [
          'polyform-theme',
          'polyform__',
          'polyform-',
          'polyform-header',
          'polyform'
        ],
        js: [
          'polyform.js',
          'polyform.theme.js',
          'polyform.js'
        ],
        html: [
          '"Polyform"',
          'polyform-theme',
          'data-polyform',
          'data-polyform'
        ],
        paths: [
          '/assets/polyform',
          '/assets/polyform'
        ]
      },

      // Portland (ID: 1924)
      'Portland': {
        css: [
          'portland-theme',
          'portland__',
          'portland-',
          'portland-header',
          'portland'
        ],
        js: [
          'portland.js',
          'portland.theme.js',
          'portland.js'
        ],
        html: [
          '"Portland"',
          'portland-theme',
          'data-portland',
          'data-portland'
        ],
        paths: [
          '/assets/portland',
          '/assets/portland'
        ]
      },

      // Praise (ID: 2144)
      'Praise': {
        css: [
          'praise-theme',
          'praise__',
          'praise-',
          'praise-header',
          'praise'
        ],
        js: [
          'praise.js',
          'praise.theme.js',
          'praise.js'
        ],
        html: [
          '"Praise"',
          'praise-theme',
          'data-praise',
          'data-praise'
        ],
        paths: [
          '/assets/praise',
          '/assets/praise'
        ]
      },

      // Prestige (ID: 855)
      'Prestige': {
        css: [
          'prestige-theme',
          'prestige__',
          'prestige-',
          'prestige-header',
          'prestige'
        ],
        js: [
          'prestige.js',
          'prestige.theme.js',
          'prestige.js'
        ],
        html: [
          '"Prestige"',
          'prestige-theme',
          'data-prestige',
          'data-prestige'
        ],
        paths: [
          '/assets/prestige',
          '/assets/prestige'
        ]
      },

      // Primavera (ID: 3365)
      'Primavera': {
        css: [
          'primavera-theme',
          'primavera__',
          'primavera-',
          'primavera-header',
          'primavera'
        ],
        js: [
          'primavera.js',
          'primavera.theme.js',
          'primavera.js'
        ],
        html: [
          '"Primavera"',
          'primavera-theme',
          'data-primavera',
          'data-primavera'
        ],
        paths: [
          '/assets/primavera',
          '/assets/primavera'
        ]
      },

      // Providence (ID: 587)
      'Providence': {
        css: [
          'providence-theme',
          'providence__',
          'providence-',
          'providence-header',
          'providence'
        ],
        js: [
          'providence.js',
          'providence.theme.js',
          'providence.js'
        ],
        html: [
          '"Providence"',
          'providence-theme',
          'data-providence',
          'data-providence'
        ],
        paths: [
          '/assets/providence',
          '/assets/providence'
        ]
      },

      // Publisher (ID: 1864)
      'Publisher': {
        css: [
          'publisher-theme',
          'publisher__',
          'publisher-',
          'publisher-header',
          'publisher'
        ],
        js: [
          'publisher.js',
          'publisher.theme.js',
          'publisher.js'
        ],
        html: [
          '"Publisher"',
          'publisher-theme',
          'data-publisher',
          'data-publisher'
        ],
        paths: [
          '/assets/publisher',
          '/assets/publisher'
        ]
      },

      // Purely (ID: 3105)
      'Purely': {
        css: [
          'purely-theme',
          'purely__',
          'purely-',
          'purely-header',
          'purely'
        ],
        js: [
          'purely.js',
          'purely.theme.js',
          'purely.js'
        ],
        html: [
          '"Purely"',
          'purely-theme',
          'data-purely',
          'data-purely'
        ],
        paths: [
          '/assets/purely',
          '/assets/purely'
        ]
      },

      // Pursuit (ID: 1654)
      'Pursuit': {
        css: [
          'pursuit-theme',
          'pursuit__',
          'pursuit-',
          'pursuit-header',
          'pursuit'
        ],
        js: [
          'pursuit.js',
          'pursuit.theme.js',
          'pursuit.js'
        ],
        html: [
          '"Pursuit"',
          'pursuit-theme',
          'data-pursuit',
          'data-pursuit'
        ],
        paths: [
          '/assets/pursuit',
          '/assets/pursuit'
        ]
      },

      // Reach (ID: 853)
      'Reach': {
        css: [
          'reach-theme',
          'reach__',
          'reach-',
          'reach-header',
          'reach'
        ],
        js: [
          'reach.js',
          'reach.theme.js',
          'reach.js'
        ],
        html: [
          '"Reach"',
          'reach-theme',
          'data-reach',
          'data-reach'
        ],
        paths: [
          '/assets/reach',
          '/assets/reach'
        ]
      },

      // Redefine (ID: 3007)
      'Redefine': {
        css: [
          'redefine-theme',
          'redefine__',
          'redefine-',
          'redefine-header',
          'redefine'
        ],
        js: [
          'redefine.js',
          'redefine.theme.js',
          'redefine.js'
        ],
        html: [
          '"Redefine"',
          'redefine-theme',
          'data-redefine',
          'data-redefine'
        ],
        paths: [
          '/assets/redefine',
          '/assets/redefine'
        ]
      },

      // Refine (ID: 2782)
      'Refine': {
        css: [
          'refine-theme',
          'refine__',
          'refine-',
          'refine-header',
          'refine'
        ],
        js: [
          'refine.js',
          'refine.theme.js',
          'refine.js'
        ],
        html: [
          '"Refine"',
          'refine-theme',
          'data-refine',
          'data-refine'
        ],
        paths: [
          '/assets/refine',
          '/assets/refine'
        ]
      },

      // Reformation (ID: 1762)
      'Reformation': {
        css: [
          'reformation-theme',
          'reformation__',
          'reformation-',
          'reformation-header',
          'reformation'
        ],
        js: [
          'reformation.js',
          'reformation.theme.js',
          'reformation.js'
        ],
        html: [
          '"Reformation"',
          'reformation-theme',
          'data-reformation',
          'data-reformation'
        ],
        paths: [
          '/assets/reformation',
          '/assets/reformation'
        ]
      },

      // Refresh (ID: 1567)
      'Refresh': {
        css: [
          'refresh-theme',
          'refresh__',
          'refresh-',
          'refresh-header',
          'refresh'
        ],
        js: [
          'refresh.js',
          'refresh.theme.js',
          'refresh.js'
        ],
        html: [
          '"Refresh"',
          'refresh-theme',
          'data-refresh',
          'data-refresh'
        ],
        paths: [
          '/assets/refresh',
          '/assets/refresh'
        ]
      },

      // Relax (ID: 2477)
      'Relax': {
        css: [
          'relax-theme',
          'relax__',
          'relax-',
          'relax-header',
          'relax'
        ],
        js: [
          'relax.js',
          'relax.theme.js',
          'relax.js'
        ],
        html: [
          '"Relax"',
          'relax-theme',
          'data-relax',
          'data-relax'
        ],
        paths: [
          '/assets/relax',
          '/assets/relax'
        ]
      },

      // Release (ID: 2698)
      'Release': {
        css: [
          'release-theme',
          'release__',
          'release-',
          'release-header',
          'release'
        ],
        js: [
          'release.js',
          'release.theme.js',
          'release.js'
        ],
        html: [
          '"Release"',
          'release-theme',
          'data-release',
          'data-release'
        ],
        paths: [
          '/assets/release',
          '/assets/release'
        ]
      },

      // Responsive (ID: 304)
      'Responsive': {
        css: [
          'responsive-theme',
          'responsive__',
          'responsive-',
          'responsive-header',
          'responsive'
        ],
        js: [
          'responsive.js',
          'responsive.theme.js',
          'responsive.js'
        ],
        html: [
          '"Responsive"',
          'responsive-theme',
          'data-responsive',
          'data-responsive'
        ],
        paths: [
          '/assets/responsive',
          '/assets/responsive'
        ]
      },

      // Retina (ID: 601)
      'Retina': {
        css: [
          'retina-theme',
          'retina__',
          'retina-',
          'retina-header',
          'retina'
        ],
        js: [
          'retina.js',
          'retina.theme.js',
          'retina.js'
        ],
        html: [
          '"Retina"',
          'retina-theme',
          'data-retina',
          'data-retina'
        ],
        paths: [
          '/assets/retina',
          '/assets/retina'
        ]
      },

      // Retro (ID: 2630)
      'Retro': {
        css: [
          'retro-theme',
          'retro__',
          'retro-',
          'retro-header',
          'retro'
        ],
        js: [
          'retro.js',
          'retro.theme.js',
          'retro.js'
        ],
        html: [
          '"Retro"',
          'retro-theme',
          'data-retro',
          'data-retro'
        ],
        paths: [
          '/assets/retro',
          '/assets/retro'
        ]
      },

      // Ride (ID: 1500)
      'Ride': {
        css: [
          'ride-theme',
          'ride__',
          'ride-',
          'ride-header',
          'ride'
        ],
        js: [
          'ride.js',
          'ride.theme.js',
          'ride.js'
        ],
        html: [
          '"Ride"',
          'ride-theme',
          'data-ride',
          'data-ride'
        ],
        paths: [
          '/assets/ride',
          '/assets/ride'
        ]
      },

      // Ritual (ID: 3625)
      'Ritual': {
        css: [
          'ritual-theme',
          'ritual__',
          'ritual-',
          'ritual-header',
          'ritual'
        ],
        js: [
          'ritual.js',
          'ritual.theme.js',
          'ritual.js'
        ],
        html: [
          '"Ritual"',
          'ritual-theme',
          'data-ritual',
          'data-ritual'
        ],
        paths: [
          '/assets/ritual',
          '/assets/ritual'
        ]
      },

      // Roam (ID: 1777)
      'Roam': {
        css: [
          'roam-theme',
          'roam__',
          'roam-',
          'roam-header',
          'roam'
        ],
        js: [
          'roam.js',
          'roam.theme.js',
          'roam.js'
        ],
        html: [
          '"Roam"',
          'roam-theme',
          'data-roam',
          'data-roam'
        ],
        paths: [
          '/assets/roam',
          '/assets/roam'
        ]
      },

      // Sahara (ID: 1926)
      'Sahara': {
        css: [
          'sahara-theme',
          'sahara__',
          'sahara-',
          'sahara-header',
          'sahara'
        ],
        js: [
          'sahara.js',
          'sahara.theme.js',
          'sahara.js'
        ],
        html: [
          '"Sahara"',
          'sahara-theme',
          'data-sahara',
          'data-sahara'
        ],
        paths: [
          '/assets/sahara',
          '/assets/sahara'
        ]
      },

      // Sampo (ID: 3470)
      'Sampo': {
        css: [
          'sampo-theme',
          'sampo__',
          'sampo-',
          'sampo-header',
          'sampo'
        ],
        js: [
          'sampo.js',
          'sampo.theme.js',
          'sampo.js'
        ],
        html: [
          '"Sampo"',
          'sampo-theme',
          'data-sampo',
          'data-sampo'
        ],
        paths: [
          '/assets/sampo',
          '/assets/sampo'
        ]
      },

      // San Francisco (ID: 3210)
      'San Francisco': {
        css: [
          'san-francisco-theme',
          'san-francisco__',
          'san-francisco-',
          'san-francisco-header',
          'sanfrancisco'
        ],
        js: [
          'san-francisco.js',
          'san-francisco.theme.js',
          'sanfrancisco.js'
        ],
        html: [
          '"San Francisco"',
          'san-francisco-theme',
          'data-san-francisco',
          'data-sanfrancisco'
        ],
        paths: [
          '/assets/san-francisco',
          '/assets/sanfrancisco'
        ]
      },

      // Satoshi (ID: 2881)
      'Satoshi': {
        css: [
          'satoshi-theme',
          'satoshi__',
          'satoshi-',
          'satoshi-header',
          'satoshi'
        ],
        js: [
          'satoshi.js',
          'satoshi.theme.js',
          'satoshi.js'
        ],
        html: [
          '"Satoshi"',
          'satoshi-theme',
          'data-satoshi',
          'data-satoshi'
        ],
        paths: [
          '/assets/satoshi',
          '/assets/satoshi'
        ]
      },

      // Savor (ID: 3626)
      'Savor': {
        css: [
          'savor-theme',
          'savor__',
          'savor-',
          'savor-header',
          'savor'
        ],
        js: [
          'savor.js',
          'savor.theme.js',
          'savor.js'
        ],
        html: [
          '"Savor"',
          'savor-theme',
          'data-savor',
          'data-savor'
        ],
        paths: [
          '/assets/savor',
          '/assets/savor'
        ]
      },

      // Select (ID: 2372)
      'Select': {
        css: [
          'select-theme',
          'select__',
          'select-',
          'select-header',
          'select'
        ],
        js: [
          'select.js',
          'select.theme.js',
          'select.js'
        ],
        html: [
          '"Select"',
          'select-theme',
          'data-select',
          'data-select'
        ],
        paths: [
          '/assets/select',
          '/assets/select'
        ]
      },

      // Sense (ID: 1356)
      'Sense': {
        css: [
          'sense-theme',
          'sense__',
          'sense-',
          'sense-header',
          'sense'
        ],
        js: [
          'sense.js',
          'sense.theme.js',
          'sense.js'
        ],
        html: [
          '"Sense"',
          'sense-theme',
          'data-sense',
          'data-sense'
        ],
        paths: [
          '/assets/sense',
          '/assets/sense'
        ]
      },

      // Shapes (ID: 1535)
      'Shapes': {
        css: [
          'shapes-theme',
          'shapes__',
          'shapes-',
          'shapes-header',
          'shapes'
        ],
        js: [
          'shapes.js',
          'shapes.theme.js',
          'shapes.js'
        ],
        html: [
          '"Shapes"',
          'shapes-theme',
          'data-shapes',
          'data-shapes'
        ],
        paths: [
          '/assets/shapes',
          '/assets/shapes'
        ]
      },

      // Shark (ID: 2619)
      'Shark': {
        css: [
          'shark-theme',
          'shark__',
          'shark-',
          'shark-header',
          'shark'
        ],
        js: [
          'shark.js',
          'shark.theme.js',
          'shark.js'
        ],
        html: [
          '"Shark"',
          'shark-theme',
          'data-shark',
          'data-shark'
        ],
        paths: [
          '/assets/shark',
          '/assets/shark'
        ]
      },

      // Shine (ID: 2576)
      'Shine': {
        css: [
          'shine-theme',
          'shine__',
          'shine-',
          'shine-header',
          'shine'
        ],
        js: [
          'shine.js',
          'shine.theme.js',
          'shine.js'
        ],
        html: [
          '"Shine"',
          'shine-theme',
          'data-shine',
          'data-shine'
        ],
        paths: [
          '/assets/shine',
          '/assets/shine'
        ]
      },

      // Showcase (ID: 677)
      'Showcase': {
        css: [
          'showcase-theme',
          'showcase__',
          'showcase-',
          'showcase-header',
          'showcase'
        ],
        js: [
          'showcase.js',
          'showcase.theme.js',
          'showcase.js'
        ],
        html: [
          '"Showcase"',
          'showcase-theme',
          'data-showcase',
          'data-showcase'
        ],
        paths: [
          '/assets/showcase',
          '/assets/showcase'
        ]
      },

      // ShowTime (ID: 687)
      'ShowTime': {
        css: [
          'showtime-theme',
          'showtime__',
          'showtime-',
          'showtime-header',
          'showtime'
        ],
        js: [
          'showtime.js',
          'showtime.theme.js',
          'showtime.js'
        ],
        html: [
          '"ShowTime"',
          'showtime-theme',
          'data-showtime',
          'data-showtime'
        ],
        paths: [
          '/assets/showtime',
          '/assets/showtime'
        ]
      },

      // Simple (ID: 578)
      'Simple': {
        css: [
          'simple-theme',
          'simple__',
          'simple-',
          'simple-header',
          'simple'
        ],
        js: [
          'simple.js',
          'simple.theme.js',
          'simple.js'
        ],
        html: [
          '"Simple"',
          'simple-theme',
          'data-simple',
          'data-simple'
        ],
        paths: [
          '/assets/simple',
          '/assets/simple'
        ]
      },

      // Sitar (ID: 2599)
      'Sitar': {
        css: [
          'sitar-theme',
          'sitar__',
          'sitar-',
          'sitar-header',
          'sitar'
        ],
        js: [
          'sitar.js',
          'sitar.theme.js',
          'sitar.js'
        ],
        html: [
          '"Sitar"',
          'sitar-theme',
          'data-sitar',
          'data-sitar'
        ],
        paths: [
          '/assets/sitar',
          '/assets/sitar'
        ]
      },

      // Sleek (ID: 2821)
      'Sleek': {
        css: [
          'sleek-theme',
          'sleek__',
          'sleek-',
          'sleek-header',
          'sleek'
        ],
        js: [
          'sleek.js',
          'sleek.theme.js',
          'sleek.js'
        ],
        html: [
          '"Sleek"',
          'sleek-theme',
          'data-sleek',
          'data-sleek'
        ],
        paths: [
          '/assets/sleek',
          '/assets/sleek'
        ]
      },

      // Soul (ID: 2825)
      'Soul': {
        css: [
          'soul-theme',
          'soul__',
          'soul-',
          'soul-header',
          'soul'
        ],
        js: [
          'soul.js',
          'soul.theme.js',
          'soul.js'
        ],
        html: [
          '"Soul"',
          'soul-theme',
          'data-soul',
          'data-soul'
        ],
        paths: [
          '/assets/soul',
          '/assets/soul'
        ]
      },

      // Space (ID: 2659)
      'Space': {
        css: [
          'space-theme',
          'space__',
          'space-',
          'space-header',
          'space'
        ],
        js: [
          'space.js',
          'space.theme.js',
          'space.js'
        ],
        html: [
          '"Space"',
          'space-theme',
          'data-space',
          'data-space'
        ],
        paths: [
          '/assets/space',
          '/assets/space'
        ]
      },

      // Spark (ID: 911)
      'Spark': {
        css: [
          'spark-theme',
          'spark__',
          'spark-',
          'spark-header',
          'spark'
        ],
        js: [
          'spark.js',
          'spark.theme.js',
          'spark.js'
        ],
        html: [
          '"Spark"',
          'spark-theme',
          'data-spark',
          'data-spark'
        ],
        paths: [
          '/assets/spark',
          '/assets/spark'
        ]
      },

      // Split (ID: 842)
      'Split': {
        css: [
          'split-theme',
          'split__',
          'split-',
          'split-header',
          'split'
        ],
        js: [
          'split.js',
          'split.theme.js',
          'split.js'
        ],
        html: [
          '"Split"',
          'split-theme',
          'data-split',
          'data-split'
        ],
        paths: [
          '/assets/split',
          '/assets/split'
        ]
      },

      // Starlite (ID: 2455)
      'Starlite': {
        css: [
          'starlite-theme',
          'starlite__',
          'starlite-',
          'starlite-header',
          'starlite'
        ],
        js: [
          'starlite.js',
          'starlite.theme.js',
          'starlite.js'
        ],
        html: [
          '"Starlite"',
          'starlite-theme',
          'data-starlite',
          'data-starlite'
        ],
        paths: [
          '/assets/starlite',
          '/assets/starlite'
        ]
      },

      // Startup (ID: 652)
      'Startup': {
        css: [
          'startup-theme',
          'startup__',
          'startup-',
          'startup-header',
          'startup'
        ],
        js: [
          'startup.js',
          'startup.theme.js',
          'startup.js'
        ],
        html: [
          '"Startup"',
          'startup-theme',
          'data-startup',
          'data-startup'
        ],
        paths: [
          '/assets/startup',
          '/assets/startup'
        ]
      },

      // Stiletto (ID: 1621)
      'Stiletto': {
        css: [
          'stiletto-theme',
          'stiletto__',
          'stiletto-',
          'stiletto-header',
          'stiletto'
        ],
        js: [
          'stiletto.js',
          'stiletto.theme.js',
          'stiletto.js'
        ],
        html: [
          '"Stiletto"',
          'stiletto-theme',
          'data-stiletto',
          'data-stiletto'
        ],
        paths: [
          '/assets/stiletto',
          '/assets/stiletto'
        ]
      },

      // Stockholm (ID: 1405)
      'Stockholm': {
        css: [
          'stockholm-theme',
          'stockholm__',
          'stockholm-',
          'stockholm-header',
          'stockholm'
        ],
        js: [
          'stockholm.js',
          'stockholm.theme.js',
          'stockholm.js'
        ],
        html: [
          '"Stockholm"',
          'stockholm-theme',
          'data-stockholm',
          'data-stockholm'
        ],
        paths: [
          '/assets/stockholm',
          '/assets/stockholm'
        ]
      },

      // Stockmart (ID: 2105)
      'Stockmart': {
        css: [
          'stockmart-theme',
          'stockmart__',
          'stockmart-',
          'stockmart-header',
          'stockmart'
        ],
        js: [
          'stockmart.js',
          'stockmart.theme.js',
          'stockmart.js'
        ],
        html: [
          '"Stockmart"',
          'stockmart-theme',
          'data-stockmart',
          'data-stockmart'
        ],
        paths: [
          '/assets/stockmart',
          '/assets/stockmart'
        ]
      },

      // Story (ID: 864)
      'Story': {
        css: [
          'story-theme',
          'story__',
          'story-',
          'story-header',
          'story'
        ],
        js: [
          'story.js',
          'story.theme.js',
          'story.js'
        ],
        html: [
          '"Story"',
          'story-theme',
          'data-story',
          'data-story'
        ],
        paths: [
          '/assets/story',
          '/assets/story'
        ]
      },

      // Streamline (ID: 872)
      'Streamline': {
        css: [
          'streamline-theme',
          'streamline__',
          'streamline-',
          'streamline-header',
          'streamline'
        ],
        js: [
          'streamline.js',
          'streamline.theme.js',
          'streamline.js'
        ],
        html: [
          '"Streamline"',
          'streamline-theme',
          'data-streamline',
          'data-streamline'
        ],
        paths: [
          '/assets/streamline',
          '/assets/streamline'
        ]
      },

      // Stretch (ID: 1765)
      'Stretch': {
        css: [
          'stretch-theme',
          'stretch__',
          'stretch-',
          'stretch-header',
          'stretch'
        ],
        js: [
          'stretch.js',
          'stretch.theme.js',
          'stretch.js'
        ],
        html: [
          '"Stretch"',
          'stretch-theme',
          'data-stretch',
          'data-stretch'
        ],
        paths: [
          '/assets/stretch',
          '/assets/stretch'
        ]
      },

      // Strong (ID: 3385)
      'Strong': {
        css: [
          'strong-theme',
          'strong__',
          'strong-',
          'strong-header',
          'strong'
        ],
        js: [
          'strong.js',
          'strong.theme.js',
          'strong.js'
        ],
        html: [
          '"Strong"',
          'strong-theme',
          'data-strong',
          'data-strong'
        ],
        paths: [
          '/assets/strong',
          '/assets/strong'
        ]
      },

      // Studio (ID: 1431)
      'Studio': {
        css: [
          'studio-theme',
          'studio__',
          'studio-',
          'studio-header',
          'studio'
        ],
        js: [
          'studio.js',
          'studio.theme.js',
          'studio.js'
        ],
        html: [
          '"Studio"',
          'studio-theme',
          'data-studio',
          'data-studio'
        ],
        paths: [
          '/assets/studio',
          '/assets/studio'
        ]
      },

      // StyleScape (ID: 2238)
      'StyleScape': {
        css: [
          'stylescape-theme',
          'stylescape__',
          'stylescape-',
          'stylescape-header',
          'stylescape'
        ],
        js: [
          'stylescape.js',
          'stylescape.theme.js',
          'stylescape.js'
        ],
        html: [
          '"StyleScape"',
          'stylescape-theme',
          'data-stylescape',
          'data-stylescape'
        ],
        paths: [
          '/assets/stylescape',
          '/assets/stylescape'
        ]
      },

      // Sunrise (ID: 57)
      'Sunrise': {
        css: [
          'sunrise-theme',
          'sunrise__',
          'sunrise-',
          'sunrise-header',
          'sunrise'
        ],
        js: [
          'sunrise.js',
          'sunrise.theme.js',
          'sunrise.js'
        ],
        html: [
          '"Sunrise"',
          'sunrise-theme',
          'data-sunrise',
          'data-sunrise'
        ],
        paths: [
          '/assets/sunrise',
          '/assets/sunrise'
        ]
      },

      // Supply (ID: 679)
      'Supply': {
        css: [
          'supply-theme',
          'supply__',
          'supply-',
          'supply-header',
          'supply'
        ],
        js: [
          'supply.js',
          'supply.theme.js',
          'supply.js'
        ],
        html: [
          '"Supply"',
          'supply-theme',
          'data-supply',
          'data-supply'
        ],
        paths: [
          '/assets/supply',
          '/assets/supply'
        ]
      },

      // Swipe (ID: 2737)
      'Swipe': {
        css: [
          'swipe-theme',
          'swipe__',
          'swipe-',
          'swipe-header',
          'swipe'
        ],
        js: [
          'swipe.js',
          'swipe.theme.js',
          'swipe.js'
        ],
        html: [
          '"Swipe"',
          'swipe-theme',
          'data-swipe',
          'data-swipe'
        ],
        paths: [
          '/assets/swipe',
          '/assets/swipe'
        ]
      },

      // Swiss (ID: 3038)
      'Swiss': {
        css: [
          'swiss-theme',
          'swiss__',
          'swiss-',
          'swiss-header',
          'swiss'
        ],
        js: [
          'swiss.js',
          'swiss.theme.js',
          'swiss.js'
        ],
        html: [
          '"Swiss"',
          'swiss-theme',
          'data-swiss',
          'data-swiss'
        ],
        paths: [
          '/assets/swiss',
          '/assets/swiss'
        ]
      },

      // Sydney (ID: 2117)
      'Sydney': {
        css: [
          'sydney-theme',
          'sydney__',
          'sydney-',
          'sydney-header',
          'sydney'
        ],
        js: [
          'sydney.js',
          'sydney.theme.js',
          'sydney.js'
        ],
        html: [
          '"Sydney"',
          'sydney-theme',
          'data-sydney',
          'data-sydney'
        ],
        paths: [
          '/assets/sydney',
          '/assets/sydney'
        ]
      },

      // Symmetry (ID: 568)
      'Symmetry': {
        css: [
          'symmetry-theme',
          'symmetry__',
          'symmetry-',
          'symmetry-header',
          'symmetry'
        ],
        js: [
          'symmetry.js',
          'symmetry.theme.js',
          'symmetry.js'
        ],
        html: [
          '"Symmetry"',
          'symmetry-theme',
          'data-symmetry',
          'data-symmetry'
        ],
        paths: [
          '/assets/symmetry',
          '/assets/symmetry'
        ]
      },

      // Taiga (ID: 1751)
      'Taiga': {
        css: [
          'taiga-theme',
          'taiga__',
          'taiga-',
          'taiga-header',
          'taiga'
        ],
        js: [
          'taiga.js',
          'taiga.theme.js',
          'taiga.js'
        ],
        html: [
          '"Taiga"',
          'taiga-theme',
          'data-taiga',
          'data-taiga'
        ],
        paths: [
          '/assets/taiga',
          '/assets/taiga'
        ]
      },

      // Tailor (ID: 1457)
      'Tailor': {
        css: [
          'tailor-theme',
          'tailor__',
          'tailor-',
          'tailor-header',
          'tailor'
        ],
        js: [
          'tailor.js',
          'tailor.theme.js',
          'tailor.js'
        ],
        html: [
          '"Tailor"',
          'tailor-theme',
          'data-tailor',
          'data-tailor'
        ],
        paths: [
          '/assets/tailor',
          '/assets/tailor'
        ]
      },

      // Takeout (ID: 2534)
      'Takeout': {
        css: [
          'takeout-theme',
          'takeout__',
          'takeout-',
          'takeout-header',
          'takeout'
        ],
        js: [
          'takeout.js',
          'takeout.theme.js',
          'takeout.js'
        ],
        html: [
          '"Takeout"',
          'takeout-theme',
          'data-takeout',
          'data-takeout'
        ],
        paths: [
          '/assets/takeout',
          '/assets/takeout'
        ]
      },

      // Taste (ID: 1434)
      'Taste': {
        css: [
          'taste-theme',
          'taste__',
          'taste-',
          'taste-header',
          'taste'
        ],
        js: [
          'taste.js',
          'taste.theme.js',
          'taste.js'
        ],
        html: [
          '"Taste"',
          'taste-theme',
          'data-taste',
          'data-taste'
        ],
        paths: [
          '/assets/taste',
          '/assets/taste'
        ]
      },

      // Testament (ID: 623)
      'Testament': {
        css: [
          'testament-theme',
          'testament__',
          'testament-',
          'testament-header',
          'testament'
        ],
        js: [
          'testament.js',
          'testament.theme.js',
          'testament.js'
        ],
        html: [
          '"Testament"',
          'testament-theme',
          'data-testament',
          'data-testament'
        ],
        paths: [
          '/assets/testament',
          '/assets/testament'
        ]
      },

      // Tinker (ID: 3627)
      'Tinker': {
        css: [
          'tinker-theme',
          'tinker__',
          'tinker-',
          'tinker-header',
          'tinker'
        ],
        js: [
          'tinker.js',
          'tinker.theme.js',
          'tinker.js'
        ],
        html: [
          '"Tinker"',
          'tinker-theme',
          'data-tinker',
          'data-tinker'
        ],
        paths: [
          '/assets/tinker',
          '/assets/tinker'
        ]
      },

      // Tokyo (ID: 2629)
      'Tokyo': {
        css: [
          'tokyo-theme',
          'tokyo__',
          'tokyo-',
          'tokyo-header',
          'tokyo'
        ],
        js: [
          'tokyo.js',
          'tokyo.theme.js',
          'tokyo.js'
        ],
        html: [
          '"Tokyo"',
          'tokyo-theme',
          'data-tokyo',
          'data-tokyo'
        ],
        paths: [
          '/assets/tokyo',
          '/assets/tokyo'
        ]
      },

      // Toyo (ID: 2358)
      'Toyo': {
        css: [
          'toyo-theme',
          'toyo__',
          'toyo-',
          'toyo-header',
          'toyo'
        ],
        js: [
          'toyo.js',
          'toyo.theme.js',
          'toyo.js'
        ],
        html: [
          '"Toyo"',
          'toyo-theme',
          'data-toyo',
          'data-toyo'
        ],
        paths: [
          '/assets/toyo',
          '/assets/toyo'
        ]
      },

      // Trade (ID: 2699)
      'Trade': {
        css: [
          'trade-theme',
          'trade__',
          'trade-',
          'trade-header',
          'trade'
        ],
        js: [
          'trade.js',
          'trade.theme.js',
          'trade.js'
        ],
        html: [
          '"Trade"',
          'trade-theme',
          'data-trade',
          'data-trade'
        ],
        paths: [
          '/assets/trade',
          '/assets/trade'
        ]
      },

      // Ultra (ID: 2967)
      'Ultra': {
        css: [
          'ultra-theme',
          'ultra__',
          'ultra-',
          'ultra-header',
          'ultra'
        ],
        js: [
          'ultra.js',
          'ultra.theme.js',
          'ultra.js'
        ],
        html: [
          '"Ultra"',
          'ultra-theme',
          'data-ultra',
          'data-ultra'
        ],
        paths: [
          '/assets/ultra',
          '/assets/ultra'
        ]
      },

      // Unicorn (ID: 2264)
      'Unicorn': {
        css: [
          'unicorn-theme',
          'unicorn__',
          'unicorn-',
          'unicorn-header',
          'unicorn'
        ],
        js: [
          'unicorn.js',
          'unicorn.theme.js',
          'unicorn.js'
        ],
        html: [
          '"Unicorn"',
          'unicorn-theme',
          'data-unicorn',
          'data-unicorn'
        ],
        paths: [
          '/assets/unicorn',
          '/assets/unicorn'
        ]
      },

      // Upscale (ID: 1754)
      'Upscale': {
        css: [
          'upscale-theme',
          'upscale__',
          'upscale-',
          'upscale-header',
          'upscale'
        ],
        js: [
          'upscale.js',
          'upscale.theme.js',
          'upscale.js'
        ],
        html: [
          '"Upscale"',
          'upscale-theme',
          'data-upscale',
          'data-upscale'
        ],
        paths: [
          '/assets/upscale',
          '/assets/upscale'
        ]
      },

      // Urban (ID: 2405)
      'Urban': {
        css: [
          'urban-theme',
          'urban__',
          'urban-',
          'urban-header',
          'urban'
        ],
        js: [
          'urban.js',
          'urban.theme.js',
          'urban.js'
        ],
        html: [
          '"Urban"',
          'urban-theme',
          'data-urban',
          'data-urban'
        ],
        paths: [
          '/assets/urban',
          '/assets/urban'
        ]
      },

      // Urge (ID: 2213)
      'Urge': {
        css: [
          'urge-theme',
          'urge__',
          'urge-',
          'urge-header',
          'urge'
        ],
        js: [
          'urge.js',
          'urge.theme.js',
          'urge.js'
        ],
        html: [
          '"Urge"',
          'urge-theme',
          'data-urge',
          'data-urge'
        ],
        paths: [
          '/assets/urge',
          '/assets/urge'
        ]
      },

      // Vantage (ID: 459)
      'Vantage': {
        css: [
          'vantage-theme',
          'vantage__',
          'vantage-',
          'vantage-header',
          'vantage'
        ],
        js: [
          'vantage.js',
          'vantage.theme.js',
          'vantage.js'
        ],
        html: [
          '"Vantage"',
          'vantage-theme',
          'data-vantage',
          'data-vantage'
        ],
        paths: [
          '/assets/vantage',
          '/assets/vantage'
        ]
      },

      // Veena (ID: 2566)
      'Veena': {
        css: [
          'veena-theme',
          'veena__',
          'veena-',
          'veena-header',
          'veena'
        ],
        js: [
          'veena.js',
          'veena.theme.js',
          'veena.js'
        ],
        html: [
          '"Veena"',
          'veena-theme',
          'data-veena',
          'data-veena'
        ],
        paths: [
          '/assets/veena',
          '/assets/veena'
        ]
      },

      // Venture (ID: 775)
      'Venture': {
        css: [
          'venture-theme',
          'venture__',
          'venture-',
          'venture-header',
          'venture'
        ],
        js: [
          'venture.js',
          'venture.theme.js',
          'venture.js'
        ],
        html: [
          '"Venture"',
          'venture-theme',
          'data-venture',
          'data-venture'
        ],
        paths: [
          '/assets/venture',
          '/assets/venture'
        ]
      },

      // Venue (ID: 836)
      'Venue': {
        css: [
          'venue-theme',
          'venue__',
          'venue-',
          'venue-header',
          'venue'
        ],
        js: [
          'venue.js',
          'venue.theme.js',
          'venue.js'
        ],
        html: [
          '"Venue"',
          'venue-theme',
          'data-venue',
          'data-venue'
        ],
        paths: [
          '/assets/venue',
          '/assets/venue'
        ]
      },

      // Vessel (ID: 3628)
      'Vessel': {
        css: [
          'vessel-theme',
          'vessel__',
          'vessel-',
          'vessel-header',
          'vessel'
        ],
        js: [
          'vessel.js',
          'vessel.theme.js',
          'vessel.js'
        ],
        html: [
          '"Vessel"',
          'vessel-theme',
          'data-vessel',
          'data-vessel'
        ],
        paths: [
          '/assets/vessel',
          '/assets/vessel'
        ]
      },

      // Vincent (ID: 2913)
      'Vincent': {
        css: [
          'vincent-theme',
          'vincent__',
          'vincent-',
          'vincent-header',
          'vincent'
        ],
        js: [
          'vincent.js',
          'vincent.theme.js',
          'vincent.js'
        ],
        html: [
          '"Vincent"',
          'vincent-theme',
          'data-vincent',
          'data-vincent'
        ],
        paths: [
          '/assets/vincent',
          '/assets/vincent'
        ]
      },

      // Viola (ID: 1701)
      'Viola': {
        css: [
          'viola-theme',
          'viola__',
          'viola-',
          'viola-header',
          'viola'
        ],
        js: [
          'viola.js',
          'viola.theme.js',
          'viola.js'
        ],
        html: [
          '"Viola"',
          'viola-theme',
          'data-viola',
          'data-viola'
        ],
        paths: [
          '/assets/viola',
          '/assets/viola'
        ]
      },

      // Vision (ID: 2053)
      'Vision': {
        css: [
          'vision-theme',
          'vision__',
          'vision-',
          'vision-header',
          'vision'
        ],
        js: [
          'vision.js',
          'vision.theme.js',
          'vision.js'
        ],
        html: [
          '"Vision"',
          'vision-theme',
          'data-vision',
          'data-vision'
        ],
        paths: [
          '/assets/vision',
          '/assets/vision'
        ]
      },

      // Vivid (ID: 2285)
      'Vivid': {
        css: [
          'vivid-theme',
          'vivid__',
          'vivid-',
          'vivid-header',
          'vivid'
        ],
        js: [
          'vivid.js',
          'vivid.theme.js',
          'vivid.js'
        ],
        html: [
          '"Vivid"',
          'vivid-theme',
          'data-vivid',
          'data-vivid'
        ],
        paths: [
          '/assets/vivid',
          '/assets/vivid'
        ]
      },

      // Vogue (ID: 808)
      'Vogue': {
        css: [
          'vogue-theme',
          'vogue__',
          'vogue-',
          'vogue-header',
          'vogue'
        ],
        js: [
          'vogue.js',
          'vogue.theme.js',
          'vogue.js'
        ],
        html: [
          '"Vogue"',
          'vogue-theme',
          'data-vogue',
          'data-vogue'
        ],
        paths: [
          '/assets/vogue',
          '/assets/vogue'
        ]
      },

      // Volume (ID: 2837)
      'Volume': {
        css: [
          'volume-theme',
          'volume__',
          'volume-',
          'volume-header',
          'volume'
        ],
        js: [
          'volume.js',
          'volume.theme.js',
          'volume.js'
        ],
        html: [
          '"Volume"',
          'volume-theme',
          'data-volume',
          'data-volume'
        ],
        paths: [
          '/assets/volume',
          '/assets/volume'
        ]
      },

      // Warehouse (ID: 871)
      'Warehouse': {
        css: [
          'warehouse-theme',
          'warehouse__',
          'warehouse-',
          'warehouse-header',
          'warehouse'
        ],
        js: [
          'warehouse.js',
          'warehouse.theme.js',
          'warehouse.js'
        ],
        html: [
          '"Warehouse"',
          'warehouse-theme',
          'data-warehouse',
          'data-warehouse'
        ],
        paths: [
          '/assets/warehouse',
          '/assets/warehouse'
        ]
      },

      // Whisk (ID: 1819)
      'Whisk': {
        css: [
          'whisk-theme',
          'whisk__',
          'whisk-',
          'whisk-header',
          'whisk'
        ],
        js: [
          'whisk.js',
          'whisk.theme.js',
          'whisk.js'
        ],
        html: [
          '"Whisk"',
          'whisk-theme',
          'data-whisk',
          'data-whisk'
        ],
        paths: [
          '/assets/whisk',
          '/assets/whisk'
        ]
      },

      // Wonder (ID: 2684)
      'Wonder': {
        css: [
          'wonder-theme',
          'wonder__',
          'wonder-',
          'wonder-header',
          'wonder'
        ],
        js: [
          'wonder.js',
          'wonder.theme.js',
          'wonder.js'
        ],
        html: [
          '"Wonder"',
          'wonder-theme',
          'data-wonder',
          'data-wonder'
        ],
        paths: [
          '/assets/wonder',
          '/assets/wonder'
        ]
      },

      // Woodstock (ID: 2239)
      'Woodstock': {
        css: [
          'woodstock-theme',
          'woodstock__',
          'woodstock-',
          'woodstock-header',
          'woodstock'
        ],
        js: [
          'woodstock.js',
          'woodstock.theme.js',
          'woodstock.js'
        ],
        html: [
          '"Woodstock"',
          'woodstock-theme',
          'data-woodstock',
          'data-woodstock'
        ],
        paths: [
          '/assets/woodstock',
          '/assets/woodstock'
        ]
      },

      // Xclusive (ID: 2221)
      'Xclusive': {
        css: [
          'xclusive-theme',
          'xclusive__',
          'xclusive-',
          'xclusive-header',
          'xclusive'
        ],
        js: [
          'xclusive.js',
          'xclusive.theme.js',
          'xclusive.js'
        ],
        html: [
          '"Xclusive"',
          'xclusive-theme',
          'data-xclusive',
          'data-xclusive'
        ],
        paths: [
          '/assets/xclusive',
          '/assets/xclusive'
        ]
      },

      // Xtra (ID: 1609)
      'Xtra': {
        css: [
          'xtra-theme',
          'xtra__',
          'xtra-',
          'xtra-header',
          'xtra'
        ],
        js: [
          'xtra.js',
          'xtra.theme.js',
          'xtra.js'
        ],
        html: [
          '"Xtra"',
          'xtra-theme',
          'data-xtra',
          'data-xtra'
        ],
        paths: [
          '/assets/xtra',
          '/assets/xtra'
        ]
      },

      // Yuva (ID: 1615)
      'Yuva': {
        css: [
          'yuva-theme',
          'yuva__',
          'yuva-',
          'yuva-header',
          'yuva'
        ],
        js: [
          'yuva.js',
          'yuva.theme.js',
          'yuva.js'
        ],
        html: [
          '"Yuva"',
          'yuva-theme',
          'data-yuva',
          'data-yuva'
        ],
        paths: [
          '/assets/yuva',
          '/assets/yuva'
        ]
      },

      // Zero (ID: 3300)
      'Zero': {
        css: [
          'zero-theme',
          'zero__',
          'zero-',
          'zero-header',
          'zero'
        ],
        js: [
          'zero.js',
          'zero.theme.js',
          'zero.js'
        ],
        html: [
          '"Zero"',
          'zero-theme',
          'data-zero',
          'data-zero'
        ],
        paths: [
          '/assets/zero',
          '/assets/zero'
        ]
      },

      // Zest (ID: 1611)
      'Zest': {
        css: [
          'zest-theme',
          'zest__',
          'zest-',
          'zest-header',
          'zest'
        ],
        js: [
          'zest.js',
          'zest.theme.js',
          'zest.js'
        ],
        html: [
          '"Zest"',
          'zest-theme',
          'data-zest',
          'data-zest'
        ],
        paths: [
          '/assets/zest',
          '/assets/zest'
        ]
      },

      // Zora (ID: 2505)
      'Zora': {
        css: [
          'zora-theme',
          'zora__',
          'zora-',
          'zora-header',
          'zora'
        ],
        js: [
          'zora.js',
          'zora.theme.js',
          'zora.js'
        ],
        html: [
          '"Zora"',
          'zora-theme',
          'data-zora',
          'data-zora'
        ],
        paths: [
          '/assets/zora',
          '/assets/zora'
        ]
      },
    };
  }

  async detectTheme(url) {
    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      console.log(`Analyzing: ${url}`);

      const response = await axios.get(url, {
        timeout: 12000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const html = response.data;
      const $ = cheerio.load(html);

      if (!this.isShopifyStore(html, $)) {
        return {
          isShopify: false,
          theme: null,
          confidence: 0,
          error: 'Not a Shopify store'
        };
      }

      const results = this.analyzeFingerprints(html, $);
      
      return {
        isShopify: true,
        theme: results.theme,
        confidence: results.confidence,
        matchedFingerprints: results.matches,
        customizations: results.customizations,
        allScores: results.allScores
      };

    } catch (error) {
      return {
        isShopify: false,
        theme: null,
        confidence: 0,
        error: error.message
      };
    }
  }

  isShopifyStore(html, $) {
    const shopifyIndicators = [
      'Shopify.shop',
      'shopify.com',
      'shopify-analytics',
      'window.Shopify',
      'myshopify.com',
      'Shopify.routes',
      'shopify-section',
      'data-shopify'
    ];

    return shopifyIndicators.some(indicator => 
      html.toLowerCase().includes(indicator.toLowerCase())
    );
  }

  analyzeFingerprints(html, $) {
    const scores = {};
    const matchDetails = {};
    const htmlLower = html.toLowerCase();

    // 分析每个主题
    for (const [themeName, fingerprints] of Object.entries(this.themeFingerprints)) {
      scores[themeName] = 0;
      matchDetails[themeName] = {
        css: [],
        js: [],
        html: [],
        paths: []
      };

      // CSS指纹检测 (权重2-4)
      fingerprints.css.forEach(cssPattern => {
        const pattern = cssPattern.toLowerCase();
        if (htmlLower.includes(pattern)) {
          let weight = 2;
          if (pattern.includes(themeName.toLowerCase())) weight = 4;
          if (pattern.includes('__') || pattern.includes('--')) weight = 3;
          
          scores[themeName] += weight;
          matchDetails[themeName].css.push(cssPattern);
        }
      });

      // JavaScript指纹检测 (权重3-6)
      fingerprints.js.forEach(jsPattern => {
        const pattern = jsPattern.toLowerCase();
        if (htmlLower.includes(pattern)) {
          let weight = 3;
          if (pattern.includes(themeName.toLowerCase())) weight = 6;
          if (pattern.includes('.js')) weight = 4;
          
          scores[themeName] += weight;
          matchDetails[themeName].js.push(jsPattern);
        }
      });

      // HTML指纹检测 (权重4-8)
      fingerprints.html.forEach(htmlPattern => {
        const pattern = htmlPattern.toLowerCase();
        if (htmlLower.includes(pattern)) {
          let weight = 4;
          if (pattern.includes(`"${themeName.toLowerCase()}"`)) weight = 8;
          if (pattern.includes('theme_name')) weight = 7;
          
          scores[themeName] += weight;
          matchDetails[themeName].html.push(htmlPattern);
        }
      });

      // 路径指纹检测 (权重3-5)
      fingerprints.paths.forEach(pathPattern => {
        const pattern = pathPattern.toLowerCase();
        if (htmlLower.includes(pattern)) {
          let weight = 3;
          if (pattern.includes(themeName.toLowerCase())) weight = 5;
          
          scores[themeName] += weight;
          matchDetails[themeName].paths.push(pathPattern);
        }
      });
    }

    // 找到最高分主题
    const bestMatch = Object.entries(scores).reduce((best, [theme, score]) => {
      return score > best.score ? { theme, score } : best;
    }, { theme: null, score: 0 });

    // 计算置信度
    let confidence = 0;
    if (bestMatch.score > 0) {
      // 基础置信度
      const maxPossibleScore = 35;
      confidence = Math.min(90, Math.round((bestMatch.score / maxPossibleScore) * 100));
      
      // 多类型匹配加分
      const matches = matchDetails[bestMatch.theme] || {};
      const matchTypes = [
        matches.css?.length > 0,
        matches.js?.length > 0, 
        matches.html?.length > 0,
        matches.paths?.length > 0
      ].filter(Boolean).length;
      
      if (matchTypes >= 3) confidence = Math.min(100, confidence + 20);
      else if (matchTypes >= 2) confidence = Math.min(100, confidence + 10);
      
      // 特定主题名匹配大幅加分
      if (matches.html?.some(h => h.toLowerCase().includes(`"${bestMatch.theme.toLowerCase()}"`))) {
        confidence = Math.min(100, confidence + 15);
      }
    }

    // 检测自定义
    const customizations = this.detectCustomizations(html, $);

    return {
      theme: bestMatch.score > 8 ? bestMatch.theme : 'Unknown', // 提高阈值
      confidence: bestMatch.score > 8 ? confidence : 0,
      matches: matchDetails[bestMatch.theme] || {},
      customizations,
      allScores: scores
    };
  }

  detectCustomizations(html, $) {
    const customizationIndicators = [
      'custom.css',
      'custom.js',
      'custom-',
      'modified',
      'theme-',
      'custom_'
    ];

    const foundCustomizations = customizationIndicators.filter(indicator =>
      html.toLowerCase().includes(indicator.toLowerCase())
    );

    return {
      hasCustomizations: foundCustomizations.length > 0,
      indicators: foundCustomizations
    };
  }
}

module.exports = ShopifyThemeDetectorV2;

// 使用示例
async function detectShopifyThemeV2(url) {
  const detector = new ShopifyThemeDetectorV2();
  return await detector.detectTheme(url);
}

module.exports = { ShopifyThemeDetectorV2, detectShopifyThemeV2 };
