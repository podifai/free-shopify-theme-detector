const axios = require('axios');

// Enhanced theme patterns for all official Shopify themes
const themeFingerprints = {
    // Free Shopify Themes
    'Dawn': ['color-scheme-1', 'color-scheme-2', '"Dawn"', 'dawn-theme', 'theme-dawn'],
    'Sense': ['sense-theme', '"Sense"', 'predictive-search', 'collection-filters', 'sense--'],
    'Craft': ['craft-theme', '"Craft"', 'collection-hero', 'product-media', 'craft--'],
    'Colorblock': ['colorblock-theme', '"Colorblock"', 'color-block', 'hero-colorblock', 'colorblock--'],
    'Taste': ['taste-theme', '"Taste"', 'hero-taste', 'product-taste', 'taste--'],
    'Crave': ['crave-theme', '"Crave"', 'hero-crave', 'collection-crave', 'crave--'],
    'Studio': ['studio-theme', '"Studio"', 'hero-studio', 'product-studio', 'studio--'],
    'Refresh': ['refresh-theme', '"Refresh"', 'hero-refresh', 'collection-refresh', 'refresh--'],
    'Publisher': ['publisher-theme', '"Publisher"', 'publisher--', 'theme-publisher', 'hero-publisher'],
    'Origin': ['origin-theme', '"Origin"', 'origin--', 'theme-origin', 'hero-origin'],
    
    // Official Premium Themes - A-D
    'Abode': ['abode-theme', '"Abode"', 'abode--', 'theme-abode', 'hero-abode'],
    'Alchemy': ['alchemy-theme', '"Alchemy"', 'alchemy--', 'theme-alchemy', 'hero-alchemy'],
    'Aesthetic': ['aesthetic-theme', '"Aesthetic"', 'aesthetic--', 'theme-aesthetic', 'hero-aesthetic'],
    'Agile': ['agile-theme', '"Agile"', 'agile--', 'theme-agile', 'hero-agile'],
    'Aisle': ['aisle-theme', '"Aisle"', 'aisle--', 'theme-aisle', 'hero-aisle'],
    'Align': ['align-theme', '"Align"', 'align--', 'theme-align', 'hero-align'],
    'Amber': ['amber-theme', '"Amber"', 'amber--', 'theme-amber', 'hero-amber'],
    'Andaman': ['andaman-theme', '"Andaman"', 'andaman--', 'theme-andaman', 'hero-andaman'],
    'Area': ['area-theme', '"Area"', 'area--', 'theme-area', 'hero-area'],
    'Artisan': ['artisan-theme', '"Artisan"', 'artisan--', 'theme-artisan', 'hero-artisan'],
    'Artist': ['artist-theme', '"Artist"', 'artist--', 'theme-artist', 'hero-artist'],
    'Athens': ['athens-theme', '"Athens"', 'athens--', 'theme-athens', 'hero-athens'],
    'Atlantic': ['atlantic-theme', '"Atlantic"', 'atlantic--', 'theme-atlantic', 'hero-atlantic'],
    'Atom': ['atom-theme', '"Atom"', 'atom--', 'theme-atom', 'hero-atom'],
    'Aurora': ['aurora-theme', '"Aurora"', 'aurora--', 'theme-aurora', 'hero-aurora'],
    'Automation': ['automation-theme', '"Automation"', 'automation--', 'theme-automation', 'hero-automation'],
    'Avante': ['avante-theme', '"Avante"', 'avante--', 'theme-avante', 'hero-avante'],
    'Avatar': ['avatar-theme', '"Avatar"', 'avatar--', 'theme-avatar', 'hero-avatar'],
    'Avenue': ['avenue-theme', '"Avenue"', 'avenue--', 'theme-avenue', 'hero-avenue'],
    
    'Banjo': ['banjo-theme', '"Banjo"', 'banjo--', 'theme-banjo', 'hero-banjo'],
    'Barcelona': ['barcelona-theme', '"Barcelona"', 'barcelona--', 'theme-barcelona', 'hero-barcelona'],
    'Baseline': ['baseline-theme', '"Baseline"', 'baseline--', 'theme-baseline', 'hero-baseline'],
    'Bazaar': ['bazaar-theme', '"Bazaar"', 'bazaar--', 'theme-bazaar', 'hero-bazaar'],
    'Be Yours': ['be-yours-theme', '"Be yours"', 'be-yours--', 'theme-be-yours', 'hero-be-yours'],
    'Berlin': ['berlin-theme', '"Berlin"', 'berlin--', 'theme-berlin', 'hero-berlin'],
    'Beyond': ['beyond-theme', '"Beyond"', 'beyond--', 'theme-beyond', 'hero-beyond'],
    'Blockshop': ['blockshop-theme', '"Blockshop"', 'blockshop--', 'theme-blockshop', 'hero-blockshop'],
    'Blum': ['blum-theme', '"Blum"', 'blum--', 'theme-blum', 'hero-blum'],
    'Boost': ['boost-theme', '"Boost"', 'boost--', 'theme-boost', 'hero-boost'],
    'Borders': ['borders-theme', '"Borders"', 'borders--', 'theme-borders', 'hero-borders'],
    'Boundless': ['boundless-theme', '"Boundless"', 'boundless--', 'theme-boundless', 'hero-boundless'],
    'Brava': ['brava-theme', '"Brava"', 'brava--', 'theme-brava', 'hero-brava'],
    'Broadcast': ['broadcast-theme', '"Broadcast"', 'broadcast--', 'theme-broadcast', 'hero-broadcast'],
    'Brooklyn': ['brooklyn', 'hero-banner', '"Brooklyn"', 'brooklyn-theme'],
    'Bullet': ['bullet-theme', '"Bullet"', 'bullet--', 'theme-bullet', 'hero-bullet'],
    
    'California': ['california-theme', '"California"', 'california--', 'theme-california', 'hero-california'],
    'Cama': ['cama-theme', '"Cama"', 'cama--', 'theme-cama', 'hero-cama'],
    'Canopy': ['canopy-theme', '"Canopy"', 'canopy--', 'theme-canopy', 'hero-canopy'],
    'Capital': ['capital-theme', '"Capital"', 'capital--', 'theme-capital', 'hero-capital'],
    'Cascade': ['cascade-theme', '"Cascade"', 'cascade--', 'theme-cascade', 'hero-cascade'],
    'Cello': ['cello-theme', '"Cello"', 'cello--', 'theme-cello', 'hero-cello'],
    'Champion': ['champion-theme', '"Champion"', 'champion--', 'theme-champion', 'hero-champion'],
    'Charge': ['charge-theme', '"Charge"', 'charge--', 'theme-charge', 'hero-charge'],
    'Chord': ['chord-theme', '"Chord"', 'chord--', 'theme-chord', 'hero-chord'],
    'Colors': ['colors-theme', '"Colors"', 'colors--', 'theme-colors', 'hero-colors'],
    'Combine': ['combine-theme', '"Combine"', 'combine--', 'theme-combine', 'hero-combine'],
    'Concept': ['concept-theme', '"Concept"', 'concept--', 'theme-concept', 'hero-concept'],
    'Context': ['context-theme', '"Context"', 'context--', 'theme-context', 'hero-context'],
    'Copenhagen': ['copenhagen-theme', '"Copenhagen"', 'copenhagen--', 'theme-copenhagen', 'hero-copenhagen'],
    'Cornerstone': ['cornerstone-theme', '"Cornerstone"', 'cornerstone--', 'theme-cornerstone', 'hero-cornerstone'],
    'Creative': ['creative-theme', '"Creative"', 'creative--', 'theme-creative', 'hero-creative'],
    'Creator': ['creator-theme', '"Creator"', 'creator--', 'theme-creator', 'hero-creator'],
    
    'Debut': ['site-header', 'product-single', '"Debut"', 'debut-theme'],
    'Digital': ['digital-theme', '"Digital"', 'digital--', 'theme-digital', 'hero-digital'],
    'Distinctive': ['distinctive-theme', '"Distinctive"', 'distinctive--', 'theme-distinctive', 'hero-distinctive'],
    'District': ['district-theme', '"District"', 'district--', 'theme-district', 'hero-district'],
    'Divide': ['divide-theme', '"Divide"', 'divide--', 'theme-divide', 'hero-divide'],
    'Divine': ['divine-theme', '"Divine"', 'divine--', 'theme-divine', 'hero-divine'],
    'Drop': ['drop-theme', '"Drop"', 'drop--', 'theme-drop', 'hero-drop'],
    
    // E-I
    'Eclipse': ['eclipse-theme', '"Eclipse"', 'eclipse--', 'theme-eclipse', 'hero-eclipse'],
    'Editions': ['editions-theme', '"Editions"', 'editions--', 'theme-editions', 'hero-editions'],
    'Editorial': ['editorial-theme', '"Editorial"', 'editorial--', 'theme-editorial', 'hero-editorial'],
    'Effortless': ['effortless-theme', '"Effortless"', 'effortless--', 'theme-effortless', 'hero-effortless'],
    'Electro': ['electro-theme', '"Electro"', 'electro--', 'theme-electro', 'hero-electro'],
    'Elysian': ['elysian-theme', '"Elysian"', 'elysian--', 'theme-elysian', 'hero-elysian'],
    'Emerge': ['emerge-theme', '"Emerge"', 'emerge--', 'theme-emerge', 'hero-emerge'],
    'Empire': ['empire-theme', '"Empire"', 'empire--', 'theme-empire', 'hero-empire'],
    'Emporium': ['emporium-theme', '"Emporium"', 'emporium--', 'theme-emporium', 'hero-emporium'],
    'Energy': ['energy-theme', '"Energy"', 'energy--', 'theme-energy', 'hero-energy'],
    'Enterprise': ['enterprise-theme', '"Enterprise"', 'enterprise--', 'theme-enterprise', 'hero-enterprise'],
    'Envy': ['envy-theme', '"Envy"', 'envy--', 'theme-envy', 'hero-envy'],
    'Erickson': ['erickson-theme', '"Erickson"', 'erickson--', 'theme-erickson', 'hero-erickson'],
    'Essence': ['essence-theme', '"Essence"', 'essence--', 'theme-essence', 'hero-essence'],
    'Essentials': ['essentials-theme', '"Essentials"', 'essentials--', 'theme-essentials', 'hero-essentials'],
    'Eurus': ['eurus-theme', '"Eurus"', 'eurus--', 'theme-eurus', 'hero-eurus'],
    'Exhibit': ['exhibit-theme', '"Exhibit"', 'exhibit--', 'theme-exhibit', 'hero-exhibit'],
    'Expanse': ['expanse-theme', '"Expanse"', 'expanse--', 'theme-expanse', 'hero-expanse'],
    'Express': ['express-theme', '"Express"', 'express--', 'theme-express', 'hero-express'],
    'Expression': ['expression-theme', '"Expression"', 'expression--', 'theme-expression', 'hero-expression'],
    
    'Fame': ['fame-theme', '"Fame"', 'fame--', 'theme-fame', 'hero-fame'],
    'Fashionopolism': ['fashionopolism-theme', '"Fashionopolism"', 'fashionopolism--', 'theme-fashionopolism', 'hero-fashionopolism'],
    'Fetch': ['fetch-theme', '"Fetch"', 'fetch--', 'theme-fetch', 'hero-fetch'],
    'Flawless': ['flawless-theme', '"Flawless"', 'flawless--', 'theme-flawless', 'hero-flawless'],
    'Flow': ['flow-theme', '"Flow"', 'flow--', 'theme-flow', 'hero-flow'],
    'Focal': ['focal-theme', '"Focal"', 'focal--', 'theme-focal', 'hero-focal'],
    'Foodie': ['foodie-theme', '"Foodie"', 'foodie--', 'theme-foodie', 'hero-foodie'],
    'Forge': ['forge-theme', '"Forge"', 'forge--', 'theme-forge', 'hero-forge'],
    'Frame': ['frame-theme', '"Frame"', 'frame--', 'theme-frame', 'hero-frame'],
    'Fresh': ['fresh-theme', '"Fresh"', 'fresh--', 'theme-fresh', 'hero-fresh'],
    
    'Gain': ['gain-theme', '"Gain"', 'gain--', 'theme-gain', 'hero-gain'],
    'Galleria': ['galleria-theme', '"Galleria"', 'galleria--', 'theme-galleria', 'hero-galleria'],
    'Gem': ['gem-theme', '"Gem"', 'gem--', 'theme-gem', 'hero-gem'],
    'Grid': ['grid-theme', '"Grid"', 'grid--', 'theme-grid', 'hero-grid'],
    
    'Habitat': ['habitat-theme', '"Habitat"', 'habitat--', 'theme-habitat', 'hero-habitat'],
    'Handmade': ['handmade-theme', '"Handmade"', 'handmade--', 'theme-handmade', 'hero-handmade'],
    'Handy': ['handy-theme', '"Handy"', 'handy--', 'theme-handy', 'hero-handy'],
    'Highlight': ['highlight-theme', '"Highlight"', 'highlight--', 'theme-highlight', 'hero-highlight'],
    'Honey': ['honey-theme', '"Honey"', 'honey--', 'theme-honey', 'hero-honey'],
    'Huge': ['huge-theme', '"Huge"', 'huge--', 'theme-huge', 'hero-huge'],
    
    'Icon': ['icon-theme', '"Icon"', 'icon--', 'theme-icon', 'hero-icon'],
    'Igloo': ['igloo-theme', '"Igloo"', 'igloo--', 'theme-igloo', 'hero-igloo'],
    'Ignite': ['ignite-theme', '"Ignite"', 'ignite--', 'theme-ignite', 'hero-ignite'],
    'Impact': ['product-card--blends', 'section-stack', '"Impact"', 'impact-theme', 'theme-impact'],
    'Impulse': ['impulse-theme', '"Impulse"', 'impulse--', 'theme-impulse', 'hero-impulse'],
    'Influence': ['influence-theme', '"Influence"', 'influence--', 'theme-influence', 'hero-influence'],
    'Infinity': ['infinity-theme', '"Infinity"', 'infinity--', 'theme-infinity', 'hero-infinity'],
    'Ira': ['ira-theme', '"Ira"', 'ira--', 'theme-ira', 'hero-ira'],
    'Iris': ['iris-theme', '"Iris"', 'iris--', 'theme-iris', 'hero-iris'],
    
    // J-P
    'Kairo': ['kairo-theme', '"Kairo"', 'kairo--', 'theme-kairo', 'hero-kairo'],
    'Keystone': ['keystone-theme', '"Keystone"', 'keystone--', 'theme-keystone', 'hero-keystone'],
    'Kidu': ['kidu-theme', '"Kidu"', 'kidu--', 'theme-kidu', 'hero-kidu'],
    'King': ['king-theme', '"King"', 'king--', 'theme-king', 'hero-king'],
    'Kingdom': ['kingdom-theme', '"Kingdom"', 'kingdom--', 'theme-kingdom', 'hero-kingdom'],
    'Koto': ['koto-theme', '"Koto"', 'koto--', 'theme-koto', 'hero-koto'],
    
    'Label': ['label-theme', '"Label"', 'label--', 'theme-label', 'hero-label'],
    'Launch': ['launch-theme', '"Launch"', 'launch--', 'theme-launch', 'hero-launch'],
    'Local': ['local-theme', '"Local"', 'local--', 'theme-local', 'hero-local'],
    'Loft': ['loft-theme', '"Loft"', 'loft--', 'theme-loft', 'hero-loft'],
    'Lorenza': ['lorenza-theme', '"Lorenza"', 'lorenza--', 'theme-lorenza', 'hero-lorenza'],
    'Lute': ['lute-theme', '"Lute"', 'lute--', 'theme-lute', 'hero-lute'],
    'Luxe': ['luxe-theme', '"Luxe"', 'luxe--', 'theme-luxe', 'hero-luxe'],
    
    'Machina': ['machina-theme', '"Machina"', 'machina--', 'theme-machina', 'hero-machina'],
    'Madrid': ['madrid-theme', '"Madrid"', 'madrid--', 'theme-madrid', 'hero-madrid'],
    'Maker': ['maker-theme', '"Maker"', 'maker--', 'theme-maker', 'hero-maker'],
    'Mandolin': ['mandolin-theme', '"Mandolin"', 'mandolin--', 'theme-mandolin', 'hero-mandolin'],
    'Maranello': ['maranello-theme', '"Maranello"', 'maranello--', 'theme-maranello', 'hero-maranello'],
    'Marble': ['marble-theme', '"Marble"', 'marble--', 'theme-marble', 'hero-marble'],
    'Masonry': ['masonry-theme', '"Masonry"', 'masonry--', 'theme-masonry', 'hero-masonry'],
    'Mavon': ['mavon-theme', '"Mavon"', 'mavon--', 'theme-mavon', 'hero-mavon'],
    'Meka': ['meka-theme', '"Meka"', 'meka--', 'theme-meka', 'hero-meka'],
    'Minimal': ['minimal', '"Minimal"', 'minimal-theme'],
    'Minimalista': ['minimalista-theme', '"Minimalista"', 'minimalista--', 'theme-minimalista', 'hero-minimalista'],
    'Minion': ['minion-theme', '"Minion"', 'minion--', 'theme-minion', 'hero-minion'],
    'Mobilia': ['mobilia-theme', '"Mobilia"', 'mobilia--', 'theme-mobilia', 'hero-mobilia'],
    'Mode': ['mode-theme', '"Mode"', 'mode--', 'theme-mode', 'hero-mode'],
    'Modular': ['modular-theme', '"Modular"', 'modular--', 'theme-modular', 'hero-modular'],
    'Modules': ['modules-theme', '"Modules"', 'modules--', 'theme-modules', 'hero-modules'],
    'Mojave': ['mojave-theme', '"Mojave"', 'mojave--', 'theme-mojave', 'hero-mojave'],
    'Momentum': ['momentum-theme', '"Momentum"', 'momentum--', 'theme-momentum', 'hero-momentum'],
    'Monaco': ['monaco-theme', '"Monaco"', 'monaco--', 'theme-monaco', 'hero-monaco'],
    'Monk': ['monk-theme', '"Monk"', 'monk--', 'theme-monk', 'hero-monk'],
    'Mono': ['mono-theme', '"Mono"', 'mono--', 'theme-mono', 'hero-mono'],
    'Motion': ['motion-theme', '"Motion"', 'motion--', 'theme-motion', 'hero-motion'],
    'Mr.Parker': ['mr-parker-theme', '"Mr.Parker"', 'mr-parker--', 'theme-mr-parker', 'hero-mr-parker'],
    'Multi': ['multi-theme', '"Multi"', 'multi--', 'theme-multi', 'hero-multi'],
    'Murmel': ['murmel-theme', '"Murmel"', 'murmel--', 'theme-murmel', 'hero-murmel'],
    
    'Narrative': ['narrative-theme', '"Narrative"', 'narrative--', 'theme-narrative', 'hero-narrative'],
    'Neat': ['neat-theme', '"Neat"', 'neat--', 'theme-neat', 'hero-neat'],
    'Nexa': ['nexa-theme', '"Nexa"', 'nexa--', 'theme-nexa', 'hero-nexa'],
    'Next': ['next-theme', '"Next"', 'next--', 'theme-next', 'hero-next'],
    'Noblesse': ['noblesse-theme', '"Noblesse"', 'noblesse--', 'theme-noblesse', 'hero-noblesse'],
    'Noire': ['noire-theme', '"Noire"', 'noire--', 'theme-noire', 'hero-noire'],
    'Nordic': ['nordic-theme', '"Nordic"', 'nordic--', 'theme-nordic', 'hero-nordic'],
    'North': ['north-theme', '"North"', 'north--', 'theme-north', 'hero-north'],
    'Nostalgia': ['nostalgia-theme', '"Nostalgia"', 'nostalgia--', 'theme-nostalgia', 'hero-nostalgia'],
    
    'Outsiders': ['outsiders-theme', '"Outsiders"', 'outsiders--', 'theme-outsiders', 'hero-outsiders'],
    
    'Pacific': ['pacific-theme', '"Pacific"', 'pacific--', 'theme-pacific', 'hero-pacific'],
    'Palo Alto': ['palo-alto-theme', '"Palo Alto"', 'palo-alto--', 'theme-palo-alto', 'hero-palo-alto'],
    'Paper': ['paper-theme', '"Paper"', 'paper--', 'theme-paper', 'hero-paper'],
    'Parallax': ['parallax-theme', '"Parallax"', 'parallax--', 'theme-parallax', 'hero-parallax'],
    'Paris': ['paris-theme', '"Paris"', 'paris--', 'theme-paris', 'hero-paris'],
    'Pesto': ['pesto-theme', '"Pesto"', 'pesto--', 'theme-pesto', 'hero-pesto'],
    'Piano': ['piano-theme', '"Piano"', 'piano--', 'theme-piano', 'hero-piano'],
    'Pinnacle': ['pinnacle-theme', '"Pinnacle"', 'pinnacle--', 'theme-pinnacle', 'hero-pinnacle'],
    'Pipeline': ['pipeline-theme', '"Pipeline"', 'pipeline--', 'theme-pipeline', 'hero-pipeline'],
    'Polyform': ['polyform-theme', '"Polyform"', 'polyform--', 'theme-polyform', 'hero-polyform'],
    'Portland': ['portland-theme', '"Portland"', 'portland--', 'theme-portland', 'hero-portland'],
    'Praise': ['praise-theme', '"Praise"', 'praise--', 'theme-praise', 'hero-praise'],
    'Prestige': ['ProductItem__', 'prestige--v4', '"Prestige"', 'prestige-theme', 'theme-prestige'],
    'Providence': ['providence-theme', '"Providence"', 'providence--', 'theme-providence', 'hero-providence'],
    'Pursuit': ['pursuit-theme', '"Pursuit"', 'pursuit--', 'theme-pursuit', 'hero-pursuit'],
    
    // R-Z
    'Reach': ['reach-theme', '"Reach"', 'reach--', 'theme-reach', 'hero-reach'],
    'Reformation': ['reformation-theme', '"Reformation"', 'reformation--', 'theme-reformation', 'hero-reformation'],
    'Refine': ['refine-theme', '"Refine"', 'refine--', 'theme-refine', 'hero-refine'],
    'Relax': ['relax-theme', '"Relax"', 'relax--', 'theme-relax', 'hero-relax'],
    'Responsive': ['responsive-theme', '"Responsive"', 'responsive--', 'theme-responsive', 'hero-responsive'],
    'Retina': ['retina-theme', '"Retina"', 'retina--', 'theme-retina', 'hero-retina'],
    'Retro': ['retro-theme', '"Retro"', 'retro--', 'theme-retro', 'hero-retro'],
    'Ride': ['ride-theme', '"Ride"', 'ride--', 'theme-ride', 'hero-ride'],
    'Roam': ['roam-theme', '"Roam"', 'roam--', 'theme-roam', 'hero-roam'],
    
    'Sahara': ['sahara-theme', '"Sahara"', 'sahara--', 'theme-sahara', 'hero-sahara'],
    'Satoshi': ['satoshi-theme', '"Satoshi"', 'satoshi--', 'theme-satoshi', 'hero-satoshi'],
    'Select': ['select-theme', '"Select"', 'select--', 'theme-select', 'hero-select'],
    'Shapes': ['shapes-theme', '"Shapes"', 'shapes--', 'theme-shapes', 'hero-shapes'],
    'Shark': ['shark-theme', '"Shark"', 'shark--', 'theme-shark', 'hero-shark'],
    'Shine': ['shine-theme', '"Shine"', 'shine--', 'theme-shine', 'hero-shine'],
    'Showcase': ['showcase-theme', '"Showcase"', 'showcase--', 'theme-showcase', 'hero-showcase'],
    'ShowTime': ['showtime-theme', '"ShowTime"', 'showtime--', 'theme-showtime', 'hero-showtime'],
    'Simple': ['simple-theme', '"Simple"', 'simple--', 'theme-simple', 'hero-simple'],
    'Sitar': ['sitar-theme', '"Sitar"', 'sitar--', 'theme-sitar', 'hero-sitar'],
    'Sleek': ['sleek-theme', '"Sleek"', 'sleek--', 'theme-sleek', 'hero-sleek'],
    'Soul': ['soul-theme', '"Soul"', 'soul--', 'theme-soul', 'hero-soul'],
    'Space': ['space-theme', '"Space"', 'space--', 'theme-space', 'hero-space'],
    'Spark': ['spark-theme', '"Spark"', 'spark--', 'theme-spark', 'hero-spark'],
    'Split': ['split-theme', '"Split"', 'split--', 'theme-split', 'hero-split'],
    'Starlite': ['starlite-theme', '"Starlite"', 'starlite--', 'theme-starlite', 'hero-starlite'],
    'Startup': ['startup-theme', '"Startup"', 'startup--', 'theme-startup', 'hero-startup'],
    'Stiletto': ['stiletto-theme', '"Stiletto"', 'stiletto--', 'theme-stiletto', 'hero-stiletto'],
    'Stockholm': ['stockholm-theme', '"Stockholm"', 'stockholm--', 'theme-stockholm', 'hero-stockholm'],
    'Stockmart': ['stockmart-theme', '"Stockmart"', 'stockmart--', 'theme-stockmart', 'hero-stockmart'],
    'Story': ['story-theme', '"Story"', 'story--', 'theme-story', 'hero-story'],
    'Streamline': ['streamline-theme', '"Streamline"', 'streamline--', 'theme-streamline', 'hero-streamline'],
    'StyleScape': ['stylescape-theme', '"StyleScape"', 'stylescape--', 'theme-stylescape', 'hero-stylescape'],
    'Sunrise': ['sunrise-theme', '"Sunrise"', 'sunrise--', 'theme-sunrise', 'hero-sunrise'],
    'Supply': ['supply-theme', '"Supply"', 'supply--', 'theme-supply', 'hero-supply'],
    'Swipe': ['swipe-theme', '"Swipe"', 'swipe--', 'theme-swipe', 'hero-swipe'],
    'Sydney': ['sydney-theme', '"Sydney"', 'sydney--', 'theme-sydney', 'hero-sydney'],
    'Symmetry': ['symmetry-theme', '"Symmetry"', 'symmetry--', 'theme-symmetry', 'hero-symmetry'],
    
    'Taiga': ['taiga-theme', '"Taiga"', 'taiga--', 'theme-taiga', 'hero-taiga'],
    'Tailor': ['tailor-theme', '"Tailor"', 'tailor--', 'theme-tailor', 'hero-tailor'],
    'Takeout': ['takeout-theme', '"Takeout"', 'takeout--', 'theme-takeout', 'hero-takeout'],
    'Testament': ['testament-theme', '"Testament"', 'testament--', 'theme-testament', 'hero-testament'],
    'Tokyo': ['tokyo-theme', '"Tokyo"', 'tokyo--', 'theme-tokyo', 'hero-tokyo'],
    'Toyo': ['toyo-theme', '"Toyo"', 'toyo--', 'theme-toyo', 'hero-toyo'],
    'Trade': ['trade-theme', '"Trade"', 'trade--', 'theme-trade', 'hero-trade'],
    'Trend': ['trend-theme', '"Trend"', 'trend--', 'theme-trend', 'hero-trend'],
    'Ultra': ['ultra-theme', '"Ultra"', 'ultra--', 'theme-ultra', 'hero-ultra', '.build.css', 'header__menu-item'],
    'Unicorn': ['unicorn-theme', '"Unicorn"', 'unicorn--', 'theme-unicorn', 'hero-unicorn'],
    'Upscale': ['upscale-theme', '"Upscale"', 'upscale--', 'theme-upscale', 'hero-upscale'],
    'Urban': ['urban-theme', '"Urban"', 'urban--', 'theme-urban', 'hero-urban'],
    'Urge': ['urge-theme', '"Urge"', 'urge--', 'theme-urge', 'hero-urge'],
    
    'Vantage': ['vantage-theme', '"Vantage"', 'vantage--', 'theme-vantage', 'hero-vantage'],
    'Veena': ['veena-theme', '"Veena"', 'veena--', 'theme-veena', 'hero-veena'],
    'Venture': ['venture-theme', '"Venture"', 'venture--', 'theme-venture', 'hero-venture'],
    'Venue': ['venue-theme', '"Venue"', 'venue--', 'theme-venue', 'hero-venue'],
    'Vincent': ['vincent-theme', '"Vincent"', 'vincent--', 'theme-vincent', 'hero-vincent'],
    'Viola': ['viola-theme', '"Viola"', 'viola--', 'theme-viola', 'hero-viola'],
    'Vision': ['vision-theme', '"Vision"', 'vision--', 'theme-vision', 'hero-vision'],
    'Vivid': ['vivid-theme', '"Vivid"', 'vivid--', 'theme-vivid', 'hero-vivid'],
    'Vogue': ['vogue-theme', '"Vogue"', 'vogue--', 'theme-vogue', 'hero-vogue'],
    
    'Warehouse': ['warehouse-theme', '"Warehouse"', 'warehouse--', 'theme-warehouse', 'hero-warehouse'],
    'Whisk': ['whisk-theme', '"Whisk"', 'whisk--', 'theme-whisk', 'hero-whisk'],
    'Wonder': ['wonder-theme', '"Wonder"', 'wonder--', 'theme-wonder', 'hero-wonder'],
    'Woodstock': ['woodstock-theme', '"Woodstock"', 'woodstock--', 'theme-woodstock', 'hero-woodstock'],
    
    'Xclusive': ['xclusive-theme', '"Xclusive"', 'xclusive--', 'theme-xclusive', 'hero-xclusive'],
    'Xtra': ['xtra-theme', '"Xtra"', 'xtra--', 'theme-xtra', 'hero-xtra'],
    
    'Yuva': ['yuva-theme', '"Yuva"', 'yuva--', 'theme-yuva', 'hero-yuva'],
    
    'Zest': ['zest-theme', '"Zest"', 'zest--', 'theme-zest', 'hero-zest'],
    'Zora': ['zora-theme', '"Zora"', 'zora--', 'theme-zora', 'hero-zora'],
    
    // Legacy/Popular Third-party Themes (Non-official but commonly used)
    'Turbo': ['header__logo', 'sticky_nav', '"Turbo"', 'turbo-theme'],
    'Shella': ['shella', '"Shella"', 'shella-theme'],
    'Kalles': ['kalles', '"Kalles"', 'kalles-theme'],
    'Ella': ['ella-theme', '"Ella"', 'ella--'],
    'Debutify': ['debutify-theme', '"Debutify"', 'debutify--'],
    'Booster': ['booster-theme', '"Booster"', 'booster--']
};

