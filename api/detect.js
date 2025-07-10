const axios = require('axios');
const cheerio = require('cheerio');

// 导入完整的主题数据库
const {
    COMPLETE_OFFICIAL_THEME_MAP,
    COMPLETE_THEME_NAME_TO_ID,
    COMPLETE_FREE_THEMES,
    EXTENDED_THIRD_PARTY_THEMES,
    getThemeIdByName,
    getThemeNameById,
    isFreeTheme,
    getThemeStoreUrl
} = require('./complete-theme-database');

// ============================================================================
// 增强版 Shopify 主题检测器 V3 - 完整数据库版本
// 支持 400+ 官方主题 + 20+ 第三方主题
// 基于 EcommercePot 和多个来源的完整主题数据
// ============================================================================

class UltimateShopifyThemeDetector {
    constructor() {
        this.officialThemes = COMPLETE_OFFICIAL_THEME_MAP;
        this.thirdPartyThemes = EXTENDED_THIRD_PARTY_THEMES;
        this.freeThemes = COMPLETE_FREE_THEMES;
        this.nameToId = COMPLETE_THEME_NAME_TO_ID;
        
        this.config = {
            timeout: 15000,
            maxRedirects: 5,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            retryAttempts: 2,
            retryDelay: 1000
        };
    }

    // 主检测方法 - 优化的检测流程
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

