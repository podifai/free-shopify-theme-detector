const axios = require('axios');
const cheerio = require('cheerio');

// Comprehensive theme fingerprints database
const themeFingerprints = {
    // Shopify Official Themes
    'Dawn': {
        patterns: ['color-scheme-1', 'color-scheme-2', 'predictive-search', '"Dawn"', 'cart-drawer', 'details-disclosure']
    },
    'Impact': {
        patterns: ['product-card--blends', 'section-stack', '"Impact"', 'cart-drawer', 'reveal-items', 'prose']
    },
    'Debut': {
        patterns: ['site-header', 'product-single', '"Debut"', 'grid-product', 'btn--secondary']
    },
    'Brooklyn': {
        patterns: ['brooklyn', 'hero-banner', '"Brooklyn"', 'site-nav', 'product-form']
    },
    'Minimal': {
        patterns: ['minimal', '"Minimal"', 'site-footer', 'shopify-section-header']
    },
    'Supply': {
        patterns: ['supply', 'collection-hero', 'featured-collection', '"Supply"']
    },
    'Narrative': {
        patterns: ['narrative', 'hero-content', 'featured-blog', '"Narrative"']
    },
    'Venture': {
        patterns: ['venture', 'collection-grid', '"Venture"']
    },
    'Simple': {
        patterns: ['simple', 'header-bar', '"Simple"']
    },
    'Boundless': {
        patterns: ['boundless', 'collection-filters', '"Boundless"']
    },
    'Express': {
        patterns: ['express', 'slideshow-express', '"Express"']
    },
    'Refresh': {
        patterns: ['refresh', 'product-single-refresh', '"Refresh"']
    },
    'Colors': {
        patterns: ['colors-theme', 'colors__', '"Colors"']
    },
    'Sense': {
        patterns: ['sense-theme', 'sense__', '"Sense"']
    },
    'Taste': {
        patterns: ['taste-theme', 'taste__', '"Taste"']
    },
    'Studio': {
        patterns: ['studio-theme', 'studio__', '"Studio"']
    },
    'Craft': {
        patterns: ['craft-theme', 'craft__', '"Craft"']
    },

    // Premium Themes
    'Prestige': {
        patterns: ['ProductItem__', 'prestige--v4', '"Prestige"', 'Icon--', 'ProductMeta__', 'maestrooo']
    },
    'Kalles': {
        patterns: ['kalles', 'kalles-theme', 'kt-', 'kt_', '"Kalles"', 'kalles-header']
    },
    'Wokiee': {
        patterns: ['wokiee', 'wokiee-theme', 'wk-', '"Wokiee"', 'wokiee-header']
    },
    'Blockshop': {
        patterns: ['blockshop', 'blockshop-theme', 'bs-', '"Blockshop"']
    },
    'Stiletto': {
        patterns: ['stiletto', 'stiletto-theme', 'st-', '"Stiletto"']
    },
    'Envy': {
        patterns: ['envy-theme', 'envy', '"Envy"', 'env-']
    },
    'Pipeline': {
        patterns: ['pipeline-theme', 'pipeline', '"Pipeline"', 'pl-']
    },
    'Expanse': {
        patterns: ['hero__sidebyside', 'hero__animation-contents', '"Expanse"', 'components.css', '@archetype-themes']
    },
    'Turbo': {
        patterns: ['header__logo', 'sticky_nav', '"Turbo"', 'product_section', 'data-cookiecategory']
    },
    'Impulse': {
        patterns: ['site-nav__link', 'slideshow__slide--image', '"Impulse"', 'header-layout--left-center']
    },
    'Venue': {
        patterns: ['home-carousel', 'section_multi_column_images', '"Venue"', 'data-header-style']
    },
    'Ultra': {
        patterns: ['.build.css', 'header__menu-item', '"Ultra"', 'type="module"', '/t/156/assets/']
    },
    'Motion': {
        patterns: ['motion', 'motion__', 'motion-', '"Motion"']
    },
    'Reformation': {
        patterns: ['nav-aesmi', 'product-badge_aco', '"Reformation"', '/cdn/fonts/lato/']
    },
    'Be yours': {
        patterns: ['be-yours', 'beyours', '"Be yours"', 'product-grid-beyours']
    },
    'Blackridge Base Theme': {
        patterns: ['blackridge', 'blackridge-base', '"Blackridge"', 'br-theme']
    },

    // Pixel Union Themes
    'Empire': {
        patterns: ['empire-theme', 'empire', '"Empire"', 'pixel-union']
    },
    'Grid': {
        patterns: ['grid-theme', 'grid__', '"Grid"', 'pixel-union']
    },
    'Codebase': {
        patterns: ['codebase', 'pixel-codebase', '"Codebase"', 'pixel-union']
    },
    'Atlantic': {
        patterns: ['atlantic', 'pixel-atlantic', '"Atlantic"', 'pixel-union']
    },
    'Pacific': {
        patterns: ['pacific', 'pixel-pacific', '"Pacific"', 'pixel-union']
    },
    'Tailor': {
        patterns: ['tailor', 'pixel-tailor', '"Tailor"', 'pixel-union']
    },
    'Context': {
        patterns: ['context', 'pixel-context', '"Context"', 'pixel-union']
    },
    'Avenue': {
        patterns: ['avenue', 'pixel-avenue', '"Avenue"', 'pixel-union']
    },

    // Out of the Sandbox Themes
    'Flex': {
        patterns: ['flex-theme', 'flex__', '"Flex"', 'outofthesandbox']
    },
    'Retina': {
        patterns: ['retina', 'retina__', '"Retina"', 'outofthesandbox']
    },
    'Superstore': {
        patterns: ['superstore', 'superstore__', '"Superstore"', 'outofthesandbox']
    },
    'Startup': {
        patterns: ['startup', 'startup__', '"Startup"', 'outofthesandbox']
    },

    // HasThemes
    'Ella': {
        patterns: ['ella-theme', 'ella__', '"Ella"', 'hasthemes']
    },

    // Other Popular Themes
    'Focal': {
        patterns: ['globo-form-app', 'wizard__steps', '"Focal"', '/cdn/shop/t/170/assets/']
    },
    'Symmetry': {
        patterns: ['product-block', 'navigation__tier-1', '"Symmetry"', 'rimage-wrapper']
    },
    'Broadcast': {
        patterns: ['broadcast__', 'broadcast-', '"Broadcast"', 'tailwindcss']
    },
    'Parallax': {
        patterns: ['parallax', 'parallax__', '"Parallax"', 'parallax-section']
    },
    'Warehouse': {
        patterns: ['warehouse', 'warehouse__', '"Warehouse"']
    },
    'Testament': {
        patterns: ['testament', 'testament__', '"Testament"']
    },
    'Shoptimized': {
        patterns: ['shoptimized', 'shoptimized__', '"Shoptimized"']
    },
    'Booster': {
        patterns: ['booster', 'booster__', '"Booster"', 'booster-apps']
    },
    'Streamline': {
        patterns: ['streamline', 'streamline__', '"Streamline"', 'clean-canvas']
    },
    'Showcase': {
        patterns: ['section-id-template--', 'image-with-text__', '"Showcase"', 'theme-store-id="677"']
    },

    // Theme Forest & Independent Themes
    'Basel': {
        patterns: ['basel-theme', 'basel', '"Basel"', 'wd-cursor-pointer']
    },
    'Woodmart': {
        patterns: ['woodmart', 'woodmart-theme', '"Woodmart"']
    },
    'Porto': {
        patterns: ['porto-theme', 'porto', '"Porto"']
    },
    'Flatsome': {
        patterns: ['flatsome', 'flatsome-theme', '"Flatsome"']
    },
    'Electro': {
        patterns: ['electro', 'electro-theme', '"Electro"']
    },
    'Shopkeeper': {
        patterns: ['shopkeeper', 'shopkeeper-theme', '"Shopkeeper"']
    },
    'Merchandiser': {
        patterns: ['merchandiser', 'merchandiser-theme', '"Merchandiser"']
    },
    'Mr. Parker': {
        patterns: ['mr-parker', 'mrparker', '"Mr. Parker"']
    },
    'Clothing': {
        patterns: ['clothing-theme', 'clothing', '"Clothing"']
    },
    'Artisan': {
        patterns: ['artisan-theme', 'artisan', '"Artisan"']
    },
    'Fashionopolism': {
        patterns: ['fashionopolism', 'fashionopolism-theme', '"Fashionopolism"']
    },
    'Testament': {
        patterns: ['testament-theme', 'testament', '"Testament"']
    },
    'District': {
        patterns: ['district-theme', 'district', '"District"']
    },
    'Icon': {
        patterns: ['icon-theme', '"Icon"', 'responsiveimage--']
    },
    'Pop': {
        patterns: ['pop-theme', '"Pop"', 'animate-pop']
    },
    'Split': {
        patterns: ['split-theme', '"Split"', 'split-layout']
    },
    'Canopy': {
        patterns: ['canopy-theme', '"Canopy"', 'canopy-']
    },
    'Ira': {
        patterns: ['ira-theme', '"Ira"', 'ira-']
    },
    'Greta': {
        patterns: ['greta-theme', '"Greta"', 'greta-']
    },
    'Palo': {
        patterns: ['palo-theme', '"Palo"', 'palo-']
    },
    'Combine': {
        patterns: ['combine-theme', '"Combine"', 'combine-']
    },
    'Ride': {
        patterns: ['ride-theme', '"Ride"', 'ride-']
    }
};

