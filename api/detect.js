// Vercel Serverless Function for Shopify Theme Detection
// Deploy path: /api/detect

const axios = require('axios');
const cheerio = require('cheerio');

// CORS Configuration - Replace with your actual Framer domain
const ALLOWED_ORIGINS = [
    'https://magenta-acknowledge-424388.framer.app/',  // Replace with your actual Framer domain
    'https://podifai.com/',       // If you have a custom domain
    'http://localhost:3000',
    'http://localhost:3001'
];

// CORS middleware
function cors(req, res) {
    const origin = req.headers.origin;
    
    // Allow all framer.app subdomains
    if (ALLOWED_ORIGINS.includes(origin) || 
        (origin && origin.includes('framer.app')) ||
        (origin && origin.includes('localhost'))) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', '86400');
    }
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    
    return false;
}

// Theme fingerprint database (integrated version)
const themeFingerprints = {
    // Official Shopify themes
    'Dawn': {
        css: ['color-scheme-1', 'color-scheme-2', 'predictive-search', 'cart-drawer', 'details-disclosure'],
        js: ['dawn.js', 'predictive-search.js', 'cart-drawer.js'],
        html: ['"Dawn"', '"theme_name":"Dawn"', 'dawn-theme', 'data-dawn'],
        paths: ['/assets/dawn', '/assets/base.css']
    },
    
    'Impact': {
        css: ['drawer', 'prose', 'section-stack', 'product-card--blends', 'header__logo', 'header__icon-list'],
        js: ['impact.js', 'cart-drawer.js', 'cart-notification.js'],
        html: ['"Impact"', 'data-theme-name="Impact"', '<product-card', '<cart-drawer', '<reveal-items'],
        paths: ['/assets/impact', 't/9/assets/']
    },

    'Debut': {
        css: ['debut-theme', 'site-header', 'product-single', 'btn--secondary', 'grid-product'],
        js: ['debut.js', 'theme.js', 'debut.theme.js'],
        html: ['"Debut"', '"theme_name":"Debut"', 'id="shopify-section-header"', 'debut-theme'],
        paths: ['/assets/debut', '/assets/theme.scss.liquid']
    },

    'Brooklyn': {
        css: ['brooklyn', 'site-nav', 'product-form', 'hero-banner', 'brooklyn-theme'],
        js: ['brooklyn.js', 'vendor.js', 'brooklyn.theme.js'],
        html: ['"Brooklyn"', 'class="brooklyn"', 'data-section-type="collection-template"'],
        paths: ['/assets/brooklyn']
    },

    // Premium paid themes
    'Prestige': {
        css: ['prestige--v4', 'ProductItem__', 'ProductItem__Wrapper', 'ProductItem__ImageWrapper', 'Icon--cart'],
        js: ['prestige.js', 'prestige.theme.js', 'maestrooo'],
        html: ['"Prestige"', 'data-theme-name="Prestige"', 'prestige--v4', 'ProductItem__', 'Icon--'],
        paths: ['/assets/prestige', '/assets/maestrooo']
    },

    'Kalles': {
        css: ['kalles', 'kalles-theme', 'kt-', 'kt_', 'kalles-header', 'kt-ajax-cart'],
        js: ['kalles.js', 'kalles.theme.js', 'kt-script', 'kalles-main.js'],
        html: ['"Kalles"', 'kalles-theme', 'data-kalles', 'kt-theme'],
        paths: ['/assets/kalles', '/assets/kt-']
    },

    'Expanse': {
        css: ['hero', 'hero__sidebyside', 'hero__animation-contents', 'components.css', 'overrides.css'],
        js: ['@archetype-themes/scripts', 'expanse.js'],
        html: ['"Expanse"', 'data-theme-name="Expanse"', '<header-section>', '<slideshow-section>'],
        paths: ['/t/101/assets/', '/assets/expanse', 'components.css']
    },

    'Turbo': {
        css: ['header__logo', 'sticky_nav', 'menu-position--block', 'product_section', 'turbo-theme'],
        js: ['window.Theme', 'window.Shopify.theme_settings', 'turbo.js'],
        html: ['"Turbo"', 'data-cookiecategory', 'data-optimumx', '/cdn/shop/t/190/assets/'],
        paths: ['/cdn/shop/t/190/assets/', '/assets/turbo']
    },

    'Impulse': {
        css: ['site-nav__link', 'header-layout--left-center', 'slideshow__slide--image', 'impulse-theme'],
        js: ['loadCSS', 'StartAsyncLoading', 'impulse.js'],
        html: ['"Impulse"', 'data-smartcart-items', '/cdn/shop/t/141/assets/'],
        paths: ['/cdn/shop/t/141/assets/', '/assets/impulse']
    },

    'Venue': {
        css: ['home-carousel', 'section_multi_column_images', 'header__', 'venue-theme'],
        js: ['a11y-dialog.lib.js', 'cart-components.js', 'venue.js'],
        html: ['"Venue"', 'data-header-style', 'data-anim-zoom', '/cdn/shop/t/20/assets/'],
        paths: ['/cdn/shop/t/20/assets/', '/assets/venue']
    },

    'Ultra': {
        css: ['.build.css', 'header__menu-item', 'header__submenu', 'product-card', 'ultra-theme'],
        js: ['.build.min.js', 'type="module"', 'ultra.js'],
        html: ['"Ultra"', 'data-theme-name="Ultra"', '/t/156/assets/', 'type="module"'],
        paths: ['/t/156/assets/', '.build.css', '.build.min.js']
    },

    // Other popular themes
    'Motion': {
        css: ['motion', 'motion__', 'motion-', 'motion-header', 'motion-theme'],
        js: ['motion.js', 'theme.motion', 'motion.theme.js'],
        html: ['"Motion"', 'motion', 'class="motion"'],
        paths: ['/assets/motion']
    },

    'Supply': {
        css: ['supply', 'collection-hero', 'featured-collection', 'supply-theme'],
        js: ['supply.js', 'supply.theme.js'],
        html: ['"Supply"', 'class="supply"', 'data-supply-'],
        paths: ['/assets/supply']
    },

    'Narrative': {
        css: ['narrative', 'hero-content', 'featured-blog', 'narrative-theme'],
        js: ['narrative.js', 'narrative.theme.js'],
        html: ['"Narrative"', 'class="narrative"'],
        paths: ['/assets/narrative']
    },

    'Minimal': {
        css: ['minimal', 'site-footer', 'minimal-theme'],
        js: ['minimal.js', 'minimal.theme.js'],
        html: ['"Minimal"', 'class="minimal"'],
        paths: ['/assets/minimal']
    },

    'Boundless': {
        css: ['boundless', 'collection-filters', 'boundless-theme'],
        js: ['boundless.js', 'boundless.theme.js'],
        html: ['"Boundless"', 'class="boundless"'],
        paths: ['/assets/boundless']
    }
};