// Shopify Theme Store links
const themeLinks = {
    // Free Themes
    'Dawn': 'https://themes.shopify.com/themes/dawn',
    'Sense': 'https://themes.shopify.com/themes/sense',
    'Craft': 'https://themes.shopify.com/themes/craft',
    'Colorblock': 'https://themes.shopify.com/themes/colorblock',
    'Taste': 'https://themes.shopify.com/themes/taste',
    'Crave': 'https://themes.shopify.com/themes/crave',
    'Studio': 'https://themes.shopify.com/themes/studio',
    'Refresh': 'https://themes.shopify.com/themes/refresh',
    'Publisher': 'https://themes.shopify.com/themes/publisher',
    'Origin': 'https://themes.shopify.com/themes/origin',
    
    // Official Premium Themes A-D
    'Abode': 'https://themes.shopify.com/themes/abode',
    'Alchemy': 'https://themes.shopify.com/themes/alchemy',
    'Aesthetic': 'https://themes.shopify.com/themes/aesthetic',
    'Agile': 'https://themes.shopify.com/themes/agile',
    'Aisle': 'https://themes.shopify.com/themes/aisle',
    'Align': 'https://themes.shopify.com/themes/align',
    'Amber': 'https://themes.shopify.com/themes/amber',
    'Andaman': 'https://themes.shopify.com/themes/andaman',
    'Area': 'https://themes.shopify.com/themes/area',
    'Artisan': 'https://themes.shopify.com/themes/artisan',
    'Artist': 'https://themes.shopify.com/themes/artist',
    'Athens': 'https://themes.shopify.com/themes/athens',
    'Atlantic': 'https://themes.shopify.com/themes/atlantic',
    'Atom': 'https://themes.shopify.com/themes/atom',
    'Aurora': 'https://themes.shopify.com/themes/aurora',
    'Automation': 'https://themes.shopify.com/themes/automation',
    'Avante': 'https://themes.shopify.com/themes/avante',
    'Avatar': 'https://themes.shopify.com/themes/avatar',
    'Avenue': 'https://themes.shopify.com/themes/avenue',
    'Banjo': 'https://themes.shopify.com/themes/banjo',
    'Barcelona': 'https://themes.shopify.com/themes/barcelona',
    'Baseline': 'https://themes.shopify.com/themes/baseline',
    'Bazaar': 'https://themes.shopify.com/themes/bazaar',
    'Be Yours': 'https://themes.shopify.com/themes/be-yours',
    'Berlin': 'https://themes.shopify.com/themes/berlin',
    'Beyond': 'https://themes.shopify.com/themes/beyond',
    'Blockshop': 'https://themes.shopify.com/themes/blockshop',
    'Blum': 'https://themes.shopify.com/themes/blum',
    'Boost': 'https://themes.shopify.com/themes/boost',
    'Borders': 'https://themes.shopify.com/themes/borders',
    'Boundless': 'https://themes.shopify.com/themes/boundless',
    'Brava': 'https://themes.shopify.com/themes/brava',
    'Broadcast': 'https://themes.shopify.com/themes/broadcast',
    'Brooklyn': 'https://themes.shopify.com/themes/brooklyn',
    'Bullet': 'https://themes.shopify.com/themes/bullet',
    'California': 'https://themes.shopify.com/themes/california',
    'Cama': 'https://themes.shopify.com/themes/cama',
    'Canopy': 'https://themes.shopify.com/themes/canopy',
    'Capital': 'https://themes.shopify.com/themes/capital',
    'Cascade': 'https://themes.shopify.com/themes/cascade',
    'Cello': 'https://themes.shopify.com/themes/cello',
    'Champion': 'https://themes.shopify.com/themes/champion',
    'Charge': 'https://themes.shopify.com/themes/charge',
    'Chord': 'https://themes.shopify.com/themes/chord',
    'Colors': 'https://themes.shopify.com/themes/colors',
    'Combine': 'https://themes.shopify.com/themes/combine',
    'Concept': 'https://themes.shopify.com/themes/concept',
    'Context': 'https://themes.shopify.com/themes/context',
    'Copenhagen': 'https://themes.shopify.com/themes/copenhagen',
    'Cornerstone': 'https://themes.shopify.com/themes/cornerstone',
    'Creative': 'https://themes.shopify.com/themes/creative',
    'Creator': 'https://themes.shopify.com/themes/creator',
    'Debut': 'https://themes.shopify.com/themes/debut',
    'Digital': 'https://themes.shopify.com/themes/digital',
    'Distinctive': 'https://themes.shopify.com/themes/distinctive',
    'District': 'https://themes.shopify.com/themes/district',
    'Divide': 'https://themes.shopify.com/themes/divide',
    'Divine': 'https://themes.shopify.com/themes/divine',
    'Drop': 'https://themes.shopify.com/themes/drop',
    
    // E-I
    'Eclipse': 'https://themes.shopify.com/themes/eclipse',
    'Editions': 'https://themes.shopify.com/themes/editions',
    'Editorial': 'https://themes.shopify.com/themes/editorial',
    'Effortless': 'https://themes.shopify.com/themes/effortless',
    'Electro': 'https://themes.shopify.com/themes/electro',
    'Elysian': 'https://themes.shopify.com/themes/elysian',
    'Emerge': 'https://themes.shopify.com/themes/emerge',
    'Empire': 'https://themes.shopify.com/themes/empire',
    'Emporium': 'https://themes.shopify.com/themes/emporium',
    'Energy': 'https://themes.shopify.com/themes/energy',
    'Enterprise': 'https://themes.shopify.com/themes/enterprise',
    'Envy': 'https://themes.shopify.com/themes/envy',
    'Erickson': 'https://themes.shopify.com/themes/erickson',
    'Essence': 'https://themes.shopify.com/themes/essence',
    'Essentials': 'https://themes.shopify.com/themes/essentials',
    'Eurus': 'https://themes.shopify.com/themes/eurus',
    'Exhibit': 'https://themes.shopify.com/themes/exhibit',
    'Expanse': 'https://themes.shopify.com/themes/expanse',
    'Express': 'https://themes.shopify.com/themes/express',
    'Expression': 'https://themes.shopify.com/themes/expression',
    'Fame': 'https://themes.shopify.com/themes/fame',
    'Fashionopolism': 'https://themes.shopify.com/themes/fashionopolism',
    'Fetch': 'https://themes.shopify.com/themes/fetch',
    'Flawless': 'https://themes.shopify.com/themes/flawless',
    'Flow': 'https://themes.shopify.com/themes/flow',
    'Focal': 'https://themes.shopify.com/themes/focal',
    'Foodie': 'https://themes.shopify.com/themes/foodie',
    'Forge': 'https://themes.shopify.com/themes/forge',
    'Frame': 'https://themes.shopify.com/themes/frame',
    'Fresh': 'https://themes.shopify.com/themes/fresh',
    'Gain': 'https://themes.shopify.com/themes/gain',
    'Galleria': 'https://themes.shopify.com/themes/galleria',
    'Gem': 'https://themes.shopify.com/themes/gem',
    'Grid': 'https://themes.shopify.com/themes/grid',
    'Habitat': 'https://themes.shopify.com/themes/habitat',
    'Handmade': 'https://themes.shopify.com/themes/handmade',
    'Handy': 'https://themes.shopify.com/themes/handy',
    'Highlight': 'https://themes.shopify.com/themes/highlight',
    'Honey': 'https://themes.shopify.com/themes/honey',
    'Huge': 'https://themes.shopify.com/themes/huge',
    'Icon': 'https://themes.shopify.com/themes/icon',
    'Igloo': 'https://themes.shopify.com/themes/igloo',
    'Ignite': 'https://themes.shopify.com/themes/ignite',
    'Impact': 'https://themes.shopify.com/themes/impact',
    'Impulse': 'https://themes.shopify.com/themes/impulse',
    'Influence': 'https://themes.shopify.com/themes/influence',
    'Infinity': 'https://themes.shopify.com/themes/infinity',
    'Ira': 'https://themes.shopify.com/themes/ira',
    'Iris': 'https://themes.shopify.com/themes/iris',
    
    // J-P
    'Kairo': 'https://themes.shopify.com/themes/kairo',
    'Keystone': 'https://themes.shopify.com/themes/keystone',
    'Kidu': 'https://themes.shopify.com/themes/kidu',
    'King': 'https://themes.shopify.com/themes/king',
    'Kingdom': 'https://themes.shopify.com/themes/kingdom',
    'Koto': 'https://themes.shopify.com/themes/koto',
    'Label': 'https://themes.shopify.com/themes/label',
    'Launch': 'https://themes.shopify.com/themes/launch',
    'Local': 'https://themes.shopify.com/themes/local',
    'Loft': 'https://themes.shopify.com/themes/loft',
    'Lorenza': 'https://themes.shopify.com/themes/lorenza',
    'Lute': 'https://themes.shopify.com/themes/lute',
    'Luxe': 'https://themes.shopify.com/themes/luxe',
    'Machina': 'https://themes.shopify.com/themes/machina',
    'Madrid': 'https://themes.shopify.com/themes/madrid',
    'Maker': 'https://themes.shopify.com/themes/maker',
    'Mandolin': 'https://themes.shopify.com/themes/mandolin',
    'Maranello': 'https://themes.shopify.com/themes/maranello',
    'Marble': 'https://themes.shopify.com/themes/marble',
    'Masonry': 'https://themes.shopify.com/themes/masonry',
    'Mavon': 'https://themes.shopify.com/themes/mavon',
    'Meka': 'https://themes.shopify.com/themes/meka',
    'Minimal': 'https://themes.shopify.com/themes/minimal',
    'Minimalista': 'https://themes.shopify.com/themes/minimalista',
    'Minion': 'https://themes.shopify.com/themes/minion',
    'Mobilia': 'https://themes.shopify.com/themes/mobilia',
    'Mode': 'https://themes.shopify.com/themes/mode',
    'Modular': 'https://themes.shopify.com/themes/modular',
    'Modules': 'https://themes.shopify.com/themes/modules',
    'Mojave': 'https://themes.shopify.com/themes/mojave',
    'Momentum': 'https://themes.shopify.com/themes/momentum',
    'Monaco': 'https://themes.shopify.com/themes/monaco',
    'Monk': 'https://themes.shopify.com/themes/monk',
    'Mono': 'https://themes.shopify.com/themes/mono',
    'Motion': 'https://themes.shopify.com/themes/motion',
    'Mr.Parker': 'https://themes.shopify.com/themes/mr-parker',
    'Multi': 'https://themes.shopify.com/themes/multi',
    'Murmel': 'https://themes.shopify.com/themes/murmel',
    'Narrative': 'https://themes.shopify.com/themes/narrative',
    'Neat': 'https://themes.shopify.com/themes/neat',
    'Nexa': 'https://themes.shopify.com/themes/nexa',
    'Next': 'https://themes.shopify.com/themes/next',
    'Noblesse': 'https://themes.shopify.com/themes/noblesse',
    'Noire': 'https://themes.shopify.com/themes/noire',
    'Nordic': 'https://themes.shopify.com/themes/nordic',
    'North': 'https://themes.shopify.com/themes/north',
    'Nostalgia': 'https://themes.shopify.com/themes/nostalgia',
    'Outsiders': 'https://themes.shopify.com/themes/outsiders',
    'Pacific': 'https://themes.shopify.com/themes/pacific',
    'Palo Alto': 'https://themes.shopify.com/themes/palo-alto',
    'Paper': 'https://themes.shopify.com/themes/paper',
    'Parallax': 'https://themes.shopify.com/themes/parallax',
    'Paris': 'https://themes.shopify.com/themes/paris',
    'Pesto': 'https://themes.shopify.com/themes/pesto',
    'Piano': 'https://themes.shopify.com/themes/piano',
    'Pinnacle': 'https://themes.shopify.com/themes/pinnacle',
    'Pipeline': 'https://themes.shopify.com/themes/pipeline',
    'Polyform': 'https://themes.shopify.com/themes/polyform',
    'Portland': 'https://themes.shopify.com/themes/portland',
    'Praise': 'https://themes.shopify.com/themes/praise',
    'Prestige': 'https://themes.shopify.com/themes/prestige',
    'Providence': 'https://themes.shopify.com/themes/providence',
    'Pursuit': 'https://themes.shopify.com/themes/pursuit',
    
    // R-Z
    'Reach': 'https://themes.shopify.com/themes/reach',
    'Reformation': 'https://themes.shopify.com/themes/reformation',
    'Refine': 'https://themes.shopify.com/themes/refine',
    'Relax': 'https://themes.shopify.com/themes/relax',
    'Responsive': 'https://themes.shopify.com/themes/responsive',
    'Retina': 'https://themes.shopify.com/themes/retina',
    'Retro': 'https://themes.shopify.com/themes/retro',
    'Ride': 'https://themes.shopify.com/themes/ride',
    'Roam': 'https://themes.shopify.com/themes/roam',
    'Sahara': 'https://themes.shopify.com/themes/sahara',
    'Satoshi': 'https://themes.shopify.com/themes/satoshi',
    'Select': 'https://themes.shopify.com/themes/select',
    'Shapes': 'https://themes.shopify.com/themes/shapes',
    'Shark': 'https://themes.shopify.com/themes/shark',
    'Shine': 'https://themes.shopify.com/themes/shine',
    'Showcase': 'https://themes.shopify.com/themes/showcase',
    'ShowTime': 'https://themes.shopify.com/themes/showtime',
    'Simple': 'https://themes.shopify.com/themes/simple',
    'Sitar': 'https://themes.shopify.com/themes/sitar',
    'Sleek': 'https://themes.shopify.com/themes/sleek',
    'Soul': 'https://themes.shopify.com/themes/soul',
    'Space': 'https://themes.shopify.com/themes/space',
    'Spark': 'https://themes.shopify.com/themes/spark',
    'Split': 'https://themes.shopify.com/themes/split',
    'Starlite': 'https://themes.shopify.com/themes/starlite',
    'Startup': 'https://themes.shopify.com/themes/startup',
    'Stiletto': 'https://themes.shopify.com/themes/stiletto',
    'Stockholm': 'https://themes.shopify.com/themes/stockholm',
    'Stockmart': 'https://themes.shopify.com/themes/stockmart',
    'Story': 'https://themes.shopify.com/themes/story',
    'Streamline': 'https://themes.shopify.com/themes/streamline',
    'StyleScape': 'https://themes.shopify.com/themes/stylescape',
    'Sunrise': 'https://themes.shopify.com/themes/sunrise',
    'Supply': 'https://themes.shopify.com/themes/supply',
    'Swipe': 'https://themes.shopify.com/themes/swipe',
    'Sydney': 'https://themes.shopify.com/themes/sydney',
    'Symmetry': 'https://themes.shopify.com/themes/symmetry',
    'Taiga': 'https://themes.shopify.com/themes/taiga',
    'Tailor': 'https://themes.shopify.com/themes/tailor',
    'Takeout': 'https://themes.shopify.com/themes/takeout',
    'Testament': 'https://themes.shopify.com/themes/testament',
    'Tokyo': 'https://themes.shopify.com/themes/tokyo',
    'Toyo': 'https://themes.shopify.com/themes/toyo',
    'Trade': 'https://themes.shopify.com/themes/trade',
    'Trend': 'https://themes.shopify.com/themes/trend',
    'Ultra': 'https://themes.shopify.com/themes/ultra',
    'Unicorn': 'https://themes.shopify.com/themes/unicorn',
    'Upscale': 'https://themes.shopify.com/themes/upscale',
    'Urban': 'https://themes.shopify.com/themes/urban',
    'Urge': 'https://themes.shopify.com/themes/urge',
    'Vantage': 'https://themes.shopify.com/themes/vantage',
    'Veena': 'https://themes.shopify.com/themes/veena',
    'Venture': 'https://themes.shopify.com/themes/venture',
    'Venue': 'https://themes.shopify.com/themes/venue',
    'Vincent': 'https://themes.shopify.com/themes/vincent',
    'Viola': 'https://themes.shopify.com/themes/viola',
    'Vision': 'https://themes.shopify.com/themes/vision',
    'Vivid': 'https://themes.shopify.com/themes/vivid',
    'Vogue': 'https://themes.shopify.com/themes/vogue',
    'Warehouse': 'https://themes.shopify.com/themes/warehouse',
    'Whisk': 'https://themes.shopify.com/themes/whisk',
    'Wonder': 'https://themes.shopify.com/themes/wonder',
    'Woodstock': 'https://themes.shopify.com/themes/woodstock',
    'Xclusive': 'https://themes.shopify.com/themes/xclusive',
    'Xtra': 'https://themes.shopify.com/themes/xtra',
    'Yuva': 'https://themes.shopify.com/themes/yuva',
    'Zest': 'https://themes.shopify.com/themes/zest',
    'Zora': 'https://themes.shopify.com/themes/zora'
};

