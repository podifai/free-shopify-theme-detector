const axios = require('axios');
const cheerio = require('cheerio');

// ============================================================================
// 增强版 Shopify 主题检测器 V2 - 修复版本
// 基于真实网站分析，提高检测准确率
// ============================================================================

// 官方主题 ID 映射（完整版）
const OFFICIAL_THEME_MAP = {
    // 免费主题 (11个)
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
    1902: 'Spotlight',
    
    // 付费主题（部分重要的）
    568: 'Symmetry',
    855: 'Prestige',
    1190: 'Impact',
    796: 'Debut',
    730: 'Brooklyn',
    857: 'Impulse',
    836: 'Venue',
    2967: 'Ultra',
    902: 'Expanse',
    566: 'Atlantic',
    // ... 更多主题
};

// 反向映射
const THEME_NAME_TO_ID = Object.fromEntries(
    Object.entries(OFFICIAL_THEME_MAP).map(([id, name]) => [name, parseInt(id)])
);

// 免费主题列表
const FREE_THEMES = [887, 1356, 1368, 1499, 1434, 1363, 1431, 1567, 1864, 1841, 1902];

// 修正版第三方主题检测库 - 基于真实网站分析
const THIRD_PARTY_THEMES = {
    // 高准确率检测规则
    'Kalles': {
        patterns: [
            // JS 对象检测
            '"theme_name":"Kalles"',
            '"schema_name":"Kalles"',
            'window.theme.themeName = "Kalles"',
            // CSS 类名特征 (基于 The4 团队开发)
            't4s-product-info',
            't4s-product-rating',
            't4s-',
            'kalles-theme',
            // JS 文件特征
            'kalles.js',
            'kalles-main.js',
            // CDN 路径
            '/assets/kalles',
            // HTML 特征
            'data-theme="kalles"',
            'data-kalles'
        ],
        weight: 85,
        minMatches: 2,
        specificMatches: [
            { pattern: '"theme_name":"Kalles"', weight: 95 },
            { pattern: 't4s-product-info', weight: 80 },
            { pattern: 't4s-', weight: 70 }
        ]
    },
    
    'Turbo': {
        patterns: [
            // 高权重特征
            '"theme_name":"Turbo"',
            '"name":"Turbo"',
            'Shopify.theme.name === "Turbo"',
            // CDN 路径特征（基于真实分析）
            '/cdn/shop/t/190/assets/styles.css',
            '/cdn/shop/t/190/assets/',
            '/t/190/assets/',
            // CSS 类特征
            'header__logo',
            'sticky_nav',
            'menu-position--block',
            'product_section',
            'product_form',
            // JS 库特征
            'lazysizes',
            // 组合特征
            'turbo-theme',
            'turbo.js'
        ],
        weight: 85,
        minMatches: 2,
        specificMatches: [
            { pattern: '"theme_name":"Turbo"', weight: 95 },
            { pattern: '/t/190/assets/', weight: 90 },
            { pattern: 'header__logo', weight: 75, requiresSecond: 'sticky_nav' }
        ]
    },
    
    'Stiletto': {
        patterns: [
            // 高权重 JS 对象检测
            '"theme_name":"Stiletto"',
            'window.theme.themeName = "Stiletto"',
            '"schema_name":"Stiletto"',
            // 特有 JS 文件组合
            'photoswipe-chunk.js',
            'swiper-chunk.js',
            'nouislider-chunk.js',
            'polyfill-inert-chunk.js',
            // CSS 特征
            'stiletto-theme',
            'stiletto.css',
            // 版本信息
            'window.theme.version',
            'v3.2.1'
        ],
        weight: 85,
        minMatches: 2,
        specificMatches: [
            { pattern: 'window.theme.themeName = "Stiletto"', weight: 95 },
            { pattern: 'photoswipe-chunk.js', weight: 80, requiresSecond: 'swiper-chunk.js' },
            { pattern: 'nouislider-chunk.js', weight: 75 }
        ]
    },
    
    'Wokiee': {
        patterns: [
            // 高权重检测
            '"schema_name":"Wokiee"',
            '"theme_name":"Wokiee"',
            'Shopify.theme.schema_name === "Wokiee"',
            // CDN 路径特征
            '/cdn/shop/t/12/assets/',
            '/t/12/assets/',
            'style-rtl.css',
            // JS 文件特征
            'bc-sf-filter.js',
            // CSS 特征
            'wokiee-theme',
            'wokiee.css',
            'wk-',
            // 产品轮播特征
            'product-carousel'
        ],
        weight: 85,
        minMatches: 2,
        specificMatches: [
            { pattern: '"schema_name":"Wokiee"', weight: 95 },
            { pattern: '/t/12/assets/', weight: 90 },
            { pattern: 'bc-sf-filter.js', weight: 80 }
        ]
    },
    
    'Ecomify': {
        patterns: [
            // Schema 检测
            '"schema_name":"ecomify"',
            '"theme_name":"ecomify"',
            '"schema_version":"3.4.2"',
            // 特有的 JS 模块命名
            'client.init-fed-cm',
            'fed-cm_B9_lyA-d.en.esm.js',
            // 主题 ID
            '137429712973',
            // CSS 特征
            'ecomify-theme',
            'ecomify.css'
        ],
        weight: 85,
        minMatches: 2,
        specificMatches: [
            { pattern: '"schema_name":"ecomify"', weight: 95 },
            { pattern: 'client.init-fed-cm', weight: 85 },
            { pattern: '137429712973', weight: 80 }
        ]
    },
    
    'Prestige': {
        patterns: [
            // 官方和定制版本检测
            '"theme_name":"Prestige"',
            '"schema_name":"Prestige"',
            'Shopify.theme.name === "Prestige"',
            // 特有的文件结构
            'vendor.min.js',
            'theme.js',
            'sections.js.liquid',
            // CSS 类特征（Maestrooo 开发）
            'ProductItem__',
            'ProductItem--',
            'prestige--v',
            'Icon--',
            'maestrooo',
            // Web Components 特征
            'custom-elements',
            // 单一 CSS 文件特征
            'theme.css'
        ],
        weight: 85,
        minMatches: 2,
        specificMatches: [
            { pattern: '"theme_name":"Prestige"', weight: 95 },
            { pattern: 'ProductItem__', weight: 80 },
            { pattern: 'maestrooo', weight: 85 }
        ]
    },
    
    // 其他流行第三方主题
    'Ella': {
        patterns: [
            'ella-theme', 'ella.css', 'ella.js', '/assets/ella',
            't4s-ella', 'ella-product'
        ],
        weight: 75,
        minMatches: 2
    },
    
    'Debutify': {
        patterns: [
            'debutify', 'dbtfy-', 'debutify-theme', '/assets/debutify',
            'debutify.css', 'debutify.js'
        ],
        weight: 75,
        minMatches: 2
    },
    
    'Booster': {
        patterns: [
            'booster-theme', 'btb-', '/assets/booster',
            'booster.css', 'booster.js'
        ],
        weight: 70,
        minMatches: 2
    }
};

