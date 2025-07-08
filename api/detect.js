const axios = require('axios');

// Enhanced theme patterns for top 50 Shopify themes
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
    
    // Premium Shopify Themes
    'Horizon': ['horizon-theme', '"Horizon"', 'horizon--', 'theme-horizon', 'hero-horizon'],
    'Savor': ['savor-theme', '"Savor"', 'savor--', 'theme-savor', 'hero-savor'],
    'Spotlight': ['spotlight-theme', '"Spotlight"', 'spotlight--', 'theme-spotlight', 'hero-spotlight'],
    'Trade': ['trade-theme', '"Trade"', 'trade--', 'theme-trade', 'hero-trade'],
    'Vessel': ['vessel-theme', '"Vessel"', 'vessel--', 'theme-vessel', 'hero-vessel'],
    'Atelier': ['atelier-theme', '"Atelier"', 'atelier--', 'theme-atelier', 'hero-atelier'],
    'Tinker': ['tinker-theme', '"Tinker"', 'tinker--', 'theme-tinker', 'hero-tinker'],
    'Heritage': ['heritage-theme', '"Heritage"', 'heritage--', 'theme-heritage', 'hero-heritage'],
    'Dwell': ['dwell-theme', '"Dwell"', 'dwell--', 'theme-dwell', 'hero-dwell'],
    'Pitch': ['pitch-theme', '"Pitch"', 'pitch--', 'theme-pitch', 'hero-pitch'],
    'Fabric': ['fabric-theme', '"Fabric"', 'fabric--', 'theme-fabric', 'hero-fabric'],
    'Ritual': ['ritual-theme', '"Ritual"', 'ritual--', 'theme-ritual', 'hero-ritual'],
    'Ride': ['ride-theme', '"Ride"', 'ride--', 'theme-ride', 'hero-ride'],
    'Origin': ['origin-theme', '"Origin"', 'origin--', 'theme-origin', 'hero-origin'],
    'Publisher': ['publisher-theme', '"Publisher"', 'publisher--', 'theme-publisher', 'hero-publisher'],
    'Concept': ['concept-theme', '"Concept"', 'concept--', 'theme-concept', 'hero-concept'],
    'Sleek': ['sleek-theme', '"Sleek"', 'sleek--', 'theme-sleek', 'hero-sleek'],
    'Be yours': ['be-yours-theme', '"Be yours"', 'be-yours--', 'theme-be-yours', 'hero-be-yours'],
    
    // Popular Premium Themes
    'Prestige': ['ProductItem__', 'prestige--v4', '"Prestige"', 'prestige-theme', 'theme-prestige'],
    'Impact': ['product-card--blends', 'section-stack', '"Impact"', 'impact-theme', 'theme-impact'],
    'Impulse': ['impulse-theme', '"Impulse"', 'impulse--', 'theme-impulse', 'hero-impulse'],
    'Broadcast': ['broadcast-theme', '"Broadcast"', 'broadcast--', 'theme-broadcast', 'hero-broadcast'],
    'Symmetry': ['symmetry-theme', '"Symmetry"', 'symmetry--', 'theme-symmetry', 'hero-symmetry'],
    'Warehouse': ['warehouse-theme', '"Warehouse"', 'warehouse--', 'theme-warehouse', 'hero-warehouse'],
    'Enterprise': ['enterprise-theme', '"Enterprise"', 'enterprise--', 'theme-enterprise', 'hero-enterprise'],
    'Empire': ['empire-theme', '"Empire"', 'empire--', 'theme-empire', 'hero-empire'],
    'Focal': ['focal-theme', '"Focal"', 'focal--', 'theme-focal', 'hero-focal'],
    'Wonder': ['wonder-theme', '"Wonder"', 'wonder--', 'theme-wonder', 'hero-wonder'],
    'Hyper': ['hyper-theme', '"Hyper"', 'hyper--', 'theme-hyper', 'hero-hyper'],
    'Palo Alto': ['palo-alto-theme', '"Palo Alto"', 'palo-alto--', 'theme-palo-alto', 'hero-palo-alto'],
    'Reformation': ['reformation-theme', '"Reformation"', 'reformation--', 'theme-reformation', 'hero-reformation'],
    'Xtra': ['xtra-theme', '"Xtra"', 'xtra--', 'theme-xtra', 'hero-xtra'],
    'Eurus': ['eurus-theme', '"Eurus"', 'eurus--', 'theme-eurus', 'hero-eurus'],
    'Pipeline': ['pipeline-theme', '"Pipeline"', 'pipeline--', 'theme-pipeline', 'hero-pipeline'],
    'Shapes': ['shapes-theme', '"Shapes"', 'shapes--', 'theme-shapes', 'hero-shapes'],
    'Vision': ['vision-theme', '"Vision"', 'vision--', 'theme-vision', 'hero-vision'],
    'Stiletto': ['stiletto-theme', '"Stiletto"', 'stiletto--', 'theme-stiletto', 'hero-stiletto'],
    'Motion': ['motion-theme', '"Motion"', 'motion--', 'theme-motion', 'hero-motion'],
    'Stretch': ['stretch-theme', '"Stretch"', 'stretch--', 'theme-stretch', 'hero-stretch'],
    'Expanse': ['expanse-theme', '"Expanse"', 'expanse--', 'theme-expanse', 'hero-expanse'],
    'Ignite': ['ignite-theme', '"Ignite"', 'ignite--', 'theme-ignite', 'hero-ignite'],
    'Local': ['local-theme', '"Local"', 'local--', 'theme-local', 'hero-local'],
    
    // Legacy/Popular Third-party Themes
    'Debut': ['site-header', 'product-single', '"Debut"', 'debut-theme'],
    'Brooklyn': ['brooklyn', 'hero-banner', '"Brooklyn"', 'brooklyn-theme'],
    'Minimal': ['minimal', '"Minimal"', 'minimal-theme'],
    'Turbo': ['header__logo', 'sticky_nav', '"Turbo"', 'turbo-theme'],
    'Ultra': ['.build.css', 'header__menu-item', '"Ultra"', 'ultra-theme'],
    'Shella': ['shella', '"Shella"', 'shella-theme'],
    'Kalles': ['kalles', '"Kalles"', 'kalles-theme']
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
    
    // Premium Themes
    'Horizon': 'https://themes.shopify.com/themes/horizon',
    'Savor': 'https://themes.shopify.com/themes/savor',
    'Spotlight': 'https://themes.shopify.com/themes/spotlight',
    'Trade': 'https://themes.shopify.com/themes/trade',
    'Vessel': 'https://themes.shopify.com/themes/vessel',
    'Atelier': 'https://themes.shopify.com/themes/atelier',
    'Tinker': 'https://themes.shopify.com/themes/tinker',
    'Heritage': 'https://themes.shopify.com/themes/heritage',
    'Dwell': 'https://themes.shopify.com/themes/dwell',
    'Pitch': 'https://themes.shopify.com/themes/pitch',
    'Fabric': 'https://themes.shopify.com/themes/fabric',
    'Ritual': 'https://themes.shopify.com/themes/ritual',
    'Ride': 'https://themes.shopify.com/themes/ride',
    'Origin': 'https://themes.shopify.com/themes/origin',
    'Publisher': 'https://themes.shopify.com/themes/publisher',
    'Concept': 'https://themes.shopify.com/themes/concept',
    'Sleek': 'https://themes.shopify.com/themes/sleek',
    'Be yours': 'https://themes.shopify.com/themes/be-yours',
    'Prestige': 'https://themes.shopify.com/themes/prestige',
    'Impact': 'https://themes.shopify.com/themes/impact',
    'Impulse': 'https://themes.shopify.com/themes/impulse',
    'Broadcast': 'https://themes.shopify.com/themes/broadcast',
    'Symmetry': 'https://themes.shopify.com/themes/symmetry',
    'Warehouse': 'https://themes.shopify.com/themes/warehouse',
    'Enterprise': 'https://themes.shopify.com/themes/enterprise',
    'Empire': 'https://themes.shopify.com/themes/empire',
    'Focal': 'https://themes.shopify.com/themes/focal',
    'Wonder': 'https://themes.shopify.com/themes/wonder',
    'Hyper': 'https://themes.shopify.com/themes/hyper',
    'Palo Alto': 'https://themes.shopify.com/themes/palo-alto',
    'Reformation': 'https://themes.shopify.com/themes/reformation',
    'Xtra': 'https://themes.shopify.com/themes/xtra',
    'Eurus': 'https://themes.shopify.com/themes/eurus',
    'Pipeline': 'https://themes.shopify.com/themes/pipeline',
    'Shapes': 'https://themes.shopify.com/themes/shapes',
    'Vision': 'https://themes.shopify.com/themes/vision',
    'Stiletto': 'https://themes.shopify.com/themes/stiletto',
    'Motion': 'https://themes.shopify.com/themes/motion',
    'Stretch': 'https://themes.shopify.com/themes/stretch',
    'Expanse': 'https://themes.shopify.com/themes/expanse',
    'Ignite': 'https://themes.shopify.com/themes/ignite',
    'Local': 'https://themes.shopify.com/themes/local',
    
    // Legacy Themes
    'Debut': 'https://themes.shopify.com/themes/debut',
    'Brooklyn': 'https://themes.shopify.com/themes/brooklyn',
    'Minimal': 'https://themes.shopify.com/themes/minimal'
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

        res.status(200).json({
            success: true,
            data: {
                url: targetUrl,
                isShopify: true,
                theme: themeResult.theme,
                confidence: themeResult.confidence,
                themeStoreLink: themeLinks[themeResult.theme] || null,
                hasCustomizations: false,
                timestamp: new Date().toISOString(),
                message: `Detected Shopify store using ${themeResult.theme} theme`
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
