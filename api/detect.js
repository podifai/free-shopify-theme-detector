const axios = require('axios');

// Enhanced theme patterns for all official Shopify themes
const themeFingerprints = {
    // Free Shopify Themes - 使用更具体的特征
    'Dawn': ['"Dawn"', 'dawn.css', 'theme-dawn', 'dawn-theme', 'color-scheme-1', 'dawn-settings'],
    'Sense': ['"Sense"', 'sense.css', 'sense-theme', 'predictive-search--sense', 'sense-header'],
    'Craft': ['"Craft"', 'craft.css', 'craft-theme', 'craft-product', 'craft-collection'],
    'Colorblock': ['"Colorblock"', 'colorblock.css', 'colorblock-theme', 'colorblock-hero'],
    'Taste': ['"Taste"', 'taste.css', 'taste-theme', 'taste-product'],
    'Crave': ['"Crave"', 'crave.css', 'crave-theme', 'crave-hero'],
    'Studio': ['"Studio"', 'studio.css', 'studio-theme', 'studio-gallery'],
    'Refresh': ['"Refresh"', 'refresh.css', 'refresh-theme', 'refresh-hero'],
    'Publisher': ['"Publisher"', 'publisher.css', 'publisher-theme', 'publisher-article'],
    'Origin': ['"Origin"', 'origin.css', 'origin-theme', 'origin-product'],
    
    // Premium Themes - 使用更精确的CSS类名和JS标识
    'Symmetry': ['"Symmetry"', 'symmetry.css', 'symmetry-theme', 'symmetry-product-grid', 'symmetry-collection', 'theme-symmetry'],
    'Icon': ['"Icon"', 'icon.css', 'icon-theme', 'icon-product-gallery', 'icon-slideshow', 'theme-icon'],
    'Prestige': ['"Prestige"', 'prestige.css', 'ProductItem__', 'prestige--v4', 'prestige-theme'],
    'Impact': ['"Impact"', 'impact.css', 'product-card--blends', 'section-stack', 'impact-theme'],
    'Impulse': ['"Impulse"', 'impulse.css', 'impulse-theme', 'impulse-product'],
    'Empire': ['"Empire"', 'empire.css', 'empire-theme', 'empire-product'],
    'Broadcast': ['"Broadcast"', 'broadcast.css', 'broadcast-theme', 'broadcast-hero'],
    'Warehouse': ['"Warehouse"', 'warehouse.css', 'warehouse-theme', 'warehouse-product'],
    'Motion': ['"Motion"', 'motion.css', 'motion-theme', 'motion-video'],
    'Pipeline': ['"Pipeline"', 'pipeline.css', 'pipeline-theme', 'pipeline-collection'],
    'Focal': ['"Focal"', 'focal.css', 'focal-theme', 'focal-product'],
    'Vision': ['"Vision"', 'vision.css', 'vision-theme', 'vision-product'],
    'Stiletto': ['"Stiletto"', 'stiletto.css', 'stiletto-theme', 'stiletto-product'],
    'Palo Alto': ['"Palo Alto"', 'palo-alto.css', 'palo-alto-theme', 'palo-alto-product'],
    'Wonder': ['"Wonder"', 'wonder.css', 'wonder-theme', 'wonder-product'],
    'Trade': ['"Trade"', 'trade.css', 'trade-theme', 'trade-product'],
    'Local': ['"Local"', 'local.css', 'local-theme', 'local-store'],
    
    // A-Z 其他官方主题
    'Abode': ['"Abode"', 'abode.css', 'abode-theme'],
    'Alchemy': ['"Alchemy"', 'alchemy.css', 'alchemy-theme'],
    'Aesthetic': ['"Aesthetic"', 'aesthetic.css', 'aesthetic-theme'],
    'Agile': ['"Agile"', 'agile.css', 'agile-theme'],
    'Aisle': ['"Aisle"', 'aisle.css', 'aisle-theme'],
    'Align': ['"Align"', 'align.css', 'align-theme'],
    'Amber': ['"Amber"', 'amber.css', 'amber-theme'],
    'Andaman': ['"Andaman"', 'andaman.css', 'andaman-theme'],
    'Area': ['"Area"', 'area.css', 'area-theme'],
    'Artisan': ['"Artisan"', 'artisan.css', 'artisan-theme'],
    'Artist': ['"Artist"', 'artist.css', 'artist-theme'],
    'Athens': ['"Athens"', 'athens.css', 'athens-theme'],
    'Atlantic': ['"Atlantic"', 'atlantic.css', 'atlantic-theme'],
    'Atom': ['"Atom"', 'atom.css', 'atom-theme'],
    'Aurora': ['"Aurora"', 'aurora.css', 'aurora-theme'],
    'Automation': ['"Automation"', 'automation.css', 'automation-theme'],
    'Avante': ['"Avante"', 'avante.css', 'avante-theme'],
    'Avatar': ['"Avatar"', 'avatar.css', 'avatar-theme'],
    'Avenue': ['"Avenue"', 'avenue.css', 'avenue-theme'],
    
    'Banjo': ['"Banjo"', 'banjo.css', 'banjo-theme'],
    'Barcelona': ['"Barcelona"', 'barcelona.css', 'barcelona-theme'],
    'Baseline': ['"Baseline"', 'baseline.css', 'baseline-theme'],
    'Bazaar': ['"Bazaar"', 'bazaar.css', 'bazaar-theme'],
    'Be Yours': ['"Be yours"', 'be-yours.css', 'be-yours-theme'],
    'Berlin': ['"Berlin"', 'berlin.css', 'berlin-theme'],
    'Beyond': ['"Beyond"', 'beyond.css', 'beyond-theme'],
    'Blockshop': ['"Blockshop"', 'blockshop.css', 'blockshop-theme'],
    'Blum': ['"Blum"', 'blum.css', 'blum-theme'],
    'Boost': ['"Boost"', 'boost.css', 'boost-theme'],
    'Borders': ['"Borders"', 'borders.css', 'borders-theme'],
    'Boundless': ['"Boundless"', 'boundless.css', 'boundless-theme'],
    'Brava': ['"Brava"', 'brava.css', 'brava-theme'],
    'Brooklyn': ['"Brooklyn"', 'brooklyn.css', 'brooklyn-theme', 'hero-banner'],
    'Bullet': ['"Bullet"', 'bullet.css', 'bullet-theme'],
    
    'California': ['"California"', 'california.css', 'california-theme'],
    'Cama': ['"Cama"', 'cama.css', 'cama-theme'],
    'Canopy': ['"Canopy"', 'canopy.css', 'canopy-theme'],
    'Capital': ['"Capital"', 'capital.css', 'capital-theme'],
    'Cascade': ['"Cascade"', 'cascade.css', 'cascade-theme'],
    'Cello': ['"Cello"', 'cello.css', 'cello-theme'],
    'Champion': ['"Champion"', 'champion.css', 'champion-theme'],
    'Charge': ['"Charge"', 'charge.css', 'charge-theme'],
    'Chord': ['"Chord"', 'chord.css', 'chord-theme'],
    'Colors': ['"Colors"', 'colors.css', 'colors-theme'],
    'Combine': ['"Combine"', 'combine.css', 'combine-theme'],
    'Concept': ['"Concept"', 'concept.css', 'concept-theme'],
    'Context': ['"Context"', 'context.css', 'context-theme'],
    'Copenhagen': ['"Copenhagen"', 'copenhagen.css', 'copenhagen-theme'],
    'Cornerstone': ['"Cornerstone"', 'cornerstone.css', 'cornerstone-theme'],
    'Creative': ['"Creative"', 'creative.css', 'creative-theme'],
    'Creator': ['"Creator"', 'creator.css', 'creator-theme'],
    
    'Debut': ['"Debut"', 'debut.css', 'debut-theme', 'site-header', 'product-single'],
    'Digital': ['"Digital"', 'digital.css', 'digital-theme'],
    'Distinctive': ['"Distinctive"', 'distinctive.css', 'distinctive-theme'],
    'District': ['"District"', 'district.css', 'district-theme'],
    'Divide': ['"Divide"', 'divide.css', 'divide-theme'],
    'Divine': ['"Divine"', 'divine.css', 'divine-theme'],
    'Drop': ['"Drop"', 'drop.css', 'drop-theme'],
    
    'Eclipse': ['"Eclipse"', 'eclipse.css', 'eclipse-theme'],
    'Editions': ['"Editions"', 'editions.css', 'editions-theme'],
    'Editorial': ['"Editorial"', 'editorial.css', 'editorial-theme'],
    'Effortless': ['"Effortless"', 'effortless.css', 'effortless-theme'],
    'Electro': ['"Electro"', 'electro.css', 'electro-theme'],
    'Elysian': ['"Elysian"', 'elysian.css', 'elysian-theme'],
    'Emerge': ['"Emerge"', 'emerge.css', 'emerge-theme'],
    'Emporium': ['"Emporium"', 'emporium.css', 'emporium-theme'],
    'Energy': ['"Energy"', 'energy.css', 'energy-theme'],
    'Enterprise': ['"Enterprise"', 'enterprise.css', 'enterprise-theme'],
    'Envy': ['"Envy"', 'envy.css', 'envy-theme'],
    'Erickson': ['"Erickson"', 'erickson.css', 'erickson-theme'],
    'Essence': ['"Essence"', 'essence.css', 'essence-theme'],
    'Essentials': ['"Essentials"', 'essentials.css', 'essentials-theme'],
    'Eurus': ['"Eurus"', 'eurus.css', 'eurus-theme'],
    'Exhibit': ['"Exhibit"', 'exhibit.css', 'exhibit-theme'],
    'Expanse': ['"Expanse"', 'expanse.css', 'expanse-theme'],
    'Express': ['"Express"', 'express.css', 'express-theme'],
    'Expression': ['"Expression"', 'expression.css', 'expression-theme'],
    
    'Fame': ['"Fame"', 'fame.css', 'fame-theme'],
    'Fashionopolism': ['"Fashionopolism"', 'fashionopolism.css', 'fashionopolism-theme'],
    'Fetch': ['"Fetch"', 'fetch.css', 'fetch-theme'],
    'Flawless': ['"Flawless"', 'flawless.css', 'flawless-theme'],
    'Flow': ['"Flow"', 'flow.css', 'flow-theme'],
    'Foodie': ['"Foodie"', 'foodie.css', 'foodie-theme'],
    'Forge': ['"Forge"', 'forge.css', 'forge-theme'],
    'Frame': ['"Frame"', 'frame.css', 'frame-theme'],
    'Fresh': ['"Fresh"', 'fresh.css', 'fresh-theme'],
    
    'Gain': ['"Gain"', 'gain.css', 'gain-theme'],
    'Galleria': ['"Galleria"', 'galleria.css', 'galleria-theme'],
    'Gem': ['"Gem"', 'gem.css', 'gem-theme'],
    'Grid': ['"Grid"', 'grid.css', 'grid-theme'],
    
    'Habitat': ['"Habitat"', 'habitat.css', 'habitat-theme'],
    'Handmade': ['"Handmade"', 'handmade.css', 'handmade-theme'],
    'Handy': ['"Handy"', 'handy.css', 'handy-theme'],
    'Highlight': ['"Highlight"', 'highlight.css', 'highlight-theme'],
    'Honey': ['"Honey"', 'honey.css', 'honey-theme'],
    'Huge': ['"Huge"', 'huge.css', 'huge-theme'],
    
    'Igloo': ['"Igloo"', 'igloo.css', 'igloo-theme'],
    'Ignite': ['"Ignite"', 'ignite.css', 'ignite-theme'],
    'Influence': ['"Influence"', 'influence.css', 'influence-theme'],
    'Infinity': ['"Infinity"', 'infinity.css', 'infinity-theme'],
    'Ira': ['"Ira"', 'ira.css', 'ira-theme'],
    'Iris': ['"Iris"', 'iris.css', 'iris-theme'],
    
    'Kairo': ['"Kairo"', 'kairo.css', 'kairo-theme'],
    'Keystone': ['"Keystone"', 'keystone.css', 'keystone-theme'],
    'Kidu': ['"Kidu"', 'kidu.css', 'kidu-theme'],
    'King': ['"King"', 'king.css', 'king-theme'],
    'Kingdom': ['"Kingdom"', 'kingdom.css', 'kingdom-theme'],
    'Koto': ['"Koto"', 'koto.css', 'koto-theme'],
    
    'Label': ['"Label"', 'label.css', 'label-theme'],
    'Launch': ['"Launch"', 'launch.css', 'launch-theme'],
    'Loft': ['"Loft"', 'loft.css', 'loft-theme'],
    'Lorenza': ['"Lorenza"', 'lorenza.css', 'lorenza-theme'],
    'Lute': ['"Lute"', 'lute.css', 'lute-theme'],
    'Luxe': ['"Luxe"', 'luxe.css', 'luxe-theme'],
    
    'Machina': ['"Machina"', 'machina.css', 'machina-theme'],
    'Madrid': ['"Madrid"', 'madrid.css', 'madrid-theme'],
    'Maker': ['"Maker"', 'maker.css', 'maker-theme'],
    'Mandolin': ['"Mandolin"', 'mandolin.css', 'mandolin-theme'],
    'Maranello': ['"Maranello"', 'maranello.css', 'maranello-theme'],
    'Marble': ['"Marble"', 'marble.css', 'marble-theme'],
    'Masonry': ['"Masonry"', 'masonry.css', 'masonry-theme'],
    'Mavon': ['"Mavon"', 'mavon.css', 'mavon-theme'],
    'Meka': ['"Meka"', 'meka.css', 'meka-theme'],
    'Minimal': ['"Minimal"', 'minimal.css', 'minimal-theme'],
    'Minimalista': ['"Minimalista"', 'minimalista.css', 'minimalista-theme'],
    'Minion': ['"Minion"', 'minion.css', 'minion-theme'],
    'Mobilia': ['"Mobilia"', 'mobilia.css', 'mobilia-theme'],
    'Mode': ['"Mode"', 'mode.css', 'mode-theme'],
    'Modular': ['"Modular"', 'modular.css', 'modular-theme'],
    'Modules': ['"Modules"', 'modules.css', 'modules-theme'],
    'Mojave': ['"Mojave"', 'mojave.css', 'mojave-theme'],
    'Momentum': ['"Momentum"', 'momentum.css', 'momentum-theme'],
    'Monaco': ['"Monaco"', 'monaco.css', 'monaco-theme'],
    'Monk': ['"Monk"', 'monk.css', 'monk-theme'],
    'Mono': ['"Mono"', 'mono.css', 'mono-theme'],
    'Mr.Parker': ['"Mr.Parker"', 'mr-parker.css', 'mr-parker-theme'],
    'Multi': ['"Multi"', 'multi.css', 'multi-theme'],
    'Murmel': ['"Murmel"', 'murmel.css', 'murmel-theme'],
    
    'Narrative': ['"Narrative"', 'narrative.css', 'narrative-theme'],
    'Neat': ['"Neat"', 'neat.css', 'neat-theme'],
    'Nexa': ['"Nexa"', 'nexa.css', 'nexa-theme'],
    'Next': ['"Next"', 'next.css', 'next-theme'],
    'Noblesse': ['"Noblesse"', 'noblesse.css', 'noblesse-theme'],
    'Noire': ['"Noire"', 'noire.css', 'noire-theme'],
    'Nordic': ['"Nordic"', 'nordic.css', 'nordic-theme'],
    'North': ['"North"', 'north.css', 'north-theme'],
    'Nostalgia': ['"Nostalgia"', 'nostalgia.css', 'nostalgia-theme'],
    
    'Outsiders': ['"Outsiders"', 'outsiders.css', 'outsiders-theme'],
    
    'Pacific': ['"Pacific"', 'pacific.css', 'pacific-theme'],
    'Paper': ['"Paper"', 'paper.css', 'paper-theme'],
    'Parallax': ['"Parallax"', 'parallax.css', 'parallax-theme'],
    'Paris': ['"Paris"', 'paris.css', 'paris-theme'],
    'Pesto': ['"Pesto"', 'pesto.css', 'pesto-theme'],
    'Piano': ['"Piano"', 'piano.css', 'piano-theme'],
    'Pinnacle': ['"Pinnacle"', 'pinnacle.css', 'pinnacle-theme'],
    'Polyform': ['"Polyform"', 'polyform.css', 'polyform-theme'],
    'Portland': ['"Portland"', 'portland.css', 'portland-theme'],
    'Praise': ['"Praise"', 'praise.css', 'praise-theme'],
    'Providence': ['"Providence"', 'providence.css', 'providence-theme'],
    'Pursuit': ['"Pursuit"', 'pursuit.css', 'pursuit-theme'],
    
    'Reach': ['"Reach"', 'reach.css', 'reach-theme'],
    'Reformation': ['"Reformation"', 'reformation.css', 'reformation-theme'],
    'Refine': ['"Refine"', 'refine.css', 'refine-theme'],
    'Relax': ['"Relax"', 'relax.css', 'relax-theme'],
    'Responsive': ['"Responsive"', 'responsive.css', 'responsive-theme'],
    'Retina': ['"Retina"', 'retina.css', 'retina-theme'],
    'Retro': ['"Retro"', 'retro.css', 'retro-theme'],
    'Ride': ['"Ride"', 'ride.css', 'ride-theme'],
    'Roam': ['"Roam"', 'roam.css', 'roam-theme'],
    
    'Sahara': ['"Sahara"', 'sahara.css', 'sahara-theme'],
    'Satoshi': ['"Satoshi"', 'satoshi.css', 'satoshi-theme'],
    'Select': ['"Select"', 'select.css', 'select-theme'],
    'Shapes': ['"Shapes"', 'shapes.css', 'shapes-theme'],
    'Shark': ['"Shark"', 'shark.css', 'shark-theme'],
    'Shine': ['"Shine"', 'shine.css', 'shine-theme'],
    'Showcase': ['"Showcase"', 'showcase.css', 'showcase-theme'],
    'ShowTime': ['"ShowTime"', 'showtime.css', 'showtime-theme'],
    'Simple': ['"Simple"', 'simple.css', 'simple-theme'],
    'Sitar': ['"Sitar"', 'sitar.css', 'sitar-theme'],
    'Sleek': ['"Sleek"', 'sleek.css', 'sleek-theme'],
    'Soul': ['"Soul"', 'soul.css', 'soul-theme'],
    'Space': ['"Space"', 'space.css', 'space-theme'],
    'Spark': ['"Spark"', 'spark.css', 'spark-theme'],
    'Split': ['"Split"', 'split.css', 'split-theme'],
    'Starlite': ['"Starlite"', 'starlite.css', 'starlite-theme'],
    'Startup': ['"Startup"', 'startup.css', 'startup-theme'],
    'Stockholm': ['"Stockholm"', 'stockholm.css', 'stockholm-theme'],
    'Stockmart': ['"Stockmart"', 'stockmart.css', 'stockmart-theme'],
    'Story': ['"Story"', 'story.css', 'story-theme'],
    'Streamline': ['"Streamline"', 'streamline.css', 'streamline-theme'],
    'StyleScape': ['"StyleScape"', 'stylescape.css', 'stylescape-theme'],
    'Sunrise': ['"Sunrise"', 'sunrise.css', 'sunrise-theme'],
    'Supply': ['"Supply"', 'supply.css', 'supply-theme'],
    'Swipe': ['"Swipe"', 'swipe.css', 'swipe-theme'],
    'Sydney': ['"Sydney"', 'sydney.css', 'sydney-theme'],
    
    'Taiga': ['"Taiga"', 'taiga.css', 'taiga-theme'],
    'Tailor': ['"Tailor"', 'tailor.css', 'tailor-theme'],
    'Takeout': ['"Takeout"', 'takeout.css', 'takeout-theme'],
    'Testament': ['"Testament"', 'testament.css', 'testament-theme'],
    'Tokyo': ['"Tokyo"', 'tokyo.css', 'tokyo-theme'],
    'Toyo': ['"Toyo"', 'toyo.css', 'toyo-theme'],
    'Trend': ['"Trend"', 'trend.css', 'trend-theme'],
    
    'Ultra': ['"Ultra"', 'ultra.css', 'ultra-theme', '.build.css', 'header__menu-item'],
    'Unicorn': ['"Unicorn"', 'unicorn.css', 'unicorn-theme'],
    'Upscale': ['"Upscale"', 'upscale.css', 'upscale-theme'],
    'Urban': ['"Urban"', 'urban.css', 'urban-theme'],
    'Urge': ['"Urge"', 'urge.css', 'urge-theme'],
    
    'Vantage': ['"Vantage"', 'vantage.css', 'vantage-theme'],
    'Veena': ['"Veena"', 'veena.css', 'veena-theme'],
    'Venture': ['"Venture"', 'venture.css', 'venture-theme'],
    'Venue': ['"Venue"', 'venue.css', 'venue-theme'],
    'Vincent': ['"Vincent"', 'vincent.css', 'vincent-theme'],
    'Viola': ['"Viola"', 'viola.css', 'viola-theme'],
    'Vivid': ['"Vivid"', 'vivid.css', 'vivid-theme'],
    'Vogue': ['"Vogue"', 'vogue.css', 'vogue-theme'],
    
    'Whisk': ['"Whisk"', 'whisk.css', 'whisk-theme'],
    'Woodstock': ['"Woodstock"', 'woodstock.css', 'woodstock-theme'],
    
    'Xclusive': ['"Xclusive"', 'xclusive.css', 'xclusive-theme'],
    'Xtra': ['"Xtra"', 'xtra.css', 'xtra-theme'],
    
    'Yuva': ['"Yuva"', 'yuva.css', 'yuva-theme'],
    
    'Zest': ['"Zest"', 'zest.css', 'zest-theme'],
    'Zora': ['"Zora"', 'zora.css', 'zora-theme'],
    
    // Legacy/Popular Third-party Themes (Non-official but commonly used)
    'Turbo': ['"Turbo"', 'turbo.css', 'header__logo', 'sticky_nav', 'turbo-theme'],
    'Shella': ['"Shella"', 'shella.css', 'shella-theme'],
    'Kalles': ['"Kalles"', 'kalles.css', 'kalles-theme'],
    'Ella': ['"Ella"', 'ella.css', 'ella-theme'],
    'Debutify': ['"Debutify"', 'debutify.css', 'debutify-theme'],
    'Booster': ['"Booster"', 'booster.css', 'booster-theme']
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
        let hasExactMatch = false;
        let hasCSSMatch = false;
        
        patterns.forEach(pattern => {
            const patternLower = pattern.toLowerCase();
            if (htmlLower.includes(patternLower)) {
                // 精确主题名匹配 (最高权重)
                if (pattern.startsWith('"') && pattern.endsWith('"')) {
                    score += 25;
                    hasExactMatch = true;
                }
                // CSS 文件匹配 (高权重)
                else if (pattern.includes('.css')) {
                    score += 20;
                    hasCSSMatch = true;
                }
                // 特定主题类名匹配 (中等权重)
                else if (pattern.includes('-theme') || pattern.includes('theme-')) {
                    score += 15;
                }
                // 其他特征匹配 (低权重)
                else {
                    score += 5;
                }
            }
        });
        
        // 只有找到精确匹配或CSS匹配才认为是有效检测
        if ((hasExactMatch || hasCSSMatch) && score > bestMatch.score) {
            bestMatch = { theme: themeName, score };
        }
    }
    
    // 更严格的置信度计算
    let confidence = 0;
    if (bestMatch.score >= 25) { // 有精确主题名匹配
        confidence = Math.min(95, 60 + bestMatch.score);
    } else if (bestMatch.score >= 20) { // 有CSS文件匹配
        confidence = Math.min(85, 40 + bestMatch.score);
    } else if (bestMatch.score >= 15) { // 有主题类名匹配
        confidence = Math.min(75, 30 + bestMatch.score);
    } else if (bestMatch.score > 0) {
        confidence = Math.min(60, 20 + bestMatch.score);
    }
    
    return {
        theme: bestMatch.score >= 15 ? bestMatch.theme : 'Unknown', // 提高检测门槛
        confidence: bestMatch.score >= 15 ? confidence : 0
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