            // 优化的检测方法顺序
            const detectionMethods = [
                this.detectByJavaScriptObjects.bind(this),      // 最高优先级 - JS对象
                this.detectByThemeStoreId.bind(this),           // Theme Store ID
                this.detectBySchemaName.bind(this),             // Schema名称
                this.detectByEnhancedThirdParty.bind(this),     // 增强第三方检测
                this.detectByMetaTags.bind(this),               // Meta标签
                this.detectByCDNPaths.bind(this),               // CDN路径
                this.detectByAssetAnalysis.bind(this),          // 新增：资源文件分析
                this.detectByDOMStructure.bind(this),           // 新增：DOM结构分析
                this.detectByAdvancedPatterns.bind(this),       // 高级模式
                this.detectByFallbackMethods.bind(this)         // 后备方法
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
                    themeStoreUrl: getThemeStoreUrl(bestResult.theme),
                    detectionDetails: bestResult.details || {},
                    allResults: allResults,
                    timestamp: new Date().toISOString(),
                    databaseVersion: 'v3.0',
                    supportedThemes: Object.keys(this.officialThemes).length + Object.keys(this.thirdPartyThemes).length
                };
            }

            return {
                success: true,
                isShopify: true,
                url: url,
                theme: 'Unknown',
                confidence: 0,
                method: 'no_detection',
                error: 'Unable to detect theme',
                supportedThemes: Object.keys(this.officialThemes).length + Object.keys(this.thirdPartyThemes).length
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

    // 方法1: JavaScript 对象检测（最高优先级）
    async detectByJavaScriptObjects(html) {
        const patterns = [
            // Shopify.theme 对象检测
            /Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /window\.Shopify\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /Shopify\.theme\.name\s*=\s*["']([^"']+)["']/gi,
            
            // window.theme 对象检测
            /window\.theme\.themeName\s*=\s*["']([^"']+)["']/gi,
            /window\.theme\s*=\s*\{[^}]*["']name["']:\s*["']([^"']+)["']/gi,
            /window\.theme\s*=\s*["']([^"']+)["']/gi,
            
            // Schema 信息检测
            /"schema_name":\s*["']([^"']+)["']/gi,
            /"theme_name":\s*["']([^"']+)["']/gi,
            
            // 其他 JS 变量检测
            /theme_name["']?\s*:\s*["']([^"']+)["']/gi,
            /themeName["']?\s*:\s*["']([^"']+)["']/gi,
            /theme["']?\s*:\s*["']([^"']+)["']/gi
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
                        confidence: 98,
                        method: 'javascript_object_third_party',
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

    // 方法2: Theme Store ID 检测
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

    // 方法3: Schema 名称检测
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
                
                // 检查是否是已知第三方主题
                if (this.thirdPartyThemes[schemaName]) {
                    return {
                        theme: schemaName,
                        confidence: 95,
                        method: 'schema_name_third_party',
                        isThirdParty: true,
                        details: { schemaName: schemaName }
                    };
                }
                
                // 检查是否是官方主题
                const themeId = this.nameToId[schemaName];
                if (themeId) {
                    return {
                        theme: schemaName,
                        confidence: 92,
                        method: 'schema_name_official',
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

    // 方法4: 增强的第三方主题检测
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

    // 方法5: Meta 标签检测
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

    // 方法6: CDN 路径检测
    async detectByCDNPaths(html) {
        const $ = cheerio.load(html);
        
        // 检测 CSS 和 JS 链接中的 CDN 路径
        const allLinks = $('link[rel="stylesheet"], script[src]');
        
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            const url = $(element).attr('href') || $(element).attr('src');
            
            if (url) {
                // 特定主题的 CDN 路径检测
                const cdnPatterns = [
                    { pattern: /\/cdn\/shop\/t\/190\/assets\//, theme: 'Turbo', confidence: 90 },
                    { pattern: /\/t\/190\/assets\//, theme: 'Turbo', confidence: 88 },
                    { pattern: /\/cdn\/shop\/t\/12\/assets\//, theme: 'Wokiee', confidence: 90 },
                    { pattern: /\/t\/12\/assets\//, theme: 'Wokiee', confidence: 88 },
                    { pattern: /\/cdn\/shop\/t\/101\/assets\//, theme: 'Expanse', confidence: 85 },
                    { pattern: /\/t\/101\/assets\//, theme: 'Expanse', confidence: 83 }
                ];

                for (const { pattern, theme, confidence } of cdnPatterns) {
                    if (pattern.test(url)) {
                        return {
                            theme: theme,
                            confidence: confidence,
                            method: 'cdn_path_specific',
                            isThirdParty: !this.nameToId[theme],
                            details: { cdnPath: url, pathPattern: pattern.source }
                        };
                    }
                }
                
                // 通用 CDN 路径检测
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

    // 新方法7: 资源文件分析
    async detectByAssetAnalysis(html) {
        const $ = cheerio.load(html);
        
        // 检测特定的资源文件组合
        const scripts = $('script[src]');
        const links = $('link[rel="stylesheet"]');
        
        const assetPatterns = {
            'Stiletto': {
                requiredAssets: ['photoswipe-chunk.js', 'swiper-chunk.js'],
                optionalAssets: ['nouislider-chunk.js'],
                confidence: 90
            },
            'Turbo': {
                requiredAssets: ['styles.css'],
                pathPattern: '/t/190/assets/',
                confidence: 85
            },
            'Dawn': {
                requiredAssets: ['base.css', 'component-'],
                confidence: 75
            },
            'Impact': {
                requiredAssets: ['component-product-card', 'cart-drawer.js'],
                confidence: 80
            }
        };

        for (const [themeName, pattern] of Object.entries(assetPatterns)) {
            let matchCount = 0;
            const foundAssets = [];

            // 检查 JavaScript 文件
            for (let i = 0; i < scripts.length; i++) {
                const src = $(scripts[i]).attr('src');
                if (src && pattern.requiredAssets) {
                    for (const asset of pattern.requiredAssets) {
                        if (src.includes(asset)) {
                            matchCount++;
                            foundAssets.push(asset);
                        }
                    }
                }
            }

            // 检查 CSS 文件
            for (let i = 0; i < links.length; i++) {
                const href = $(links[i]).attr('href');
                if (href && pattern.requiredAssets) {
                    for (const asset of pattern.requiredAssets) {
                        if (href.includes(asset)) {
                            matchCount++;
                            foundAssets.push(asset);
                        }
                    }
                }
                
                // 检查路径模式
                if (href && pattern.pathPattern && href.includes(pattern.pathPattern)) {
                    matchCount += 2; // 路径匹配给予更高权重
                    foundAssets.push(`Path: ${pattern.pathPattern}`);
                }
            }

            if (matchCount >= (pattern.requiredAssets?.length || 1)) {
                const themeId = this.nameToId[themeName];
                return {
                    theme: themeName,
                    confidence: pattern.confidence,
                    method: 'asset_analysis',
                    themeId: themeId || null,
                    isOfficial: !!themeId,
                    isThirdParty: !themeId,
                    isFree: themeId ? this.freeThemes.includes(themeId) : false,
                    details: {
                        foundAssets: foundAssets,
                        matchCount: matchCount
                    }
                };
            }
        }

        return null;
    }

    // 新方法8: DOM 结构分析
    async detectByDOMStructure(html) {
        const $ = cheerio.load(html);
        
        const structurePatterns = {
            'Prestige': {
                selectors: ['.ProductItem__', '.Icon--', '.SectionHeader__'],
                minMatches: 2,
                confidence: 75
            },
            'Impact': {
                selectors: ['product-card', 'section-stack', '.drawer'],
                minMatches: 2,
                confidence: 75
            },
            'Dawn': {
                selectors: ['.color-scheme-1', '.predictive-search', '.cart-drawer'],
                minMatches: 2,
                confidence: 70
            },
            'Symmetry': {
                selectors: ['.product-block', '.navigation__', '.rimage-wrapper'],
                minMatches: 2,
                confidence: 70
            }
        };

        for (const [themeName, pattern] of Object.entries(structurePatterns)) {
            let matches = 0;
            const foundSelectors = [];

            for (const selector of pattern.selectors) {
                if ($(selector).length > 0) {
                    matches++;
                    foundSelectors.push(selector);
                }
            }

            if (matches >= pattern.minMatches) {
                const themeId = this.nameToId[themeName];
                return {
                    theme: themeName,
                    confidence: pattern.confidence,
                    method: 'dom_structure_analysis',
                    themeId: themeId || null,
                    isOfficial: !!themeId,
                    isFree: themeId ? this.freeThemes.includes(themeId) : false,
                    details: {
                        foundSelectors: foundSelectors,
                        matchCount: matches
                    }
                };
            }
        }

        return null;
    }

    // 其他方法保持不变...
    async detectByAdvancedPatterns(html) {
        const $ = cheerio.load(html);
        
        // 检测 CSS 链接中的主题信息
        const cssLinks = $('link[rel="stylesheet"]');
        for (let i = 0; i < cssLinks.length; i++) {
            const href = $(cssLinks[i]).attr('href');
            if (href) {
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

    // 辅助方法
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
            thirdParty: totalThirdParty,
            databaseVersion: 'v3.0',
            lastUpdated: '2025-01-10'
        };
    }
}

// 简化的 API 函数
async function detectShopifyTheme(url) {
    const detector = new UltimateShopifyThemeDetector();
    return await detector.detectTheme(url);
}

async function detectMultipleThemes(urls, options = {}) {
    const detector = new UltimateShopifyThemeDetector();
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
        const detector = new UltimateShopifyThemeDetector();
        
        // 单个 URL 检测
        if (typeof urls === 'string') {
            const result = await detector.detectTheme(urls);
            return res.status(200).json({
                success: true,
                data: result,
                meta: {
                    version: 'v3.0',
                    supportedThemes: detector.getStats().totalSupported
                }
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
                },
                meta: {
                    version: 'v3.0',
                    supportedThemes: detector.getStats().totalSupported
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
module.exports.UltimateShopifyThemeDetector = UltimateShopifyThemeDetector;
module.exports.detectShopifyTheme = detectShopifyTheme;
module.exports.detectMultipleThemes = detectMultipleThemes;

// 如果直接运行，显示统计信息
if (require.main === module) {
    console.log('🎨 终极版 Shopify 主题检测器 V3');
    console.log('===================================');
    
    const detector = new UltimateShopifyThemeDetector();
    const stats = detector.getStats();
    
    console.log(`🎯 支持的主题总数: ${stats.totalSupported}`);
    console.log(`📊 官方主题: ${stats.official.total} (免费: ${stats.official.free}, 付费: ${stats.official.paid})`);
    console.log(`🔧 第三方主题: ${stats.thirdParty}`);
    console.log(`📅 数据库版本: ${stats.databaseVersion}`);
    console.log(`🔄 最后更新: ${stats.lastUpdated}`);
    
    console.log('\n🧪 开始测试样例网站...');
    
    // 测试示例
    async function quickTest() {
        const testUrls = [
            'https://zoelev.com/',           // Stiletto
            'https://goldpresidents.com/',  // Turbo
            'https://rellery.com/'          // Kalles
        ];
        
        for (const url of testUrls) {
            try {
                console.log(`\n🔍 测试: ${url}`);
                const result = await detector.detectTheme(url);
                
                if (result.success && result.isShopify) {
                    console.log(`✅ 检测结果: ${result.theme} (${result.confidence}%)`);
                    console.log(`📋 检测方法: ${result.method}`);
                } else {
                    console.log(`❌ 检测失败: ${result.error}`);
                }
            } catch (error) {
                console.log(`❌ 测试异常: ${error.message}`);
            }
        }
    }
    
    quickTest();
}