// Check if it's a Shopify store
function isShopifyStore(html, $) {
    const shopifyIndicators = [
        'Shopify.shop',
        'shopify.com',
        'shopify-analytics',
        'window.Shopify',
        'myshopify.com',
        'Shopify.routes',
        'shopify-section',
        'data-shopify',
        'cdn.shopify.com'
    ];

    return shopifyIndicators.some(indicator => 
        html.toLowerCase().includes(indicator.toLowerCase())
    );
}

// Analyze theme fingerprints
function analyzeFingerprints(html, $) {
    const scores = {};
    const matchDetails = {};
    const htmlLower = html.toLowerCase();

    // Initialize all theme scores
    Object.keys(themeFingerprints).forEach(theme => {
        scores[theme] = 0;
        matchDetails[theme] = { css: [], js: [], html: [], paths: [] };
    });

    // Analyze each theme
    for (const [themeName, fingerprints] of Object.entries(themeFingerprints)) {
        // CSS fingerprint detection (weight 2-4)
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

        // JavaScript fingerprint detection (weight 3-6)
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

        // HTML fingerprint detection (weight 4-8)
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

        // Path fingerprint detection (weight 3-5)
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

    // Find the highest scoring theme
    const bestMatch = Object.entries(scores).reduce((best, [theme, score]) => {
        return score > best.score ? { theme, score } : best;
    }, { theme: null, score: 0 });

    // Calculate confidence
    let confidence = 0;
    if (bestMatch.score > 0) {
        const maxPossibleScore = 35;
        confidence = Math.min(90, Math.round((bestMatch.score / maxPossibleScore) * 100));
        
        // Multi-type matching bonus
        const matches = matchDetails[bestMatch.theme] || {};
        const matchTypes = [
            matches.css?.length > 0,
            matches.js?.length > 0, 
            matches.html?.length > 0,
            matches.paths?.length > 0
        ].filter(Boolean).length;
        
        if (matchTypes >= 3) confidence = Math.min(100, confidence + 20);
        else if (matchTypes >= 2) confidence = Math.min(100, confidence + 10);
        
        // Specific theme name matching bonus
        if (matches.html?.some(h => h.toLowerCase().includes(`"${bestMatch.theme.toLowerCase()}"`))) {
            confidence = Math.min(100, confidence + 15);
        }
    }

    return {
        theme: bestMatch.score > 8 ? bestMatch.theme : 'Unknown',
        confidence: bestMatch.score > 8 ? confidence : 0,
        matches: matchDetails[bestMatch.theme] || {},
        allScores: scores
    };
}

// Detect customizations
function detectCustomizations(html, $) {
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

// Main theme detection function
async function detectShopifyTheme(url) {
    try {
        // Normalize URL
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        console.log(`Analyzing website: ${url}`);

        // Fetch webpage content
        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Check if it's a Shopify store
        if (!isShopifyStore(html, $)) {
            return {
                isShopify: false,
                theme: null,
                confidence: 0,
                error: 'Not a Shopify store'
            };
        }

        // Analyze theme fingerprints
        const results = analyzeFingerprints(html, $);
        const customizations = detectCustomizations(html, $);

        return {
            isShopify: true,
            theme: results.theme,
            confidence: results.confidence,
            matchedFingerprints: results.matches,
            customizations: customizations,
            allScores: results.allScores
        };

    } catch (error) {
        console.error('Detection error:', error.message);
        return {
            isShopify: false,
            theme: null,
            confidence: 0,
            error: error.message
        };
    }
}

// Vercel handler function
module.exports = async (req, res) => {
    // Handle CORS
    if (cors(req, res)) {
        return;
    }

    // Only accept POST requests
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
        const result = await detectShopifyTheme(url);
        
        // Unified response format
        res.status(200).json({
            success: true,
            data: {
                url: url,
                isShopify: result.isShopify,
                theme: result.isShopify ? (result.theme || 'Unknown') : null,
                confidence: result.isShopify ? (result.confidence || 0) : 0,
                hasCustomizations: result.isShopify ? (result.customizations?.hasCustomizations || false) : false,
                timestamp: new Date().toISOString(),
                message: result.isShopify ? 
                    `Detected Shopify store using ${result.theme || 'Unknown'} theme` : 
                    'Not a Shopify store - This website uses other ecommerce platform or tech stack'
            },
            debug: result.isShopify ? {
                matchedFingerprints: result.matchedFingerprints,
                customizations: result.customizations,
                allScores: result.allScores
            } : null,
            error: result.error || null
        });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Theme detection failed'
        });
    }
};