function isShopifyStore(html) {
    const indicators = ['Shopify.shop', 'shopify.com', 'window.Shopify', 'cdn.shopify.com'];
    const htmlLower = html.toLowerCase();
    return indicators.some(indicator => htmlLower.includes(indicator.toLowerCase()));
}

function detectTheme(html) {
    const htmlLower = html.toLowerCase();
    let bestMatch = { theme: 'Unknown', score: 0 };
    
    for (const [themeName, patterns] of Object.entries(themeFingerprints)) {
        let score = 0;
        patterns.forEach(pattern => {
            if (htmlLower.includes(pattern.toLowerCase())) {
                score += pattern.includes('"') ? 15 : 5; // Higher weight for exact theme name matches
            }
        });
        
        if (score > bestMatch.score) {
            bestMatch = { theme: themeName, score };
        }
    }
    
    const confidence = bestMatch.score > 0 ? Math.min(Math.round((bestMatch.score / 20) * 100), 100) : 0;
    return {
        theme: bestMatch.score > 5 ? bestMatch.theme : 'Unknown',
        confidence: bestMatch.score > 5 ? confidence : 0
    };
}

// Helper function to categorize themes
function getThemeCategory(themeName) {
    const freeThemes = ['Dawn', 'Sense', 'Craft', 'Colorblock', 'Taste', 'Crave', 'Studio', 'Refresh', 'Publisher', 'Origin'];
    const fashionThemes = ['Impulse', 'Prestige', 'Symmetry', 'Empire', 'Stiletto', 'Barcelona', 'Blum', 'Aurora', 'Palo Alto'];
    const techThemes = ['Impact', 'Warehouse', 'Electro', 'Digital', 'Automation', 'Context'];
    const beautyThemes = ['Sense', 'Align', 'Vision', 'Flawless', 'Gem', 'Shine'];
    const foodThemes = ['Taste', 'Crave', 'Foodie', 'Takeout', 'Fresh'];
    const artThemes = ['Publisher', 'Origin', 'Artist', 'Creative', 'Gallery', 'Frame'];
    
    if (freeThemes.includes(themeName)) return 'Free';
    if (fashionThemes.includes(themeName)) return 'Fashion & Apparel';
    if (techThemes.includes(themeName)) return 'Technology & Electronics';
    if (beautyThemes.includes(themeName)) return 'Beauty & Health';
    if (foodThemes.includes(themeName)) return 'Food & Beverage';
    if (artThemes.includes(themeName)) return 'Art & Creative';
    
    return 'General Commerce';
}

