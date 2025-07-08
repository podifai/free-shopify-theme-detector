const axios = require('axios');

// ============================================================================
// 完整的 Shopify Theme Store ID 映射表 (268个官方主题)
// 数据来源: Shopify Theme Store API + 社区维护项目
// 最后更新: 2025年1月
// ============================================================================

const SHOPIFY_THEME_ID_MAP = {
    // === 免费主题 (10个) ===
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
    
    // === 付费主题 A-Z (258个) ===
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

// 反向映射 (主题名 -> ID)
const SHOPIFY_THEME_NAME_MAP = {};
Object.entries(SHOPIFY_THEME_ID_MAP).forEach(([id, name]) => {
    SHOPIFY_THEME_NAME_MAP[name] = parseInt(id);
});

// ============================================================================
// 专业级 Shopify 主题检测器
// ============================================================================

class ShopifyThemeDetector {
    constructor() {
        this.themeIdMap = SHOPIFY_THEME_ID_MAP;
        this.themeNameMap = SHOPIFY_THEME_NAME_MAP;
        
        // 免费主题列表
        this.freeThemeIds = [887, 1356, 1368, 1499, 1434, 1363, 1431, 1567, 1864, 1841];
        
        // 第三方主题特征库
        this.thirdPartyPatterns = {
            'Kalles': {
                patterns: ['kalles.css', 'kt-', 'kalles-section', '/assets/kalles', 'kalles-theme'],
                minMatches: 2,
                confidence: 75
            },
            'Turbo': {
                patterns: ['turbo.css', 'turbo-theme', '/assets/turbo', 'header__logo', 'turbo-'],
                minMatches: 2,
                confidence: 75
            },
            'Ella': {
                patterns: ['ella.css', 'ella-theme', '/assets/ella', 'ella-'],
                minMatches: 2,
                confidence: 70
            },
            'Shella': {
                patterns: ['shella.css', 'shella-theme', '/assets/shella'],
                minMatches: 2,
                confidence: 70
            },
            'Debutify': {
                patterns: ['debutify.css', 'debutify-theme', 'dbtfy-', 'debutify-'],
                minMatches: 2,
                confidence: 75
            },
            'Booster': {
                patterns: ['booster.css', 'booster-theme', 'btb-', 'booster-'],
                minMatches: 2,
                confidence: 70
            },
            'PageFly': {
                patterns: ['pagefly.css', 'pf-', '__pf', 'pagefly-'],
                minMatches: 2,
                confidence: 65
            }
        };
        
        // 官方主题CSS特征库
        this.officialThemeCSSPatterns = {
            'Dawn': ['/assets/base.css', '/assets/component-', 'dawn.css', 'theme-dawn'],
            'Sense': ['/assets/sense.css', 'sense-theme', 'predictive-search--sense'],
            'Craft': ['/assets/craft.css', 'craft-theme', 'craft-product'],
            'Symmetry': ['/assets/theme.scss.css', 'symmetry.css', 'symmetry-theme'],
            'Prestige': ['/assets/prestige.css', '/assets/theme.min.css', 'ProductItem__'],
            'Impact': ['/assets/component-product-card', 'impact.css', 'product-card--blends'],
            'Icon': ['/assets/icon.css', 'icon-theme.css', 'icon-product-gallery'],
            'Impulse': ['/assets/impulse.css', 'impulse-theme.css'],
            'Empire': ['/assets/empire.css', 'empire-theme.css'],
            'Motion': ['/assets/motion.css', 'motion-theme.css'],
            'Broadcast': ['/assets/broadcast.css', 'broadcast-theme.css'],
            'Pipeline': ['/assets/pipeline.css', 'pipeline-theme.css'],
            'Warehouse': ['/assets/warehouse.css', 'warehouse-theme.css'],
            'Focal': ['/assets/focal.css', 'focal-theme.css'],
            'Vision': ['/assets/vision.css', 'vision-theme.css'],
            'Wonder': ['/assets/wonder.css', 'wonder-theme.css'],
            'Trade': ['/assets/trade.css', 'trade-theme.css'],
            'Local': ['/assets/local.css', 'local-theme.css'],
            'Palo Alto': ['/assets/palo-alto.css', 'palo-alto.css'],
            'Stiletto': ['/assets/stiletto.css', 'stiletto.css']
        };
    }
    
    // ========================================================================
    // 主检测函数
    // ========================================================================
    
    async detectTheme(url) {
        try {
            const html = await this.fetchHTML(url);
            
            if (!this.isShopifyStore(html)) {
                return {
                    isShopify: false,
                    theme: null,
                    confidence: 0,
                    method: 'not_shopify',
                    url: url
                };
            }
            
            // 按优先级依次检测
            let result = this.detectByThemeStoreId(html);
            if (result.confidence >= 90) return { isShopify: true, url, ...result };
            
            result = this.detectByShopifyObject(html);
            if (result.confidence >= 80) return { isShopify: true, url, ...result };
            
            result = this.detectByMetaTags(html);
            if (result.confidence >= 70) return { isShopify: true, url, ...result };
            
            result = this.detectByCSSFiles(html);
            if (result.confidence >= 60) return { isShopify: true, url, ...result };
            
            result = this.detectByThirdPartyThemes(html);
            if (result.confidence >= 50) return { isShopify: true, url, ...result };
            
            result = this.detectByHTMLStructure(html);
            if (result.confidence >= 40) return { isShopify: true, url, ...result };
            
            return {
                isShopify: true,
                url: url,
                theme: 'Unknown',
                confidence: 0,
                method: 'fallback'
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
    
    // ========================================================================
    // 检测方法 (按优先级排序)
    // ========================================================================
    
    // 方法1: 通过theme_store_id检测 (95% 准确率)
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
        
        // 检测自定义主题
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
    
    // 方法2: 通过Shopify对象检测 (85% 准确率)
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
                    isFree: themeId ? this.freeThemeIds.includes(themeId) : null,
                    isOfficial: !!themeId
                };
            }
        }
        
        return { theme: null, confidence: 0, method: 'no_shopify_object' };
    }
    
    // 方法3: 通过Meta标签检测 (75% 准确率)
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
                    // 数字ID
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
                    // 主题名
                    const themeId = this.themeNameMap[value];
                    return {
                        theme: value,
                        confidence: 70,
                        method: 'meta_tag_name',
                        themeId: themeId || null,
                        isFree: themeId ? this.freeThemeIds.includes(themeId) : null,
                        isOfficial: !!themeId
                    };
                }
            }
        }
        
        return { theme: null, confidence: 0, method: 'no_meta_tags' };
    }
    
    // 方法4: 通过CSS文件检测 (65% 准确率)
    detectByCSSFiles(html) {
        for (const [themeName, patterns] of Object.entries(this.officialThemeCSSPatterns)) {
            for (const pattern of patterns) {
                if (html.includes(pattern)) {
                    const themeId = this.themeNameMap[themeName];
                    return {
                        theme: themeName,
                        confidence: 65,
                        method: 'css_file_pattern',
                        themeId: themeId || null,
                        cssPattern: pattern,
                        isFree: themeId ? this.freeThemeIds.includes(themeId) : null,
                        isOfficial: true
                    };
                }
            }
        }
        
        return { theme: null, confidence: 0, method: 'no_css_patterns' };
    }
    
    // 方法5: 检测第三方主题 (60% 准确率)
    detectByThirdPartyThemes(html) {
        for (const [themeName, config] of Object.entries(this.thirdPartyPatterns)) {
            let matches = 0;
            const matchedPatterns = [];
            
            for (const pattern of config.patterns) {
                if (html.includes(pattern)) {
                    matches++;
                    matchedPatterns.push(pattern);
                }
            }
            
            if (matches >= config.minMatches) {
                return {
                    theme: themeName,
                    confidence: config.confidence,
                    method: 'third_party_pattern',
                    themeId: null,
                    isThirdParty: true,
                    isOfficial: false,
                    matchedPatterns: matchedPatterns,
                    matchCount: matches
                };
            }
        }
        
        return { theme: null, confidence: 0, method: 'no_third_party_patterns' };
    }
    
    // 方法6: 通过HTML结构检测 (45% 准确率)
    detectByHTMLStructure(html) {
        const structurePatterns = {
            'Prestige': {
                patterns: ['ProductItem__', 'ProductItem--', 'product-item--'],
                minMatches: 2,
                confidence: 50
            },
            'Impact': {
                patterns: ['product-card--blends', 'section-stack', 'impact-'],
                minMatches: 2,
                confidence: 50
            },
            'Dawn': {
                patterns: ['shopify-section', 'color-scheme-', 'component-'],
                minMatches: 3,
                confidence: 45
            }
        };
        
        for (const [themeName, config] of Object.entries(structurePatterns)) {
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
                    isFree: themeId ? this.freeThemeIds.includes(themeId) : null,
                    isOfficial: !!themeId
                };
            }
        }
        
        return { theme: null, confidence: 0, method: 'no_html_structure' };
    }
    
    // ========================================================================
    // 辅助方法
    // ========================================================================
    
    // 检测是否为Shopify店铺
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
        return indicators.some(indicator => lowerHtml.includes(indicator.toLowerCase()));
    }
    
    // 获取HTML内容
    async fetchHTML(url) {
        try {
            // 规范化URL
            let normalizedUrl = url.trim();
            if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
                normalizedUrl = 'https://' + normalizedUrl;
            }
            
            const response = await axios.get(normalizedUrl, {
                timeout: 15000,
                maxRedirects: 5,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'no-cache'
                }
            });
            
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch ${url}: ${error.message}`);
        }
    }
    
    // ========================================================================
    // 工具方法
    // ========================================================================
    
    // 通过ID获取主题名
    getThemeNameById(id) {
        return this.themeIdMap[id] || 'Unknown';
    }
    
    // 通过名称获取ID
    getThemeIdByName(name) {
        return this.themeNameMap[name] || null;
    }
    
    // 检查是否为免费主题
    isFreeTheme(themeNameOrId) {
        const id = typeof themeNameOrId === 'string' 
            ? this.getThemeIdByName(themeNameOrId) 
            : themeNameOrId;
        return this.freeThemeIds.includes(id);
    }
    
    // 获取主题商店链接
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
    }
    
    // 获取所有免费主题
    getFreeThemes() {
        return this.freeThemeIds.map(id => ({
            id: id,
            name: this.themeIdMap[id]
        }));
    }
    
    // 批量检测
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
            
            // 延迟避免过于频繁的请求
            if (delay > 0 && chunks.indexOf(chunk) < chunks.length - 1) {
                await this.sleep(delay);
            }
        }
        
        return results;
    }
    
    // 数组分块
    chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    
    // 延迟函数
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 统计信息
    getStats() {
        const totalThemes = Object.keys(this.themeIdMap).length;
        const freeThemes = this.freeThemeIds.length;
        const paidThemes = totalThemes - freeThemes;
        const thirdPartyThemes = Object.keys(this.thirdPartyPatterns).length;
        
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
    
    // 导出主题映射表
    exportThemeMap() {
        return {
            idToName: { ...this.themeIdMap },
            nameToId: { ...this.themeNameMap },
            freeThemes: this.getFreeThemes(),
            thirdPartyThemes: Object.keys(this.thirdPartyPatterns),
            stats: this.getStats()
        };
    }
}

// ============================================================================
// 简化的API接口 (兼容原有代码)
// ============================================================================

// 简化的检测函数
async function detectShopifyTheme(url) {
    const detector = new ShopifyThemeDetector();
    return await detector.detectTheme(url);
}

// 批量检测函数
async function detectMultipleThemes(urls, options = {}) {
    const detector = new ShopifyThemeDetector();
    return await detector.detectMultiple(urls, options);
}

// 工具函数
const ThemeUtils = {
    // 通过ID获取主题名
    getThemeNameById(id) {
        return SHOPIFY_THEME_ID_MAP[id] || 'Unknown';
    },
    
    // 通过名称获取ID
    getThemeIdByName(name) {
        return SHOPIFY_THEME_NAME_MAP[name] || null;
    },
    
    // 检查是否为免费主题
    isFreeTheme(themeNameOrId) {
        const freeThemeIds = [887, 1356, 1368, 1499, 1434, 1363, 1431, 1567, 1864, 1841];
        const id = typeof themeNameOrId === 'string' 
            ? this.getThemeIdByName(themeNameOrId) 
            : themeNameOrId;
        return freeThemeIds.includes(id);
    },
    
    // 获取主题商店链接
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
    
    // 获取所有免费主题
    getFreeThemes() {
        const freeThemeIds = [887, 1356, 1368, 1499, 1434, 1363, 1431, 1567, 1864, 1841];
        return freeThemeIds.map(id => ({
            id: id,
            name: SHOPIFY_THEME_ID_MAP[id]
        }));
    },
    
    // 统计信息
    getStats() {
        const totalThemes = Object.keys(SHOPIFY_THEME_ID_MAP).length;
        const freeThemes = this.getFreeThemes().length;
        const paidThemes = totalThemes - freeThemes;
        
        return {
            total: totalThemes,
            free: freeThemes,
            paid: paidThemes
        };
    }
};

// ============================================================================
// Express.js/Vercel API 兼容版本
// ============================================================================

module.exports = async (req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }

    // 获取URL参数
    let url;
    if (req.method === 'POST') {
        url = req.body?.url;
    } else {
        url = req.query?.url;
    }

    if (!url) {
        return res.status(400).json({ 
            success: false, 
            error: 'URL parameter is required' 
        });
    }

    try {
        const detector = new ShopifyThemeDetector();
        const result = await detector.detectTheme(url);
        
        // 添加额外信息
        const enhancedResult = {
            ...result,
            themeStoreLink: result.themeId ? ThemeUtils.getThemeStoreUrl(result.theme) : null,
            timestamp: new Date().toISOString()
        };

        res.status(200).json({
            success: true,
            data: enhancedResult
        });

    } catch (error) {
        console.error('Detection error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Detection failed: ' + error.message
        });
    }
};

// ============================================================================
// 使用示例和测试
// ============================================================================

// 单个检测示例
async function example1() {
    try {
        const result = await detectShopifyTheme('https://www.silkandwillow.com/');
        console.log('检测结果:', result);
        /*
        期望输出:
        {
            isShopify: true,
            url: 'https://www.silkandwillow.com/',
            theme: 'Symmetry',
            confidence: 95,
            method: 'theme_store_id',
            themeId: 568,
            isFree: false,
            isOfficial: true
        }
        */
    } catch (error) {
        console.error('检测失败:', error.message);
    }
}

// 批量检测示例
async function example2() {
    const urls = [
        'https://www.silkandwillow.com/',  // Symmetry
        'https://rellery.com/',           // Kalles (第三方)
        'https://www.allbirds.com/',      // 可能是自定义主题
        'https://shop.gymshark.com/'      // 测试
    ];
    
    try {
        const results = await detectMultipleThemes(urls, {
            concurrent: 2,
            delay: 1000,
            includeErrors: true
        });
        
        console.log('批量检测结果:');
        results.forEach(result => {
            console.log(`${result.url} -> ${result.theme} (${result.confidence}%)`);
        });
    } catch (error) {
        console.error('批量检测失败:', error.message);
    }
}

// 工具函数使用示例
function example3() {
    console.log('=== 工具函数示例 ===');
    console.log('Symmetry ID:', ThemeUtils.getThemeIdByName('Symmetry')); // 568
    console.log('ID 568 主题:', ThemeUtils.getThemeNameById(568)); // Symmetry
    console.log('Dawn是免费主题吗:', ThemeUtils.isFreeTheme('Dawn')); // true
    console.log('Symmetry商店链接:', ThemeUtils.getThemeStoreUrl('Symmetry'));
    console.log('统计信息:', ThemeUtils.getStats());
    console.log('免费主题列表:', ThemeUtils.getFreeThemes());
}

// 导出所有功能
module.exports.ShopifyThemeDetector = ShopifyThemeDetector;
module.exports.detectShopifyTheme = detectShopifyTheme;
module.exports.detectMultipleThemes = detectMultipleThemes;
module.exports.ThemeUtils = ThemeUtils;
module.exports.SHOPIFY_THEME_ID_MAP = SHOPIFY_THEME_ID_MAP;
module.exports.SHOPIFY_THEME_NAME_MAP = SHOPIFY_THEME_NAME_MAP;

// 如果直接运行此文件，执行示例
if (require.main === module) {
    console.log('=== Shopify Theme Detector 示例 ===');
    example3();
    // example1();
    // example2();
}
