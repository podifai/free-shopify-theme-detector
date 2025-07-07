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
        // Normalize URL - this was the problem!
        let targetUrl = url.trim();
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = 'https://' + targetUrl;
        }

        console.log(`Testing URL: ${targetUrl}`);

        // Simple response for testing
        res.status(200).json({
            success: true,
            data: {
                url: targetUrl,
                isShopify: true,
                theme: 'Dawn',
                confidence: 85,
                hasCustomizations: false,
                timestamp: new Date().toISOString(),
                message: `URL normalization test successful for ${targetUrl}`
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message || 'Detection failed'
        });
    }
};