// Helper function to detect theme customizations
function detectCustomizations(html) {
    const customizationIndicators = [
        'custom-css',
        'theme-custom',
        'modified-theme',
        'custom-js',
        'theme-override',
        'custom-section',
        'modified-',
        'custom-',
        'override-'
    ];
    
    const htmlLower = html.toLowerCase();
    return customizationIndicators.some(indicator => htmlLower.includes(indicator));
}

module.exports = async (req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ 
            success: false, 
            error: 'URL is required' 
        });
    }

    try {
        // Normalize URL
        let targetUrl = url.trim();
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = 'https://' + targetUrl;
        }

        console.log(`Analyzing: ${targetUrl}`);

        // Fetch webpage with timeout
        const response = await axios.get(targetUrl, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const html = response.data;

        // Check if Shopify
        if (!isShopifyStore(html)) {
            return res.status(200).json({
                success: true,
                data: {
                    url: targetUrl,
                    isShopify: false,
                    theme: null,
                    confidence: 0,
                    hasCustomizations: false,
                    timestamp: new Date().toISOString(),
                    message: 'Not a Shopify store'
                }
            });
        }

        // Detect theme
        const themeResult = detectTheme(html);

        // Additional theme information
        const isOfficialTheme = themeLinks[themeResult.theme] ? true : false;
        const themeCategory = getThemeCategory(themeResult.theme);
        
        res.status(200).json({
            success: true,
            data: {
                url: targetUrl,
                isShopify: true,
                theme: themeResult.theme,
                confidence: themeResult.confidence,
                themeStoreLink: themeLinks[themeResult.theme] || null,
                isOfficialTheme: isOfficialTheme,
                themeCategory: themeCategory,
                hasCustomizations: detectCustomizations(html),
                timestamp: new Date().toISOString(),
                message: `Detected Shopify store using ${themeResult.theme} theme (${isOfficialTheme ? 'Official' : 'Third-party'})`
            }
        });

    } catch (error) {
        console.error('Detection error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Detection failed: ' + error.message
        });
    }
};
