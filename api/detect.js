const axios = require('axios');
const cheerio = require('cheerio');

// Simple theme fingerprints
const themeFingerprints = {
    'Dawn': {
        patterns: ['color-scheme-1', 'color-scheme-2', 'predictive-search', '"Dawn"']
    },
    'Impact': {
        patterns: ['product-card--blends', 'section-stack', '"Impact"', 'cart-drawer']
    },
    'Debut': {
        patterns: ['site-header', 'product-single', '"Debut"', 'grid-product']
    },
    'Prestige': {
        patterns: ['ProductItem__', 'prestige--v4', '"Prestige"', 'Icon--']
    },
    'Brooklyn': {
        patterns: ['brooklyn', 'hero-banner', '"Brooklyn"']
    },
    'Minimal': {
        patterns: ['minimal', '"Minimal"', 'site-footer']
    },
    'Turbo': {
        patterns: ['header__logo', 'sticky_nav', '"Turbo"']
    },
    'Motion': {
        patterns: ['motion', 'motion__', '"Motion"']
    },
    'Venue': {
        patterns: ['home-carousel', 'section_multi_column_images', '"Venue"']
    },
    'Impulse': {
        patterns: ['site-nav__link', 'slideshow__slide--image', '"Impulse"']
    }
};

function isShopifyStore(html) {
    const shopifyIndicators = [
        'Shopify.shop',
        'shopify.com',
        'window.Shopify',
        'myshopify.com',
        'cdn.shopify.com',
        'shopify-section'
    ];
    
    const htmlLower = html.toLowerCase();
    return shopifyIndicators.some(indicator => 
        htmlLower.includes(indicator.toLowerCase())
    );
}

function detectTheme(html) {
    const htmlLower = html.toLowerCase();
    let bestMatch = { theme: 'Unknown', score: 0 };
    
    for (const [themeName, fingerprint] of Object.entries(themeFingerprints)) {
        let score = 0;
        
        fingerprint.patterns.forEach(pattern => {
            if (htmlLower.includes(pattern.toLowerCase())) {
                score += pattern.includes('"') ? 10 : 3; // Theme name matches get higher score
            }
        });
        
        if (score > bestMatch.score) {
            bestMatch = { theme: themeName, score };
        }
    }
    
    const confidence = Math.min(Math.round((bestMatch.score / 15) * 100), 100);
    return {
        theme: bestMatch.score > 3 ? bestMatch.theme : 'Unknown',
        confidence: bestMatch.score > 3 ? confidence : 0
    };
}

function detectCustomizations(html) {
    const customIndicators = ['custom.css', 'custom.js', 'custom-', 'modified'];
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
            timeout: 8000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
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
                message: `Detected Shopify store using ${themeResult.theme} theme`
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