function isShopifyStore(html) {
    const shopifyIndicators = [
        'Shopify.shop',
        'shopify.com',
        'window.Shopify',
        'myshopify.com',
        'cdn.shopify.com',
        'shopify-section',
        'shopify-analytics',
        'Shopify.routes',
        'data-shopify'
    ];
    
    const htmlLower = html.toLowerCase();
    return shopifyIndicators.some(indicator => 
        htmlLower.includes(indicator.toLowerCase())
    );
}

function detectTheme(html) {
    const htmlLower = html.toLowerCase();
    let bestMatch = { theme: 'Unknown', score: 0 };
    let allScores = {};
    
    for (const [themeName, fingerprint] of Object.entries(themeFingerprints)) {
        let score = 0;
        
        fingerprint.patterns.forEach(pattern => {
            if (htmlLower.includes(pattern.toLowerCase())) {
                // Higher score for exact theme name matches
                if (pattern.includes(`"${themeName.toLowerCase()}"`)) {
                    score += 15;
                } else if (pattern.includes('"')) {
                    score += 10;
                } else if (pattern.includes(themeName.toLowerCase())) {
                    score += 8;
                } else {
                    score += 3;
                }
            }
        });
        
        allScores[themeName] = score;
        
        if (score > bestMatch.score) {
            bestMatch = { theme: themeName, score };
        }
    }
    
    // More sophisticated confidence calculation
    let confidence = 0;
    if (bestMatch.score > 0) {
        const maxPossible = 30; // Adjusted for new scoring
        confidence = Math.min(Math.round((bestMatch.score / maxPossible) * 100), 100);
        
        // Bonus for high confidence matches
        if (bestMatch.score >= 15) confidence = Math.min(confidence + 15, 100);
        else if (bestMatch.score >= 10) confidence = Math.min(confidence + 10, 100);
    }
    
    return {
        theme: bestMatch.score > 5 ? bestMatch.theme : 'Unknown', // Raised threshold
        confidence: bestMatch.score > 5 ? confidence : 0,
        allScores: allScores
    };
}