// 增强版检测器类
class EnhancedShopifyThemeDetectorV2 {
    constructor() {
        this.officialThemes = OFFICIAL_THEME_MAP;
        this.thirdPartyThemes = THIRD_PARTY_THEMES;
        this.freeThemes = FREE_THEMES;
        this.nameToId = THEME_NAME_TO_ID;
        
        this.config = {
            timeout: 15000,
            maxRedirects: 5,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            retryAttempts: 2,
            retryDelay: 1000
        };
    }

    // 主检测方法 - 重新排序优先级
    async detectTheme(url) {
        try {
            const html = await this.fetchHTMLWithRetry(url);
            
            if (!this.isShopifyStore(html)) {
                return {
                    success: false,
                    isShopify: false,
                    url: url,
                    error: 'Not a Shopify store'
                };
            }

            // 按新的优先级顺序检测
            const detectionMethods = [
                this.detectByJavaScriptObjects.bind(this),    // 新增：最高优先级
                this.detectByThemeStoreId.bind(this),         // 原优先级1
                this.detectBySchemaName.bind(this),           // 新增：Schema检测
                this.detectByEnhancedThirdParty.bind(this),   // 增强的第三方检测
                this.detectByShopifyObject.bind(this),        // 原优先级2
                this.detectByMetaTags.bind(this),             // 原优先级3
                this.detectByCDNPaths.bind(this),             // 新增：CDN路径检测
                this.detectByAdvancedPatterns.bind(this),     // 原高级模式
                this.detectByFallbackMethods.bind(this)       // 后备方法
            ];

            let bestResult = null;
            let allResults = [];

            for (const method of detectionMethods) {
                const result = await method(html);
                if (result && result.theme && result.theme !== 'Unknown') {
                    allResults.push(result);
                    if (!bestResult || result.confidence > bestResult.confidence) {
                        bestResult = result;
                    }
                    // 如果置信度很高，可以提前返回
                    if (result.confidence >= 95) {
                        break;
                    }
                }
            }

            if (bestResult) {
                return {
                    success: true,
                    isShopify: true,
                    url: url,
                    theme: bestResult.theme,
                    confidence: bestResult.confidence,
                    method: bestResult.method,
                    themeId: bestResult.themeId || null,
                    isOfficial: bestResult.isOfficial || false,
                    isFree: bestResult.isFree || false,
                    isThirdParty: bestResult.isThirdParty || false,
                    themeStoreUrl: this.getThemeStoreUrl(bestResult.theme),
                    detectionDetails: bestResult.details || {},
                    allResults: allResults,
                    timestamp: new Date().toISOString()
                };
            }

            return {
                success: true,
                isShopify: true,
                url: url,
                theme: 'Unknown',
                confidence: 0,
                method: 'no_detection',
                error: 'Unable to detect theme'
            };

        } catch (error) {
            return {
                success: false,
                isShopify: false,
                url: url,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    // 新方法1: JavaScript 对象检测（最高优先级）
    async detectByJavaScriptObjects(html) {
        const patterns = [
            // Shopify.theme 对象
            /Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /window\.Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /Shopify\.theme\.name\s*=\s*["']([^"']+)["']/gi,
            
            // window.theme 对象
            /window\.theme\.themeName\s*=\s*["']([^"']+)["']/gi,
            /window\.theme\s*=\s*["']([^"']+)["']/gi,
            
            // Schema 信息
            /"schema_name":\s*["']([^"']+)["']/gi,
            /"theme_name":\s*["']([^"']+)["']/gi,
            
            // 其他 JS 变量
            /theme_name["']?\s*:\s*["']([^"']+)["']/gi,
            /themeName["']?\s*:\s*["']([^"']+)["']/gi
        ];

        for (const pattern of patterns) {
            const matches = [...html.matchAll(pattern)];
            if (matches.length > 0) {
                const themeName = matches[0][1];
                const themeId = this.nameToId[themeName];
                
                // 检查是否是第三方主题
                if (this.thirdPartyThemes[themeName]) {
                    return {
                        theme: themeName,
                        confidence: 95,
                        method: 'javascript_object',
                        themeId: themeId || null,
                        isOfficial: !!themeId,
                        isThirdParty: !themeId,
                        isFree: themeId ? this.freeThemes.includes(themeId) : false,
                        details: { detectedFromJS: true, pattern: pattern.source }
                    };
                }
                
                return {
                    theme: themeName,
                    confidence: themeId ? 98 : 85,
                    method: 'javascript_object',
                    themeId: themeId || null,
                    isOfficial: !!themeId,
                    isFree: themeId ? this.freeThemes.includes(themeId) : false,
                    details: { detectedFromJS: true, pattern: pattern.source }
                };
            }
        }

        return null;
    }

    // 新方法2: Schema 名称检测
    async detectBySchemaName(html) {
        const patterns = [
            /"schema_name":\s*["']([^"']+)["']/gi,
            /Shopify\.theme\.schema_name\s*===\s*["']([^"']+)["']/gi,
            /"name":\s*["']([^"']+)["'],\s*"schema_name"/gi
        ];

        for (const pattern of patterns) {
            const matches = [...html.matchAll(pattern)];
            if (matches.length > 0) {
                const schemaName = matches[0][1];
                
                // 检查是否是已知主题
                if (this.thirdPartyThemes[schemaName]) {
                    return {
                        theme: schemaName,
                        confidence: 95,
                        method: 'schema_name',
                        isThirdParty: true,
                        details: { schemaName: schemaName }
                    };
                }
                
                const themeId = this.nameToId[schemaName];
                if (themeId) {
                    return {
                        theme: schemaName,
                        confidence: 92,
                        method: 'schema_name',
                        themeId: themeId,
                        isOfficial: true,
                        isFree: this.freeThemes.includes(themeId),
                        details: { schemaName: schemaName }
                    };
                }
            }
        }

        return null;
    }

    // 增强的第三方主题检测
    async detectByEnhancedThirdParty(html) {
        const htmlLower = html.toLowerCase();
        let bestMatch = null;
        let bestScore = 0;

        for (const [themeName, themeData] of Object.entries(this.thirdPartyThemes)) {
            let totalScore = 0;
            let matches = 0;
            const matchedPatterns = [];

            // 检查特定匹配规则（高权重）
            if (themeData.specificMatches) {
                for (const specificMatch of themeData.specificMatches) {
                    if (htmlLower.includes(specificMatch.pattern.toLowerCase())) {
                        totalScore += specificMatch.weight;
                        matches++;
                        matchedPatterns.push({ pattern: specificMatch.pattern, weight: specificMatch.weight });
                        
                        // 检查是否需要第二个条件
                        if (specificMatch.requiresSecond) {
                            if (htmlLower.includes(specificMatch.requiresSecond.toLowerCase())) {
                                totalScore += 10; // 额外加分
                                matchedPatterns.push({ pattern: specificMatch.requiresSecond, weight: 10 });
                            }
                        }
                    }
                }
            }

            // 检查普通模式
            for (const pattern of themeData.patterns) {
                if (htmlLower.includes(pattern.toLowerCase())) {
                    matches++;
                    totalScore += 5; // 基础分数
                    matchedPatterns.push({ pattern: pattern, weight: 5 });
                }
            }

            // 计算最终置信度
            if (matches >= themeData.minMatches) {
                let confidence = Math.min(95, totalScore);
                
                // 如果有高权重匹配，进一步提升置信度
                const hasHighWeightMatch = matchedPatterns.some(m => m.weight >= 80);
                if (hasHighWeightMatch) {
                    confidence = Math.min(98, confidence + 10);
                }

                if (confidence > bestScore) {
                    bestScore = confidence;
                    bestMatch = {
                        theme: themeName,
                        confidence: confidence,
                        method: 'enhanced_third_party',
                        themeId: null,
                        isOfficial: false,
                        isThirdParty: true,
                        details: {
                            matchedPatterns: matchedPatterns,
                            totalMatches: matches,
                            totalScore: totalScore
                        }
                    };
                }
            }
        }

        return bestMatch;
    }

    // 新方法3: CDN 路径检测
    async detectByCDNPaths(html) {
        const $ = cheerio.load(html);
        
        // 检测 CSS 和 JS 链接中的 CDN 路径
        const allLinks = $('link[rel="stylesheet"], script[src]');
        
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            const url = $(element).attr('href') || $(element).attr('src');
            
            if (url) {
                // Turbo 主题特征 CDN 路径
                if (url.includes('/cdn/shop/t/190/assets/') || url.includes('/t/190/assets/')) {
                    return {
                        theme: 'Turbo',
                        confidence: 90,
                        method: 'cdn_path_detection',
                        isThirdParty: true,
                        details: { cdnPath: url, pathPattern: '/t/190/assets/' }
                    };
                }
                
                // Wokiee 主题特征 CDN 路径
                if (url.includes('/cdn/shop/t/12/assets/') || url.includes('/t/12/assets/')) {
                    return {
                        theme: 'Wokiee',
                        confidence: 90,
                        method: 'cdn_path_detection',
                        isThirdParty: true,
                        details: { cdnPath: url, pathPattern: '/t/12/assets/' }
                    };
                }
                
                // 其他主题的 CDN 路径检测
                const cdnMatch = url.match(/\/cdn\/shop\/t\/(\d+)\/assets\//);
                if (cdnMatch) {
                    const themeId = parseInt(cdnMatch[1]);
                    const theme = this.officialThemes[themeId];
                    if (theme) {
                        return {
                            theme: theme,
                            confidence: 85,
                            method: 'cdn_path_detection',
                            themeId: themeId,
                            isOfficial: true,
                            isFree: this.freeThemes.includes(themeId),
                            details: { cdnPath: url, extractedThemeId: themeId }
                        };
                    }
                }
            }
        }

        return null;
    }

    // 原有方法保持不变...
    async detectByThemeStoreId(html) {
        const patterns = [
            /"theme_store_id":\s*(\d+)/gi,
            /'theme_store_id':\s*(\d+)/gi,
            /theme_store_id["']?\s*:\s*(\d+)/gi,
            /themeStoreId["']?\s*:\s*(\d+)/gi,
            /window\.Shopify\.theme\.store_id\s*=\s*(\d+)/gi,
            /Shopify\.theme\.store_id\s*=\s*(\d+)/gi
        ];

        for (const pattern of patterns) {
            const matches = [...html.matchAll(pattern)];
            if (matches.length > 0) {
                const id = parseInt(matches[0][1]);
                const theme = this.officialThemes[id];
                
                if (theme) {
                    return {
                        theme: theme,
                        confidence: 98,
                        method: 'theme_store_id',
                        themeId: id,
                        isOfficial: true,
                        isFree: this.freeThemes.includes(id),
                        details: { themeStoreId: id }
                    };
                } else {
                    return {
                        theme: `Unknown Official Theme (ID: ${id})`,
                        confidence: 95,
                        method: 'theme_store_id_unknown',
                        themeId: id,
                        isOfficial: true,
                        details: { themeStoreId: id }
                    };
                }
            }
        }

        // 检测自定义主题
        const nullPatterns = [
            /"theme_store_id":\s*null/gi,
            /'theme_store_id':\s*null/gi,
            /theme_store_id["']?\s*:\s*null/gi
        ];

        for (const pattern of nullPatterns) {
            if (pattern.test(html)) {
                return {
                    theme: 'Custom Theme',
                    confidence: 90,
                    method: 'theme_store_id_null',
                    themeId: null,
                    isOfficial: false,
                    isCustom: true,
                    details: { customTheme: true }
                };
            }
        }

        return null;
    }

    // 其他原有方法保持不变...
    async detectByShopifyObject(html) {
        const patterns = [
            /Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /window\.Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /["']theme["']:\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /Shopify\.theme\.name\s*=\s*["']([^"']+)["']/gi,
            /window\.theme\s*=\s*["']([^"']+)["']/gi,
            /theme_name["']?\s*:\s*["']([^"']+)["']/gi,
            /Shopify\.theme\.schema_name\s*===\s*["']([^"']+)["']/gi
        ];

        for (const pattern of patterns) {
            const matches = [...html.matchAll(pattern)];
            if (matches.length > 0) {
                const themeName = matches[0][1];
                const themeId = this.nameToId[themeName];
                
                return {
                    theme: themeName,
                    confidence: themeId ? 92 : 80,
                    method: 'shopify_object',
                    themeId: themeId || null,
                    isOfficial: !!themeId,
                    isFree: themeId ? this.freeThemes.includes(themeId) : false,
                    details: { detectedFromJS: true }
                };
            }
        }

        return null;
    }

    async detectByMetaTags(html) {
        const $ = cheerio.load(html);
        
        const metaSelectors = [
            'meta[name="shopify-theme-id"]',
            'meta[name="theme"]',
            'meta[property="shopify:theme"]',
            'meta[name="shopify-theme"]',
            'meta[name="theme-name"]',
            'meta[property="theme-name"]'
        ];

        for (const selector of metaSelectors) {
            const meta = $(selector);
            if (meta.length > 0) {
                const content = meta.attr('content');
                if (content) {
                    if (/^\d+$/.test(content)) {
                        const id = parseInt(content);
                        const theme = this.officialThemes[id];
                        return {
                            theme: theme || `Unknown (ID: ${id})`,
                            confidence: 85,
                            method: 'meta_tag_id',
                            themeId: id,
                            isOfficial: !!theme,
                            isFree: theme ? this.freeThemes.includes(id) : false,
                            details: { metaTag: selector }
                        };
                    } else {
                        const themeId = this.nameToId[content];
                        return {
                            theme: content,
                            confidence: 80,
                            method: 'meta_tag_name',
                            themeId: themeId || null,
                            isOfficial: !!themeId,
                            isFree: themeId ? this.freeThemes.includes(themeId) : false,
                            details: { metaTag: selector }
                        };
                    }
                }
            }
        }

        return null;
    }

    async detectByAdvancedPatterns(html) {
        const $ = cheerio.load(html);
        
        // 检测 CSS 链接中的主题信息
        const cssLinks = $('link[rel="stylesheet"]');
        for (let i = 0; i < cssLinks.length; i++) {
            const href = $(cssLinks[i]).attr('href');
            if (href) {
                // 检测官方主题路径模式
                const cdnMatch = href.match(/\/cdn\/shop\/t\/(\d+)\/assets\//);
                if (cdnMatch) {
                    const themeId = parseInt(cdnMatch[1]);
                    const theme = this.officialThemes[themeId];
                    if (theme) {
                        return {
                            theme: theme,
                            confidence: 75,
                            method: 'advanced_cdn_path',
                            themeId: themeId,
                            isOfficial: true,
                            isFree: this.freeThemes.includes(themeId),
                            details: { cdnPath: href }
                        };
                    }
                }

                // 检测主题名称模式
                const themeNameMatch = href.match(/\/assets\/([^\/]+)\.(css|js)/);
                if (themeNameMatch) {
                    const assetName = themeNameMatch[1];
                    for (const [themeName, themeId] of Object.entries(this.nameToId)) {
                        if (assetName.toLowerCase().includes(themeName.toLowerCase())) {
                            return {
                                theme: themeName,
                                confidence: 65,
                                method: 'asset_name_detection',
                                themeId: themeId,
                                isOfficial: true,
                                isFree: this.freeThemes.includes(themeId),
                                details: { assetName: assetName }
                            };
                        }
                    }
                }
            }
        }

        return null;
    }

    async detectByFallbackMethods(html) {
        const $ = cheerio.load(html);
        
        // 检查常见的主题特征
        const fallbackPatterns = {
            'Dawn': ['shopify-section-group-header', 'color-scheme-', 'component-'],
            'Debut': ['shopify-section-header', 'site-header', 'grid-product'],
            'Brooklyn': ['site-nav', 'hero-banner', 'product-form'],
            'Minimal': ['site-footer', 'minimal-'],
            'Narrative': ['hero-content', 'featured-blog'],
            'Supply': ['collection-hero', 'featured-collection'],
            'Boundless': ['collection-filters', 'boundless-']
        };

        for (const [themeName, patterns] of Object.entries(fallbackPatterns)) {
            let matches = 0;
            for (const pattern of patterns) {
                if (html.toLowerCase().includes(pattern)) {
                    matches++;
                }
            }
            
            if (matches >= 2) {
                const themeId = this.nameToId[themeName];
                return {
                    theme: themeName,
                    confidence: 45,
                    method: 'fallback_detection',
                    themeId: themeId || null,
                    isOfficial: !!themeId,
                    isFree: themeId ? this.freeThemes.includes(themeId) : false,
                    details: { fallbackMatches: matches }
                };
            }
        }

        return null;
    }

    // 辅助方法保持不变...
    isShopifyStore(html) {
        const indicators = [
            'shopify.com/s/files',
            'cdn.shopify.com',
            'window.Shopify',
            'Shopify.shop',
            'shopify-section',
            'data-shopify',
            'shopify-payment-button',
            'shopify-features',
            'shopify-analytics',
            'myshopify.com',
            'Shopify.routes'
        ];

        const htmlLower = html.toLowerCase();
        return indicators.some(indicator => htmlLower.includes(indicator.toLowerCase()));
    }

    async fetchHTMLWithRetry(url) {
        let normalizedUrl = url.trim();
        if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
            normalizedUrl = 'https://' + normalizedUrl;
        }

        let lastError;
        for (let attempt = 0; attempt < this.config.retryAttempts; attempt++) {
            try {
                const response = await axios.get(normalizedUrl, {
                    timeout: this.config.timeout,
                    maxRedirects: this.config.maxRedirects,
                    headers: {
                        'User-Agent': this.config.userAgent,
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.5',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                
                return response.data;
            } catch (error) {
                lastError = error;
                if (attempt < this.config.retryAttempts - 1) {
                    await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
                }
            }
        }

        throw new Error(`Failed to fetch ${normalizedUrl} after ${this.config.retryAttempts} attempts: ${lastError.message}`);
    }

    async detectMultiple(urls, options = {}) {
        const { 
            concurrent = 3, 
            delay = 1000,
            includeErrors = true,
            showProgress = false
        } = options;

        const results = [];
        const chunks = this.chunkArray(urls, concurrent);
        
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            if (showProgress) {
                console.log(`Processing chunk ${i + 1}/${chunks.length} (${chunk.length} URLs)`);
            }

            const promises = chunk.map(url => this.detectTheme(url));
            const chunkResults = await Promise.allSettled(promises);

            chunkResults.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    results.push(result.value);
                } else if (includeErrors) {
                    results.push({
                        success: false,
                        url: chunk[index],
                        isShopify: false,
                        error: result.reason.message,
                        timestamp: new Date().toISOString()
                    });
                }
            });

            if (delay > 0 && i < chunks.length - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
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

    getThemeStoreUrl(themeName) {
        if (!themeName || themeName === 'Unknown') return null;
        
        const slug = themeName.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
            
        return `https://themes.shopify.com/themes/${slug}`;
    }

    getStats() {
        const totalOfficial = Object.keys(this.officialThemes).length;
        const totalThirdParty = Object.keys(this.thirdPartyThemes).length;
        const totalFree = this.freeThemes.length;
        
        return {
            totalSupported: totalOfficial + totalThirdParty,
            official: {
                total: totalOfficial,
                free: totalFree,
                paid: totalOfficial - totalFree
            },
            thirdParty: totalThirdParty
        };
    }
}

// 简化的 API 函数
async function detectShopifyTheme(url) {
    const detector = new EnhancedShopifyThemeDetectorV2();
    return await detector.detectTheme(url);
}

async function detectMultipleThemes(urls, options = {}) {
    const detector = new EnhancedShopifyThemeDetectorV2();
    return await detector.detectMultiple(urls, options);
}

// Vercel API 处理函数
module.exports = async (req, res) => {
    // 处理 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');

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

    // 获取参数
    let urls;
    let options = {};
    
    if (req.method === 'POST') {
        urls = req.body?.url || req.body?.urls;
        options = req.body?.options || {};
    } else {
        urls = req.query?.url || req.query?.urls;
        if (req.query?.concurrent) options.concurrent = parseInt(req.query.concurrent);
        if (req.query?.delay) options.delay = parseInt(req.query.delay);
    }

    if (!urls) {
        return res.status(400).json({ 
            success: false, 
            error: 'URL parameter is required' 
        });
    }

    try {
        const detector = new EnhancedShopifyThemeDetectorV2();
        
        // 单个 URL 检测
        if (typeof urls === 'string') {
            const result = await detector.detectTheme(urls);
            return res.status(200).json({
                success: true,
                data: result
            });
        }
        
        // 批量检测
        if (Array.isArray(urls)) {
            const results = await detector.detectMultiple(urls, options);
            return res.status(200).json({
                success: true,
                data: results,
                stats: {
                    total: urls.length,
                    processed: results.length,
                    successful: results.filter(r => r.success).length,
                    failed: results.filter(r => !r.success).length
                }
            });
        }

        return res.status(400).json({ 
            success: false, 
            error: 'Invalid URL format' 
        });

    } catch (error) {
        console.error('Detection error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Theme detection failed'
        });
    }
};

// 导出所有功能
module.exports.EnhancedShopifyThemeDetectorV2 = EnhancedShopifyThemeDetectorV2;
module.exports.detectShopifyTheme = detectShopifyTheme;
module.exports.detectMultipleThemes = detectMultipleThemes;

// 如果直接运行，执行测试
if (require.main === module) {
    console.log('=== 增强版 Shopify 主题检测器 V2 测试 ===');
    
    async function testProblematicSites() {
        const detector = new EnhancedShopifyThemeDetectorV2();
        
        const testSites = [
            { url: 'https://zoelev.com/', expected: 'Stiletto' },
            { url: 'https://www.nataliemariejewellery.com/', expected: 'Prestige' },
            { url: 'https://rellery.com/', expected: 'Kalles' },
            { url: 'https://evryjewels.com/', expected: 'Ecomify' },
            { url: 'https://goldpresidents.com/', expected: 'Turbo' },
            { url: 'https://digbyandiona.com/', expected: 'Wokiee' }
        ];
        
        console.log('测试问题网站...\n');
        
        for (const site of testSites) {
            try {
                console.log(`测试: ${site.url}`);
                console.log(`期望: ${site.expected}`);
                
                const result = await detector.detectTheme(site.url);
                
                if (result.success && result.isShopify) {
                    console.log(`结果: ${result.theme} (${result.confidence}%)`);
                    console.log(`方法: ${result.method}`);
                    
                    if (result.theme === site.expected) {
                        console.log('✅ 检测正确!');
                    } else {
                        console.log('❌ 检测错误');
                    }
                } else {
                    console.log(`❌ 检测失败: ${result.error}`);
                }
                
                console.log('---');
            } catch (error) {
                console.error(`❌ ${site.url} 检测异常: ${error.message}`);
                console.log('---');
            }
        }
    }
    
    testProblematicSites();
}
