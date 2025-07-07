const axios = require('axios');

// Simple theme patterns (just the most common ones)
const themeFingerprints = {
    'Dawn': ['color-scheme-1', 'color-scheme-2', '"Dawn"'],
    'Impact': ['product-card--blends', 'section-stack', '"Impact"'],
    'Debut': ['site-header', 'product-single', '"Debut"'],
    'Prestige': ['ProductItem__', 'prestige--v4', '"Prestige"'],
    'Brooklyn': ['brooklyn', 'hero-banner', '"Brooklyn"'],
    'Minimal': ['minimal', '"Minimal"'],
    'Turbo': ['header__logo', 'sticky_nav', '"Turbo"'],
    'Ultra': ['.build.css', 'header__menu-item', '"Ultra"'],
    'Shella': ['shella', '"Shella"', 'shella-theme'],
    'Kalles': ['kalles', '"Kalles"', 'kalles-theme']
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
                score += pattern.includes('"') ? 10 : 3;
            }
        });
        
        if (score > bestMatch.score) {
            bestMatch = { theme: themeName, score };
        }
    }
    
    const confidence = bestMatch.score > 0 ? Math.min(Math.round((bestMatch.score / 15) * 100), 100) : 0;
    return {
        theme: bestMatch.score > 3 ? bestMatch.theme : 'Unknown',
        confidence: bestMatch.score > 3 ? confidence : 0
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