function detectCustomizations(html) {
    const customIndicators = [
        'custom.css', 'custom.js', 'custom-', 'modified', 'theme-', 'custom_',
        'app-custom', 'theme-modified', 'custom-theme'
    ];
    const htmlLower = html.toLowerCase();
    
    return customIndicators.some(indicator => 
        htmlLower.includes(indicator)
    );
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
        let targetUrl = url;
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = 'https://' + targetUrl;
        }

        console.log(`Analyzing: ${targetUrl}`);

        // Fetch webpage
        const response = await axios.get(targetUrl, {
            timeout: 10000, // Increased timeout for better detection
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
                    message: 'Not a Shopify store - This website uses a different ecommerce platform'
                }
            });
        }

        // Detect theme
        const themeResult = detectTheme(html);
        const hasCustomizations = detectCustomizations(html);

        res.status(200).json({
            success: true,
            data: {
                url: targetUrl,
                isShopify: true,
                theme: themeResult.theme,
                confidence: themeResult.confidence,
                hasCustomizations: hasCustomizations,
                timestamp: new Date().toISOString(),
                message: `Detected Shopify store using ${themeResult.theme} theme`,
                debug: {
                    totalThemesChecked: Object.keys(themeFingerprints).length,
                    topMatches: Object.entries(themeResult.allScores)
                        .filter(([_, score]) => score > 0)
                        .sort(([_, a], [__, b]) => b - a)
                        .slice(0, 5)
                        .map(([theme, score]) => ({ theme, score }))
                }
            }
        });

    } catch (error) {
        console.error('Detection error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message || 'Detection failed'
        });
    }
};
