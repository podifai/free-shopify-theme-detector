  const axios = require('axios');
  const cheerio = require('cheerio');

  const SHOPIFY_THEME_ID_MAP = {
      887: 'Dawn',
      1356: 'Sense',
      1368: 'Craft',
      1499: 'Colorblock',
      1434: 'Taste',
      1363: 'Crave',
      1431: 'Studio',
      1567: 'Refresh',
      1864: 'Publisher',
      1841: 'Origin',
      1918: 'Abode',
      657: 'Alchemy',
      2514: 'Aesthetic',
      2346: 'Agile',
      2378: 'Aisle',
      1966: 'Align',
      2217: 'Amber',
      1390: 'Andaman',
      2436: 'Area',
      856: 'Artisan',
      2277: 'Artist',
      1608: 'Athens',
      566: 'Atlantic',
      1974: 'Atom',
      1770: 'Aurora',
      1664: 'Automation',
      1667: 'Avante',
      909: 'Avatar',
      865: 'Avenue',
      1967: 'Banjo',
      2324: 'Barcelona',
      910: 'Baseline',
      1448: 'Bazaar',
      1399: 'Be Yours',
      2138: 'Berlin',
      939: 'Beyond',
      606: 'Blockshop',
      1839: 'Blum',
      863: 'Boost',
      2491: 'Borders',
      766: 'Boundless',
      2148: 'Brava',
      868: 'Broadcast',
      730: 'Brooklyn',
      1114: 'Bullet',
      691: 'California',
      2204: 'Cama',
      732: 'Canopy',
      812: 'Capital',
      859: 'Cascade',
      2328: 'Cello',
      2010: 'Champion',
      2063: 'Charge',
      1584: 'Chord',
      757: 'Colors',
      1826: 'Combine',
      2412: 'Concept',
      870: 'Context',
      2564: 'Copenhagen',
      2348: 'Cornerstone',
      1829: 'Creative',
      1922: 'Creator',
      796: 'Debut',
      2539: 'Digital',
      2431: 'Distinctive',
      735: 'District',
      2273: 'Divide',
      2931: 'Divine',
      1197: 'Drop',
      3070: 'Eclipse',
      457: 'Editions',
      827: 'Editorial',
      1743: 'Effortless',
      2164: 'Electro',
      2578: 'Elysian',
      833: 'Emerge',
      838: 'Empire',
      1854: 'Emporium',
      2717: 'Energy',
      1657: 'Enterprise',
      411: 'Envy',
      1790: 'Erickson',
      2366: 'Essence',
      2482: 'Essentials',
      2048: 'Eurus',
      1828: 'Exhibit',
      902: 'Expanse',
      885: 'Express',
      230: 'Expression',
      2101: 'Fame',
      141: 'Fashionopolism',
      1949: 'Fetch',
      2847: 'Flawless',
      801: 'Flow',
      714: 'Focal',
      918: 'Foodie',
      1492: 'Forge',
      1716: 'Frame',
      908: 'Fresh',
      2077: 'Gain',
      851: 'Galleria',
      2222: 'Gem',
      718: 'Grid',
      1581: 'Habitat',
      1791: 'Handmade',
      826: 'Handy',
      903: 'Highlight',
      2160: 'Honey',
      2158: 'Huge',
      686: 'Icon',
      2315: 'Igloo',
      3027: 'Ignite',
      1190: 'Impact',
      857: 'Impulse',
      1536: 'Influence',
      2061: 'Infinity',
      790: 'Ira',
      2489: 'Iris',
      1843: 'Kairo',
      2943: 'Keystone',
      2268: 'Kidu',
      2948: 'King',
      725: 'Kingdom',
      3001: 'Koto',
      773: 'Label',
      793: 'Launch',
      1651: 'Local',
      846: 'Loft',
      798: 'Lorenza',
      2171: 'Lute',
      2779: 'Luxe',
      2883: 'Machina',
      2870: 'Madrid',
      765: 'Maker',
      1696: 'Mandolin',
      2186: 'Maranello',
      1907: 'Marble',
      450: 'Masonry',
      1979: 'Mavon',
      2845: 'Meka',
      380: 'Minimal',
      2316: 'Minimalista',
      1571: 'Minion',
      464: 'Mobilia',
      1578: 'Mode',
      849: 'Modular',
      1795: 'Modules',
      1497: 'Mojave',
      1600: 'Momentum',
      2125: 'Monaco',
      2515: 'Monk',
      1818: 'Mono',
      847: 'Motion',
      567: 'Mr.Parker',
      2337: 'Multi',
      2512: 'Murmel',
      829: 'Narrative',
      1878: 'Neat',
      2820: 'Nexa',
      2240: 'Next',
      2546: 'Noblesse',
      2926: 'Noire',
      2801: 'Nordic',
      1460: 'North',
      2175: 'Nostalgia',
      2896: 'Outsiders',
      705: 'Pacific',
      777: 'Palo Alto',
      1662: 'Paper',
      688: 'Parallax',
      2702: 'Paris',
      2275: 'Pesto',
      2812: 'Piano',
      739: 'Pipeline',
      2852: 'Pinnacle',
      2493: 'Polyform',
      1924: 'Portland',
      2144: 'Praise',
      855: 'Prestige',
      587: 'Providence',
      1654: 'Pursuit',
      853: 'Reach',
      1762: 'Reformation',
      2782: 'Refine',
      2477: 'Relax',
      304: 'Responsive',
      601: 'Retina',
      2630: 'Retro',
      1500: 'Ride',
      1777: 'Roam',
      1926: 'Sahara',
      2881: 'Satoshi',
      2372: 'Select',
      1535: 'Shapes',
      2619: 'Shark',
      2576: 'Shine',
      677: 'Showcase',
      687: 'ShowTime',
      578: 'Simple',
      2599: 'Sitar',
      2821: 'Sleek',
      2825: 'Soul',
      2659: 'Space',
      911: 'Spark',
      842: 'Split',
      2455: 'Starlite',
      652: 'Startup',
      1621: 'Stiletto',
      1405: 'Stockholm',
      2105: 'Stockmart',
      864: 'Story',
      872: 'Streamline',
      2238: 'StyleScape',
      57: 'Sunrise',
      679: 'Supply',
      2737: 'Swipe',
      2117: 'Sydney',
      568: 'Symmetry',
      1751: 'Taiga',
      1457: 'Tailor',
      2534: 'Takeout',
      623: 'Testament',
      2629: 'Tokyo',
      2358: 'Toyo',
      2699: 'Trade',
      2980: 'Trend',
      2967: 'Ultra',
      2264: 'Unicorn',
      1754: 'Upscale',
      2405: 'Urban',
      2213: 'Urge',
      459: 'Vantage',
      2566: 'Veena',
      775: 'Venture',
      836: 'Venue',
      2913: 'Vincent',
      1701: 'Viola',
      2053: 'Vision',
      2285: 'Vivid',
      808: 'Vogue',
      871: 'Warehouse',
      1819: 'Whisk',
      2684: 'Wonder',
      2239: 'Woodstock',
      2221: 'Xclusive',
      1609: 'Xtra',
      1615: 'Yuva',
      1611: 'Zest',
      2505: 'Zora'
  };

  const SHOPIFY_THEME_NAME_MAP = {};
  Object.entries(SHOPIFY_THEME_ID_MAP).forEach(([id, name]) => {
      SHOPIFY_THEME_NAME_MAP[name] = parseInt(id);
  });

  class EnhancedShopifyThemeDetector {
      constructor() {
          this.themeIdMap = SHOPIFY_THEME_ID_MAP;
          this.themeNameMap = SHOPIFY_THEME_NAME_MAP;
          this.freeThemeIds = [887, 1356, 1368, 1499, 1434, 1363, 1431,
  1567, 1864, 1841];

          this.enhancedThirdPartyPatterns = {
              'Kalles': {
                  patterns: ['kalles.css', 'kt-', 'kalles-section',
  '/assets/kalles', 'kalles-theme', 'kalles-wrapper'],
                  domSelectors: ['.kalles-main', '.kt-header',
  '.kalles-product', '.kalles-collection'],
                  cssClasses: ['kalles-btn', 'kalles-card', 'kalles-grid',
  'kt-product'],
                  minMatches: 3,
                  confidence: 85
              },
              'Turbo': {
                  patterns: ['turbo.css', 'turbo-theme', '/assets/turbo',
  'header__logo', 'turbo-'],
                  domSelectors: ['.turbo-header', '.turbo-main',
  '.turbo-product-card'],
                  cssClasses: ['turbo-btn', 'turbo-grid', 'turbo-card'],
                  minMatches: 3,
                  confidence: 85
              },
              'Ella': {
                  patterns: ['ella.css', 'ella-theme', '/assets/ella',
  'ella-', 'ella-main'],
                  domSelectors: ['.ella-wrapper', '.ella-header',
  '.ella-product'],
                  cssClasses: ['ella-btn', 'ella-card', 'ella-grid'],
                  minMatches: 3,
                  confidence: 80
              },
              'Debutify': {
                  patterns: ['debutify.css', 'debutify-theme', 'dbtfy-',
  'debutify-'],
                  domSelectors: ['.dbtfy-wrapper', '.debutify-main',
  '.dbtfy-product'],
                  cssClasses: ['dbtfy-btn', 'debutify-card', 'dbtfy-grid'],
                  minMatches: 3,
                  confidence: 85
              },
              'Booster': {
                  patterns: ['booster.css', 'booster-theme', 'btb-',
  'booster-'],
                  domSelectors: ['.booster-wrapper', '.btb-main',
  '.booster-product'],
                  cssClasses: ['booster-btn', 'btb-card', 'booster-grid'],
                  minMatches: 3,
                  confidence: 80
              },
              'Gecko': {
                  patterns: ['gecko.css', 'gecko-theme', 'gecko-',
  '/assets/gecko'],
                  domSelectors: ['.gecko-wrapper', '.gecko-header',
  '.gecko-product'],
                  cssClasses: ['gecko-btn', 'gecko-card', 'gecko-grid'],
                  minMatches: 3,
                  confidence: 80
              },
              'Wokiee': {
                  patterns: ['wokiee.css', 'wokiee-theme', 'wokiee-',
  '/assets/wokiee'],
                  domSelectors: ['.wokiee-wrapper', '.wokiee-header',
  '.wokiee-product'],
                  cssClasses: ['wokiee-btn', 'wokiee-card', 'wokiee-grid'],
                  minMatches: 3,
                  confidence: 80
              },
              'Fastest': {
                  patterns: ['fastest.css', 'fastest-theme', 'fastest-',
  '/assets/fastest'],
                  domSelectors: ['.fastest-wrapper', '.fastest-header',
  '.fastest-product'],
                  cssClasses: ['fastest-btn', 'fastest-card',
  'fastest-grid'],
                  minMatches: 3,
                  confidence: 80
              },
              'Warehouse': {
                  patterns: ['warehouse.css', 'warehouse-theme',
  'warehouse-', '/assets/warehouse'],
                  domSelectors: ['.warehouse-wrapper', '.warehouse-header',
   '.warehouse-product'],
                  cssClasses: ['warehouse-btn', 'warehouse-card',
  'warehouse-grid'],
                  minMatches: 3,
                  confidence: 80
              },
              'Flex': {
                  patterns: ['flex.css', 'flex-theme', 'flex-',
  '/assets/flex'],
                  domSelectors: ['.flex-wrapper', '.flex-header',
  '.flex-product'],
                  cssClasses: ['flex-btn', 'flex-card', 'flex-grid'],
                  minMatches: 3,
                  confidence: 80
              },
              'Shella': {
                  patterns: ['shella.css', 'shella-theme',
  '/assets/shella', 'shella-'],
                  domSelectors: ['.shella-main', '.shella-header',
  '.shella-product'],
                  cssClasses: ['shella-btn', 'shella-card'],
                  minMatches: 2,
                  confidence: 80
              },
              'PageFly': {
                  patterns: ['pagefly.css', 'pf-', '__pf', 'pagefly-'],
                  domSelectors: ['.pf-wrapper', '.pagefly-main',
  '.pf-section'],
                  cssClasses: ['pf-btn', 'pagefly-card', 'pf-grid'],
                  minMatches: 2,
                  confidence: 75
              }
          };

          this.shopify2Patterns = {
              'Dawn': {
                  patterns: ['shopify-section-group', 'template--',
  'color-scheme', 'component-', 'section-'],
                  domSelectors: ['.shopify-section-group',
  '.template--index', '.color-scheme', '.component-card'],
                  cssClasses: ['component-card', 'template--index',
  'color-scheme-1', 'section-template'],
                  minMatches: 4,
                  confidence: 95
              },
              'Sense': {
                  patterns: ['predictive-search--sense', 'sense-',
  'shopify-section-group'],
                  domSelectors: ['.sense-wrapper',
  '.predictive-search--sense'],
                  cssClasses: ['sense-btn', 'sense-card', 'sense-grid'],
                  minMatches: 3,
                  confidence: 90
              },
              'Craft': {
                  patterns: ['craft-product', 'craft-',
  'shopify-section-group'],
                  domSelectors: ['.craft-wrapper', '.craft-product'],
                  cssClasses: ['craft-btn', 'craft-card', 'craft-grid'],
                  minMatches: 3,
                  confidence: 90
              },
              'Refresh': {
                  patterns: ['refresh-', 'shopify-section-group',
  'template--'],
                  domSelectors: ['.refresh-wrapper', '.template--'],
                  cssClasses: ['refresh-btn', 'refresh-card',
  'refresh-grid'],
                  minMatches: 3,
                  confidence: 90
              },
              'Publisher': {
                  patterns: ['publisher-', 'shopify-section-group',
  'template--'],
                  domSelectors: ['.publisher-wrapper', '.template--'],
                  cssClasses: ['publisher-btn', 'publisher-card',
  'publisher-grid'],
                  minMatches: 3,
                  confidence: 90
              },
              'Origin': {
                  patterns: ['origin-', 'shopify-section-group',
  'template--'],
                  domSelectors: ['.origin-wrapper', '.template--'],
                  cssClasses: ['origin-btn', 'origin-card', 'origin-grid'],
                  minMatches: 3,
                  confidence: 90
              }
          };

          this.enhancedOfficialThemeStructures = {
              'Prestige': {
                  patterns: ['ProductItem__', 'product-item--',
  'ProductItem--'],
                  domSelectors: ['.ProductItem__', '.product-item--',
  '.ProductItem--'],
                  cssClasses: ['ProductItem__Wrapper',
  'ProductItem__Title', 'ProductItem__PriceList'],
                  minMatches: 3,
                  confidence: 85
              },
              'Impact': {
                  patterns: ['product-card--blends', 'section-stack',
  'impact-'],
                  domSelectors: ['.product-card--blends', '.section-stack',
   '.impact-'],
                  cssClasses: ['product-card--blends', 'section-stack',
  'impact-header'],
                  minMatches: 3,
                  confidence: 85
              },
              'Symmetry': {
                  patterns: ['product-single__', 'site-header__',
  'product-form__'],
                  domSelectors: ['.product-single__', '.site-header__',
  '.product-form__'],
                  cssClasses: ['product-single__photos',
  'site-header__logo', 'product-form__buttons'],
                  minMatches: 3,
                  confidence: 85
              },
              'Icon': {
                  patterns: ['product-gallery', 'icon-', 'product-single'],
                  domSelectors: ['.product-gallery', '.icon-',
  '.product-single'],
                  cssClasses: ['product-gallery-item', 'icon-header',
  'product-single-item'],
                  minMatches: 3,
                  confidence: 85
              },
              'Impulse': {
                  patterns: ['product-recommendations', 'impulse-',
  'product-form'],
                  domSelectors: ['.product-recommendations', '.impulse-',
  '.product-form'],
                  cssClasses: ['product-recommendations-item',
  'impulse-header', 'product-form-item'],
                  minMatches: 3,
                  confidence: 85
              }
          };
      }

      async detectTheme(url) {
          try {
              const { html, $ } = await this.fetchHTMLAndParse(url);

              if (!this.isShopifyStore(html)) {
                  return {
                      isShopify: false,
                      theme: null,
                      confidence: 0,
                      method: 'not_shopify',
                      url: url
                  };
              }

              const detectionMethods = [
                  () => this.detectByThemeStoreId(html),
                  () => this.detectByShopifyObject(html),
                  () => this.detectByShopify2Patterns(html, $),
                  () => this.detectByEnhancedDOMStructure(html, $),
                  () => this.detectByEnhancedCSSAnalysis(html, $),
                  () => this.detectByEnhancedThirdPartyThemes(html, $),
                  () => this.detectByMetaTags(html),
                  () => this.detectByHTMLStructure(html)
              ];

              const results = [];
              for (const method of detectionMethods) {
                  const result = method();
                  if (result.confidence > 0) {
                      results.push(result);
                  }
              }

              const finalResult = this.mergeDetectionResults(results);
              const enhancedResult = await this.enhanceResult(finalResult,
  html, $);

              return {
                  isShopify: true,
                  url: url,
                  ...enhancedResult
              };

          } catch (error) {
              return {
                  isShopify: false,
                  url: url,
                  theme: null,
                  confidence: 0,
                  error: error.message,
                  method: 'error'
              };
          }
      }

      detectByThemeStoreId(html) {
          const patterns = [
              /"theme_store_id":\s*(\d+)/,
              /'theme_store_id':\s*(\d+)/,
              /theme_store_id["']?\s*:\s*(\d+)/,
              /themeStoreId["']?\s*:\s*(\d+)/
          ];

          for (const pattern of patterns) {
              const match = html.match(pattern);
              if (match) {
                  const id = parseInt(match[1]);
                  const themeName = this.themeIdMap[id];

                  if (themeName) {
                      return {
                          theme: themeName,
                          confidence: 95,
                          method: 'theme_store_id',
                          themeId: id,
                          isFree: this.freeThemeIds.includes(id),
                          isOfficial: true
                      };
                  } else {
                      return {
                          theme: `Unknown Official Theme (ID: ${id})`,
                          confidence: 90,
                          method: 'theme_store_id_unknown',
                          themeId: id,
                          isOfficial: true
                      };
                  }
              }
          }

          const nullPatterns = [
              /"theme_store_id":\s*null/,
              /'theme_store_id':\s*null/,
              /theme_store_id["']?\s*:\s*null/
          ];

          for (const pattern of nullPatterns) {
              if (pattern.test(html)) {
                  return {
                      theme: 'Custom Theme',
                      confidence: 85,
                      method: 'theme_store_id_null',
                      themeId: null,
                      isOfficial: false,
                      isCustom: true
                  };
              }
          }

          return { theme: null, confidence: 0, method: 'no_theme_id' };
      }

      detectByShopifyObject(html) {
          const patterns = [

  /Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/,

  /window\.Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/,
              /["']theme["']:\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/,
              /Shopify\.theme\.name\s*=\s*["']([^"']+)["']/,
              /window\.theme\s*=\s*["']([^"']+)["']/
          ];

          for (const pattern of patterns) {
              const match = html.match(pattern);
              if (match) {
                  const themeName = match[1];
                  const themeId = this.themeNameMap[themeName];
                  const confidence = themeId ? 85 : 75;

                  return {
                      theme: themeName,
                      confidence: confidence,
                      method: 'shopify_object',
                      themeId: themeId || null,
                      isFree: themeId ? this.freeThemeIds.includes(themeId)
   : null,
                      isOfficial: !!themeId
                  };
              }
          }

          return { theme: null, confidence: 0, method: 'no_shopify_object'
  };
      }

      detectByShopify2Patterns(html, $) {
          for (const [themeName, config] of
  Object.entries(this.shopify2Patterns)) {
              let matches = 0;
              const matchedFeatures = [];

              for (const pattern of config.patterns) {
                  if (html.includes(pattern)) {
                      matches++;
                      matchedFeatures.push({ type: 'pattern', value:
  pattern });
                  }
              }

              for (const selector of config.domSelectors) {
                  if ($(selector).length > 0) {
                      matches++;
                      matchedFeatures.push({ type: 'dom', value: selector
  });
                  }
              }

              for (const className of config.cssClasses) {
                  if ($(`.${className}`).length > 0) {
                      matches++;
                      matchedFeatures.push({ type: 'css', value: className
  });
                  }
              }

              if (matches >= config.minMatches) {
                  const themeId = this.themeNameMap[themeName];
                  return {
                      theme: themeName,
                      confidence: config.confidence,
                      method: 'shopify_2_0_detection',
                      themeId: themeId || null,
                      isShopify2: true,
                      isFree: themeId ? this.freeThemeIds.includes(themeId)
   : null,
                      isOfficial: true,
                      matchedFeatures: matchedFeatures,
                      matchCount: matches
                  };
              }
          }

          return { theme: null, confidence: 0, method:
  'no_shopify_2_patterns' };
      }

      detectByEnhancedDOMStructure(html, $) {
          for (const [themeName, config] of
  Object.entries(this.enhancedOfficialThemeStructures)) {
              let matches = 0;
              const matchedFeatures = [];

              for (const pattern of config.patterns) {
                  if (html.includes(pattern)) {
                      matches++;
                      matchedFeatures.push({ type: 'pattern', value:
  pattern });
                  }
              }

              for (const selector of config.domSelectors) {
                  if ($(selector).length > 0) {
                      matches++;
                      matchedFeatures.push({ type: 'dom', value: selector
  });
                  }
              }

              for (const className of config.cssClasses) {
                  if ($(`.${className}`).length > 0) {
                      matches++;
                      matchedFeatures.push({ type: 'css', value: className
  });
                  }
              }

              if (matches >= config.minMatches) {
                  const themeId = this.themeNameMap[themeName];
                  return {
                      theme: themeName,
                      confidence: config.confidence,
                      method: 'enhanced_dom_structure',
                      themeId: themeId || null,
                      isFree: themeId ? this.freeThemeIds.includes(themeId)
   : null,
                      isOfficial: true,
                      matchedFeatures: matchedFeatures,
                      matchCount: matches
                  };
              }
          }

          return { theme: null, confidence: 0, method:
  'no_enhanced_dom_structure' };
      }

      detectByEnhancedCSSAnalysis(html, $) {
          const cssAnalysis = {
              cssFiles: [],
              inlineStyles: [],
              cssClasses: new Set(),
              cssVariables: new Set()
          };

          $('link[rel="stylesheet"]').each((i, elem) => {
              const href = $(elem).attr('href');
              if (href) {
                  cssAnalysis.cssFiles.push(href);
              }
          });

          $('style').each((i, elem) => {
              const content = $(elem).html();
              if (content) {
                  cssAnalysis.inlineStyles.push(content);
              }
          });

          $('*').each((i, elem) => {
              const className = $(elem).attr('class');
              if (className) {
                  className.split(' ').forEach(cls => {
                      if (cls.trim()) {
                          cssAnalysis.cssClasses.add(cls.trim());
                      }
                  });
              }
          });

          cssAnalysis.inlineStyles.forEach(style => {
              const varMatches = style.match(/--[\w-]+/g);
              if (varMatches) {
                  varMatches.forEach(variable => {
                      cssAnalysis.cssVariables.add(variable);
                  });
              }
          });

          const themeResult = this.analyzeThemeFromCSS(cssAnalysis);

          if (themeResult.confidence > 0) {
              return {
                  ...themeResult,
                  method: 'enhanced_css_analysis',
                  cssAnalysis: {
                      cssFileCount: cssAnalysis.cssFiles.length,
                      inlineStyleCount: cssAnalysis.inlineStyles.length,
                      cssClassCount: cssAnalysis.cssClasses.size,
                      cssVariableCount: cssAnalysis.cssVariables.size
                  }
              };
          }

          return { theme: null, confidence: 0, method:
  'no_enhanced_css_analysis' };
      }

      detectByEnhancedThirdPartyThemes(html, $) {
          for (const [themeName, config] of
  Object.entries(this.enhancedThirdPartyPatterns)) {
              let matches = 0;
              const matchedFeatures = [];

              for (const pattern of config.patterns) {
                  if (html.includes(pattern)) {
                      matches++;
                      matchedFeatures.push({ type: 'pattern', value:
  pattern });
                  }
              }

              for (const selector of config.domSelectors) {
                  if ($(selector).length > 0) {
                      matches++;
                      matchedFeatures.push({ type: 'dom', value: selector
  });
                  }
              }

              for (const className of config.cssClasses) {
                  if ($(`.${className}`).length > 0) {
                      matches++;
                      matchedFeatures.push({ type: 'css', value: className
  });
                  }
              }

              if (matches >= config.minMatches) {
                  return {
                      theme: themeName,
                      confidence: config.confidence,
                      method: 'enhanced_third_party_detection',
                      themeId: null,
                      isThirdParty: true,
                      isOfficial: false,
                      matchedFeatures: matchedFeatures,
                      matchCount: matches
                  };
              }
          }

          return { theme: null, confidence: 0, method:
  'no_enhanced_third_party_patterns' };
      }

      detectByMetaTags(html) {
          const patterns = [

  /<meta[^>]+name=["']shopify-theme-id["'][^>]+content=["'](\d+)["']/i,
              /<meta[^>]+name=["']theme["'][^>]+content=["']([^"']+)["']/i,

  /<meta[^>]+property=["']shopify:theme["'][^>]+content=["']([^"']+)["']/i,

  /<meta[^>]+name=["']shopify-theme["'][^>]+content=["']([^"']+)["']/i
          ];

          for (const pattern of patterns) {
              const match = html.match(pattern);
              if (match) {
                  const value = match[1];

                  if (/^\d+$/.test(value)) {
                      const id = parseInt(value);
                      const themeName = this.themeIdMap[id];
                      return {
                          theme: themeName || `Unknown (ID: ${id})`,
                          confidence: 75,
                          method: 'meta_tag_id',
                          themeId: id,
                          isFree: this.freeThemeIds.includes(id),
                          isOfficial: !!themeName
                      };
                  } else {
                      const themeId = this.themeNameMap[value];
                      return {
                          theme: value,
                          confidence: 70,
                          method: 'meta_tag_name',
                          themeId: themeId || null,
                          isFree: themeId ?
  this.freeThemeIds.includes(themeId) : null,
                          isOfficial: !!themeId
                      };
                  }
              }
          }

          return { theme: null, confidence: 0, method: 'no_meta_tags' };
      }

      detectByHTMLStructure(html) {
          const structurePatterns = {
              'Dawn': {
                  patterns: ['shopify-section', 'color-scheme-',
  'component-'],
                  minMatches: 3,
                  confidence: 45
              },
              'Prestige': {
                  patterns: ['ProductItem__', 'ProductItem--',
  'product-item--'],
                  minMatches: 2,
                  confidence: 50
              },
              'Impact': {
                  patterns: ['product-card--blends', 'section-stack',
  'impact-'],
                  minMatches: 2,
                  confidence: 50
              }
          };

          for (const [themeName, config] of
  Object.entries(structurePatterns)) {
              let matches = 0;
              for (const pattern of config.patterns) {
                  if (html.includes(pattern)) {
                      matches++;
                  }
              }

              if (matches >= config.minMatches) {
                  const themeId = this.themeNameMap[themeName];
                  return {
                      theme: themeName,
                      confidence: config.confidence,
                      method: 'html_structure',
                      themeId: themeId || null,
                      structureMatches: matches,
                      isFree: themeId ? this.freeThemeIds.includes(themeId)
   : null,
                      isOfficial: !!themeId
                  };
              }
          }

          return { theme: null, confidence: 0, method: 'no_html_structure'
  };
      }

      async fetchHTMLAndParse(url) {
          try {
              let normalizedUrl = url.trim();
              if (!normalizedUrl.startsWith('http://') &&
  !normalizedUrl.startsWith('https://')) {
                  normalizedUrl = 'https://' + normalizedUrl;
              }

              const response = await axios.get(normalizedUrl, {
                  timeout: 15000,
                  maxRedirects: 5,
                  headers: {
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; 
  x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 
  Safari/537.36',
                      'Accept': 'text/html,application/xhtml+xml,applicatio
  n/xml;q=0.9,image/webp,*/*;q=0.8',
                      'Accept-Language': 'en-US,en;q=0.5',
                      'Accept-Encoding': 'gzip, deflate, br',
                      'Cache-Control': 'no-cache'
                  }
              });

              const html = response.data;
              const $ = cheerio.load(html);

              return { html, $ };
          } catch (error) {
              throw new Error(`Failed to fetch ${url}: ${error.message}`);
          }
      }

      isShopifyStore(html) {
          const indicators = [
              'shopify.com/s/files',
              'cdn.shopify.com',
              'window.Shopify',
              'Shopify.shop',
              'shopify-section',
              'data-shopify',
              'shopify-payment-button',
              '/wpm@',
              'shopify-features'
          ];

          const lowerHtml = html.toLowerCase();
          return indicators.some(indicator =>
  lowerHtml.includes(indicator.toLowerCase()));
      }

      analyzeThemeFromCSS(cssAnalysis) {
          for (const cssFile of cssAnalysis.cssFiles) {
              for (const [themeName, themeId] of
  Object.entries(this.themeNameMap)) {
                  const themeSlug =
  themeName.toLowerCase().replace(/[^a-z0-9]/g, '');
                  if (cssFile.includes(themeSlug) ||
  cssFile.includes(themeName.toLowerCase())) {
                      return {
                          theme: themeName,
                          confidence: 70,
                          themeId: themeId,
                          isFree: this.freeThemeIds.includes(themeId),
                          isOfficial: true,
                          cssFile: cssFile
                      };
                  }
              }
          }

          for (const className of cssAnalysis.cssClasses) {
              for (const [themeName, themeId] of
  Object.entries(this.themeNameMap)) {
                  const themeSlug =
  themeName.toLowerCase().replace(/[^a-z0-9]/g, '');
                  if (className.includes(themeSlug) ||
  className.includes(themeName.toLowerCase())) {
                      return {
                          theme: themeName,
                          confidence: 60,
                          themeId: themeId,
                          isFree: this.freeThemeIds.includes(themeId),
                          isOfficial: true,
                          cssClass: className
                      };
                  }
              }
          }

          return { theme: null, confidence: 0 };
      }

      mergeDetectionResults(results) {
          if (results.length === 0) {
              return {
                  theme: 'Unknown',
                  confidence: 0,
                  method: 'no_detection'
              };
          }

          results.sort((a, b) => b.confidence - a.confidence);

          if (results[0].confidence >= 80) {
              return results[0];
          }

          const themeCount = {};
          results.forEach(result => {
              if (result.theme) {
                  themeCount[result.theme] = (themeCount[result.theme] ||
  0) + 1;
              }
          });

          const mostCommonTheme = Object.entries(themeCount)
              .sort((a, b) => b[1] - a[1])[0];

          if (mostCommonTheme && mostCommonTheme[1] > 1) {
              const bestResult = results.find(r => r.theme ===
  mostCommonTheme[0]);
              return {
                  ...bestResult,
                  confidence: Math.min(bestResult.confidence + 10, 95),
                  method: 'multi_method_validation',
                  supportingMethods: results.filter(r => r.theme ===
  mostCommonTheme[0]).map(r => r.method)
              };
          }

          return results[0];
      }

      async enhanceResult(result, html, $) {
          if (!result.theme || result.theme === 'Unknown') {
              return result;
          }

          const customizationLevel = this.detectCustomizationLevel(html,
  $);
          result.customizationLevel = customizationLevel;

          const installedApps = this.detectInstalledApps(html, $);
          if (installedApps.length > 0) {
              result.installedApps = installedApps;
          }

          if (result.themeId) {
              result.themeStoreLink = this.getThemeStoreUrl(result.theme);
          }

          return result;
      }

      detectCustomizationLevel(html, $) {
          let customizationScore = 0;

          const customCssCount = $('style').length;
          customizationScore += customCssCount * 5;

          const inlineStyleCount = $('[style]').length;
          customizationScore += inlineStyleCount * 2;

          const customJsCount = $('script').filter((i, elem) => {
              const src = $(elem).attr('src');
              return !src || !src.includes('shopify.com');
          }).length;
          customizationScore += customJsCount * 3;

          if (customizationScore === 0) return 'minimal';
          if (customizationScore < 20) return 'light';
          if (customizationScore < 50) return 'moderate';
          if (customizationScore < 100) return 'heavy';
          return 'extensive';
      }

      detectInstalledApps(html, $) {
          const appPatterns = {
              'Klaviyo': ['klaviyo.com', 'klaviyo', 'klav-'],
              'Yotpo': ['yotpo.com', 'yotpo', 'yotpo-'],
              'Mailchimp': ['mailchimp.com', 'mailchimp', 'mc-'],
              'Privy': ['privy.com', 'privy', 'privy-'],
              'Smile.io': ['smile.io', 'smile-', 'smile_'],
              'Judge.me': ['judge.me', 'judgeme', 'jdgm-'],
              'Loox': ['loox.app', 'loox', 'loox-'],
              'Searchanise': ['searchanise.com', 'searchanise', 'snize-'],
              'Boost': ['boost.ai', 'boost-', 'boost_'],
              'Gorgias': ['gorgias.com', 'gorgias', 'gorgias-']
          };

          const detectedApps = [];

          for (const [appName, patterns] of Object.entries(appPatterns)) {
              for (const pattern of patterns) {
                  if (html.includes(pattern)) {
                      detectedApps.push(appName);
                      break;
                  }
              }
          }

          return detectedApps;
      }

      getThemeStoreUrl(themeNameOrId) {
          const name = typeof themeNameOrId === 'number'
              ? this.themeIdMap[themeNameOrId]
              : themeNameOrId;

          if (!name || name === 'Unknown') return null;

          const slug = name.toLowerCase()
              .replace(/[^a-z0-9\s]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');

          return `https://themes.shopify.com/themes/${slug}`;
      }

      async detectMultiple(urls, options = {}) {
          const {
              concurrent = 3,
              delay = 1000,
              includeErrors = false
          } = options;

          const results = [];
          const chunks = this.chunkArray(urls, concurrent);

          for (const chunk of chunks) {
              const promises = chunk.map(url => this.detectTheme(url));
              const chunkResults = await Promise.allSettled(promises);

              chunkResults.forEach((result, index) => {
                  if (result.status === 'fulfilled') {
                      results.push(result.value);
                  } else if (includeErrors) {
                      results.push({
                          url: chunk[index],
                          isShopify: false,
                          theme: null,
                          confidence: 0,
                          error: result.reason.message,
                          method: 'error'
                      });
                  }
              });

              if (delay > 0 && chunks.indexOf(chunk) < chunks.length - 1) {
                  await this.sleep(delay);
              }
          }

          return results;
      }

      chunkArray(array, size) {
          const chunks = [];
          for (let i = 0; i < array.length; i += size) {
              chunks.push(array.slice(i, i + size));
          }
          return chunks;
      }

      sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }

      getStats() {
          const totalThemes = Object.keys(this.themeIdMap).length;
          const freeThemes = this.freeThemeIds.length;
          const paidThemes = totalThemes - freeThemes;
          const thirdPartyThemes =
  Object.keys(this.enhancedThirdPartyPatterns).length;

          return {
              total: totalThemes,
              official: {
                  total: totalThemes,
                  free: freeThemes,
                  paid: paidThemes
              },
              thirdParty: thirdPartyThemes,
              supported: totalThemes + thirdPartyThemes
          };
      }
  }

  async function detectShopifyTheme(url) {
      const detector = new EnhancedShopifyThemeDetector();
      return await detector.detectTheme(url);
  }

  async function detectMultipleThemes(urls, options = {}) {
      const detector = new EnhancedShopifyThemeDetector();
      return await detector.detectMultiple(urls, options);
  }

  const ThemeUtils = {
      getThemeNameById(id) {
          return SHOPIFY_THEME_ID_MAP[id] || 'Unknown';
      },

      getThemeIdByName(name) {
          return SHOPIFY_THEME_NAME_MAP[name] || null;
      },

      isFreeTheme(themeNameOrId) {
          const freeThemeIds = [887, 1356, 1368, 1499, 1434, 1363, 1431,
  1567, 1864, 1841];
          const id = typeof themeNameOrId === 'string'
              ? this.getThemeIdByName(themeNameOrId)
              : themeNameOrId;
          return freeThemeIds.includes(id);
      },

      getThemeStoreUrl(themeNameOrId) {
          const name = typeof themeNameOrId === 'number'
              ? this.getThemeNameById(themeNameOrId)
              : themeNameOrId;

          if (!name || name === 'Unknown') return null;

          const slug = name.toLowerCase()
              .replace(/[^a-z0-9\s]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');

          return `https://themes.shopify.com/themes/${slug}`;
      },

      getStats() {
          const totalThemes = Object.keys(SHOPIFY_THEME_ID_MAP).length;
          const freeThemes = [887, 1356, 1368, 1499, 1434, 1363, 1431,
  1567, 1864, 1841].length;
          const paidThemes = totalThemes - freeThemes;

          return {
              total: totalThemes,
              free: freeThemes,
              paid: paidThemes
          };
      }
  };

  async function example() {
      try {
          const result = await detectShopifyTheme('https://rellery.com/');
          console.log('检测结果:', result);

          const urls = [
              'https://www.silkandwillow.com/',
              'https://rellery.com/',
              'https://www.allbirds.com/'
          ];

          const results = await detectMultipleThemes(urls, {
              concurrent: 2,
              delay: 1000,
              includeErrors: true
          });

          results.forEach(result => {
              console.log(`${result.url}: ${result.theme} 
  (${result.confidence}%)`);
          });

      } catch (error) {
          console.error('检测失败:', error.message);
      }
  }

  module.exports = {
      EnhancedShopifyThemeDetector,
      detectShopifyTheme,
      detectMultipleThemes,
      ThemeUtils,
      SHOPIFY_THEME_ID_MAP,
      SHOPIFY_THEME_NAME_MAP
  };

  if (require.main === module) {
      console.log('增强版 Shopify Theme Detector');
      console.log('统计信息:', ThemeUtils.getStats());
      example();
  }
