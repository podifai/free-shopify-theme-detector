// Vercel Serverless Function for Shopify Theme Detection
// Deploy path: /api/detect
// Enhanced with 291 theme fingerprints

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

// Enhanced theme fingerprint database with 291 themes
const themeFingerprints = {
    "Abode": {
        "css": [
            "abode-theme",
            "abode__",
            "abode-",
            "abode-header",
            "abode",
            "abode",
            "theme-abode",
            ".abode",
            "#abode"
        ],
        "js": [
            "abode.js",
            "abode.theme.js",
            "abode.min.js",
            "theme-abode.js",
            "abode.js",
            "window.Abode",
            "abode-scripts"
        ],
        "html": [
            "\"Abode\"",
            "\"theme_name\":\"Abode\"",
            "abode-theme",
            "data-abode",
            "class=\"abode\"",
            "data-theme-name=\"Abode\"",
            "theme-abode",
            "id=\"abode\""
        ],
        "paths": [
            "/assets/abode",
            "/assets/abode",
            "/t/abode/assets/",
            "/cdn/shop/t/abode/assets/",
            "/abode/assets/",
            "/assets/theme-abode"
        ]
    },
    "Aesthetic": {
        "css": [
            "aesthetic-theme",
            "aesthetic__",
            "aesthetic-",
            "aesthetic-header",
            "aesthetic",
            "aesthetic",
            "theme-aesthetic",
            ".aesthetic",
            "#aesthetic"
        ],
        "js": [
            "aesthetic.js",
            "aesthetic.theme.js",
            "aesthetic.min.js",
            "theme-aesthetic.js",
            "aesthetic.js",
            "window.Aesthetic",
            "aesthetic-scripts"
        ],
        "html": [
            "\"Aesthetic\"",
            "\"theme_name\":\"Aesthetic\"",
            "aesthetic-theme",
            "data-aesthetic",
            "class=\"aesthetic\"",
            "data-theme-name=\"Aesthetic\"",
            "theme-aesthetic",
            "id=\"aesthetic\""
        ],
        "paths": [
            "/assets/aesthetic",
            "/assets/aesthetic",
            "/t/aesthetic/assets/",
            "/cdn/shop/t/aesthetic/assets/",
            "/aesthetic/assets/",
            "/assets/theme-aesthetic"
        ]
    },
    "Agile": {
        "css": [
            "agile-theme",
            "agile__",
            "agile-",
            "agile-header",
            "agile",
            "agile",
            "theme-agile",
            ".agile",
            "#agile"
        ],
        "js": [
            "agile.js",
            "agile.theme.js",
            "agile.min.js",
            "theme-agile.js",
            "agile.js",
            "window.Agile",
            "agile-scripts"
        ],
        "html": [
            "\"Agile\"",
            "\"theme_name\":\"Agile\"",
            "agile-theme",
            "data-agile",
            "class=\"agile\"",
            "data-theme-name=\"Agile\"",
            "theme-agile",
            "id=\"agile\""
        ],
        "paths": [
            "/assets/agile",
            "/assets/agile",
            "/t/agile/assets/",
            "/cdn/shop/t/agile/assets/",
            "/agile/assets/",
            "/assets/theme-agile"
        ]
    },
    "Aisle": {
        "css": [
            "aisle-theme",
            "aisle__",
            "aisle-",
            "aisle-header",
            "aisle",
            "aisle",
            "theme-aisle",
            ".aisle",
            "#aisle"
        ],
        "js": [
            "aisle.js",
            "aisle.theme.js",
            "aisle.min.js",
            "theme-aisle.js",
            "aisle.js",
            "window.Aisle",
            "aisle-scripts"
        ],
        "html": [
            "\"Aisle\"",
            "\"theme_name\":\"Aisle\"",
            "aisle-theme",
            "data-aisle",
            "class=\"aisle\"",
            "data-theme-name=\"Aisle\"",
            "theme-aisle",
            "id=\"aisle\""
        ],
        "paths": [
            "/assets/aisle",
            "/assets/aisle",
            "/t/aisle/assets/",
            "/cdn/shop/t/aisle/assets/",
            "/aisle/assets/",
            "/assets/theme-aisle"
        ]
    },
    "Alchemy": {
        "css": [
            "alchemy-theme",
            "alchemy__",
            "alchemy-",
            "alchemy-header",
            "alchemy",
            "alchemy",
            "theme-alchemy",
            ".alchemy",
            "#alchemy"
        ],
        "js": [
            "alchemy.js",
            "alchemy.theme.js",
            "alchemy.min.js",
            "theme-alchemy.js",
            "alchemy.js",
            "window.Alchemy",
            "alchemy-scripts"
        ],
        "html": [
            "\"Alchemy\"",
            "\"theme_name\":\"Alchemy\"",
            "alchemy-theme",
            "data-alchemy",
            "class=\"alchemy\"",
            "data-theme-name=\"Alchemy\"",
            "theme-alchemy",
            "id=\"alchemy\""
        ],
        "paths": [
            "/assets/alchemy",
            "/assets/alchemy",
            "/t/alchemy/assets/",
            "/cdn/shop/t/alchemy/assets/",
            "/alchemy/assets/",
            "/assets/theme-alchemy"
        ]
    },
    "Align": {
        "css": [
            "align-theme",
            "align__",
            "align-",
            "align-header",
            "align",
            "align",
            "theme-align",
            ".align",
            "#align"
        ],
        "js": [
            "align.js",
            "align.theme.js",
            "align.min.js",
            "theme-align.js",
            "align.js",
            "window.Align",
            "align-scripts"
        ],
        "html": [
            "\"Align\"",
            "\"theme_name\":\"Align\"",
            "align-theme",
            "data-align",
            "class=\"align\"",
            "data-theme-name=\"Align\"",
            "theme-align",
            "id=\"align\""
        ],
        "paths": [
            "/assets/align",
            "/assets/align",
            "/t/align/assets/",
            "/cdn/shop/t/align/assets/",
            "/align/assets/",
            "/assets/theme-align"
        ]
    },
    "Amber": {
        "css": [
            "amber-theme",
            "amber__",
            "amber-",
            "amber-header",
            "amber",
            "amber",
            "theme-amber",
            ".amber",
            "#amber"
        ],
        "js": [
            "amber.js",
            "amber.theme.js",
            "amber.min.js",
            "theme-amber.js",
            "amber.js",
            "window.Amber",
            "amber-scripts"
        ],
        "html": [
            "\"Amber\"",
            "\"theme_name\":\"Amber\"",
            "amber-theme",
            "data-amber",
            "class=\"amber\"",
            "data-theme-name=\"Amber\"",
            "theme-amber",
            "id=\"amber\""
        ],
        "paths": [
            "/assets/amber",
            "/assets/amber",
            "/t/amber/assets/",
            "/cdn/shop/t/amber/assets/",
            "/amber/assets/",
            "/assets/theme-amber"
        ]
    },
    "Andaman": {
        "css": [
            "andaman-theme",
            "andaman__",
            "andaman-",
            "andaman-header",
            "andaman",
            "andaman",
            "theme-andaman",
            ".andaman",
            "#andaman"
        ],
        "js": [
            "andaman.js",
            "andaman.theme.js",
            "andaman.min.js",
            "theme-andaman.js",
            "andaman.js",
            "window.Andaman",
            "andaman-scripts"
        ],
        "html": [
            "\"Andaman\"",
            "\"theme_name\":\"Andaman\"",
            "andaman-theme",
            "data-andaman",
            "class=\"andaman\"",
            "data-theme-name=\"Andaman\"",
            "theme-andaman",
            "id=\"andaman\""
        ],
        "paths": [
            "/assets/andaman",
            "/assets/andaman",
            "/t/andaman/assets/",
            "/cdn/shop/t/andaman/assets/",
            "/andaman/assets/",
            "/assets/theme-andaman"
        ]
    },
    "Area": {
        "css": [
            "area-theme",
            "area__",
            "area-",
            "area-header",
            "area",
            "area",
            "theme-area",
            ".area",
            "#area"
        ],
        "js": [
            "area.js",
            "area.theme.js",
            "area.min.js",
            "theme-area.js",
            "area.js",
            "window.Area",
            "area-scripts"
        ],
        "html": [
            "\"Area\"",
            "\"theme_name\":\"Area\"",
            "area-theme",
            "data-area",
            "class=\"area\"",
            "data-theme-name=\"Area\"",
            "theme-area",
            "id=\"area\""
        ],
        "paths": [
            "/assets/area",
            "/assets/area",
            "/t/area/assets/",
            "/cdn/shop/t/area/assets/",
            "/area/assets/",
            "/assets/theme-area"
        ]
    },
    "Artisan": {
        "css": [
            "artisan-theme",
            "artisan__",
            "artisan-",
            "artisan-header",
            "artisan",
            "artisan",
            "theme-artisan",
            ".artisan",
            "#artisan"
        ],
        "js": [
            "artisan.js",
            "artisan.theme.js",
            "artisan.min.js",
            "theme-artisan.js",
            "artisan.js",
            "window.Artisan",
            "artisan-scripts"
        ],
        "html": [
            "\"Artisan\"",
            "\"theme_name\":\"Artisan\"",
            "artisan-theme",
            "data-artisan",
            "class=\"artisan\"",
            "data-theme-name=\"Artisan\"",
            "theme-artisan",
            "id=\"artisan\""
        ],
        "paths": [
            "/assets/artisan",
            "/assets/artisan",
            "/t/artisan/assets/",
            "/cdn/shop/t/artisan/assets/",
            "/artisan/assets/",
            "/assets/theme-artisan"
        ]
    },
    "Artist": {
        "css": [
            "artist-theme",
            "artist__",
            "artist-",
            "artist-header",
            "artist",
            "artist",
            "theme-artist",
            ".artist",
            "#artist"
        ],
        "js": [
            "artist.js",
            "artist.theme.js",
            "artist.min.js",
            "theme-artist.js",
            "artist.js",
            "window.Artist",
            "artist-scripts"
        ],
        "html": [
            "\"Artist\"",
            "\"theme_name\":\"Artist\"",
            "artist-theme",
            "data-artist",
            "class=\"artist\"",
            "data-theme-name=\"Artist\"",
            "theme-artist",
            "id=\"artist\""
        ],
        "paths": [
            "/assets/artist",
            "/assets/artist",
            "/t/artist/assets/",
            "/cdn/shop/t/artist/assets/",
            "/artist/assets/",
            "/assets/theme-artist"
        ]
    },
    "Ascension": {
        "css": [
            "ascension-theme",
            "ascension__",
            "ascension-",
            "ascension-header",
            "ascension",
            "ascension",
            "theme-ascension",
            ".ascension",
            "#ascension"
        ],
        "js": [
            "ascension.js",
            "ascension.theme.js",
            "ascension.min.js",
            "theme-ascension.js",
            "ascension.js",
            "window.Ascension",
            "ascension-scripts"
        ],
        "html": [
            "\"Ascension\"",
            "\"theme_name\":\"Ascension\"",
            "ascension-theme",
            "data-ascension",
            "class=\"ascension\"",
            "data-theme-name=\"Ascension\"",
            "theme-ascension",
            "id=\"ascension\""
        ],
        "paths": [
            "/assets/ascension",
            "/assets/ascension",
            "/t/ascension/assets/",
            "/cdn/shop/t/ascension/assets/",
            "/ascension/assets/",
            "/assets/theme-ascension"
        ]
    },
    "Ascent": {
        "css": [
            "ascent-theme",
            "ascent__",
            "ascent-",
            "ascent-header",
            "ascent",
            "ascent",
            "theme-ascent",
            ".ascent",
            "#ascent"
        ],
        "js": [
            "ascent.js",
            "ascent.theme.js",
            "ascent.min.js",
            "theme-ascent.js",
            "ascent.js",
            "window.Ascent",
            "ascent-scripts"
        ],
        "html": [
            "\"Ascent\"",
            "\"theme_name\":\"Ascent\"",
            "ascent-theme",
            "data-ascent",
            "class=\"ascent\"",
            "data-theme-name=\"Ascent\"",
            "theme-ascent",
            "id=\"ascent\""
        ],
        "paths": [
            "/assets/ascent",
            "/assets/ascent",
            "/t/ascent/assets/",
            "/cdn/shop/t/ascent/assets/",
            "/ascent/assets/",
            "/assets/theme-ascent"
        ]
    },
    "Atelier": {
        "css": [
            "atelier-theme",
            "atelier__",
            "atelier-",
            "atelier-header",
            "atelier",
            "atelier",
            "theme-atelier",
            ".atelier",
            "#atelier"
        ],
        "js": [
            "atelier.js",
            "atelier.theme.js",
            "atelier.min.js",
            "theme-atelier.js",
            "atelier.js",
            "window.Atelier",
            "atelier-scripts"
        ],
        "html": [
            "\"Atelier\"",
            "\"theme_name\":\"Atelier\"",
            "atelier-theme",
            "data-atelier",
            "class=\"atelier\"",
            "data-theme-name=\"Atelier\"",
            "theme-atelier",
            "id=\"atelier\""
        ],
        "paths": [
            "/assets/atelier",
            "/assets/atelier",
            "/t/atelier/assets/",
            "/cdn/shop/t/atelier/assets/",
            "/atelier/assets/",
            "/assets/theme-atelier"
        ]
    },
    "Athens": {
        "css": [
            "athens-theme",
            "athens__",
            "athens-",
            "athens-header",
            "athens",
            "athens",
            "theme-athens",
            ".athens",
            "#athens"
        ],
        "js": [
            "athens.js",
            "athens.theme.js",
            "athens.min.js",
            "theme-athens.js",
            "athens.js",
            "window.Athens",
            "athens-scripts"
        ],
        "html": [
            "\"Athens\"",
            "\"theme_name\":\"Athens\"",
            "athens-theme",
            "data-athens",
            "class=\"athens\"",
            "data-theme-name=\"Athens\"",
            "theme-athens",
            "id=\"athens\""
        ],
        "paths": [
            "/assets/athens",
            "/assets/athens",
            "/t/athens/assets/",
            "/cdn/shop/t/athens/assets/",
            "/athens/assets/",
            "/assets/theme-athens"
        ]
    },
    "Atlantic": {
        "css": [
            "atlantic-theme",
            "atlantic__",
            "atlantic-",
            "atlantic-header",
            "atlantic",
            "atlantic",
            "theme-atlantic",
            ".atlantic",
            "#atlantic"
        ],
        "js": [
            "atlantic.js",
            "atlantic.theme.js",
            "atlantic.min.js",
            "theme-atlantic.js",
            "atlantic.js",
            "window.Atlantic",
            "atlantic-scripts"
        ],
        "html": [
            "\"Atlantic\"",
            "\"theme_name\":\"Atlantic\"",
            "atlantic-theme",
            "data-atlantic",
            "class=\"atlantic\"",
            "data-theme-name=\"Atlantic\"",
            "theme-atlantic",
            "id=\"atlantic\""
        ],
        "paths": [
            "/assets/atlantic",
            "/assets/atlantic",
            "/t/atlantic/assets/",
            "/cdn/shop/t/atlantic/assets/",
            "/atlantic/assets/",
            "/assets/theme-atlantic"
        ]
    },
    "Atom": {
        "css": [
            "atom-theme",
            "atom__",
            "atom-",
            "atom-header",
            "atom",
            "atom",
            "theme-atom",
            ".atom",
            "#atom"
        ],
        "js": [
            "atom.js",
            "atom.theme.js",
            "atom.min.js",
            "theme-atom.js",
            "atom.js",
            "window.Atom",
            "atom-scripts"
        ],
        "html": [
            "\"Atom\"",
            "\"theme_name\":\"Atom\"",
            "atom-theme",
            "data-atom",
            "class=\"atom\"",
            "data-theme-name=\"Atom\"",
            "theme-atom",
            "id=\"atom\""
        ],
        "paths": [
            "/assets/atom",
            "/assets/atom",
            "/t/atom/assets/",
            "/cdn/shop/t/atom/assets/",
            "/atom/assets/",
            "/assets/theme-atom"
        ]
    },
    "Aurora": {
        "css": [
            "aurora-theme",
            "aurora__",
            "aurora-",
            "aurora-header",
            "aurora",
            "aurora",
            "theme-aurora",
            ".aurora",
            "#aurora"
        ],
        "js": [
            "aurora.js",
            "aurora.theme.js",
            "aurora.min.js",
            "theme-aurora.js",
            "aurora.js",
            "window.Aurora",
            "aurora-scripts"
        ],
        "html": [
            "\"Aurora\"",
            "\"theme_name\":\"Aurora\"",
            "aurora-theme",
            "data-aurora",
            "class=\"aurora\"",
            "data-theme-name=\"Aurora\"",
            "theme-aurora",
            "id=\"aurora\""
        ],
        "paths": [
            "/assets/aurora",
            "/assets/aurora",
            "/t/aurora/assets/",
            "/cdn/shop/t/aurora/assets/",
            "/aurora/assets/",
            "/assets/theme-aurora"
        ]
    },
    "Automation": {
        "css": [
            "automation-theme",
            "automation__",
            "automation-",
            "automation-header",
            "automation",
            "automation",
            "theme-automation",
            ".automation",
            "#automation"
        ],
        "js": [
            "automation.js",
            "automation.theme.js",
            "automation.min.js",
            "theme-automation.js",
            "automation.js",
            "window.Automation",
            "automation-scripts"
        ],
        "html": [
            "\"Automation\"",
            "\"theme_name\":\"Automation\"",
            "automation-theme",
            "data-automation",
            "class=\"automation\"",
            "data-theme-name=\"Automation\"",
            "theme-automation",
            "id=\"automation\""
        ],
        "paths": [
            "/assets/automation",
            "/assets/automation",
            "/t/automation/assets/",
            "/cdn/shop/t/automation/assets/",
            "/automation/assets/",
            "/assets/theme-automation"
        ]
    },
    "Avante": {
        "css": [
            "avante-theme",
            "avante__",
            "avante-",
            "avante-header",
            "avante",
            "avante",
            "theme-avante",
            ".avante",
            "#avante"
        ],
        "js": [
            "avante.js",
            "avante.theme.js",
            "avante.min.js",
            "theme-avante.js",
            "avante.js",
            "window.Avante",
            "avante-scripts"
        ],
        "html": [
            "\"Avante\"",
            "\"theme_name\":\"Avante\"",
            "avante-theme",
            "data-avante",
            "class=\"avante\"",
            "data-theme-name=\"Avante\"",
            "theme-avante",
            "id=\"avante\""
        ],
        "paths": [
            "/assets/avante",
            "/assets/avante",
            "/t/avante/assets/",
            "/cdn/shop/t/avante/assets/",
            "/avante/assets/",
            "/assets/theme-avante"
        ]
    },
    "Avatar": {
        "css": [
            "avatar-theme",
            "avatar__",
            "avatar-",
            "avatar-header",
            "avatar",
            "avatar",
            "theme-avatar",
            ".avatar",
            "#avatar"
        ],
        "js": [
            "avatar.js",
            "avatar.theme.js",
            "avatar.min.js",
            "theme-avatar.js",
            "avatar.js",
            "window.Avatar",
            "avatar-scripts"
        ],
        "html": [
            "\"Avatar\"",
            "\"theme_name\":\"Avatar\"",
            "avatar-theme",
            "data-avatar",
            "class=\"avatar\"",
            "data-theme-name=\"Avatar\"",
            "theme-avatar",
            "id=\"avatar\""
        ],
        "paths": [
            "/assets/avatar",
            "/assets/avatar",
            "/t/avatar/assets/",
            "/cdn/shop/t/avatar/assets/",
            "/avatar/assets/",
            "/assets/theme-avatar"
        ]
    },
    "Avenue": {
        "css": [
            "avenue-theme",
            "avenue__",
            "avenue-",
            "avenue-header",
            "avenue",
            "avenue",
            "theme-avenue",
            ".avenue",
            "#avenue"
        ],
        "js": [
            "avenue.js",
            "avenue.theme.js",
            "avenue.min.js",
            "theme-avenue.js",
            "avenue.js",
            "window.Avenue",
            "avenue-scripts"
        ],
        "html": [
            "\"Avenue\"",
            "\"theme_name\":\"Avenue\"",
            "avenue-theme",
            "data-avenue",
            "class=\"avenue\"",
            "data-theme-name=\"Avenue\"",
            "theme-avenue",
            "id=\"avenue\""
        ],
        "paths": [
            "/assets/avenue",
            "/assets/avenue",
            "/t/avenue/assets/",
            "/cdn/shop/t/avenue/assets/",
            "/avenue/assets/",
            "/assets/theme-avenue"
        ]
    },
    "Azzel": {
        "css": [
            "azzel-theme",
            "azzel__",
            "azzel-",
            "azzel-header",
            "azzel",
            "azzel",
            "theme-azzel",
            ".azzel",
            "#azzel"
        ],
        "js": [
            "azzel.js",
            "azzel.theme.js",
            "azzel.min.js",
            "theme-azzel.js",
            "azzel.js",
            "window.Azzel",
            "azzel-scripts"
        ],
        "html": [
            "\"Azzel\"",
            "\"theme_name\":\"Azzel\"",
            "azzel-theme",
            "data-azzel",
            "class=\"azzel\"",
            "data-theme-name=\"Azzel\"",
            "theme-azzel",
            "id=\"azzel\""
        ],
        "paths": [
            "/assets/azzel",
            "/assets/azzel",
            "/t/azzel/assets/",
            "/cdn/shop/t/azzel/assets/",
            "/azzel/assets/",
            "/assets/theme-azzel"
        ]
    },
    "Banjo": {
        "css": [
            "banjo-theme",
            "banjo__",
            "banjo-",
            "banjo-header",
            "banjo",
            "banjo",
            "theme-banjo",
            ".banjo",
            "#banjo"
        ],
        "js": [
            "banjo.js",
            "banjo.theme.js",
            "banjo.min.js",
            "theme-banjo.js",
            "banjo.js",
            "window.Banjo",
            "banjo-scripts"
        ],
        "html": [
            "\"Banjo\"",
            "\"theme_name\":\"Banjo\"",
            "banjo-theme",
            "data-banjo",
            "class=\"banjo\"",
            "data-theme-name=\"Banjo\"",
            "theme-banjo",
            "id=\"banjo\""
        ],
        "paths": [
            "/assets/banjo",
            "/assets/banjo",
            "/t/banjo/assets/",
            "/cdn/shop/t/banjo/assets/",
            "/banjo/assets/",
            "/assets/theme-banjo"
        ]
    },
    "Barcelona": {
        "css": [
            "barcelona-theme",
            "barcelona__",
            "barcelona-",
            "barcelona-header",
            "barcelona",
            "barcelona",
            "theme-barcelona",
            ".barcelona",
            "#barcelona"
        ],
        "js": [
            "barcelona.js",
            "barcelona.theme.js",
            "barcelona.min.js",
            "theme-barcelona.js",
            "barcelona.js",
            "window.Barcelona",
            "barcelona-scripts"
        ],
        "html": [
            "\"Barcelona\"",
            "\"theme_name\":\"Barcelona\"",
            "barcelona-theme",
            "data-barcelona",
            "class=\"barcelona\"",
            "data-theme-name=\"Barcelona\"",
            "theme-barcelona",
            "id=\"barcelona\""
        ],
        "paths": [
            "/assets/barcelona",
            "/assets/barcelona",
            "/t/barcelona/assets/",
            "/cdn/shop/t/barcelona/assets/",
            "/barcelona/assets/",
            "/assets/theme-barcelona"
        ]
    },
    "Baseline": {
        "css": [
            "baseline-theme",
            "baseline__",
            "baseline-",
            "baseline-header",
            "baseline",
            "baseline",
            "theme-baseline",
            ".baseline",
            "#baseline"
        ],
        "js": [
            "baseline.js",
            "baseline.theme.js",
            "baseline.min.js",
            "theme-baseline.js",
            "baseline.js",
            "window.Baseline",
            "baseline-scripts"
        ],
        "html": [
            "\"Baseline\"",
            "\"theme_name\":\"Baseline\"",
            "baseline-theme",
            "data-baseline",
            "class=\"baseline\"",
            "data-theme-name=\"Baseline\"",
            "theme-baseline",
            "id=\"baseline\""
        ],
        "paths": [
            "/assets/baseline",
            "/assets/baseline",
            "/t/baseline/assets/",
            "/cdn/shop/t/baseline/assets/",
            "/baseline/assets/",
            "/assets/theme-baseline"
        ]
    },
    "Bazaar": {
        "css": [
            "bazaar-theme",
            "bazaar__",
            "bazaar-",
            "bazaar-header",
            "bazaar",
            "bazaar",
            "theme-bazaar",
            ".bazaar",
            "#bazaar"
        ],
        "js": [
            "bazaar.js",
            "bazaar.theme.js",
            "bazaar.min.js",
            "theme-bazaar.js",
            "bazaar.js",
            "window.Bazaar",
            "bazaar-scripts"
        ],
        "html": [
            "\"Bazaar\"",
            "\"theme_name\":\"Bazaar\"",
            "bazaar-theme",
            "data-bazaar",
            "class=\"bazaar\"",
            "data-theme-name=\"Bazaar\"",
            "theme-bazaar",
            "id=\"bazaar\""
        ],
        "paths": [
            "/assets/bazaar",
            "/assets/bazaar",
            "/t/bazaar/assets/",
            "/cdn/shop/t/bazaar/assets/",
            "/bazaar/assets/",
            "/assets/theme-bazaar"
        ]
    },
    "Be Yours": {
        "css": [
            "be yours-theme",
            "be yours__",
            "be yours-",
            "be yours-header",
            "be yours",
            "beyours",
            "theme-be yours",
            ".be yours",
            "#be yours"
        ],
        "js": [
            "be yours.js",
            "be yours.theme.js",
            "be yours.min.js",
            "theme-be yours.js",
            "beyours.js",
            "window.Be Yours",
            "be yours-scripts"
        ],
        "html": [
            "\"Be Yours\"",
            "\"theme_name\":\"Be Yours\"",
            "be yours-theme",
            "data-be yours",
            "class=\"be yours\"",
            "data-theme-name=\"Be Yours\"",
            "theme-be yours",
            "id=\"be yours\""
        ],
        "paths": [
            "/assets/be yours",
            "/assets/beyours",
            "/t/be yours/assets/",
            "/cdn/shop/t/be yours/assets/",
            "/be yours/assets/",
            "/assets/theme-be yours"
        ]
    },
    "Berlin": {
        "css": [
            "berlin-theme",
            "berlin__",
            "berlin-",
            "berlin-header",
            "berlin",
            "berlin",
            "theme-berlin",
            ".berlin",
            "#berlin"
        ],
        "js": [
            "berlin.js",
            "berlin.theme.js",
            "berlin.min.js",
            "theme-berlin.js",
            "berlin.js",
            "window.Berlin",
            "berlin-scripts"
        ],
        "html": [
            "\"Berlin\"",
            "\"theme_name\":\"Berlin\"",
            "berlin-theme",
            "data-berlin",
            "class=\"berlin\"",
            "data-theme-name=\"Berlin\"",
            "theme-berlin",
            "id=\"berlin\""
        ],
        "paths": [
            "/assets/berlin",
            "/assets/berlin",
            "/t/berlin/assets/",
            "/cdn/shop/t/berlin/assets/",
            "/berlin/assets/",
            "/assets/theme-berlin"
        ]
    },
    "Bespoke": {
        "css": [
            "bespoke-theme",
            "bespoke__",
            "bespoke-",
            "bespoke-header",
            "bespoke",
            "bespoke",
            "theme-bespoke",
            ".bespoke",
            "#bespoke"
        ],
        "js": [
            "bespoke.js",
            "bespoke.theme.js",
            "bespoke.min.js",
            "theme-bespoke.js",
            "bespoke.js",
            "window.Bespoke",
            "bespoke-scripts"
        ],
        "html": [
            "\"Bespoke\"",
            "\"theme_name\":\"Bespoke\"",
            "bespoke-theme",
            "data-bespoke",
            "class=\"bespoke\"",
            "data-theme-name=\"Bespoke\"",
            "theme-bespoke",
            "id=\"bespoke\""
        ],
        "paths": [
            "/assets/bespoke",
            "/assets/bespoke",
            "/t/bespoke/assets/",
            "/cdn/shop/t/bespoke/assets/",
            "/bespoke/assets/",
            "/assets/theme-bespoke"
        ]
    },
    "Beyond": {
        "css": [
            "beyond-theme",
            "beyond__",
            "beyond-",
            "beyond-header",
            "beyond",
            "beyond",
            "theme-beyond",
            ".beyond",
            "#beyond"
        ],
        "js": [
            "beyond.js",
            "beyond.theme.js",
            "beyond.min.js",
            "theme-beyond.js",
            "beyond.js",
            "window.Beyond",
            "beyond-scripts"
        ],
        "html": [
            "\"Beyond\"",
            "\"theme_name\":\"Beyond\"",
            "beyond-theme",
            "data-beyond",
            "class=\"beyond\"",
            "data-theme-name=\"Beyond\"",
            "theme-beyond",
            "id=\"beyond\""
        ],
        "paths": [
            "/assets/beyond",
            "/assets/beyond",
            "/t/beyond/assets/",
            "/cdn/shop/t/beyond/assets/",
            "/beyond/assets/",
            "/assets/theme-beyond"
        ]
    },
    "Blockshop": {
        "css": [
            "blockshop-theme",
            "blockshop__",
            "blockshop-",
            "blockshop-header",
            "blockshop",
            "blockshop",
            "theme-blockshop",
            ".blockshop",
            "#blockshop"
        ],
        "js": [
            "blockshop.js",
            "blockshop.theme.js",
            "blockshop.min.js",
            "theme-blockshop.js",
            "blockshop.js",
            "window.Blockshop",
            "blockshop-scripts"
        ],
        "html": [
            "\"Blockshop\"",
            "\"theme_name\":\"Blockshop\"",
            "blockshop-theme",
            "data-blockshop",
            "class=\"blockshop\"",
            "data-theme-name=\"Blockshop\"",
            "theme-blockshop",
            "id=\"blockshop\""
        ],
        "paths": [
            "/assets/blockshop",
            "/assets/blockshop",
            "/t/blockshop/assets/",
            "/cdn/shop/t/blockshop/assets/",
            "/blockshop/assets/",
            "/assets/theme-blockshop"
        ]
    },
    "Blum": {
        "css": [
            "blum-theme",
            "blum__",
            "blum-",
            "blum-header",
            "blum",
            "blum",
            "theme-blum",
            ".blum",
            "#blum"
        ],
        "js": [
            "blum.js",
            "blum.theme.js",
            "blum.min.js",
            "theme-blum.js",
            "blum.js",
            "window.Blum",
            "blum-scripts"
        ],
        "html": [
            "\"Blum\"",
            "\"theme_name\":\"Blum\"",
            "blum-theme",
            "data-blum",
            "class=\"blum\"",
            "data-theme-name=\"Blum\"",
            "theme-blum",
            "id=\"blum\""
        ],
        "paths": [
            "/assets/blum",
            "/assets/blum",
            "/t/blum/assets/",
            "/cdn/shop/t/blum/assets/",
            "/blum/assets/",
            "/assets/theme-blum"
        ]
    },
    "Boost": {
        "css": [
            "boost-theme",
            "boost__",
            "boost-",
            "boost-header",
            "boost",
            "boost",
            "theme-boost",
            ".boost",
            "#boost"
        ],
        "js": [
            "boost.js",
            "boost.theme.js",
            "boost.min.js",
            "theme-boost.js",
            "boost.js",
            "window.Boost",
            "boost-scripts"
        ],
        "html": [
            "\"Boost\"",
            "\"theme_name\":\"Boost\"",
            "boost-theme",
            "data-boost",
            "class=\"boost\"",
            "data-theme-name=\"Boost\"",
            "theme-boost",
            "id=\"boost\""
        ],
        "paths": [
            "/assets/boost",
            "/assets/boost",
            "/t/boost/assets/",
            "/cdn/shop/t/boost/assets/",
            "/boost/assets/",
            "/assets/theme-boost"
        ]
    },
    "Borders": {
        "css": [
            "borders-theme",
            "borders__",
            "borders-",
            "borders-header",
            "borders",
            "borders",
            "theme-borders",
            ".borders",
            "#borders"
        ],
        "js": [
            "borders.js",
            "borders.theme.js",
            "borders.min.js",
            "theme-borders.js",
            "borders.js",
            "window.Borders",
            "borders-scripts"
        ],
        "html": [
            "\"Borders\"",
            "\"theme_name\":\"Borders\"",
            "borders-theme",
            "data-borders",
            "class=\"borders\"",
            "data-theme-name=\"Borders\"",
            "theme-borders",
            "id=\"borders\""
        ],
        "paths": [
            "/assets/borders",
            "/assets/borders",
            "/t/borders/assets/",
            "/cdn/shop/t/borders/assets/",
            "/borders/assets/",
            "/assets/theme-borders"
        ]
    },
    "Boundless": {
        "css": [
            "boundless-theme",
            "boundless__",
            "boundless-",
            "boundless-header",
            "boundless",
            "boundless",
            "theme-boundless",
            ".boundless",
            "#boundless"
        ],
        "js": [
            "boundless.js",
            "boundless.theme.js",
            "boundless.min.js",
            "theme-boundless.js",
            "boundless.js",
            "window.Boundless",
            "boundless-scripts"
        ],
        "html": [
            "\"Boundless\"",
            "\"theme_name\":\"Boundless\"",
            "boundless-theme",
            "data-boundless",
            "class=\"boundless\"",
            "data-theme-name=\"Boundless\"",
            "theme-boundless",
            "id=\"boundless\""
        ],
        "paths": [
            "/assets/boundless",
            "/assets/boundless",
            "/t/boundless/assets/",
            "/cdn/shop/t/boundless/assets/",
            "/boundless/assets/",
            "/assets/theme-boundless"
        ]
    },
    "Boutique": {
        "css": [
            "boutique-theme",
            "boutique__",
            "boutique-",
            "boutique-header",
            "boutique",
            "boutique",
            "theme-boutique",
            ".boutique",
            "#boutique"
        ],
        "js": [
            "boutique.js",
            "boutique.theme.js",
            "boutique.min.js",
            "theme-boutique.js",
            "boutique.js",
            "window.Boutique",
            "boutique-scripts"
        ],
        "html": [
            "\"Boutique\"",
            "\"theme_name\":\"Boutique\"",
            "boutique-theme",
            "data-boutique",
            "class=\"boutique\"",
            "data-theme-name=\"Boutique\"",
            "theme-boutique",
            "id=\"boutique\""
        ],
        "paths": [
            "/assets/boutique",
            "/assets/boutique",
            "/t/boutique/assets/",
            "/cdn/shop/t/boutique/assets/",
            "/boutique/assets/",
            "/assets/theme-boutique"
        ]
    },
    "Brava": {
        "css": [
            "brava-theme",
            "brava__",
            "brava-",
            "brava-header",
            "brava",
            "brava",
            "theme-brava",
            ".brava",
            "#brava"
        ],
        "js": [
            "brava.js",
            "brava.theme.js",
            "brava.min.js",
            "theme-brava.js",
            "brava.js",
            "window.Brava",
            "brava-scripts"
        ],
        "html": [
            "\"Brava\"",
            "\"theme_name\":\"Brava\"",
            "brava-theme",
            "data-brava",
            "class=\"brava\"",
            "data-theme-name=\"Brava\"",
            "theme-brava",
            "id=\"brava\""
        ],
        "paths": [
            "/assets/brava",
            "/assets/brava",
            "/t/brava/assets/",
            "/cdn/shop/t/brava/assets/",
            "/brava/assets/",
            "/assets/theme-brava"
        ]
    },
    "Broadcast": {
        "css": [
            "broadcast-theme",
            "broadcast__",
            "broadcast-",
            "broadcast-header",
            "broadcast",
            "broadcast",
            "theme-broadcast",
            ".broadcast",
            "#broadcast"
        ],
        "js": [
            "broadcast.js",
            "broadcast.theme.js",
            "broadcast.min.js",
            "theme-broadcast.js",
            "broadcast.js",
            "window.Broadcast",
            "broadcast-scripts"
        ],
        "html": [
            "\"Broadcast\"",
            "\"theme_name\":\"Broadcast\"",
            "broadcast-theme",
            "data-broadcast",
            "class=\"broadcast\"",
            "data-theme-name=\"Broadcast\"",
            "theme-broadcast",
            "id=\"broadcast\""
        ],
        "paths": [
            "/assets/broadcast",
            "/assets/broadcast",
            "/t/broadcast/assets/",
            "/cdn/shop/t/broadcast/assets/",
            "/broadcast/assets/",
            "/assets/theme-broadcast"
        ]
    },
    "Brooklyn": {
        "css": [
            "brooklyn-theme",
            "brooklyn__",
            "brooklyn-",
            "brooklyn-header",
            "brooklyn",
            "brooklyn",
            "theme-brooklyn",
            ".brooklyn",
            "#brooklyn"
        ],
        "js": [
            "brooklyn.js",
            "brooklyn.theme.js",
            "brooklyn.min.js",
            "theme-brooklyn.js",
            "brooklyn.js",
            "window.Brooklyn",
            "brooklyn-scripts"
        ],
        "html": [
            "\"Brooklyn\"",
            "\"theme_name\":\"Brooklyn\"",
            "brooklyn-theme",
            "data-brooklyn",
            "class=\"brooklyn\"",
            "data-theme-name=\"Brooklyn\"",
            "theme-brooklyn",
            "id=\"brooklyn\""
        ],
        "paths": [
            "/assets/brooklyn",
            "/assets/brooklyn",
            "/t/brooklyn/assets/",
            "/cdn/shop/t/brooklyn/assets/",
            "/brooklyn/assets/",
            "/assets/theme-brooklyn"
        ]
    },
    "Bullet": {
        "css": [
            "bullet-theme",
            "bullet__",
            "bullet-",
            "bullet-header",
            "bullet",
            "bullet",
            "theme-bullet",
            ".bullet",
            "#bullet"
        ],
        "js": [
            "bullet.js",
            "bullet.theme.js",
            "bullet.min.js",
            "theme-bullet.js",
            "bullet.js",
            "window.Bullet",
            "bullet-scripts"
        ],
        "html": [
            "\"Bullet\"",
            "\"theme_name\":\"Bullet\"",
            "bullet-theme",
            "data-bullet",
            "class=\"bullet\"",
            "data-theme-name=\"Bullet\"",
            "theme-bullet",
            "id=\"bullet\""
        ],
        "paths": [
            "/assets/bullet",
            "/assets/bullet",
            "/t/bullet/assets/",
            "/cdn/shop/t/bullet/assets/",
            "/bullet/assets/",
            "/assets/theme-bullet"
        ]
    },
    "California": {
        "css": [
            "california-theme",
            "california__",
            "california-",
            "california-header",
            "california",
            "california",
            "theme-california",
            ".california",
            "#california"
        ],
        "js": [
            "california.js",
            "california.theme.js",
            "california.min.js",
            "theme-california.js",
            "california.js",
            "window.California",
            "california-scripts"
        ],
        "html": [
            "\"California\"",
            "\"theme_name\":\"California\"",
            "california-theme",
            "data-california",
            "class=\"california\"",
            "data-theme-name=\"California\"",
            "theme-california",
            "id=\"california\""
        ],
        "paths": [
            "/assets/california",
            "/assets/california",
            "/t/california/assets/",
            "/cdn/shop/t/california/assets/",
            "/california/assets/",
            "/assets/theme-california"
        ]
    },
    "Cama": {
        "css": [
            "cama-theme",
            "cama__",
            "cama-",
            "cama-header",
            "cama",
            "cama",
            "theme-cama",
            ".cama",
            "#cama"
        ],
        "js": [
            "cama.js",
            "cama.theme.js",
            "cama.min.js",
            "theme-cama.js",
            "cama.js",
            "window.Cama",
            "cama-scripts"
        ],
        "html": [
            "\"Cama\"",
            "\"theme_name\":\"Cama\"",
            "cama-theme",
            "data-cama",
            "class=\"cama\"",
            "data-theme-name=\"Cama\"",
            "theme-cama",
            "id=\"cama\""
        ],
        "paths": [
            "/assets/cama",
            "/assets/cama",
            "/t/cama/assets/",
            "/cdn/shop/t/cama/assets/",
            "/cama/assets/",
            "/assets/theme-cama"
        ]
    },
    "Canopy": {
        "css": [
            "canopy-theme",
            "canopy__",
            "canopy-",
            "canopy-header",
            "canopy",
            "canopy",
            "theme-canopy",
            ".canopy",
            "#canopy"
        ],
        "js": [
            "canopy.js",
            "canopy.theme.js",
            "canopy.min.js",
            "theme-canopy.js",
            "canopy.js",
            "window.Canopy",
            "canopy-scripts"
        ],
        "html": [
            "\"Canopy\"",
            "\"theme_name\":\"Canopy\"",
            "canopy-theme",
            "data-canopy",
            "class=\"canopy\"",
            "data-theme-name=\"Canopy\"",
            "theme-canopy",
            "id=\"canopy\""
        ],
        "paths": [
            "/assets/canopy",
            "/assets/canopy",
            "/t/canopy/assets/",
            "/cdn/shop/t/canopy/assets/",
            "/canopy/assets/",
            "/assets/theme-canopy"
        ]
    },
    "Capital": {
        "css": [
            "capital-theme",
            "capital__",
            "capital-",
            "capital-header",
            "capital",
            "capital",
            "theme-capital",
            ".capital",
            "#capital"
        ],
        "js": [
            "capital.js",
            "capital.theme.js",
            "capital.min.js",
            "theme-capital.js",
            "capital.js",
            "window.Capital",
            "capital-scripts"
        ],
        "html": [
            "\"Capital\"",
            "\"theme_name\":\"Capital\"",
            "capital-theme",
            "data-capital",
            "class=\"capital\"",
            "data-theme-name=\"Capital\"",
            "theme-capital",
            "id=\"capital\""
        ],
        "paths": [
            "/assets/capital",
            "/assets/capital",
            "/t/capital/assets/",
            "/cdn/shop/t/capital/assets/",
            "/capital/assets/",
            "/assets/theme-capital"
        ]
    },
    "Carbon": {
        "css": [
            "carbon-theme",
            "carbon__",
            "carbon-",
            "carbon-header",
            "carbon",
            "carbon",
            "theme-carbon",
            ".carbon",
            "#carbon"
        ],
        "js": [
            "carbon.js",
            "carbon.theme.js",
            "carbon.min.js",
            "theme-carbon.js",
            "carbon.js",
            "window.Carbon",
            "carbon-scripts"
        ],
        "html": [
            "\"Carbon\"",
            "\"theme_name\":\"Carbon\"",
            "carbon-theme",
            "data-carbon",
            "class=\"carbon\"",
            "data-theme-name=\"Carbon\"",
            "theme-carbon",
            "id=\"carbon\""
        ],
        "paths": [
            "/assets/carbon",
            "/assets/carbon",
            "/t/carbon/assets/",
            "/cdn/shop/t/carbon/assets/",
            "/carbon/assets/",
            "/assets/theme-carbon"
        ]
    },
    "Cascade": {
        "css": [
            "cascade-theme",
            "cascade__",
            "cascade-",
            "cascade-header",
            "cascade",
            "cascade",
            "theme-cascade",
            ".cascade",
            "#cascade"
        ],
        "js": [
            "cascade.js",
            "cascade.theme.js",
            "cascade.min.js",
            "theme-cascade.js",
            "cascade.js",
            "window.Cascade",
            "cascade-scripts"
        ],
        "html": [
            "\"Cascade\"",
            "\"theme_name\":\"Cascade\"",
            "cascade-theme",
            "data-cascade",
            "class=\"cascade\"",
            "data-theme-name=\"Cascade\"",
            "theme-cascade",
            "id=\"cascade\""
        ],
        "paths": [
            "/assets/cascade",
            "/assets/cascade",
            "/t/cascade/assets/",
            "/cdn/shop/t/cascade/assets/",
            "/cascade/assets/",
            "/assets/theme-cascade"
        ]
    },
    "Cello": {
        "css": [
            "cello-theme",
            "cello__",
            "cello-",
            "cello-header",
            "cello",
            "cello",
            "theme-cello",
            ".cello",
            "#cello"
        ],
        "js": [
            "cello.js",
            "cello.theme.js",
            "cello.min.js",
            "theme-cello.js",
            "cello.js",
            "window.Cello",
            "cello-scripts"
        ],
        "html": [
            "\"Cello\"",
            "\"theme_name\":\"Cello\"",
            "cello-theme",
            "data-cello",
            "class=\"cello\"",
            "data-theme-name=\"Cello\"",
            "theme-cello",
            "id=\"cello\""
        ],
        "paths": [
            "/assets/cello",
            "/assets/cello",
            "/t/cello/assets/",
            "/cdn/shop/t/cello/assets/",
            "/cello/assets/",
            "/assets/theme-cello"
        ]
    },
    "Champion": {
        "css": [
            "champion-theme",
            "champion__",
            "champion-",
            "champion-header",
            "champion",
            "champion",
            "theme-champion",
            ".champion",
            "#champion"
        ],
        "js": [
            "champion.js",
            "champion.theme.js",
            "champion.min.js",
            "theme-champion.js",
            "champion.js",
            "window.Champion",
            "champion-scripts"
        ],
        "html": [
            "\"Champion\"",
            "\"theme_name\":\"Champion\"",
            "champion-theme",
            "data-champion",
            "class=\"champion\"",
            "data-theme-name=\"Champion\"",
            "theme-champion",
            "id=\"champion\""
        ],
        "paths": [
            "/assets/champion",
            "/assets/champion",
            "/t/champion/assets/",
            "/cdn/shop/t/champion/assets/",
            "/champion/assets/",
            "/assets/theme-champion"
        ]
    },
    "Charge": {
        "css": [
            "charge-theme",
            "charge__",
            "charge-",
            "charge-header",
            "charge",
            "charge",
            "theme-charge",
            ".charge",
            "#charge"
        ],
        "js": [
            "charge.js",
            "charge.theme.js",
            "charge.min.js",
            "theme-charge.js",
            "charge.js",
            "window.Charge",
            "charge-scripts"
        ],
        "html": [
            "\"Charge\"",
            "\"theme_name\":\"Charge\"",
            "charge-theme",
            "data-charge",
            "class=\"charge\"",
            "data-theme-name=\"Charge\"",
            "theme-charge",
            "id=\"charge\""
        ],
        "paths": [
            "/assets/charge",
            "/assets/charge",
            "/t/charge/assets/",
            "/cdn/shop/t/charge/assets/",
            "/charge/assets/",
            "/assets/theme-charge"
        ]
    },
    "Charm": {
        "css": [
            "charm-theme",
            "charm__",
            "charm-",
            "charm-header",
            "charm",
            "charm",
            "theme-charm",
            ".charm",
            "#charm"
        ],
        "js": [
            "charm.js",
            "charm.theme.js",
            "charm.min.js",
            "theme-charm.js",
            "charm.js",
            "window.Charm",
            "charm-scripts"
        ],
        "html": [
            "\"Charm\"",
            "\"theme_name\":\"Charm\"",
            "charm-theme",
            "data-charm",
            "class=\"charm\"",
            "data-theme-name=\"Charm\"",
            "theme-charm",
            "id=\"charm\""
        ],
        "paths": [
            "/assets/charm",
            "/assets/charm",
            "/t/charm/assets/",
            "/cdn/shop/t/charm/assets/",
            "/charm/assets/",
            "/assets/theme-charm"
        ]
    },
    "Chord": {
        "css": [
            "chord-theme",
            "chord__",
            "chord-",
            "chord-header",
            "chord",
            "chord",
            "theme-chord",
            ".chord",
            "#chord"
        ],
        "js": [
            "chord.js",
            "chord.theme.js",
            "chord.min.js",
            "theme-chord.js",
            "chord.js",
            "window.Chord",
            "chord-scripts"
        ],
        "html": [
            "\"Chord\"",
            "\"theme_name\":\"Chord\"",
            "chord-theme",
            "data-chord",
            "class=\"chord\"",
            "data-theme-name=\"Chord\"",
            "theme-chord",
            "id=\"chord\""
        ],
        "paths": [
            "/assets/chord",
            "/assets/chord",
            "/t/chord/assets/",
            "/cdn/shop/t/chord/assets/",
            "/chord/assets/",
            "/assets/theme-chord"
        ]
    },
    "Colorblock": {
        "css": [
            "colorblock-theme",
            "colorblock__",
            "colorblock-",
            "colorblock-header",
            "colorblock",
            "colorblock",
            "theme-colorblock",
            ".colorblock",
            "#colorblock"
        ],
        "js": [
            "colorblock.js",
            "colorblock.theme.js",
            "colorblock.min.js",
            "theme-colorblock.js",
            "colorblock.js",
            "window.Colorblock",
            "colorblock-scripts"
        ],
        "html": [
            "\"Colorblock\"",
            "\"theme_name\":\"Colorblock\"",
            "colorblock-theme",
            "data-colorblock",
            "class=\"colorblock\"",
            "data-theme-name=\"Colorblock\"",
            "theme-colorblock",
            "id=\"colorblock\""
        ],
        "paths": [
            "/assets/colorblock",
            "/assets/colorblock",
            "/t/colorblock/assets/",
            "/cdn/shop/t/colorblock/assets/",
            "/colorblock/assets/",
            "/assets/theme-colorblock"
        ]
    },
    "Colors": {
        "css": [
            "colors-theme",
            "colors__",
            "colors-",
            "colors-header",
            "colors",
            "colors",
            "theme-colors",
            ".colors",
            "#colors"
        ],
        "js": [
            "colors.js",
            "colors.theme.js",
            "colors.min.js",
            "theme-colors.js",
            "colors.js",
            "window.Colors",
            "colors-scripts"
        ],
        "html": [
            "\"Colors\"",
            "\"theme_name\":\"Colors\"",
            "colors-theme",
            "data-colors",
            "class=\"colors\"",
            "data-theme-name=\"Colors\"",
            "theme-colors",
            "id=\"colors\""
        ],
        "paths": [
            "/assets/colors",
            "/assets/colors",
            "/t/colors/assets/",
            "/cdn/shop/t/colors/assets/",
            "/colors/assets/",
            "/assets/theme-colors"
        ]
    },
    "Combine": {
        "css": [
            "combine-theme",
            "combine__",
            "combine-",
            "combine-header",
            "combine",
            "combine",
            "theme-combine",
            ".combine",
            "#combine"
        ],
        "js": [
            "combine.js",
            "combine.theme.js",
            "combine.min.js",
            "theme-combine.js",
            "combine.js",
            "window.Combine",
            "combine-scripts"
        ],
        "html": [
            "\"Combine\"",
            "\"theme_name\":\"Combine\"",
            "combine-theme",
            "data-combine",
            "class=\"combine\"",
            "data-theme-name=\"Combine\"",
            "theme-combine",
            "id=\"combine\""
        ],
        "paths": [
            "/assets/combine",
            "/assets/combine",
            "/t/combine/assets/",
            "/cdn/shop/t/combine/assets/",
            "/combine/assets/",
            "/assets/theme-combine"
        ]
    },
    "Concept": {
        "css": [
            "concept-theme",
            "concept__",
            "concept-",
            "concept-header",
            "concept",
            "concept",
            "theme-concept",
            ".concept",
            "#concept"
        ],
        "js": [
            "concept.js",
            "concept.theme.js",
            "concept.min.js",
            "theme-concept.js",
            "concept.js",
            "window.Concept",
            "concept-scripts"
        ],
        "html": [
            "\"Concept\"",
            "\"theme_name\":\"Concept\"",
            "concept-theme",
            "data-concept",
            "class=\"concept\"",
            "data-theme-name=\"Concept\"",
            "theme-concept",
            "id=\"concept\""
        ],
        "paths": [
            "/assets/concept",
            "/assets/concept",
            "/t/concept/assets/",
            "/cdn/shop/t/concept/assets/",
            "/concept/assets/",
            "/assets/theme-concept"
        ]
    },
    "Context": {
        "css": [
            "context-theme",
            "context__",
            "context-",
            "context-header",
            "context",
            "context",
            "theme-context",
            ".context",
            "#context"
        ],
        "js": [
            "context.js",
            "context.theme.js",
            "context.min.js",
            "theme-context.js",
            "context.js",
            "window.Context",
            "context-scripts"
        ],
        "html": [
            "\"Context\"",
            "\"theme_name\":\"Context\"",
            "context-theme",
            "data-context",
            "class=\"context\"",
            "data-theme-name=\"Context\"",
            "theme-context",
            "id=\"context\""
        ],
        "paths": [
            "/assets/context",
            "/assets/context",
            "/t/context/assets/",
            "/cdn/shop/t/context/assets/",
            "/context/assets/",
            "/assets/theme-context"
        ]
    },
    "Copenhagen": {
        "css": [
            "copenhagen-theme",
            "copenhagen__",
            "copenhagen-",
            "copenhagen-header",
            "copenhagen",
            "copenhagen",
            "theme-copenhagen",
            ".copenhagen",
            "#copenhagen"
        ],
        "js": [
            "copenhagen.js",
            "copenhagen.theme.js",
            "copenhagen.min.js",
            "theme-copenhagen.js",
            "copenhagen.js",
            "window.Copenhagen",
            "copenhagen-scripts"
        ],
        "html": [
            "\"Copenhagen\"",
            "\"theme_name\":\"Copenhagen\"",
            "copenhagen-theme",
            "data-copenhagen",
            "class=\"copenhagen\"",
            "data-theme-name=\"Copenhagen\"",
            "theme-copenhagen",
            "id=\"copenhagen\""
        ],
        "paths": [
            "/assets/copenhagen",
            "/assets/copenhagen",
            "/t/copenhagen/assets/",
            "/cdn/shop/t/copenhagen/assets/",
            "/copenhagen/assets/",
            "/assets/theme-copenhagen"
        ]
    },
    "Cornerstone": {
        "css": [
            "cornerstone-theme",
            "cornerstone__",
            "cornerstone-",
            "cornerstone-header",
            "cornerstone",
            "cornerstone",
            "theme-cornerstone",
            ".cornerstone",
            "#cornerstone"
        ],
        "js": [
            "cornerstone.js",
            "cornerstone.theme.js",
            "cornerstone.min.js",
            "theme-cornerstone.js",
            "cornerstone.js",
            "window.Cornerstone",
            "cornerstone-scripts"
        ],
        "html": [
            "\"Cornerstone\"",
            "\"theme_name\":\"Cornerstone\"",
            "cornerstone-theme",
            "data-cornerstone",
            "class=\"cornerstone\"",
            "data-theme-name=\"Cornerstone\"",
            "theme-cornerstone",
            "id=\"cornerstone\""
        ],
        "paths": [
            "/assets/cornerstone",
            "/assets/cornerstone",
            "/t/cornerstone/assets/",
            "/cdn/shop/t/cornerstone/assets/",
            "/cornerstone/assets/",
            "/assets/theme-cornerstone"
        ]
    },
    "Craft": {
        "css": [
            "craft-theme",
            "craft__",
            "craft-",
            "craft-header",
            "craft",
            "craft",
            "theme-craft",
            ".craft",
            "#craft"
        ],
        "js": [
            "craft.js",
            "craft.theme.js",
            "craft.min.js",
            "theme-craft.js",
            "craft.js",
            "window.Craft",
            "craft-scripts"
        ],
        "html": [
            "\"Craft\"",
            "\"theme_name\":\"Craft\"",
            "craft-theme",
            "data-craft",
            "class=\"craft\"",
            "data-theme-name=\"Craft\"",
            "theme-craft",
            "id=\"craft\""
        ],
        "paths": [
            "/assets/craft",
            "/assets/craft",
            "/t/craft/assets/",
            "/cdn/shop/t/craft/assets/",
            "/craft/assets/",
            "/assets/theme-craft"
        ]
    },
    "Crave": {
        "css": [
            "crave-theme",
            "crave__",
            "crave-",
            "crave-header",
            "crave",
            "crave",
            "theme-crave",
            ".crave",
            "#crave"
        ],
        "js": [
            "crave.js",
            "crave.theme.js",
            "crave.min.js",
            "theme-crave.js",
            "crave.js",
            "window.Crave",
            "crave-scripts"
        ],
        "html": [
            "\"Crave\"",
            "\"theme_name\":\"Crave\"",
            "crave-theme",
            "data-crave",
            "class=\"crave\"",
            "data-theme-name=\"Crave\"",
            "theme-crave",
            "id=\"crave\""
        ],
        "paths": [
            "/assets/crave",
            "/assets/crave",
            "/t/crave/assets/",
            "/cdn/shop/t/crave/assets/",
            "/crave/assets/",
            "/assets/theme-crave"
        ]
    },
    "Creative": {
        "css": [
            "creative-theme",
            "creative__",
            "creative-",
            "creative-header",
            "creative",
            "creative",
            "theme-creative",
            ".creative",
            "#creative"
        ],
        "js": [
            "creative.js",
            "creative.theme.js",
            "creative.min.js",
            "theme-creative.js",
            "creative.js",
            "window.Creative",
            "creative-scripts"
        ],
        "html": [
            "\"Creative\"",
            "\"theme_name\":\"Creative\"",
            "creative-theme",
            "data-creative",
            "class=\"creative\"",
            "data-theme-name=\"Creative\"",
            "theme-creative",
            "id=\"creative\""
        ],
        "paths": [
            "/assets/creative",
            "/assets/creative",
            "/t/creative/assets/",
            "/cdn/shop/t/creative/assets/",
            "/creative/assets/",
            "/assets/theme-creative"
        ]
    },
    "Creator": {
        "css": [
            "creator-theme",
            "creator__",
            "creator-",
            "creator-header",
            "creator",
            "creator",
            "theme-creator",
            ".creator",
            "#creator"
        ],
        "js": [
            "creator.js",
            "creator.theme.js",
            "creator.min.js",
            "theme-creator.js",
            "creator.js",
            "window.Creator",
            "creator-scripts"
        ],
        "html": [
            "\"Creator\"",
            "\"theme_name\":\"Creator\"",
            "creator-theme",
            "data-creator",
            "class=\"creator\"",
            "data-theme-name=\"Creator\"",
            "theme-creator",
            "id=\"creator\""
        ],
        "paths": [
            "/assets/creator",
            "/assets/creator",
            "/t/creator/assets/",
            "/cdn/shop/t/creator/assets/",
            "/creator/assets/",
            "/assets/theme-creator"
        ]
    },
    "Dawn": {
        "css": [
            "dawn-theme",
            "dawn__",
            "dawn-",
            "dawn-header",
            "dawn",
            "dawn",
            "theme-dawn",
            ".dawn",
            "#dawn"
        ],
        "js": [
            "dawn.js",
            "dawn.theme.js",
            "dawn.min.js",
            "theme-dawn.js",
            "dawn.js",
            "window.Dawn",
            "dawn-scripts"
        ],
        "html": [
            "\"Dawn\"",
            "\"theme_name\":\"Dawn\"",
            "dawn-theme",
            "data-dawn",
            "class=\"dawn\"",
            "data-theme-name=\"Dawn\"",
            "theme-dawn",
            "id=\"dawn\""
        ],
        "paths": [
            "/assets/dawn",
            "/assets/dawn",
            "/t/dawn/assets/",
            "/cdn/shop/t/dawn/assets/",
            "/dawn/assets/",
            "/assets/theme-dawn"
        ]
    },
    "Debut": {
        "css": [
            "debut-theme",
            "debut__",
            "debut-",
            "debut-header",
            "debut",
            "debut",
            "theme-debut",
            ".debut",
            "#debut"
        ],
        "js": [
            "debut.js",
            "debut.theme.js",
            "debut.min.js",
            "theme-debut.js",
            "debut.js",
            "window.Debut",
            "debut-scripts"
        ],
        "html": [
            "\"Debut\"",
            "\"theme_name\":\"Debut\"",
            "debut-theme",
            "data-debut",
            "class=\"debut\"",
            "data-theme-name=\"Debut\"",
            "theme-debut",
            "id=\"debut\""
        ],
        "paths": [
            "/assets/debut",
            "/assets/debut",
            "/t/debut/assets/",
            "/cdn/shop/t/debut/assets/",
            "/debut/assets/",
            "/assets/theme-debut"
        ]
    },
    "Desert": {
        "css": [
            "desert-theme",
            "desert__",
            "desert-",
            "desert-header",
            "desert",
            "desert",
            "theme-desert",
            ".desert",
            "#desert"
        ],
        "js": [
            "desert.js",
            "desert.theme.js",
            "desert.min.js",
            "theme-desert.js",
            "desert.js",
            "window.Desert",
            "desert-scripts"
        ],
        "html": [
            "\"Desert\"",
            "\"theme_name\":\"Desert\"",
            "desert-theme",
            "data-desert",
            "class=\"desert\"",
            "data-theme-name=\"Desert\"",
            "theme-desert",
            "id=\"desert\""
        ],
        "paths": [
            "/assets/desert",
            "/assets/desert",
            "/t/desert/assets/",
            "/cdn/shop/t/desert/assets/",
            "/desert/assets/",
            "/assets/theme-desert"
        ]
    },
    "Digital": {
        "css": [
            "digital-theme",
            "digital__",
            "digital-",
            "digital-header",
            "digital",
            "digital",
            "theme-digital",
            ".digital",
            "#digital"
        ],
        "js": [
            "digital.js",
            "digital.theme.js",
            "digital.min.js",
            "theme-digital.js",
            "digital.js",
            "window.Digital",
            "digital-scripts"
        ],
        "html": [
            "\"Digital\"",
            "\"theme_name\":\"Digital\"",
            "digital-theme",
            "data-digital",
            "class=\"digital\"",
            "data-theme-name=\"Digital\"",
            "theme-digital",
            "id=\"digital\""
        ],
        "paths": [
            "/assets/digital",
            "/assets/digital",
            "/t/digital/assets/",
            "/cdn/shop/t/digital/assets/",
            "/digital/assets/",
            "/assets/theme-digital"
        ]
    },
    "Distinctive": {
        "css": [
            "distinctive-theme",
            "distinctive__",
            "distinctive-",
            "distinctive-header",
            "distinctive",
            "distinctive",
            "theme-distinctive",
            ".distinctive",
            "#distinctive"
        ],
        "js": [
            "distinctive.js",
            "distinctive.theme.js",
            "distinctive.min.js",
            "theme-distinctive.js",
            "distinctive.js",
            "window.Distinctive",
            "distinctive-scripts"
        ],
        "html": [
            "\"Distinctive\"",
            "\"theme_name\":\"Distinctive\"",
            "distinctive-theme",
            "data-distinctive",
            "class=\"distinctive\"",
            "data-theme-name=\"Distinctive\"",
            "theme-distinctive",
            "id=\"distinctive\""
        ],
        "paths": [
            "/assets/distinctive",
            "/assets/distinctive",
            "/t/distinctive/assets/",
            "/cdn/shop/t/distinctive/assets/",
            "/distinctive/assets/",
            "/assets/theme-distinctive"
        ]
    },
    "District": {
        "css": [
            "district-theme",
            "district__",
            "district-",
            "district-header",
            "district",
            "district",
            "theme-district",
            ".district",
            "#district"
        ],
        "js": [
            "district.js",
            "district.theme.js",
            "district.min.js",
            "theme-district.js",
            "district.js",
            "window.District",
            "district-scripts"
        ],
        "html": [
            "\"District\"",
            "\"theme_name\":\"District\"",
            "district-theme",
            "data-district",
            "class=\"district\"",
            "data-theme-name=\"District\"",
            "theme-district",
            "id=\"district\""
        ],
        "paths": [
            "/assets/district",
            "/assets/district",
            "/t/district/assets/",
            "/cdn/shop/t/district/assets/",
            "/district/assets/",
            "/assets/theme-district"
        ]
    },
    "Divide": {
        "css": [
            "divide-theme",
            "divide__",
            "divide-",
            "divide-header",
            "divide",
            "divide",
            "theme-divide",
            ".divide",
            "#divide"
        ],
        "js": [
            "divide.js",
            "divide.theme.js",
            "divide.min.js",
            "theme-divide.js",
            "divide.js",
            "window.Divide",
            "divide-scripts"
        ],
        "html": [
            "\"Divide\"",
            "\"theme_name\":\"Divide\"",
            "divide-theme",
            "data-divide",
            "class=\"divide\"",
            "data-theme-name=\"Divide\"",
            "theme-divide",
            "id=\"divide\""
        ],
        "paths": [
            "/assets/divide",
            "/assets/divide",
            "/t/divide/assets/",
            "/cdn/shop/t/divide/assets/",
            "/divide/assets/",
            "/assets/theme-divide"
        ]
    },
    "Divine": {
        "css": [
            "divine-theme",
            "divine__",
            "divine-",
            "divine-header",
            "divine",
            "divine",
            "theme-divine",
            ".divine",
            "#divine"
        ],
        "js": [
            "divine.js",
            "divine.theme.js",
            "divine.min.js",
            "theme-divine.js",
            "divine.js",
            "window.Divine",
            "divine-scripts"
        ],
        "html": [
            "\"Divine\"",
            "\"theme_name\":\"Divine\"",
            "divine-theme",
            "data-divine",
            "class=\"divine\"",
            "data-theme-name=\"Divine\"",
            "theme-divine",
            "id=\"divine\""
        ],
        "paths": [
            "/assets/divine",
            "/assets/divine",
            "/t/divine/assets/",
            "/cdn/shop/t/divine/assets/",
            "/divine/assets/",
            "/assets/theme-divine"
        ]
    },
    "Drop": {
        "css": [
            "drop-theme",
            "drop__",
            "drop-",
            "drop-header",
            "drop",
            "drop",
            "theme-drop",
            ".drop",
            "#drop"
        ],
        "js": [
            "drop.js",
            "drop.theme.js",
            "drop.min.js",
            "theme-drop.js",
            "drop.js",
            "window.Drop",
            "drop-scripts"
        ],
        "html": [
            "\"Drop\"",
            "\"theme_name\":\"Drop\"",
            "drop-theme",
            "data-drop",
            "class=\"drop\"",
            "data-theme-name=\"Drop\"",
            "theme-drop",
            "id=\"drop\""
        ],
        "paths": [
            "/assets/drop",
            "/assets/drop",
            "/t/drop/assets/",
            "/cdn/shop/t/drop/assets/",
            "/drop/assets/",
            "/assets/theme-drop"
        ]
    },
    "Dwell": {
        "css": [
            "dwell-theme",
            "dwell__",
            "dwell-",
            "dwell-header",
            "dwell",
            "dwell",
            "theme-dwell",
            ".dwell",
            "#dwell"
        ],
        "js": [
            "dwell.js",
            "dwell.theme.js",
            "dwell.min.js",
            "theme-dwell.js",
            "dwell.js",
            "window.Dwell",
            "dwell-scripts"
        ],
        "html": [
            "\"Dwell\"",
            "\"theme_name\":\"Dwell\"",
            "dwell-theme",
            "data-dwell",
            "class=\"dwell\"",
            "data-theme-name=\"Dwell\"",
            "theme-dwell",
            "id=\"dwell\""
        ],
        "paths": [
            "/assets/dwell",
            "/assets/dwell",
            "/t/dwell/assets/",
            "/cdn/shop/t/dwell/assets/",
            "/dwell/assets/",
            "/assets/theme-dwell"
        ]
    },
    "Eclipse": {
        "css": [
            "eclipse-theme",
            "eclipse__",
            "eclipse-",
            "eclipse-header",
            "eclipse",
            "eclipse",
            "theme-eclipse",
            ".eclipse",
            "#eclipse"
        ],
        "js": [
            "eclipse.js",
            "eclipse.theme.js",
            "eclipse.min.js",
            "theme-eclipse.js",
            "eclipse.js",
            "window.Eclipse",
            "eclipse-scripts"
        ],
        "html": [
            "\"Eclipse\"",
            "\"theme_name\":\"Eclipse\"",
            "eclipse-theme",
            "data-eclipse",
            "class=\"eclipse\"",
            "data-theme-name=\"Eclipse\"",
            "theme-eclipse",
            "id=\"eclipse\""
        ],
        "paths": [
            "/assets/eclipse",
            "/assets/eclipse",
            "/t/eclipse/assets/",
            "/cdn/shop/t/eclipse/assets/",
            "/eclipse/assets/",
            "/assets/theme-eclipse"
        ]
    },
    "Editions": {
        "css": [
            "editions-theme",
            "editions__",
            "editions-",
            "editions-header",
            "editions",
            "editions",
            "theme-editions",
            ".editions",
            "#editions"
        ],
        "js": [
            "editions.js",
            "editions.theme.js",
            "editions.min.js",
            "theme-editions.js",
            "editions.js",
            "window.Editions",
            "editions-scripts"
        ],
        "html": [
            "\"Editions\"",
            "\"theme_name\":\"Editions\"",
            "editions-theme",
            "data-editions",
            "class=\"editions\"",
            "data-theme-name=\"Editions\"",
            "theme-editions",
            "id=\"editions\""
        ],
        "paths": [
            "/assets/editions",
            "/assets/editions",
            "/t/editions/assets/",
            "/cdn/shop/t/editions/assets/",
            "/editions/assets/",
            "/assets/theme-editions"
        ]
    },
    "Editorial": {
        "css": [
            "editorial-theme",
            "editorial__",
            "editorial-",
            "editorial-header",
            "editorial",
            "editorial",
            "theme-editorial",
            ".editorial",
            "#editorial"
        ],
        "js": [
            "editorial.js",
            "editorial.theme.js",
            "editorial.min.js",
            "theme-editorial.js",
            "editorial.js",
            "window.Editorial",
            "editorial-scripts"
        ],
        "html": [
            "\"Editorial\"",
            "\"theme_name\":\"Editorial\"",
            "editorial-theme",
            "data-editorial",
            "class=\"editorial\"",
            "data-theme-name=\"Editorial\"",
            "theme-editorial",
            "id=\"editorial\""
        ],
        "paths": [
            "/assets/editorial",
            "/assets/editorial",
            "/t/editorial/assets/",
            "/cdn/shop/t/editorial/assets/",
            "/editorial/assets/",
            "/assets/theme-editorial"
        ]
    },
    "Effortless": {
        "css": [
            "effortless-theme",
            "effortless__",
            "effortless-",
            "effortless-header",
            "effortless",
            "effortless",
            "theme-effortless",
            ".effortless",
            "#effortless"
        ],
        "js": [
            "effortless.js",
            "effortless.theme.js",
            "effortless.min.js",
            "theme-effortless.js",
            "effortless.js",
            "window.Effortless",
            "effortless-scripts"
        ],
        "html": [
            "\"Effortless\"",
            "\"theme_name\":\"Effortless\"",
            "effortless-theme",
            "data-effortless",
            "class=\"effortless\"",
            "data-theme-name=\"Effortless\"",
            "theme-effortless",
            "id=\"effortless\""
        ],
        "paths": [
            "/assets/effortless",
            "/assets/effortless",
            "/t/effortless/assets/",
            "/cdn/shop/t/effortless/assets/",
            "/effortless/assets/",
            "/assets/theme-effortless"
        ]
    },
    "Electro": {
        "css": [
            "electro-theme",
            "electro__",
            "electro-",
            "electro-header",
            "electro",
            "electro",
            "theme-electro",
            ".electro",
            "#electro"
        ],
        "js": [
            "electro.js",
            "electro.theme.js",
            "electro.min.js",
            "theme-electro.js",
            "electro.js",
            "window.Electro",
            "electro-scripts"
        ],
        "html": [
            "\"Electro\"",
            "\"theme_name\":\"Electro\"",
            "electro-theme",
            "data-electro",
            "class=\"electro\"",
            "data-theme-name=\"Electro\"",
            "theme-electro",
            "id=\"electro\""
        ],
        "paths": [
            "/assets/electro",
            "/assets/electro",
            "/t/electro/assets/",
            "/cdn/shop/t/electro/assets/",
            "/electro/assets/",
            "/assets/theme-electro"
        ]
    },
    "Elixira": {
        "css": [
            "elixira-theme",
            "elixira__",
            "elixira-",
            "elixira-header",
            "elixira",
            "elixira",
            "theme-elixira",
            ".elixira",
            "#elixira"
        ],
        "js": [
            "elixira.js",
            "elixira.theme.js",
            "elixira.min.js",
            "theme-elixira.js",
            "elixira.js",
            "window.Elixira",
            "elixira-scripts"
        ],
        "html": [
            "\"Elixira\"",
            "\"theme_name\":\"Elixira\"",
            "elixira-theme",
            "data-elixira",
            "class=\"elixira\"",
            "data-theme-name=\"Elixira\"",
            "theme-elixira",
            "id=\"elixira\""
        ],
        "paths": [
            "/assets/elixira",
            "/assets/elixira",
            "/t/elixira/assets/",
            "/cdn/shop/t/elixira/assets/",
            "/elixira/assets/",
            "/assets/theme-elixira"
        ]
    },
    "Elysian": {
        "css": [
            "elysian-theme",
            "elysian__",
            "elysian-",
            "elysian-header",
            "elysian",
            "elysian",
            "theme-elysian",
            ".elysian",
            "#elysian"
        ],
        "js": [
            "elysian.js",
            "elysian.theme.js",
            "elysian.min.js",
            "theme-elysian.js",
            "elysian.js",
            "window.Elysian",
            "elysian-scripts"
        ],
        "html": [
            "\"Elysian\"",
            "\"theme_name\":\"Elysian\"",
            "elysian-theme",
            "data-elysian",
            "class=\"elysian\"",
            "data-theme-name=\"Elysian\"",
            "theme-elysian",
            "id=\"elysian\""
        ],
        "paths": [
            "/assets/elysian",
            "/assets/elysian",
            "/t/elysian/assets/",
            "/cdn/shop/t/elysian/assets/",
            "/elysian/assets/",
            "/assets/theme-elysian"
        ]
    },
    "Emerge": {
        "css": [
            "emerge-theme",
            "emerge__",
            "emerge-",
            "emerge-header",
            "emerge",
            "emerge",
            "theme-emerge",
            ".emerge",
            "#emerge"
        ],
        "js": [
            "emerge.js",
            "emerge.theme.js",
            "emerge.min.js",
            "theme-emerge.js",
            "emerge.js",
            "window.Emerge",
            "emerge-scripts"
        ],
        "html": [
            "\"Emerge\"",
            "\"theme_name\":\"Emerge\"",
            "emerge-theme",
            "data-emerge",
            "class=\"emerge\"",
            "data-theme-name=\"Emerge\"",
            "theme-emerge",
            "id=\"emerge\""
        ],
        "paths": [
            "/assets/emerge",
            "/assets/emerge",
            "/t/emerge/assets/",
            "/cdn/shop/t/emerge/assets/",
            "/emerge/assets/",
            "/assets/theme-emerge"
        ]
    },
    "Empire": {
        "css": [
            "empire-theme",
            "empire__",
            "empire-",
            "empire-header",
            "empire",
            "empire",
            "theme-empire",
            ".empire",
            "#empire"
        ],
        "js": [
            "empire.js",
            "empire.theme.js",
            "empire.min.js",
            "theme-empire.js",
            "empire.js",
            "window.Empire",
            "empire-scripts"
        ],
        "html": [
            "\"Empire\"",
            "\"theme_name\":\"Empire\"",
            "empire-theme",
            "data-empire",
            "class=\"empire\"",
            "data-theme-name=\"Empire\"",
            "theme-empire",
            "id=\"empire\""
        ],
        "paths": [
            "/assets/empire",
            "/assets/empire",
            "/t/empire/assets/",
            "/cdn/shop/t/empire/assets/",
            "/empire/assets/",
            "/assets/theme-empire"
        ]
    },
    "Emporium": {
        "css": [
            "emporium-theme",
            "emporium__",
            "emporium-",
            "emporium-header",
            "emporium",
            "emporium",
            "theme-emporium",
            ".emporium",
            "#emporium"
        ],
        "js": [
            "emporium.js",
            "emporium.theme.js",
            "emporium.min.js",
            "theme-emporium.js",
            "emporium.js",
            "window.Emporium",
            "emporium-scripts"
        ],
        "html": [
            "\"Emporium\"",
            "\"theme_name\":\"Emporium\"",
            "emporium-theme",
            "data-emporium",
            "class=\"emporium\"",
            "data-theme-name=\"Emporium\"",
            "theme-emporium",
            "id=\"emporium\""
        ],
        "paths": [
            "/assets/emporium",
            "/assets/emporium",
            "/t/emporium/assets/",
            "/cdn/shop/t/emporium/assets/",
            "/emporium/assets/",
            "/assets/theme-emporium"
        ]
    },
    "Energy": {
        "css": [
            "energy-theme",
            "energy__",
            "energy-",
            "energy-header",
            "energy",
            "energy",
            "theme-energy",
            ".energy",
            "#energy"
        ],
        "js": [
            "energy.js",
            "energy.theme.js",
            "energy.min.js",
            "theme-energy.js",
            "energy.js",
            "window.Energy",
            "energy-scripts"
        ],
        "html": [
            "\"Energy\"",
            "\"theme_name\":\"Energy\"",
            "energy-theme",
            "data-energy",
            "class=\"energy\"",
            "data-theme-name=\"Energy\"",
            "theme-energy",
            "id=\"energy\""
        ],
        "paths": [
            "/assets/energy",
            "/assets/energy",
            "/t/energy/assets/",
            "/cdn/shop/t/energy/assets/",
            "/energy/assets/",
            "/assets/theme-energy"
        ]
    },
    "Enterprise": {
        "css": [
            "enterprise-theme",
            "enterprise__",
            "enterprise-",
            "enterprise-header",
            "enterprise",
            "enterprise",
            "theme-enterprise",
            ".enterprise",
            "#enterprise"
        ],
        "js": [
            "enterprise.js",
            "enterprise.theme.js",
            "enterprise.min.js",
            "theme-enterprise.js",
            "enterprise.js",
            "window.Enterprise",
            "enterprise-scripts"
        ],
        "html": [
            "\"Enterprise\"",
            "\"theme_name\":\"Enterprise\"",
            "enterprise-theme",
            "data-enterprise",
            "class=\"enterprise\"",
            "data-theme-name=\"Enterprise\"",
            "theme-enterprise",
            "id=\"enterprise\""
        ],
        "paths": [
            "/assets/enterprise",
            "/assets/enterprise",
            "/t/enterprise/assets/",
            "/cdn/shop/t/enterprise/assets/",
            "/enterprise/assets/",
            "/assets/theme-enterprise"
        ]
    },
    "Envy": {
        "css": [
            "envy-theme",
            "envy__",
            "envy-",
            "envy-header",
            "envy",
            "envy",
            "theme-envy",
            ".envy",
            "#envy"
        ],
        "js": [
            "envy.js",
            "envy.theme.js",
            "envy.min.js",
            "theme-envy.js",
            "envy.js",
            "window.Envy",
            "envy-scripts"
        ],
        "html": [
            "\"Envy\"",
            "\"theme_name\":\"Envy\"",
            "envy-theme",
            "data-envy",
            "class=\"envy\"",
            "data-theme-name=\"Envy\"",
            "theme-envy",
            "id=\"envy\""
        ],
        "paths": [
            "/assets/envy",
            "/assets/envy",
            "/t/envy/assets/",
            "/cdn/shop/t/envy/assets/",
            "/envy/assets/",
            "/assets/theme-envy"
        ]
    },
    "Erickson": {
        "css": [
            "erickson-theme",
            "erickson__",
            "erickson-",
            "erickson-header",
            "erickson",
            "erickson",
            "theme-erickson",
            ".erickson",
            "#erickson"
        ],
        "js": [
            "erickson.js",
            "erickson.theme.js",
            "erickson.min.js",
            "theme-erickson.js",
            "erickson.js",
            "window.Erickson",
            "erickson-scripts"
        ],
        "html": [
            "\"Erickson\"",
            "\"theme_name\":\"Erickson\"",
            "erickson-theme",
            "data-erickson",
            "class=\"erickson\"",
            "data-theme-name=\"Erickson\"",
            "theme-erickson",
            "id=\"erickson\""
        ],
        "paths": [
            "/assets/erickson",
            "/assets/erickson",
            "/t/erickson/assets/",
            "/cdn/shop/t/erickson/assets/",
            "/erickson/assets/",
            "/assets/theme-erickson"
        ]
    },
    "Essence": {
        "css": [
            "essence-theme",
            "essence__",
            "essence-",
            "essence-header",
            "essence",
            "essence",
            "theme-essence",
            ".essence",
            "#essence"
        ],
        "js": [
            "essence.js",
            "essence.theme.js",
            "essence.min.js",
            "theme-essence.js",
            "essence.js",
            "window.Essence",
            "essence-scripts"
        ],
        "html": [
            "\"Essence\"",
            "\"theme_name\":\"Essence\"",
            "essence-theme",
            "data-essence",
            "class=\"essence\"",
            "data-theme-name=\"Essence\"",
            "theme-essence",
            "id=\"essence\""
        ],
        "paths": [
            "/assets/essence",
            "/assets/essence",
            "/t/essence/assets/",
            "/cdn/shop/t/essence/assets/",
            "/essence/assets/",
            "/assets/theme-essence"
        ]
    },
    "Essentials": {
        "css": [
            "essentials-theme",
            "essentials__",
            "essentials-",
            "essentials-header",
            "essentials",
            "essentials",
            "theme-essentials",
            ".essentials",
            "#essentials"
        ],
        "js": [
            "essentials.js",
            "essentials.theme.js",
            "essentials.min.js",
            "theme-essentials.js",
            "essentials.js",
            "window.Essentials",
            "essentials-scripts"
        ],
        "html": [
            "\"Essentials\"",
            "\"theme_name\":\"Essentials\"",
            "essentials-theme",
            "data-essentials",
            "class=\"essentials\"",
            "data-theme-name=\"Essentials\"",
            "theme-essentials",
            "id=\"essentials\""
        ],
        "paths": [
            "/assets/essentials",
            "/assets/essentials",
            "/t/essentials/assets/",
            "/cdn/shop/t/essentials/assets/",
            "/essentials/assets/",
            "/assets/theme-essentials"
        ]
    },
    "Etheryx": {
        "css": [
            "etheryx-theme",
            "etheryx__",
            "etheryx-",
            "etheryx-header",
            "etheryx",
            "etheryx",
            "theme-etheryx",
            ".etheryx",
            "#etheryx"
        ],
        "js": [
            "etheryx.js",
            "etheryx.theme.js",
            "etheryx.min.js",
            "theme-etheryx.js",
            "etheryx.js",
            "window.Etheryx",
            "etheryx-scripts"
        ],
        "html": [
            "\"Etheryx\"",
            "\"theme_name\":\"Etheryx\"",
            "etheryx-theme",
            "data-etheryx",
            "class=\"etheryx\"",
            "data-theme-name=\"Etheryx\"",
            "theme-etheryx",
            "id=\"etheryx\""
        ],
        "paths": [
            "/assets/etheryx",
            "/assets/etheryx",
            "/t/etheryx/assets/",
            "/cdn/shop/t/etheryx/assets/",
            "/etheryx/assets/",
            "/assets/theme-etheryx"
        ]
    },
    "Eurus": {
        "css": [
            "eurus-theme",
            "eurus__",
            "eurus-",
            "eurus-header",
            "eurus",
            "eurus",
            "theme-eurus",
            ".eurus",
            "#eurus"
        ],
        "js": [
            "eurus.js",
            "eurus.theme.js",
            "eurus.min.js",
            "theme-eurus.js",
            "eurus.js",
            "window.Eurus",
            "eurus-scripts"
        ],
        "html": [
            "\"Eurus\"",
            "\"theme_name\":\"Eurus\"",
            "eurus-theme",
            "data-eurus",
            "class=\"eurus\"",
            "data-theme-name=\"Eurus\"",
            "theme-eurus",
            "id=\"eurus\""
        ],
        "paths": [
            "/assets/eurus",
            "/assets/eurus",
            "/t/eurus/assets/",
            "/cdn/shop/t/eurus/assets/",
            "/eurus/assets/",
            "/assets/theme-eurus"
        ]
    },
    "Exhibit": {
        "css": [
            "exhibit-theme",
            "exhibit__",
            "exhibit-",
            "exhibit-header",
            "exhibit",
            "exhibit",
            "theme-exhibit",
            ".exhibit",
            "#exhibit"
        ],
        "js": [
            "exhibit.js",
            "exhibit.theme.js",
            "exhibit.min.js",
            "theme-exhibit.js",
            "exhibit.js",
            "window.Exhibit",
            "exhibit-scripts"
        ],
        "html": [
            "\"Exhibit\"",
            "\"theme_name\":\"Exhibit\"",
            "exhibit-theme",
            "data-exhibit",
            "class=\"exhibit\"",
            "data-theme-name=\"Exhibit\"",
            "theme-exhibit",
            "id=\"exhibit\""
        ],
        "paths": [
            "/assets/exhibit",
            "/assets/exhibit",
            "/t/exhibit/assets/",
            "/cdn/shop/t/exhibit/assets/",
            "/exhibit/assets/",
            "/assets/theme-exhibit"
        ]
    },
    "Expanse": {
        "css": [
            "expanse-theme",
            "expanse__",
            "expanse-",
            "expanse-header",
            "expanse",
            "expanse",
            "theme-expanse",
            ".expanse",
            "#expanse"
        ],
        "js": [
            "expanse.js",
            "expanse.theme.js",
            "expanse.min.js",
            "theme-expanse.js",
            "expanse.js",
            "window.Expanse",
            "expanse-scripts"
        ],
        "html": [
            "\"Expanse\"",
            "\"theme_name\":\"Expanse\"",
            "expanse-theme",
            "data-expanse",
            "class=\"expanse\"",
            "data-theme-name=\"Expanse\"",
            "theme-expanse",
            "id=\"expanse\""
        ],
        "paths": [
            "/assets/expanse",
            "/assets/expanse",
            "/t/expanse/assets/",
            "/cdn/shop/t/expanse/assets/",
            "/expanse/assets/",
            "/assets/theme-expanse"
        ]
    },
    "Express": {
        "css": [
            "express-theme",
            "express__",
            "express-",
            "express-header",
            "express",
            "express",
            "theme-express",
            ".express",
            "#express"
        ],
        "js": [
            "express.js",
            "express.theme.js",
            "express.min.js",
            "theme-express.js",
            "express.js",
            "window.Express",
            "express-scripts"
        ],
        "html": [
            "\"Express\"",
            "\"theme_name\":\"Express\"",
            "express-theme",
            "data-express",
            "class=\"express\"",
            "data-theme-name=\"Express\"",
            "theme-express",
            "id=\"express\""
        ],
        "paths": [
            "/assets/express",
            "/assets/express",
            "/t/express/assets/",
            "/cdn/shop/t/express/assets/",
            "/express/assets/",
            "/assets/theme-express"
        ]
    },
    "Expression": {
        "css": [
            "expression-theme",
            "expression__",
            "expression-",
            "expression-header",
            "expression",
            "expression",
            "theme-expression",
            ".expression",
            "#expression"
        ],
        "js": [
            "expression.js",
            "expression.theme.js",
            "expression.min.js",
            "theme-expression.js",
            "expression.js",
            "window.Expression",
            "expression-scripts"
        ],
        "html": [
            "\"Expression\"",
            "\"theme_name\":\"Expression\"",
            "expression-theme",
            "data-expression",
            "class=\"expression\"",
            "data-theme-name=\"Expression\"",
            "theme-expression",
            "id=\"expression\""
        ],
        "paths": [
            "/assets/expression",
            "/assets/expression",
            "/t/expression/assets/",
            "/cdn/shop/t/expression/assets/",
            "/expression/assets/",
            "/assets/theme-expression"
        ]
    },
    "Fabric": {
        "css": [
            "fabric-theme",
            "fabric__",
            "fabric-",
            "fabric-header",
            "fabric",
            "fabric",
            "theme-fabric",
            ".fabric",
            "#fabric"
        ],
        "js": [
            "fabric.js",
            "fabric.theme.js",
            "fabric.min.js",
            "theme-fabric.js",
            "fabric.js",
            "window.Fabric",
            "fabric-scripts"
        ],
        "html": [
            "\"Fabric\"",
            "\"theme_name\":\"Fabric\"",
            "fabric-theme",
            "data-fabric",
            "class=\"fabric\"",
            "data-theme-name=\"Fabric\"",
            "theme-fabric",
            "id=\"fabric\""
        ],
        "paths": [
            "/assets/fabric",
            "/assets/fabric",
            "/t/fabric/assets/",
            "/cdn/shop/t/fabric/assets/",
            "/fabric/assets/",
            "/assets/theme-fabric"
        ]
    },
    "Fame": {
        "css": [
            "fame-theme",
            "fame__",
            "fame-",
            "fame-header",
            "fame",
            "fame",
            "theme-fame",
            ".fame",
            "#fame"
        ],
        "js": [
            "fame.js",
            "fame.theme.js",
            "fame.min.js",
            "theme-fame.js",
            "fame.js",
            "window.Fame",
            "fame-scripts"
        ],
        "html": [
            "\"Fame\"",
            "\"theme_name\":\"Fame\"",
            "fame-theme",
            "data-fame",
            "class=\"fame\"",
            "data-theme-name=\"Fame\"",
            "theme-fame",
            "id=\"fame\""
        ],
        "paths": [
            "/assets/fame",
            "/assets/fame",
            "/t/fame/assets/",
            "/cdn/shop/t/fame/assets/",
            "/fame/assets/",
            "/assets/theme-fame"
        ]
    },
    "Fashionopolism": {
        "css": [
            "fashionopolism-theme",
            "fashionopolism__",
            "fashionopolism-",
            "fashionopolism-header",
            "fashionopolism",
            "fashionopolism",
            "theme-fashionopolism",
            ".fashionopolism",
            "#fashionopolism"
        ],
        "js": [
            "fashionopolism.js",
            "fashionopolism.theme.js",
            "fashionopolism.min.js",
            "theme-fashionopolism.js",
            "fashionopolism.js",
            "window.Fashionopolism",
            "fashionopolism-scripts"
        ],
        "html": [
            "\"Fashionopolism\"",
            "\"theme_name\":\"Fashionopolism\"",
            "fashionopolism-theme",
            "data-fashionopolism",
            "class=\"fashionopolism\"",
            "data-theme-name=\"Fashionopolism\"",
            "theme-fashionopolism",
            "id=\"fashionopolism\""
        ],
        "paths": [
            "/assets/fashionopolism",
            "/assets/fashionopolism",
            "/t/fashionopolism/assets/",
            "/cdn/shop/t/fashionopolism/assets/",
            "/fashionopolism/assets/",
            "/assets/theme-fashionopolism"
        ]
    },
    "Fetch": {
        "css": [
            "fetch-theme",
            "fetch__",
            "fetch-",
            "fetch-header",
            "fetch",
            "fetch",
            "theme-fetch",
            ".fetch",
            "#fetch"
        ],
        "js": [
            "fetch.js",
            "fetch.theme.js",
            "fetch.min.js",
            "theme-fetch.js",
            "fetch.js",
            "window.Fetch",
            "fetch-scripts"
        ],
        "html": [
            "\"Fetch\"",
            "\"theme_name\":\"Fetch\"",
            "fetch-theme",
            "data-fetch",
            "class=\"fetch\"",
            "data-theme-name=\"Fetch\"",
            "theme-fetch",
            "id=\"fetch\""
        ],
        "paths": [
            "/assets/fetch",
            "/assets/fetch",
            "/t/fetch/assets/",
            "/cdn/shop/t/fetch/assets/",
            "/fetch/assets/",
            "/assets/theme-fetch"
        ]
    },
    "Flawless": {
        "css": [
            "flawless-theme",
            "flawless__",
            "flawless-",
            "flawless-header",
            "flawless",
            "flawless",
            "theme-flawless",
            ".flawless",
            "#flawless"
        ],
        "js": [
            "flawless.js",
            "flawless.theme.js",
            "flawless.min.js",
            "theme-flawless.js",
            "flawless.js",
            "window.Flawless",
            "flawless-scripts"
        ],
        "html": [
            "\"Flawless\"",
            "\"theme_name\":\"Flawless\"",
            "flawless-theme",
            "data-flawless",
            "class=\"flawless\"",
            "data-theme-name=\"Flawless\"",
            "theme-flawless",
            "id=\"flawless\""
        ],
        "paths": [
            "/assets/flawless",
            "/assets/flawless",
            "/t/flawless/assets/",
            "/cdn/shop/t/flawless/assets/",
            "/flawless/assets/",
            "/assets/theme-flawless"
        ]
    },
    "Flow": {
        "css": [
            "flow-theme",
            "flow__",
            "flow-",
            "flow-header",
            "flow",
            "flow",
            "theme-flow",
            ".flow",
            "#flow"
        ],
        "js": [
            "flow.js",
            "flow.theme.js",
            "flow.min.js",
            "theme-flow.js",
            "flow.js",
            "window.Flow",
            "flow-scripts"
        ],
        "html": [
            "\"Flow\"",
            "\"theme_name\":\"Flow\"",
            "flow-theme",
            "data-flow",
            "class=\"flow\"",
            "data-theme-name=\"Flow\"",
            "theme-flow",
            "id=\"flow\""
        ],
        "paths": [
            "/assets/flow",
            "/assets/flow",
            "/t/flow/assets/",
            "/cdn/shop/t/flow/assets/",
            "/flow/assets/",
            "/assets/theme-flow"
        ]
    },
    "Flux": {
        "css": [
            "flux-theme",
            "flux__",
            "flux-",
            "flux-header",
            "flux",
            "flux",
            "theme-flux",
            ".flux",
            "#flux"
        ],
        "js": [
            "flux.js",
            "flux.theme.js",
            "flux.min.js",
            "theme-flux.js",
            "flux.js",
            "window.Flux",
            "flux-scripts"
        ],
        "html": [
            "\"Flux\"",
            "\"theme_name\":\"Flux\"",
            "flux-theme",
            "data-flux",
            "class=\"flux\"",
            "data-theme-name=\"Flux\"",
            "theme-flux",
            "id=\"flux\""
        ],
        "paths": [
            "/assets/flux",
            "/assets/flux",
            "/t/flux/assets/",
            "/cdn/shop/t/flux/assets/",
            "/flux/assets/",
            "/assets/theme-flux"
        ]
    },
    "Focal": {
        "css": [
            "focal-theme",
            "focal__",
            "focal-",
            "focal-header",
            "focal",
            "focal",
            "theme-focal",
            ".focal",
            "#focal"
        ],
        "js": [
            "focal.js",
            "focal.theme.js",
            "focal.min.js",
            "theme-focal.js",
            "focal.js",
            "window.Focal",
            "focal-scripts"
        ],
        "html": [
            "\"Focal\"",
            "\"theme_name\":\"Focal\"",
            "focal-theme",
            "data-focal",
            "class=\"focal\"",
            "data-theme-name=\"Focal\"",
            "theme-focal",
            "id=\"focal\""
        ],
        "paths": [
            "/assets/focal",
            "/assets/focal",
            "/t/focal/assets/",
            "/cdn/shop/t/focal/assets/",
            "/focal/assets/",
            "/assets/theme-focal"
        ]
    },
    "Foodie": {
        "css": [
            "foodie-theme",
            "foodie__",
            "foodie-",
            "foodie-header",
            "foodie",
            "foodie",
            "theme-foodie",
            ".foodie",
            "#foodie"
        ],
        "js": [
            "foodie.js",
            "foodie.theme.js",
            "foodie.min.js",
            "theme-foodie.js",
            "foodie.js",
            "window.Foodie",
            "foodie-scripts"
        ],
        "html": [
            "\"Foodie\"",
            "\"theme_name\":\"Foodie\"",
            "foodie-theme",
            "data-foodie",
            "class=\"foodie\"",
            "data-theme-name=\"Foodie\"",
            "theme-foodie",
            "id=\"foodie\""
        ],
        "paths": [
            "/assets/foodie",
            "/assets/foodie",
            "/t/foodie/assets/",
            "/cdn/shop/t/foodie/assets/",
            "/foodie/assets/",
            "/assets/theme-foodie"
        ]
    },
    "Forge": {
        "css": [
            "forge-theme",
            "forge__",
            "forge-",
            "forge-header",
            "forge",
            "forge",
            "theme-forge",
            ".forge",
            "#forge"
        ],
        "js": [
            "forge.js",
            "forge.theme.js",
            "forge.min.js",
            "theme-forge.js",
            "forge.js",
            "window.Forge",
            "forge-scripts"
        ],
        "html": [
            "\"Forge\"",
            "\"theme_name\":\"Forge\"",
            "forge-theme",
            "data-forge",
            "class=\"forge\"",
            "data-theme-name=\"Forge\"",
            "theme-forge",
            "id=\"forge\""
        ],
        "paths": [
            "/assets/forge",
            "/assets/forge",
            "/t/forge/assets/",
            "/cdn/shop/t/forge/assets/",
            "/forge/assets/",
            "/assets/theme-forge"
        ]
    },
    "Frame": {
        "css": [
            "frame-theme",
            "frame__",
            "frame-",
            "frame-header",
            "frame",
            "frame",
            "theme-frame",
            ".frame",
            "#frame"
        ],
        "js": [
            "frame.js",
            "frame.theme.js",
            "frame.min.js",
            "theme-frame.js",
            "frame.js",
            "window.Frame",
            "frame-scripts"
        ],
        "html": [
            "\"Frame\"",
            "\"theme_name\":\"Frame\"",
            "frame-theme",
            "data-frame",
            "class=\"frame\"",
            "data-theme-name=\"Frame\"",
            "theme-frame",
            "id=\"frame\""
        ],
        "paths": [
            "/assets/frame",
            "/assets/frame",
            "/t/frame/assets/",
            "/cdn/shop/t/frame/assets/",
            "/frame/assets/",
            "/assets/theme-frame"
        ]
    },
    "Fresh": {
        "css": [
            "fresh-theme",
            "fresh__",
            "fresh-",
            "fresh-header",
            "fresh",
            "fresh",
            "theme-fresh",
            ".fresh",
            "#fresh"
        ],
        "js": [
            "fresh.js",
            "fresh.theme.js",
            "fresh.min.js",
            "theme-fresh.js",
            "fresh.js",
            "window.Fresh",
            "fresh-scripts"
        ],
        "html": [
            "\"Fresh\"",
            "\"theme_name\":\"Fresh\"",
            "fresh-theme",
            "data-fresh",
            "class=\"fresh\"",
            "data-theme-name=\"Fresh\"",
            "theme-fresh",
            "id=\"fresh\""
        ],
        "paths": [
            "/assets/fresh",
            "/assets/fresh",
            "/t/fresh/assets/",
            "/cdn/shop/t/fresh/assets/",
            "/fresh/assets/",
            "/assets/theme-fresh"
        ]
    },
    "Futurer": {
        "css": [
            "futurer-theme",
            "futurer__",
            "futurer-",
            "futurer-header",
            "futurer",
            "futurer",
            "theme-futurer",
            ".futurer",
            "#futurer"
        ],
        "js": [
            "futurer.js",
            "futurer.theme.js",
            "futurer.min.js",
            "theme-futurer.js",
            "futurer.js",
            "window.Futurer",
            "futurer-scripts"
        ],
        "html": [
            "\"Futurer\"",
            "\"theme_name\":\"Futurer\"",
            "futurer-theme",
            "data-futurer",
            "class=\"futurer\"",
            "data-theme-name=\"Futurer\"",
            "theme-futurer",
            "id=\"futurer\""
        ],
        "paths": [
            "/assets/futurer",
            "/assets/futurer",
            "/t/futurer/assets/",
            "/cdn/shop/t/futurer/assets/",
            "/futurer/assets/",
            "/assets/theme-futurer"
        ]
    },
    "Gain": {
        "css": [
            "gain-theme",
            "gain__",
            "gain-",
            "gain-header",
            "gain",
            "gain",
            "theme-gain",
            ".gain",
            "#gain"
        ],
        "js": [
            "gain.js",
            "gain.theme.js",
            "gain.min.js",
            "theme-gain.js",
            "gain.js",
            "window.Gain",
            "gain-scripts"
        ],
        "html": [
            "\"Gain\"",
            "\"theme_name\":\"Gain\"",
            "gain-theme",
            "data-gain",
            "class=\"gain\"",
            "data-theme-name=\"Gain\"",
            "theme-gain",
            "id=\"gain\""
        ],
        "paths": [
            "/assets/gain",
            "/assets/gain",
            "/t/gain/assets/",
            "/cdn/shop/t/gain/assets/",
            "/gain/assets/",
            "/assets/theme-gain"
        ]
    },
    "Galleria": {
        "css": [
            "galleria-theme",
            "galleria__",
            "galleria-",
            "galleria-header",
            "galleria",
            "galleria",
            "theme-galleria",
            ".galleria",
            "#galleria"
        ],
        "js": [
            "galleria.js",
            "galleria.theme.js",
            "galleria.min.js",
            "theme-galleria.js",
            "galleria.js",
            "window.Galleria",
            "galleria-scripts"
        ],
        "html": [
            "\"Galleria\"",
            "\"theme_name\":\"Galleria\"",
            "galleria-theme",
            "data-galleria",
            "class=\"galleria\"",
            "data-theme-name=\"Galleria\"",
            "theme-galleria",
            "id=\"galleria\""
        ],
        "paths": [
            "/assets/galleria",
            "/assets/galleria",
            "/t/galleria/assets/",
            "/cdn/shop/t/galleria/assets/",
            "/galleria/assets/",
            "/assets/theme-galleria"
        ]
    },
    "Gem": {
        "css": [
            "gem-theme",
            "gem__",
            "gem-",
            "gem-header",
            "gem",
            "gem",
            "theme-gem",
            ".gem",
            "#gem"
        ],
        "js": [
            "gem.js",
            "gem.theme.js",
            "gem.min.js",
            "theme-gem.js",
            "gem.js",
            "window.Gem",
            "gem-scripts"
        ],
        "html": [
            "\"Gem\"",
            "\"theme_name\":\"Gem\"",
            "gem-theme",
            "data-gem",
            "class=\"gem\"",
            "data-theme-name=\"Gem\"",
            "theme-gem",
            "id=\"gem\""
        ],
        "paths": [
            "/assets/gem",
            "/assets/gem",
            "/t/gem/assets/",
            "/cdn/shop/t/gem/assets/",
            "/gem/assets/",
            "/assets/theme-gem"
        ]
    },
    "Grid": {
        "css": [
            "grid-theme",
            "grid__",
            "grid-",
            "grid-header",
            "grid",
            "grid",
            "theme-grid",
            ".grid",
            "#grid"
        ],
        "js": [
            "grid.js",
            "grid.theme.js",
            "grid.min.js",
            "theme-grid.js",
            "grid.js",
            "window.Grid",
            "grid-scripts"
        ],
        "html": [
            "\"Grid\"",
            "\"theme_name\":\"Grid\"",
            "grid-theme",
            "data-grid",
            "class=\"grid\"",
            "data-theme-name=\"Grid\"",
            "theme-grid",
            "id=\"grid\""
        ],
        "paths": [
            "/assets/grid",
            "/assets/grid",
            "/t/grid/assets/",
            "/cdn/shop/t/grid/assets/",
            "/grid/assets/",
            "/assets/theme-grid"
        ]
    },
    "Habitat": {
        "css": [
            "habitat-theme",
            "habitat__",
            "habitat-",
            "habitat-header",
            "habitat",
            "habitat",
            "theme-habitat",
            ".habitat",
            "#habitat"
        ],
        "js": [
            "habitat.js",
            "habitat.theme.js",
            "habitat.min.js",
            "theme-habitat.js",
            "habitat.js",
            "window.Habitat",
            "habitat-scripts"
        ],
        "html": [
            "\"Habitat\"",
            "\"theme_name\":\"Habitat\"",
            "habitat-theme",
            "data-habitat",
            "class=\"habitat\"",
            "data-theme-name=\"Habitat\"",
            "theme-habitat",
            "id=\"habitat\""
        ],
        "paths": [
            "/assets/habitat",
            "/assets/habitat",
            "/t/habitat/assets/",
            "/cdn/shop/t/habitat/assets/",
            "/habitat/assets/",
            "/assets/theme-habitat"
        ]
    },
    "Handmade": {
        "css": [
            "handmade-theme",
            "handmade__",
            "handmade-",
            "handmade-header",
            "handmade",
            "handmade",
            "theme-handmade",
            ".handmade",
            "#handmade"
        ],
        "js": [
            "handmade.js",
            "handmade.theme.js",
            "handmade.min.js",
            "theme-handmade.js",
            "handmade.js",
            "window.Handmade",
            "handmade-scripts"
        ],
        "html": [
            "\"Handmade\"",
            "\"theme_name\":\"Handmade\"",
            "handmade-theme",
            "data-handmade",
            "class=\"handmade\"",
            "data-theme-name=\"Handmade\"",
            "theme-handmade",
            "id=\"handmade\""
        ],
        "paths": [
            "/assets/handmade",
            "/assets/handmade",
            "/t/handmade/assets/",
            "/cdn/shop/t/handmade/assets/",
            "/handmade/assets/",
            "/assets/theme-handmade"
        ]
    },
    "Handy": {
        "css": [
            "handy-theme",
            "handy__",
            "handy-",
            "handy-header",
            "handy",
            "handy",
            "theme-handy",
            ".handy",
            "#handy"
        ],
        "js": [
            "handy.js",
            "handy.theme.js",
            "handy.min.js",
            "theme-handy.js",
            "handy.js",
            "window.Handy",
            "handy-scripts"
        ],
        "html": [
            "\"Handy\"",
            "\"theme_name\":\"Handy\"",
            "handy-theme",
            "data-handy",
            "class=\"handy\"",
            "data-theme-name=\"Handy\"",
            "theme-handy",
            "id=\"handy\""
        ],
        "paths": [
            "/assets/handy",
            "/assets/handy",
            "/t/handy/assets/",
            "/cdn/shop/t/handy/assets/",
            "/handy/assets/",
            "/assets/theme-handy"
        ]
    },
    "Heritage": {
        "css": [
            "heritage-theme",
            "heritage__",
            "heritage-",
            "heritage-header",
            "heritage",
            "heritage",
            "theme-heritage",
            ".heritage",
            "#heritage"
        ],
        "js": [
            "heritage.js",
            "heritage.theme.js",
            "heritage.min.js",
            "theme-heritage.js",
            "heritage.js",
            "window.Heritage",
            "heritage-scripts"
        ],
        "html": [
            "\"Heritage\"",
            "\"theme_name\":\"Heritage\"",
            "heritage-theme",
            "data-heritage",
            "class=\"heritage\"",
            "data-theme-name=\"Heritage\"",
            "theme-heritage",
            "id=\"heritage\""
        ],
        "paths": [
            "/assets/heritage",
            "/assets/heritage",
            "/t/heritage/assets/",
            "/cdn/shop/t/heritage/assets/",
            "/heritage/assets/",
            "/assets/theme-heritage"
        ]
    },
    "Highlight": {
        "css": [
            "highlight-theme",
            "highlight__",
            "highlight-",
            "highlight-header",
            "highlight",
            "highlight",
            "theme-highlight",
            ".highlight",
            "#highlight"
        ],
        "js": [
            "highlight.js",
            "highlight.theme.js",
            "highlight.min.js",
            "theme-highlight.js",
            "highlight.js",
            "window.Highlight",
            "highlight-scripts"
        ],
        "html": [
            "\"Highlight\"",
            "\"theme_name\":\"Highlight\"",
            "highlight-theme",
            "data-highlight",
            "class=\"highlight\"",
            "data-theme-name=\"Highlight\"",
            "theme-highlight",
            "id=\"highlight\""
        ],
        "paths": [
            "/assets/highlight",
            "/assets/highlight",
            "/t/highlight/assets/",
            "/cdn/shop/t/highlight/assets/",
            "/highlight/assets/",
            "/assets/theme-highlight"
        ]
    },
    "Honey": {
        "css": [
            "honey-theme",
            "honey__",
            "honey-",
            "honey-header",
            "honey",
            "honey",
            "theme-honey",
            ".honey",
            "#honey"
        ],
        "js": [
            "honey.js",
            "honey.theme.js",
            "honey.min.js",
            "theme-honey.js",
            "honey.js",
            "window.Honey",
            "honey-scripts"
        ],
        "html": [
            "\"Honey\"",
            "\"theme_name\":\"Honey\"",
            "honey-theme",
            "data-honey",
            "class=\"honey\"",
            "data-theme-name=\"Honey\"",
            "theme-honey",
            "id=\"honey\""
        ],
        "paths": [
            "/assets/honey",
            "/assets/honey",
            "/t/honey/assets/",
            "/cdn/shop/t/honey/assets/",
            "/honey/assets/",
            "/assets/theme-honey"
        ]
    },
    "Horizon": {
        "css": [
            "horizon-theme",
            "horizon__",
            "horizon-",
            "horizon-header",
            "horizon",
            "horizon",
            "theme-horizon",
            ".horizon",
            "#horizon"
        ],
        "js": [
            "horizon.js",
            "horizon.theme.js",
            "horizon.min.js",
            "theme-horizon.js",
            "horizon.js",
            "window.Horizon",
            "horizon-scripts"
        ],
        "html": [
            "\"Horizon\"",
            "\"theme_name\":\"Horizon\"",
            "horizon-theme",
            "data-horizon",
            "class=\"horizon\"",
            "data-theme-name=\"Horizon\"",
            "theme-horizon",
            "id=\"horizon\""
        ],
        "paths": [
            "/assets/horizon",
            "/assets/horizon",
            "/t/horizon/assets/",
            "/cdn/shop/t/horizon/assets/",
            "/horizon/assets/",
            "/assets/theme-horizon"
        ]
    },
    "Huge": {
        "css": [
            "huge-theme",
            "huge__",
            "huge-",
            "huge-header",
            "huge",
            "huge",
            "theme-huge",
            ".huge",
            "#huge"
        ],
        "js": [
            "huge.js",
            "huge.theme.js",
            "huge.min.js",
            "theme-huge.js",
            "huge.js",
            "window.Huge",
            "huge-scripts"
        ],
        "html": [
            "\"Huge\"",
            "\"theme_name\":\"Huge\"",
            "huge-theme",
            "data-huge",
            "class=\"huge\"",
            "data-theme-name=\"Huge\"",
            "theme-huge",
            "id=\"huge\""
        ],
        "paths": [
            "/assets/huge",
            "/assets/huge",
            "/t/huge/assets/",
            "/cdn/shop/t/huge/assets/",
            "/huge/assets/",
            "/assets/theme-huge"
        ]
    },
    "Hyper": {
        "css": [
            "hyper-theme",
            "hyper__",
            "hyper-",
            "hyper-header",
            "hyper",
            "hyper",
            "theme-hyper",
            ".hyper",
            "#hyper"
        ],
        "js": [
            "hyper.js",
            "hyper.theme.js",
            "hyper.min.js",
            "theme-hyper.js",
            "hyper.js",
            "window.Hyper",
            "hyper-scripts"
        ],
        "html": [
            "\"Hyper\"",
            "\"theme_name\":\"Hyper\"",
            "hyper-theme",
            "data-hyper",
            "class=\"hyper\"",
            "data-theme-name=\"Hyper\"",
            "theme-hyper",
            "id=\"hyper\""
        ],
        "paths": [
            "/assets/hyper",
            "/assets/hyper",
            "/t/hyper/assets/",
            "/cdn/shop/t/hyper/assets/",
            "/hyper/assets/",
            "/assets/theme-hyper"
        ]
    },
    "Icon": {
        "css": [
            "icon-theme",
            "icon__",
            "icon-",
            "icon-header",
            "icon",
            "icon",
            "theme-icon",
            ".icon",
            "#icon"
        ],
        "js": [
            "icon.js",
            "icon.theme.js",
            "icon.min.js",
            "theme-icon.js",
            "icon.js",
            "window.Icon",
            "icon-scripts"
        ],
        "html": [
            "\"Icon\"",
            "\"theme_name\":\"Icon\"",
            "icon-theme",
            "data-icon",
            "class=\"icon\"",
            "data-theme-name=\"Icon\"",
            "theme-icon",
            "id=\"icon\""
        ],
        "paths": [
            "/assets/icon",
            "/assets/icon",
            "/t/icon/assets/",
            "/cdn/shop/t/icon/assets/",
            "/icon/assets/",
            "/assets/theme-icon"
        ]
    },
    "Ignite": {
        "css": [
            "ignite-theme",
            "ignite__",
            "ignite-",
            "ignite-header",
            "ignite",
            "ignite",
            "theme-ignite",
            ".ignite",
            "#ignite"
        ],
        "js": [
            "ignite.js",
            "ignite.theme.js",
            "ignite.min.js",
            "theme-ignite.js",
            "ignite.js",
            "window.Ignite",
            "ignite-scripts"
        ],
        "html": [
            "\"Ignite\"",
            "\"theme_name\":\"Ignite\"",
            "ignite-theme",
            "data-ignite",
            "class=\"ignite\"",
            "data-theme-name=\"Ignite\"",
            "theme-ignite",
            "id=\"ignite\""
        ],
        "paths": [
            "/assets/ignite",
            "/assets/ignite",
            "/t/ignite/assets/",
            "/cdn/shop/t/ignite/assets/",
            "/ignite/assets/",
            "/assets/theme-ignite"
        ]
    },
    "Igloo": {
        "css": [
            "igloo-theme",
            "igloo__",
            "igloo-",
            "igloo-header",
            "igloo",
            "igloo",
            "theme-igloo",
            ".igloo",
            "#igloo"
        ],
        "js": [
            "igloo.js",
            "igloo.theme.js",
            "igloo.min.js",
            "theme-igloo.js",
            "igloo.js",
            "window.Igloo",
            "igloo-scripts"
        ],
        "html": [
            "\"Igloo\"",
            "\"theme_name\":\"Igloo\"",
            "igloo-theme",
            "data-igloo",
            "class=\"igloo\"",
            "data-theme-name=\"Igloo\"",
            "theme-igloo",
            "id=\"igloo\""
        ],
        "paths": [
            "/assets/igloo",
            "/assets/igloo",
            "/t/igloo/assets/",
            "/cdn/shop/t/igloo/assets/",
            "/igloo/assets/",
            "/assets/theme-igloo"
        ]
    },
    "Impact": {
        "css": [
            "impact-theme",
            "impact__",
            "impact-",
            "impact-header",
            "impact",
            "impact",
            "theme-impact",
            ".impact",
            "#impact"
        ],
        "js": [
            "impact.js",
            "impact.theme.js",
            "impact.min.js",
            "theme-impact.js",
            "impact.js",
            "window.Impact",
            "impact-scripts"
        ],
        "html": [
            "\"Impact\"",
            "\"theme_name\":\"Impact\"",
            "impact-theme",
            "data-impact",
            "class=\"impact\"",
            "data-theme-name=\"Impact\"",
            "theme-impact",
            "id=\"impact\""
        ],
        "paths": [
            "/assets/impact",
            "/assets/impact",
            "/t/impact/assets/",
            "/cdn/shop/t/impact/assets/",
            "/impact/assets/",
            "/assets/theme-impact"
        ]
    },
    "Impulse": {
        "css": [
            "impulse-theme",
            "impulse__",
            "impulse-",
            "impulse-header",
            "impulse",
            "impulse",
            "theme-impulse",
            ".impulse",
            "#impulse"
        ],
        "js": [
            "impulse.js",
            "impulse.theme.js",
            "impulse.min.js",
            "theme-impulse.js",
            "impulse.js",
            "window.Impulse",
            "impulse-scripts"
        ],
        "html": [
            "\"Impulse\"",
            "\"theme_name\":\"Impulse\"",
            "impulse-theme",
            "data-impulse",
            "class=\"impulse\"",
            "data-theme-name=\"Impulse\"",
            "theme-impulse",
            "id=\"impulse\""
        ],
        "paths": [
            "/assets/impulse",
            "/assets/impulse",
            "/t/impulse/assets/",
            "/cdn/shop/t/impulse/assets/",
            "/impulse/assets/",
            "/assets/theme-impulse"
        ]
    },
    "Infinity": {
        "css": [
            "infinity-theme",
            "infinity__",
            "infinity-",
            "infinity-header",
            "infinity",
            "infinity",
            "theme-infinity",
            ".infinity",
            "#infinity"
        ],
        "js": [
            "infinity.js",
            "infinity.theme.js",
            "infinity.min.js",
            "theme-infinity.js",
            "infinity.js",
            "window.Infinity",
            "infinity-scripts"
        ],
        "html": [
            "\"Infinity\"",
            "\"theme_name\":\"Infinity\"",
            "infinity-theme",
            "data-infinity",
            "class=\"infinity\"",
            "data-theme-name=\"Infinity\"",
            "theme-infinity",
            "id=\"infinity\""
        ],
        "paths": [
            "/assets/infinity",
            "/assets/infinity",
            "/t/infinity/assets/",
            "/cdn/shop/t/infinity/assets/",
            "/infinity/assets/",
            "/assets/theme-infinity"
        ]
    },
    "Influence": {
        "css": [
            "influence-theme",
            "influence__",
            "influence-",
            "influence-header",
            "influence",
            "influence",
            "theme-influence",
            ".influence",
            "#influence"
        ],
        "js": [
            "influence.js",
            "influence.theme.js",
            "influence.min.js",
            "theme-influence.js",
            "influence.js",
            "window.Influence",
            "influence-scripts"
        ],
        "html": [
            "\"Influence\"",
            "\"theme_name\":\"Influence\"",
            "influence-theme",
            "data-influence",
            "class=\"influence\"",
            "data-theme-name=\"Influence\"",
            "theme-influence",
            "id=\"influence\""
        ],
        "paths": [
            "/assets/influence",
            "/assets/influence",
            "/t/influence/assets/",
            "/cdn/shop/t/influence/assets/",
            "/influence/assets/",
            "/assets/theme-influence"
        ]
    },
    "Ira": {
        "css": [
            "ira-theme",
            "ira__",
            "ira-",
            "ira-header",
            "ira",
            "ira",
            "theme-ira",
            ".ira",
            "#ira"
        ],
        "js": [
            "ira.js",
            "ira.theme.js",
            "ira.min.js",
            "theme-ira.js",
            "ira.js",
            "window.Ira",
            "ira-scripts"
        ],
        "html": [
            "\"Ira\"",
            "\"theme_name\":\"Ira\"",
            "ira-theme",
            "data-ira",
            "class=\"ira\"",
            "data-theme-name=\"Ira\"",
            "theme-ira",
            "id=\"ira\""
        ],
        "paths": [
            "/assets/ira",
            "/assets/ira",
            "/t/ira/assets/",
            "/cdn/shop/t/ira/assets/",
            "/ira/assets/",
            "/assets/theme-ira"
        ]
    },
    "Iris": {
        "css": [
            "iris-theme",
            "iris__",
            "iris-",
            "iris-header",
            "iris",
            "iris",
            "theme-iris",
            ".iris",
            "#iris"
        ],
        "js": [
            "iris.js",
            "iris.theme.js",
            "iris.min.js",
            "theme-iris.js",
            "iris.js",
            "window.Iris",
            "iris-scripts"
        ],
        "html": [
            "\"Iris\"",
            "\"theme_name\":\"Iris\"",
            "iris-theme",
            "data-iris",
            "class=\"iris\"",
            "data-theme-name=\"Iris\"",
            "theme-iris",
            "id=\"iris\""
        ],
        "paths": [
            "/assets/iris",
            "/assets/iris",
            "/t/iris/assets/",
            "/cdn/shop/t/iris/assets/",
            "/iris/assets/",
            "/assets/theme-iris"
        ]
    },
    "Kairo": {
        "css": [
            "kairo-theme",
            "kairo__",
            "kairo-",
            "kairo-header",
            "kairo",
            "kairo",
            "theme-kairo",
            ".kairo",
            "#kairo"
        ],
        "js": [
            "kairo.js",
            "kairo.theme.js",
            "kairo.min.js",
            "theme-kairo.js",
            "kairo.js",
            "window.Kairo",
            "kairo-scripts"
        ],
        "html": [
            "\"Kairo\"",
            "\"theme_name\":\"Kairo\"",
            "kairo-theme",
            "data-kairo",
            "class=\"kairo\"",
            "data-theme-name=\"Kairo\"",
            "theme-kairo",
            "id=\"kairo\""
        ],
        "paths": [
            "/assets/kairo",
            "/assets/kairo",
            "/t/kairo/assets/",
            "/cdn/shop/t/kairo/assets/",
            "/kairo/assets/",
            "/assets/theme-kairo"
        ]
    },
    "Keystone": {
        "css": [
            "keystone-theme",
            "keystone__",
            "keystone-",
            "keystone-header",
            "keystone",
            "keystone",
            "theme-keystone",
            ".keystone",
            "#keystone"
        ],
        "js": [
            "keystone.js",
            "keystone.theme.js",
            "keystone.min.js",
            "theme-keystone.js",
            "keystone.js",
            "window.Keystone",
            "keystone-scripts"
        ],
        "html": [
            "\"Keystone\"",
            "\"theme_name\":\"Keystone\"",
            "keystone-theme",
            "data-keystone",
            "class=\"keystone\"",
            "data-theme-name=\"Keystone\"",
            "theme-keystone",
            "id=\"keystone\""
        ],
        "paths": [
            "/assets/keystone",
            "/assets/keystone",
            "/t/keystone/assets/",
            "/cdn/shop/t/keystone/assets/",
            "/keystone/assets/",
            "/assets/theme-keystone"
        ]
    },
    "Kidu": {
        "css": [
            "kidu-theme",
            "kidu__",
            "kidu-",
            "kidu-header",
            "kidu",
            "kidu",
            "theme-kidu",
            ".kidu",
            "#kidu"
        ],
        "js": [
            "kidu.js",
            "kidu.theme.js",
            "kidu.min.js",
            "theme-kidu.js",
            "kidu.js",
            "window.Kidu",
            "kidu-scripts"
        ],
        "html": [
            "\"Kidu\"",
            "\"theme_name\":\"Kidu\"",
            "kidu-theme",
            "data-kidu",
            "class=\"kidu\"",
            "data-theme-name=\"Kidu\"",
            "theme-kidu",
            "id=\"kidu\""
        ],
        "paths": [
            "/assets/kidu",
            "/assets/kidu",
            "/t/kidu/assets/",
            "/cdn/shop/t/kidu/assets/",
            "/kidu/assets/",
            "/assets/theme-kidu"
        ]
    },
    "King": {
        "css": [
            "king-theme",
            "king__",
            "king-",
            "king-header",
            "king",
            "king",
            "theme-king",
            ".king",
            "#king"
        ],
        "js": [
            "king.js",
            "king.theme.js",
            "king.min.js",
            "theme-king.js",
            "king.js",
            "window.King",
            "king-scripts"
        ],
        "html": [
            "\"King\"",
            "\"theme_name\":\"King\"",
            "king-theme",
            "data-king",
            "class=\"king\"",
            "data-theme-name=\"King\"",
            "theme-king",
            "id=\"king\""
        ],
        "paths": [
            "/assets/king",
            "/assets/king",
            "/t/king/assets/",
            "/cdn/shop/t/king/assets/",
            "/king/assets/",
            "/assets/theme-king"
        ]
    },
    "Kingdom": {
        "css": [
            "kingdom-theme",
            "kingdom__",
            "kingdom-",
            "kingdom-header",
            "kingdom",
            "kingdom",
            "theme-kingdom",
            ".kingdom",
            "#kingdom"
        ],
        "js": [
            "kingdom.js",
            "kingdom.theme.js",
            "kingdom.min.js",
            "theme-kingdom.js",
            "kingdom.js",
            "window.Kingdom",
            "kingdom-scripts"
        ],
        "html": [
            "\"Kingdom\"",
            "\"theme_name\":\"Kingdom\"",
            "kingdom-theme",
            "data-kingdom",
            "class=\"kingdom\"",
            "data-theme-name=\"Kingdom\"",
            "theme-kingdom",
            "id=\"kingdom\""
        ],
        "paths": [
            "/assets/kingdom",
            "/assets/kingdom",
            "/t/kingdom/assets/",
            "/cdn/shop/t/kingdom/assets/",
            "/kingdom/assets/",
            "/assets/theme-kingdom"
        ]
    },
    "Koto": {
        "css": [
            "koto-theme",
            "koto__",
            "koto-",
            "koto-header",
            "koto",
            "koto",
            "theme-koto",
            ".koto",
            "#koto"
        ],
        "js": [
            "koto.js",
            "koto.theme.js",
            "koto.min.js",
            "theme-koto.js",
            "koto.js",
            "window.Koto",
            "koto-scripts"
        ],
        "html": [
            "\"Koto\"",
            "\"theme_name\":\"Koto\"",
            "koto-theme",
            "data-koto",
            "class=\"koto\"",
            "data-theme-name=\"Koto\"",
            "theme-koto",
            "id=\"koto\""
        ],
        "paths": [
            "/assets/koto",
            "/assets/koto",
            "/t/koto/assets/",
            "/cdn/shop/t/koto/assets/",
            "/koto/assets/",
            "/assets/theme-koto"
        ]
    },
    "Label": {
        "css": [
            "label-theme",
            "label__",
            "label-",
            "label-header",
            "label",
            "label",
            "theme-label",
            ".label",
            "#label"
        ],
        "js": [
            "label.js",
            "label.theme.js",
            "label.min.js",
            "theme-label.js",
            "label.js",
            "window.Label",
            "label-scripts"
        ],
        "html": [
            "\"Label\"",
            "\"theme_name\":\"Label\"",
            "label-theme",
            "data-label",
            "class=\"label\"",
            "data-theme-name=\"Label\"",
            "theme-label",
            "id=\"label\""
        ],
        "paths": [
            "/assets/label",
            "/assets/label",
            "/t/label/assets/",
            "/cdn/shop/t/label/assets/",
            "/label/assets/",
            "/assets/theme-label"
        ]
    },
    "Launch": {
        "css": [
            "launch-theme",
            "launch__",
            "launch-",
            "launch-header",
            "launch",
            "launch",
            "theme-launch",
            ".launch",
            "#launch"
        ],
        "js": [
            "launch.js",
            "launch.theme.js",
            "launch.min.js",
            "theme-launch.js",
            "launch.js",
            "window.Launch",
            "launch-scripts"
        ],
        "html": [
            "\"Launch\"",
            "\"theme_name\":\"Launch\"",
            "launch-theme",
            "data-launch",
            "class=\"launch\"",
            "data-theme-name=\"Launch\"",
            "theme-launch",
            "id=\"launch\""
        ],
        "paths": [
            "/assets/launch",
            "/assets/launch",
            "/t/launch/assets/",
            "/cdn/shop/t/launch/assets/",
            "/launch/assets/",
            "/assets/theme-launch"
        ]
    },
    "Local": {
        "css": [
            "local-theme",
            "local__",
            "local-",
            "local-header",
            "local",
            "local",
            "theme-local",
            ".local",
            "#local"
        ],
        "js": [
            "local.js",
            "local.theme.js",
            "local.min.js",
            "theme-local.js",
            "local.js",
            "window.Local",
            "local-scripts"
        ],
        "html": [
            "\"Local\"",
            "\"theme_name\":\"Local\"",
            "local-theme",
            "data-local",
            "class=\"local\"",
            "data-theme-name=\"Local\"",
            "theme-local",
            "id=\"local\""
        ],
        "paths": [
            "/assets/local",
            "/assets/local",
            "/t/local/assets/",
            "/cdn/shop/t/local/assets/",
            "/local/assets/",
            "/assets/theme-local"
        ]
    },
    "Loft": {
        "css": [
            "loft-theme",
            "loft__",
            "loft-",
            "loft-header",
            "loft",
            "loft",
            "theme-loft",
            ".loft",
            "#loft"
        ],
        "js": [
            "loft.js",
            "loft.theme.js",
            "loft.min.js",
            "theme-loft.js",
            "loft.js",
            "window.Loft",
            "loft-scripts"
        ],
        "html": [
            "\"Loft\"",
            "\"theme_name\":\"Loft\"",
            "loft-theme",
            "data-loft",
            "class=\"loft\"",
            "data-theme-name=\"Loft\"",
            "theme-loft",
            "id=\"loft\""
        ],
        "paths": [
            "/assets/loft",
            "/assets/loft",
            "/t/loft/assets/",
            "/cdn/shop/t/loft/assets/",
            "/loft/assets/",
            "/assets/theme-loft"
        ]
    },
    "Loka": {
        "css": [
            "loka-theme",
            "loka__",
            "loka-",
            "loka-header",
            "loka",
            "loka",
            "theme-loka",
            ".loka",
            "#loka"
        ],
        "js": [
            "loka.js",
            "loka.theme.js",
            "loka.min.js",
            "theme-loka.js",
            "loka.js",
            "window.Loka",
            "loka-scripts"
        ],
        "html": [
            "\"Loka\"",
            "\"theme_name\":\"Loka\"",
            "loka-theme",
            "data-loka",
            "class=\"loka\"",
            "data-theme-name=\"Loka\"",
            "theme-loka",
            "id=\"loka\""
        ],
        "paths": [
            "/assets/loka",
            "/assets/loka",
            "/t/loka/assets/",
            "/cdn/shop/t/loka/assets/",
            "/loka/assets/",
            "/assets/theme-loka"
        ]
    },
    "Lorenza": {
        "css": [
            "lorenza-theme",
            "lorenza__",
            "lorenza-",
            "lorenza-header",
            "lorenza",
            "lorenza",
            "theme-lorenza",
            ".lorenza",
            "#lorenza"
        ],
        "js": [
            "lorenza.js",
            "lorenza.theme.js",
            "lorenza.min.js",
            "theme-lorenza.js",
            "lorenza.js",
            "window.Lorenza",
            "lorenza-scripts"
        ],
        "html": [
            "\"Lorenza\"",
            "\"theme_name\":\"Lorenza\"",
            "lorenza-theme",
            "data-lorenza",
            "class=\"lorenza\"",
            "data-theme-name=\"Lorenza\"",
            "theme-lorenza",
            "id=\"lorenza\""
        ],
        "paths": [
            "/assets/lorenza",
            "/assets/lorenza",
            "/t/lorenza/assets/",
            "/cdn/shop/t/lorenza/assets/",
            "/lorenza/assets/",
            "/assets/theme-lorenza"
        ]
    },
    "Lumin": {
        "css": [
            "lumin-theme",
            "lumin__",
            "lumin-",
            "lumin-header",
            "lumin",
            "lumin",
            "theme-lumin",
            ".lumin",
            "#lumin"
        ],
        "js": [
            "lumin.js",
            "lumin.theme.js",
            "lumin.min.js",
            "theme-lumin.js",
            "lumin.js",
            "window.Lumin",
            "lumin-scripts"
        ],
        "html": [
            "\"Lumin\"",
            "\"theme_name\":\"Lumin\"",
            "lumin-theme",
            "data-lumin",
            "class=\"lumin\"",
            "data-theme-name=\"Lumin\"",
            "theme-lumin",
            "id=\"lumin\""
        ],
        "paths": [
            "/assets/lumin",
            "/assets/lumin",
            "/t/lumin/assets/",
            "/cdn/shop/t/lumin/assets/",
            "/lumin/assets/",
            "/assets/theme-lumin"
        ]
    },
    "Lute": {
        "css": [
            "lute-theme",
            "lute__",
            "lute-",
            "lute-header",
            "lute",
            "lute",
            "theme-lute",
            ".lute",
            "#lute"
        ],
        "js": [
            "lute.js",
            "lute.theme.js",
            "lute.min.js",
            "theme-lute.js",
            "lute.js",
            "window.Lute",
            "lute-scripts"
        ],
        "html": [
            "\"Lute\"",
            "\"theme_name\":\"Lute\"",
            "lute-theme",
            "data-lute",
            "class=\"lute\"",
            "data-theme-name=\"Lute\"",
            "theme-lute",
            "id=\"lute\""
        ],
        "paths": [
            "/assets/lute",
            "/assets/lute",
            "/t/lute/assets/",
            "/cdn/shop/t/lute/assets/",
            "/lute/assets/",
            "/assets/theme-lute"
        ]
    },
    "Luxe": {
        "css": [
            "luxe-theme",
            "luxe__",
            "luxe-",
            "luxe-header",
            "luxe",
            "luxe",
            "theme-luxe",
            ".luxe",
            "#luxe"
        ],
        "js": [
            "luxe.js",
            "luxe.theme.js",
            "luxe.min.js",
            "theme-luxe.js",
            "luxe.js",
            "window.Luxe",
            "luxe-scripts"
        ],
        "html": [
            "\"Luxe\"",
            "\"theme_name\":\"Luxe\"",
            "luxe-theme",
            "data-luxe",
            "class=\"luxe\"",
            "data-theme-name=\"Luxe\"",
            "theme-luxe",
            "id=\"luxe\""
        ],
        "paths": [
            "/assets/luxe",
            "/assets/luxe",
            "/t/luxe/assets/",
            "/cdn/shop/t/luxe/assets/",
            "/luxe/assets/",
            "/assets/theme-luxe"
        ]
    },
    "Machina": {
        "css": [
            "machina-theme",
            "machina__",
            "machina-",
            "machina-header",
            "machina",
            "machina",
            "theme-machina",
            ".machina",
            "#machina"
        ],
        "js": [
            "machina.js",
            "machina.theme.js",
            "machina.min.js",
            "theme-machina.js",
            "machina.js",
            "window.Machina",
            "machina-scripts"
        ],
        "html": [
            "\"Machina\"",
            "\"theme_name\":\"Machina\"",
            "machina-theme",
            "data-machina",
            "class=\"machina\"",
            "data-theme-name=\"Machina\"",
            "theme-machina",
            "id=\"machina\""
        ],
        "paths": [
            "/assets/machina",
            "/assets/machina",
            "/t/machina/assets/",
            "/cdn/shop/t/machina/assets/",
            "/machina/assets/",
            "/assets/theme-machina"
        ]
    },
    "Madrid": {
        "css": [
            "madrid-theme",
            "madrid__",
            "madrid-",
            "madrid-header",
            "madrid",
            "madrid",
            "theme-madrid",
            ".madrid",
            "#madrid"
        ],
        "js": [
            "madrid.js",
            "madrid.theme.js",
            "madrid.min.js",
            "theme-madrid.js",
            "madrid.js",
            "window.Madrid",
            "madrid-scripts"
        ],
        "html": [
            "\"Madrid\"",
            "\"theme_name\":\"Madrid\"",
            "madrid-theme",
            "data-madrid",
            "class=\"madrid\"",
            "data-theme-name=\"Madrid\"",
            "theme-madrid",
            "id=\"madrid\""
        ],
        "paths": [
            "/assets/madrid",
            "/assets/madrid",
            "/t/madrid/assets/",
            "/cdn/shop/t/madrid/assets/",
            "/madrid/assets/",
            "/assets/theme-madrid"
        ]
    },
    "Maker": {
        "css": [
            "maker-theme",
            "maker__",
            "maker-",
            "maker-header",
            "maker",
            "maker",
            "theme-maker",
            ".maker",
            "#maker"
        ],
        "js": [
            "maker.js",
            "maker.theme.js",
            "maker.min.js",
            "theme-maker.js",
            "maker.js",
            "window.Maker",
            "maker-scripts"
        ],
        "html": [
            "\"Maker\"",
            "\"theme_name\":\"Maker\"",
            "maker-theme",
            "data-maker",
            "class=\"maker\"",
            "data-theme-name=\"Maker\"",
            "theme-maker",
            "id=\"maker\""
        ],
        "paths": [
            "/assets/maker",
            "/assets/maker",
            "/t/maker/assets/",
            "/cdn/shop/t/maker/assets/",
            "/maker/assets/",
            "/assets/theme-maker"
        ]
    },
    "Mandolin": {
        "css": [
            "mandolin-theme",
            "mandolin__",
            "mandolin-",
            "mandolin-header",
            "mandolin",
            "mandolin",
            "theme-mandolin",
            ".mandolin",
            "#mandolin"
        ],
        "js": [
            "mandolin.js",
            "mandolin.theme.js",
            "mandolin.min.js",
            "theme-mandolin.js",
            "mandolin.js",
            "window.Mandolin",
            "mandolin-scripts"
        ],
        "html": [
            "\"Mandolin\"",
            "\"theme_name\":\"Mandolin\"",
            "mandolin-theme",
            "data-mandolin",
            "class=\"mandolin\"",
            "data-theme-name=\"Mandolin\"",
            "theme-mandolin",
            "id=\"mandolin\""
        ],
        "paths": [
            "/assets/mandolin",
            "/assets/mandolin",
            "/t/mandolin/assets/",
            "/cdn/shop/t/mandolin/assets/",
            "/mandolin/assets/",
            "/assets/theme-mandolin"
        ]
    },
    "Maranello": {
        "css": [
            "maranello-theme",
            "maranello__",
            "maranello-",
            "maranello-header",
            "maranello",
            "maranello",
            "theme-maranello",
            ".maranello",
            "#maranello"
        ],
        "js": [
            "maranello.js",
            "maranello.theme.js",
            "maranello.min.js",
            "theme-maranello.js",
            "maranello.js",
            "window.Maranello",
            "maranello-scripts"
        ],
        "html": [
            "\"Maranello\"",
            "\"theme_name\":\"Maranello\"",
            "maranello-theme",
            "data-maranello",
            "class=\"maranello\"",
            "data-theme-name=\"Maranello\"",
            "theme-maranello",
            "id=\"maranello\""
        ],
        "paths": [
            "/assets/maranello",
            "/assets/maranello",
            "/t/maranello/assets/",
            "/cdn/shop/t/maranello/assets/",
            "/maranello/assets/",
            "/assets/theme-maranello"
        ]
    },
    "Marble": {
        "css": [
            "marble-theme",
            "marble__",
            "marble-",
            "marble-header",
            "marble",
            "marble",
            "theme-marble",
            ".marble",
            "#marble"
        ],
        "js": [
            "marble.js",
            "marble.theme.js",
            "marble.min.js",
            "theme-marble.js",
            "marble.js",
            "window.Marble",
            "marble-scripts"
        ],
        "html": [
            "\"Marble\"",
            "\"theme_name\":\"Marble\"",
            "marble-theme",
            "data-marble",
            "class=\"marble\"",
            "data-theme-name=\"Marble\"",
            "theme-marble",
            "id=\"marble\""
        ],
        "paths": [
            "/assets/marble",
            "/assets/marble",
            "/t/marble/assets/",
            "/cdn/shop/t/marble/assets/",
            "/marble/assets/",
            "/assets/theme-marble"
        ]
    },
    "Masonry": {
        "css": [
            "masonry-theme",
            "masonry__",
            "masonry-",
            "masonry-header",
            "masonry",
            "masonry",
            "theme-masonry",
            ".masonry",
            "#masonry"
        ],
        "js": [
            "masonry.js",
            "masonry.theme.js",
            "masonry.min.js",
            "theme-masonry.js",
            "masonry.js",
            "window.Masonry",
            "masonry-scripts"
        ],
        "html": [
            "\"Masonry\"",
            "\"theme_name\":\"Masonry\"",
            "masonry-theme",
            "data-masonry",
            "class=\"masonry\"",
            "data-theme-name=\"Masonry\"",
            "theme-masonry",
            "id=\"masonry\""
        ],
        "paths": [
            "/assets/masonry",
            "/assets/masonry",
            "/t/masonry/assets/",
            "/cdn/shop/t/masonry/assets/",
            "/masonry/assets/",
            "/assets/theme-masonry"
        ]
    },
    "Master": {
        "css": [
            "master-theme",
            "master__",
            "master-",
            "master-header",
            "master",
            "master",
            "theme-master",
            ".master",
            "#master"
        ],
        "js": [
            "master.js",
            "master.theme.js",
            "master.min.js",
            "theme-master.js",
            "master.js",
            "window.Master",
            "master-scripts"
        ],
        "html": [
            "\"Master\"",
            "\"theme_name\":\"Master\"",
            "master-theme",
            "data-master",
            "class=\"master\"",
            "data-theme-name=\"Master\"",
            "theme-master",
            "id=\"master\""
        ],
        "paths": [
            "/assets/master",
            "/assets/master",
            "/t/master/assets/",
            "/cdn/shop/t/master/assets/",
            "/master/assets/",
            "/assets/theme-master"
        ]
    },
    "Mavon": {
        "css": [
            "mavon-theme",
            "mavon__",
            "mavon-",
            "mavon-header",
            "mavon",
            "mavon",
            "theme-mavon",
            ".mavon",
            "#mavon"
        ],
        "js": [
            "mavon.js",
            "mavon.theme.js",
            "mavon.min.js",
            "theme-mavon.js",
            "mavon.js",
            "window.Mavon",
            "mavon-scripts"
        ],
        "html": [
            "\"Mavon\"",
            "\"theme_name\":\"Mavon\"",
            "mavon-theme",
            "data-mavon",
            "class=\"mavon\"",
            "data-theme-name=\"Mavon\"",
            "theme-mavon",
            "id=\"mavon\""
        ],
        "paths": [
            "/assets/mavon",
            "/assets/mavon",
            "/t/mavon/assets/",
            "/cdn/shop/t/mavon/assets/",
            "/mavon/assets/",
            "/assets/theme-mavon"
        ]
    },
    "Maya": {
        "css": [
            "maya-theme",
            "maya__",
            "maya-",
            "maya-header",
            "maya",
            "maya",
            "theme-maya",
            ".maya",
            "#maya"
        ],
        "js": [
            "maya.js",
            "maya.theme.js",
            "maya.min.js",
            "theme-maya.js",
            "maya.js",
            "window.Maya",
            "maya-scripts"
        ],
        "html": [
            "\"Maya\"",
            "\"theme_name\":\"Maya\"",
            "maya-theme",
            "data-maya",
            "class=\"maya\"",
            "data-theme-name=\"Maya\"",
            "theme-maya",
            "id=\"maya\""
        ],
        "paths": [
            "/assets/maya",
            "/assets/maya",
            "/t/maya/assets/",
            "/cdn/shop/t/maya/assets/",
            "/maya/assets/",
            "/assets/theme-maya"
        ]
    },
    "Meka": {
        "css": [
            "meka-theme",
            "meka__",
            "meka-",
            "meka-header",
            "meka",
            "meka",
            "theme-meka",
            ".meka",
            "#meka"
        ],
        "js": [
            "meka.js",
            "meka.theme.js",
            "meka.min.js",
            "theme-meka.js",
            "meka.js",
            "window.Meka",
            "meka-scripts"
        ],
        "html": [
            "\"Meka\"",
            "\"theme_name\":\"Meka\"",
            "meka-theme",
            "data-meka",
            "class=\"meka\"",
            "data-theme-name=\"Meka\"",
            "theme-meka",
            "id=\"meka\""
        ],
        "paths": [
            "/assets/meka",
            "/assets/meka",
            "/t/meka/assets/",
            "/cdn/shop/t/meka/assets/",
            "/meka/assets/",
            "/assets/theme-meka"
        ]
    },
    "Minimal": {
        "css": [
            "minimal-theme",
            "minimal__",
            "minimal-",
            "minimal-header",
            "minimal",
            "minimal",
            "theme-minimal",
            ".minimal",
            "#minimal"
        ],
        "js": [
            "minimal.js",
            "minimal.theme.js",
            "minimal.min.js",
            "theme-minimal.js",
            "minimal.js",
            "window.Minimal",
            "minimal-scripts"
        ],
        "html": [
            "\"Minimal\"",
            "\"theme_name\":\"Minimal\"",
            "minimal-theme",
            "data-minimal",
            "class=\"minimal\"",
            "data-theme-name=\"Minimal\"",
            "theme-minimal",
            "id=\"minimal\""
        ],
        "paths": [
            "/assets/minimal",
            "/assets/minimal",
            "/t/minimal/assets/",
            "/cdn/shop/t/minimal/assets/",
            "/minimal/assets/",
            "/assets/theme-minimal"
        ]
    },
    "Minimalista": {
        "css": [
            "minimalista-theme",
            "minimalista__",
            "minimalista-",
            "minimalista-header",
            "minimalista",
            "minimalista",
            "theme-minimalista",
            ".minimalista",
            "#minimalista"
        ],
        "js": [
            "minimalista.js",
            "minimalista.theme.js",
            "minimalista.min.js",
            "theme-minimalista.js",
            "minimalista.js",
            "window.Minimalista",
            "minimalista-scripts"
        ],
        "html": [
            "\"Minimalista\"",
            "\"theme_name\":\"Minimalista\"",
            "minimalista-theme",
            "data-minimalista",
            "class=\"minimalista\"",
            "data-theme-name=\"Minimalista\"",
            "theme-minimalista",
            "id=\"minimalista\""
        ],
        "paths": [
            "/assets/minimalista",
            "/assets/minimalista",
            "/t/minimalista/assets/",
            "/cdn/shop/t/minimalista/assets/",
            "/minimalista/assets/",
            "/assets/theme-minimalista"
        ]
    },
    "Minion": {
        "css": [
            "minion-theme",
            "minion__",
            "minion-",
            "minion-header",
            "minion",
            "minion",
            "theme-minion",
            ".minion",
            "#minion"
        ],
        "js": [
            "minion.js",
            "minion.theme.js",
            "minion.min.js",
            "theme-minion.js",
            "minion.js",
            "window.Minion",
            "minion-scripts"
        ],
        "html": [
            "\"Minion\"",
            "\"theme_name\":\"Minion\"",
            "minion-theme",
            "data-minion",
            "class=\"minion\"",
            "data-theme-name=\"Minion\"",
            "theme-minion",
            "id=\"minion\""
        ],
        "paths": [
            "/assets/minion",
            "/assets/minion",
            "/t/minion/assets/",
            "/cdn/shop/t/minion/assets/",
            "/minion/assets/",
            "/assets/theme-minion"
        ]
    },
    "Mobilia": {
        "css": [
            "mobilia-theme",
            "mobilia__",
            "mobilia-",
            "mobilia-header",
            "mobilia",
            "mobilia",
            "theme-mobilia",
            ".mobilia",
            "#mobilia"
        ],
        "js": [
            "mobilia.js",
            "mobilia.theme.js",
            "mobilia.min.js",
            "theme-mobilia.js",
            "mobilia.js",
            "window.Mobilia",
            "mobilia-scripts"
        ],
        "html": [
            "\"Mobilia\"",
            "\"theme_name\":\"Mobilia\"",
            "mobilia-theme",
            "data-mobilia",
            "class=\"mobilia\"",
            "data-theme-name=\"Mobilia\"",
            "theme-mobilia",
            "id=\"mobilia\""
        ],
        "paths": [
            "/assets/mobilia",
            "/assets/mobilia",
            "/t/mobilia/assets/",
            "/cdn/shop/t/mobilia/assets/",
            "/mobilia/assets/",
            "/assets/theme-mobilia"
        ]
    },
    "Mode": {
        "css": [
            "mode-theme",
            "mode__",
            "mode-",
            "mode-header",
            "mode",
            "mode",
            "theme-mode",
            ".mode",
            "#mode"
        ],
        "js": [
            "mode.js",
            "mode.theme.js",
            "mode.min.js",
            "theme-mode.js",
            "mode.js",
            "window.Mode",
            "mode-scripts"
        ],
        "html": [
            "\"Mode\"",
            "\"theme_name\":\"Mode\"",
            "mode-theme",
            "data-mode",
            "class=\"mode\"",
            "data-theme-name=\"Mode\"",
            "theme-mode",
            "id=\"mode\""
        ],
        "paths": [
            "/assets/mode",
            "/assets/mode",
            "/t/mode/assets/",
            "/cdn/shop/t/mode/assets/",
            "/mode/assets/",
            "/assets/theme-mode"
        ]
    },
    "Modular": {
        "css": [
            "modular-theme",
            "modular__",
            "modular-",
            "modular-header",
            "modular",
            "modular",
            "theme-modular",
            ".modular",
            "#modular"
        ],
        "js": [
            "modular.js",
            "modular.theme.js",
            "modular.min.js",
            "theme-modular.js",
            "modular.js",
            "window.Modular",
            "modular-scripts"
        ],
        "html": [
            "\"Modular\"",
            "\"theme_name\":\"Modular\"",
            "modular-theme",
            "data-modular",
            "class=\"modular\"",
            "data-theme-name=\"Modular\"",
            "theme-modular",
            "id=\"modular\""
        ],
        "paths": [
            "/assets/modular",
            "/assets/modular",
            "/t/modular/assets/",
            "/cdn/shop/t/modular/assets/",
            "/modular/assets/",
            "/assets/theme-modular"
        ]
    },
    "Modules": {
        "css": [
            "modules-theme",
            "modules__",
            "modules-",
            "modules-header",
            "modules",
            "modules",
            "theme-modules",
            ".modules",
            "#modules"
        ],
        "js": [
            "modules.js",
            "modules.theme.js",
            "modules.min.js",
            "theme-modules.js",
            "modules.js",
            "window.Modules",
            "modules-scripts"
        ],
        "html": [
            "\"Modules\"",
            "\"theme_name\":\"Modules\"",
            "modules-theme",
            "data-modules",
            "class=\"modules\"",
            "data-theme-name=\"Modules\"",
            "theme-modules",
            "id=\"modules\""
        ],
        "paths": [
            "/assets/modules",
            "/assets/modules",
            "/t/modules/assets/",
            "/cdn/shop/t/modules/assets/",
            "/modules/assets/",
            "/assets/theme-modules"
        ]
    },
    "Mojave": {
        "css": [
            "mojave-theme",
            "mojave__",
            "mojave-",
            "mojave-header",
            "mojave",
            "mojave",
            "theme-mojave",
            ".mojave",
            "#mojave"
        ],
        "js": [
            "mojave.js",
            "mojave.theme.js",
            "mojave.min.js",
            "theme-mojave.js",
            "mojave.js",
            "window.Mojave",
            "mojave-scripts"
        ],
        "html": [
            "\"Mojave\"",
            "\"theme_name\":\"Mojave\"",
            "mojave-theme",
            "data-mojave",
            "class=\"mojave\"",
            "data-theme-name=\"Mojave\"",
            "theme-mojave",
            "id=\"mojave\""
        ],
        "paths": [
            "/assets/mojave",
            "/assets/mojave",
            "/t/mojave/assets/",
            "/cdn/shop/t/mojave/assets/",
            "/mojave/assets/",
            "/assets/theme-mojave"
        ]
    },
    "Momentum": {
        "css": [
            "momentum-theme",
            "momentum__",
            "momentum-",
            "momentum-header",
            "momentum",
            "momentum",
            "theme-momentum",
            ".momentum",
            "#momentum"
        ],
        "js": [
            "momentum.js",
            "momentum.theme.js",
            "momentum.min.js",
            "theme-momentum.js",
            "momentum.js",
            "window.Momentum",
            "momentum-scripts"
        ],
        "html": [
            "\"Momentum\"",
            "\"theme_name\":\"Momentum\"",
            "momentum-theme",
            "data-momentum",
            "class=\"momentum\"",
            "data-theme-name=\"Momentum\"",
            "theme-momentum",
            "id=\"momentum\""
        ],
        "paths": [
            "/assets/momentum",
            "/assets/momentum",
            "/t/momentum/assets/",
            "/cdn/shop/t/momentum/assets/",
            "/momentum/assets/",
            "/assets/theme-momentum"
        ]
    },
    "Monaco": {
        "css": [
            "monaco-theme",
            "monaco__",
            "monaco-",
            "monaco-header",
            "monaco",
            "monaco",
            "theme-monaco",
            ".monaco",
            "#monaco"
        ],
        "js": [
            "monaco.js",
            "monaco.theme.js",
            "monaco.min.js",
            "theme-monaco.js",
            "monaco.js",
            "window.Monaco",
            "monaco-scripts"
        ],
        "html": [
            "\"Monaco\"",
            "\"theme_name\":\"Monaco\"",
            "monaco-theme",
            "data-monaco",
            "class=\"monaco\"",
            "data-theme-name=\"Monaco\"",
            "theme-monaco",
            "id=\"monaco\""
        ],
        "paths": [
            "/assets/monaco",
            "/assets/monaco",
            "/t/monaco/assets/",
            "/cdn/shop/t/monaco/assets/",
            "/monaco/assets/",
            "/assets/theme-monaco"
        ]
    },
    "Monk": {
        "css": [
            "monk-theme",
            "monk__",
            "monk-",
            "monk-header",
            "monk",
            "monk",
            "theme-monk",
            ".monk",
            "#monk"
        ],
        "js": [
            "monk.js",
            "monk.theme.js",
            "monk.min.js",
            "theme-monk.js",
            "monk.js",
            "window.Monk",
            "monk-scripts"
        ],
        "html": [
            "\"Monk\"",
            "\"theme_name\":\"Monk\"",
            "monk-theme",
            "data-monk",
            "class=\"monk\"",
            "data-theme-name=\"Monk\"",
            "theme-monk",
            "id=\"monk\""
        ],
        "paths": [
            "/assets/monk",
            "/assets/monk",
            "/t/monk/assets/",
            "/cdn/shop/t/monk/assets/",
            "/monk/assets/",
            "/assets/theme-monk"
        ]
    },
    "Mono": {
        "css": [
            "mono-theme",
            "mono__",
            "mono-",
            "mono-header",
            "mono",
            "mono",
            "theme-mono",
            ".mono",
            "#mono"
        ],
        "js": [
            "mono.js",
            "mono.theme.js",
            "mono.min.js",
            "theme-mono.js",
            "mono.js",
            "window.Mono",
            "mono-scripts"
        ],
        "html": [
            "\"Mono\"",
            "\"theme_name\":\"Mono\"",
            "mono-theme",
            "data-mono",
            "class=\"mono\"",
            "data-theme-name=\"Mono\"",
            "theme-mono",
            "id=\"mono\""
        ],
        "paths": [
            "/assets/mono",
            "/assets/mono",
            "/t/mono/assets/",
            "/cdn/shop/t/mono/assets/",
            "/mono/assets/",
            "/assets/theme-mono"
        ]
    },
    "Monochrome": {
        "css": [
            "monochrome-theme",
            "monochrome__",
            "monochrome-",
            "monochrome-header",
            "monochrome",
            "monochrome",
            "theme-monochrome",
            ".monochrome",
            "#monochrome"
        ],
        "js": [
            "monochrome.js",
            "monochrome.theme.js",
            "monochrome.min.js",
            "theme-monochrome.js",
            "monochrome.js",
            "window.Monochrome",
            "monochrome-scripts"
        ],
        "html": [
            "\"Monochrome\"",
            "\"theme_name\":\"Monochrome\"",
            "monochrome-theme",
            "data-monochrome",
            "class=\"monochrome\"",
            "data-theme-name=\"Monochrome\"",
            "theme-monochrome",
            "id=\"monochrome\""
        ],
        "paths": [
            "/assets/monochrome",
            "/assets/monochrome",
            "/t/monochrome/assets/",
            "/cdn/shop/t/monochrome/assets/",
            "/monochrome/assets/",
            "/assets/theme-monochrome"
        ]
    },
    "Motion": {
        "css": [
            "motion-theme",
            "motion__",
            "motion-",
            "motion-header",
            "motion",
            "motion",
            "theme-motion",
            ".motion",
            "#motion"
        ],
        "js": [
            "motion.js",
            "motion.theme.js",
            "motion.min.js",
            "theme-motion.js",
            "motion.js",
            "window.Motion",
            "motion-scripts"
        ],
        "html": [
            "\"Motion\"",
            "\"theme_name\":\"Motion\"",
            "motion-theme",
            "data-motion",
            "class=\"motion\"",
            "data-theme-name=\"Motion\"",
            "theme-motion",
            "id=\"motion\""
        ],
        "paths": [
            "/assets/motion",
            "/assets/motion",
            "/t/motion/assets/",
            "/cdn/shop/t/motion/assets/",
            "/motion/assets/",
            "/assets/theme-motion"
        ]
    },
    "Motto": {
        "css": [
            "motto-theme",
            "motto__",
            "motto-",
            "motto-header",
            "motto",
            "motto",
            "theme-motto",
            ".motto",
            "#motto"
        ],
        "js": [
            "motto.js",
            "motto.theme.js",
            "motto.min.js",
            "theme-motto.js",
            "motto.js",
            "window.Motto",
            "motto-scripts"
        ],
        "html": [
            "\"Motto\"",
            "\"theme_name\":\"Motto\"",
            "motto-theme",
            "data-motto",
            "class=\"motto\"",
            "data-theme-name=\"Motto\"",
            "theme-motto",
            "id=\"motto\""
        ],
        "paths": [
            "/assets/motto",
            "/assets/motto",
            "/t/motto/assets/",
            "/cdn/shop/t/motto/assets/",
            "/motto/assets/",
            "/assets/theme-motto"
        ]
    },
    "Mr.Parker": {
        "css": [
            "mr.parker-theme",
            "mr.parker__",
            "mr.parker-",
            "mr.parker-header",
            "mr.parker",
            "mrparker",
            "theme-mr.parker",
            ".mr.parker",
            "#mr.parker"
        ],
        "js": [
            "mr.parker.js",
            "mr.parker.theme.js",
            "mr.parker.min.js",
            "theme-mr.parker.js",
            "mrparker.js",
            "window.Mr.Parker",
            "mr.parker-scripts"
        ],
        "html": [
            "\"Mr.Parker\"",
            "\"theme_name\":\"Mr.Parker\"",
            "mr.parker-theme",
            "data-mr.parker",
            "class=\"mr.parker\"",
            "data-theme-name=\"Mr.Parker\"",
            "theme-mr.parker",
            "id=\"mr.parker\""
        ],
        "paths": [
            "/assets/mr.parker",
            "/assets/mrparker",
            "/t/mr.parker/assets/",
            "/cdn/shop/t/mr.parker/assets/",
            "/mr.parker/assets/",
            "/assets/theme-mr.parker"
        ]
    },
    "Multi": {
        "css": [
            "multi-theme",
            "multi__",
            "multi-",
            "multi-header",
            "multi",
            "multi",
            "theme-multi",
            ".multi",
            "#multi"
        ],
        "js": [
            "multi.js",
            "multi.theme.js",
            "multi.min.js",
            "theme-multi.js",
            "multi.js",
            "window.Multi",
            "multi-scripts"
        ],
        "html": [
            "\"Multi\"",
            "\"theme_name\":\"Multi\"",
            "multi-theme",
            "data-multi",
            "class=\"multi\"",
            "data-theme-name=\"Multi\"",
            "theme-multi",
            "id=\"multi\""
        ],
        "paths": [
            "/assets/multi",
            "/assets/multi",
            "/t/multi/assets/",
            "/cdn/shop/t/multi/assets/",
            "/multi/assets/",
            "/assets/theme-multi"
        ]
    },
    "Murmel": {
        "css": [
            "murmel-theme",
            "murmel__",
            "murmel-",
            "murmel-header",
            "murmel",
            "murmel",
            "theme-murmel",
            ".murmel",
            "#murmel"
        ],
        "js": [
            "murmel.js",
            "murmel.theme.js",
            "murmel.min.js",
            "theme-murmel.js",
            "murmel.js",
            "window.Murmel",
            "murmel-scripts"
        ],
        "html": [
            "\"Murmel\"",
            "\"theme_name\":\"Murmel\"",
            "murmel-theme",
            "data-murmel",
            "class=\"murmel\"",
            "data-theme-name=\"Murmel\"",
            "theme-murmel",
            "id=\"murmel\""
        ],
        "paths": [
            "/assets/murmel",
            "/assets/murmel",
            "/t/murmel/assets/",
            "/cdn/shop/t/murmel/assets/",
            "/murmel/assets/",
            "/assets/theme-murmel"
        ]
    },
    "Narrative": {
        "css": [
            "narrative-theme",
            "narrative__",
            "narrative-",
            "narrative-header",
            "narrative",
            "narrative",
            "theme-narrative",
            ".narrative",
            "#narrative"
        ],
        "js": [
            "narrative.js",
            "narrative.theme.js",
            "narrative.min.js",
            "theme-narrative.js",
            "narrative.js",
            "window.Narrative",
            "narrative-scripts"
        ],
        "html": [
            "\"Narrative\"",
            "\"theme_name\":\"Narrative\"",
            "narrative-theme",
            "data-narrative",
            "class=\"narrative\"",
            "data-theme-name=\"Narrative\"",
            "theme-narrative",
            "id=\"narrative\""
        ],
        "paths": [
            "/assets/narrative",
            "/assets/narrative",
            "/t/narrative/assets/",
            "/cdn/shop/t/narrative/assets/",
            "/narrative/assets/",
            "/assets/theme-narrative"
        ]
    },
    "Neat": {
        "css": [
            "neat-theme",
            "neat__",
            "neat-",
            "neat-header",
            "neat",
            "neat",
            "theme-neat",
            ".neat",
            "#neat"
        ],
        "js": [
            "neat.js",
            "neat.theme.js",
            "neat.min.js",
            "theme-neat.js",
            "neat.js",
            "window.Neat",
            "neat-scripts"
        ],
        "html": [
            "\"Neat\"",
            "\"theme_name\":\"Neat\"",
            "neat-theme",
            "data-neat",
            "class=\"neat\"",
            "data-theme-name=\"Neat\"",
            "theme-neat",
            "id=\"neat\""
        ],
        "paths": [
            "/assets/neat",
            "/assets/neat",
            "/t/neat/assets/",
            "/cdn/shop/t/neat/assets/",
            "/neat/assets/",
            "/assets/theme-neat"
        ]
    },
    "Nexa": {
        "css": [
            "nexa-theme",
            "nexa__",
            "nexa-",
            "nexa-header",
            "nexa",
            "nexa",
            "theme-nexa",
            ".nexa",
            "#nexa"
        ],
        "js": [
            "nexa.js",
            "nexa.theme.js",
            "nexa.min.js",
            "theme-nexa.js",
            "nexa.js",
            "window.Nexa",
            "nexa-scripts"
        ],
        "html": [
            "\"Nexa\"",
            "\"theme_name\":\"Nexa\"",
            "nexa-theme",
            "data-nexa",
            "class=\"nexa\"",
            "data-theme-name=\"Nexa\"",
            "theme-nexa",
            "id=\"nexa\""
        ],
        "paths": [
            "/assets/nexa",
            "/assets/nexa",
            "/t/nexa/assets/",
            "/cdn/shop/t/nexa/assets/",
            "/nexa/assets/",
            "/assets/theme-nexa"
        ]
    },
    "Next": {
        "css": [
            "next-theme",
            "next__",
            "next-",
            "next-header",
            "next",
            "next",
            "theme-next",
            ".next",
            "#next"
        ],
        "js": [
            "next.js",
            "next.theme.js",
            "next.min.js",
            "theme-next.js",
            "next.js",
            "window.Next",
            "next-scripts"
        ],
        "html": [
            "\"Next\"",
            "\"theme_name\":\"Next\"",
            "next-theme",
            "data-next",
            "class=\"next\"",
            "data-theme-name=\"Next\"",
            "theme-next",
            "id=\"next\""
        ],
        "paths": [
            "/assets/next",
            "/assets/next",
            "/t/next/assets/",
            "/cdn/shop/t/next/assets/",
            "/next/assets/",
            "/assets/theme-next"
        ]
    },
    "Nimbus": {
        "css": [
            "nimbus-theme",
            "nimbus__",
            "nimbus-",
            "nimbus-header",
            "nimbus",
            "nimbus",
            "theme-nimbus",
            ".nimbus",
            "#nimbus"
        ],
        "js": [
            "nimbus.js",
            "nimbus.theme.js",
            "nimbus.min.js",
            "theme-nimbus.js",
            "nimbus.js",
            "window.Nimbus",
            "nimbus-scripts"
        ],
        "html": [
            "\"Nimbus\"",
            "\"theme_name\":\"Nimbus\"",
            "nimbus-theme",
            "data-nimbus",
            "class=\"nimbus\"",
            "data-theme-name=\"Nimbus\"",
            "theme-nimbus",
            "id=\"nimbus\""
        ],
        "paths": [
            "/assets/nimbus",
            "/assets/nimbus",
            "/t/nimbus/assets/",
            "/cdn/shop/t/nimbus/assets/",
            "/nimbus/assets/",
            "/assets/theme-nimbus"
        ]
    },
    "Noblesse": {
        "css": [
            "noblesse-theme",
            "noblesse__",
            "noblesse-",
            "noblesse-header",
            "noblesse",
            "noblesse",
            "theme-noblesse",
            ".noblesse",
            "#noblesse"
        ],
        "js": [
            "noblesse.js",
            "noblesse.theme.js",
            "noblesse.min.js",
            "theme-noblesse.js",
            "noblesse.js",
            "window.Noblesse",
            "noblesse-scripts"
        ],
        "html": [
            "\"Noblesse\"",
            "\"theme_name\":\"Noblesse\"",
            "noblesse-theme",
            "data-noblesse",
            "class=\"noblesse\"",
            "data-theme-name=\"Noblesse\"",
            "theme-noblesse",
            "id=\"noblesse\""
        ],
        "paths": [
            "/assets/noblesse",
            "/assets/noblesse",
            "/t/noblesse/assets/",
            "/cdn/shop/t/noblesse/assets/",
            "/noblesse/assets/",
            "/assets/theme-noblesse"
        ]
    },
    "Noire": {
        "css": [
            "noire-theme",
            "noire__",
            "noire-",
            "noire-header",
            "noire",
            "noire",
            "theme-noire",
            ".noire",
            "#noire"
        ],
        "js": [
            "noire.js",
            "noire.theme.js",
            "noire.min.js",
            "theme-noire.js",
            "noire.js",
            "window.Noire",
            "noire-scripts"
        ],
        "html": [
            "\"Noire\"",
            "\"theme_name\":\"Noire\"",
            "noire-theme",
            "data-noire",
            "class=\"noire\"",
            "data-theme-name=\"Noire\"",
            "theme-noire",
            "id=\"noire\""
        ],
        "paths": [
            "/assets/noire",
            "/assets/noire",
            "/t/noire/assets/",
            "/cdn/shop/t/noire/assets/",
            "/noire/assets/",
            "/assets/theme-noire"
        ]
    },
    "Nordic": {
        "css": [
            "nordic-theme",
            "nordic__",
            "nordic-",
            "nordic-header",
            "nordic",
            "nordic",
            "theme-nordic",
            ".nordic",
            "#nordic"
        ],
        "js": [
            "nordic.js",
            "nordic.theme.js",
            "nordic.min.js",
            "theme-nordic.js",
            "nordic.js",
            "window.Nordic",
            "nordic-scripts"
        ],
        "html": [
            "\"Nordic\"",
            "\"theme_name\":\"Nordic\"",
            "nordic-theme",
            "data-nordic",
            "class=\"nordic\"",
            "data-theme-name=\"Nordic\"",
            "theme-nordic",
            "id=\"nordic\""
        ],
        "paths": [
            "/assets/nordic",
            "/assets/nordic",
            "/t/nordic/assets/",
            "/cdn/shop/t/nordic/assets/",
            "/nordic/assets/",
            "/assets/theme-nordic"
        ]
    },
    "Normcore": {
        "css": [
            "normcore-theme",
            "normcore__",
            "normcore-",
            "normcore-header",
            "normcore",
            "normcore",
            "theme-normcore",
            ".normcore",
            "#normcore"
        ],
        "js": [
            "normcore.js",
            "normcore.theme.js",
            "normcore.min.js",
            "theme-normcore.js",
            "normcore.js",
            "window.Normcore",
            "normcore-scripts"
        ],
        "html": [
            "\"Normcore\"",
            "\"theme_name\":\"Normcore\"",
            "normcore-theme",
            "data-normcore",
            "class=\"normcore\"",
            "data-theme-name=\"Normcore\"",
            "theme-normcore",
            "id=\"normcore\""
        ],
        "paths": [
            "/assets/normcore",
            "/assets/normcore",
            "/t/normcore/assets/",
            "/cdn/shop/t/normcore/assets/",
            "/normcore/assets/",
            "/assets/theme-normcore"
        ]
    },
    "North": {
        "css": [
            "north-theme",
            "north__",
            "north-",
            "north-header",
            "north",
            "north",
            "theme-north",
            ".north",
            "#north"
        ],
        "js": [
            "north.js",
            "north.theme.js",
            "north.min.js",
            "theme-north.js",
            "north.js",
            "window.North",
            "north-scripts"
        ],
        "html": [
            "\"North\"",
            "\"theme_name\":\"North\"",
            "north-theme",
            "data-north",
            "class=\"north\"",
            "data-theme-name=\"North\"",
            "theme-north",
            "id=\"north\""
        ],
        "paths": [
            "/assets/north",
            "/assets/north",
            "/t/north/assets/",
            "/cdn/shop/t/north/assets/",
            "/north/assets/",
            "/assets/theme-north"
        ]
    },
    "Nostalgia": {
        "css": [
            "nostalgia-theme",
            "nostalgia__",
            "nostalgia-",
            "nostalgia-header",
            "nostalgia",
            "nostalgia",
            "theme-nostalgia",
            ".nostalgia",
            "#nostalgia"
        ],
        "js": [
            "nostalgia.js",
            "nostalgia.theme.js",
            "nostalgia.min.js",
            "theme-nostalgia.js",
            "nostalgia.js",
            "window.Nostalgia",
            "nostalgia-scripts"
        ],
        "html": [
            "\"Nostalgia\"",
            "\"theme_name\":\"Nostalgia\"",
            "nostalgia-theme",
            "data-nostalgia",
            "class=\"nostalgia\"",
            "data-theme-name=\"Nostalgia\"",
            "theme-nostalgia",
            "id=\"nostalgia\""
        ],
        "paths": [
            "/assets/nostalgia",
            "/assets/nostalgia",
            "/t/nostalgia/assets/",
            "/cdn/shop/t/nostalgia/assets/",
            "/nostalgia/assets/",
            "/assets/theme-nostalgia"
        ]
    },
    "Nova": {
        "css": [
            "nova-theme",
            "nova__",
            "nova-",
            "nova-header",
            "nova",
            "nova",
            "theme-nova",
            ".nova",
            "#nova"
        ],
        "js": [
            "nova.js",
            "nova.theme.js",
            "nova.min.js",
            "theme-nova.js",
            "nova.js",
            "window.Nova",
            "nova-scripts"
        ],
        "html": [
            "\"Nova\"",
            "\"theme_name\":\"Nova\"",
            "nova-theme",
            "data-nova",
            "class=\"nova\"",
            "data-theme-name=\"Nova\"",
            "theme-nova",
            "id=\"nova\""
        ],
        "paths": [
            "/assets/nova",
            "/assets/nova",
            "/t/nova/assets/",
            "/cdn/shop/t/nova/assets/",
            "/nova/assets/",
            "/assets/theme-nova"
        ]
    },
    "Origin": {
        "css": [
            "origin-theme",
            "origin__",
            "origin-",
            "origin-header",
            "origin",
            "origin",
            "theme-origin",
            ".origin",
            "#origin"
        ],
        "js": [
            "origin.js",
            "origin.theme.js",
            "origin.min.js",
            "theme-origin.js",
            "origin.js",
            "window.Origin",
            "origin-scripts"
        ],
        "html": [
            "\"Origin\"",
            "\"theme_name\":\"Origin\"",
            "origin-theme",
            "data-origin",
            "class=\"origin\"",
            "data-theme-name=\"Origin\"",
            "theme-origin",
            "id=\"origin\""
        ],
        "paths": [
            "/assets/origin",
            "/assets/origin",
            "/t/origin/assets/",
            "/cdn/shop/t/origin/assets/",
            "/origin/assets/",
            "/assets/theme-origin"
        ]
    },
    "Outsiders": {
        "css": [
            "outsiders-theme",
            "outsiders__",
            "outsiders-",
            "outsiders-header",
            "outsiders",
            "outsiders",
            "theme-outsiders",
            ".outsiders",
            "#outsiders"
        ],
        "js": [
            "outsiders.js",
            "outsiders.theme.js",
            "outsiders.min.js",
            "theme-outsiders.js",
            "outsiders.js",
            "window.Outsiders",
            "outsiders-scripts"
        ],
        "html": [
            "\"Outsiders\"",
            "\"theme_name\":\"Outsiders\"",
            "outsiders-theme",
            "data-outsiders",
            "class=\"outsiders\"",
            "data-theme-name=\"Outsiders\"",
            "theme-outsiders",
            "id=\"outsiders\""
        ],
        "paths": [
            "/assets/outsiders",
            "/assets/outsiders",
            "/t/outsiders/assets/",
            "/cdn/shop/t/outsiders/assets/",
            "/outsiders/assets/",
            "/assets/theme-outsiders"
        ]
    },
    "Pacific": {
        "css": [
            "pacific-theme",
            "pacific__",
            "pacific-",
            "pacific-header",
            "pacific",
            "pacific",
            "theme-pacific",
            ".pacific",
            "#pacific"
        ],
        "js": [
            "pacific.js",
            "pacific.theme.js",
            "pacific.min.js",
            "theme-pacific.js",
            "pacific.js",
            "window.Pacific",
            "pacific-scripts"
        ],
        "html": [
            "\"Pacific\"",
            "\"theme_name\":\"Pacific\"",
            "pacific-theme",
            "data-pacific",
            "class=\"pacific\"",
            "data-theme-name=\"Pacific\"",
            "theme-pacific",
            "id=\"pacific\""
        ],
        "paths": [
            "/assets/pacific",
            "/assets/pacific",
            "/t/pacific/assets/",
            "/cdn/shop/t/pacific/assets/",
            "/pacific/assets/",
            "/assets/theme-pacific"
        ]
    },
    "Palo Alto": {
        "css": [
            "palo alto-theme",
            "palo alto__",
            "palo alto-",
            "palo alto-header",
            "palo alto",
            "paloalto",
            "theme-palo alto",
            ".palo alto",
            "#palo alto"
        ],
        "js": [
            "palo alto.js",
            "palo alto.theme.js",
            "palo alto.min.js",
            "theme-palo alto.js",
            "paloalto.js",
            "window.Palo Alto",
            "palo alto-scripts"
        ],
        "html": [
            "\"Palo Alto\"",
            "\"theme_name\":\"Palo Alto\"",
            "palo alto-theme",
            "data-palo alto",
            "class=\"palo alto\"",
            "data-theme-name=\"Palo Alto\"",
            "theme-palo alto",
            "id=\"palo alto\""
        ],
        "paths": [
            "/assets/palo alto",
            "/assets/paloalto",
            "/t/palo alto/assets/",
            "/cdn/shop/t/palo alto/assets/",
            "/palo alto/assets/",
            "/assets/theme-palo alto"
        ]
    },
    "Paper": {
        "css": [
            "paper-theme",
            "paper__",
            "paper-",
            "paper-header",
            "paper",
            "paper",
            "theme-paper",
            ".paper",
            "#paper"
        ],
        "js": [
            "paper.js",
            "paper.theme.js",
            "paper.min.js",
            "theme-paper.js",
            "paper.js",
            "window.Paper",
            "paper-scripts"
        ],
        "html": [
            "\"Paper\"",
            "\"theme_name\":\"Paper\"",
            "paper-theme",
            "data-paper",
            "class=\"paper\"",
            "data-theme-name=\"Paper\"",
            "theme-paper",
            "id=\"paper\""
        ],
        "paths": [
            "/assets/paper",
            "/assets/paper",
            "/t/paper/assets/",
            "/cdn/shop/t/paper/assets/",
            "/paper/assets/",
            "/assets/theme-paper"
        ]
    },
    "Parallax": {
        "css": [
            "parallax-theme",
            "parallax__",
            "parallax-",
            "parallax-header",
            "parallax",
            "parallax",
            "theme-parallax",
            ".parallax",
            "#parallax"
        ],
        "js": [
            "parallax.js",
            "parallax.theme.js",
            "parallax.min.js",
            "theme-parallax.js",
            "parallax.js",
            "window.Parallax",
            "parallax-scripts"
        ],
        "html": [
            "\"Parallax\"",
            "\"theme_name\":\"Parallax\"",
            "parallax-theme",
            "data-parallax",
            "class=\"parallax\"",
            "data-theme-name=\"Parallax\"",
            "theme-parallax",
            "id=\"parallax\""
        ],
        "paths": [
            "/assets/parallax",
            "/assets/parallax",
            "/t/parallax/assets/",
            "/cdn/shop/t/parallax/assets/",
            "/parallax/assets/",
            "/assets/theme-parallax"
        ]
    },
    "Paris": {
        "css": [
            "paris-theme",
            "paris__",
            "paris-",
            "paris-header",
            "paris",
            "paris",
            "theme-paris",
            ".paris",
            "#paris"
        ],
        "js": [
            "paris.js",
            "paris.theme.js",
            "paris.min.js",
            "theme-paris.js",
            "paris.js",
            "window.Paris",
            "paris-scripts"
        ],
        "html": [
            "\"Paris\"",
            "\"theme_name\":\"Paris\"",
            "paris-theme",
            "data-paris",
            "class=\"paris\"",
            "data-theme-name=\"Paris\"",
            "theme-paris",
            "id=\"paris\""
        ],
        "paths": [
            "/assets/paris",
            "/assets/paris",
            "/t/paris/assets/",
            "/cdn/shop/t/paris/assets/",
            "/paris/assets/",
            "/assets/theme-paris"
        ]
    },
    "Pesto": {
        "css": [
            "pesto-theme",
            "pesto__",
            "pesto-",
            "pesto-header",
            "pesto",
            "pesto",
            "theme-pesto",
            ".pesto",
            "#pesto"
        ],
        "js": [
            "pesto.js",
            "pesto.theme.js",
            "pesto.min.js",
            "theme-pesto.js",
            "pesto.js",
            "window.Pesto",
            "pesto-scripts"
        ],
        "html": [
            "\"Pesto\"",
            "\"theme_name\":\"Pesto\"",
            "pesto-theme",
            "data-pesto",
            "class=\"pesto\"",
            "data-theme-name=\"Pesto\"",
            "theme-pesto",
            "id=\"pesto\""
        ],
        "paths": [
            "/assets/pesto",
            "/assets/pesto",
            "/t/pesto/assets/",
            "/cdn/shop/t/pesto/assets/",
            "/pesto/assets/",
            "/assets/theme-pesto"
        ]
    },
    "Piano": {
        "css": [
            "piano-theme",
            "piano__",
            "piano-",
            "piano-header",
            "piano",
            "piano",
            "theme-piano",
            ".piano",
            "#piano"
        ],
        "js": [
            "piano.js",
            "piano.theme.js",
            "piano.min.js",
            "theme-piano.js",
            "piano.js",
            "window.Piano",
            "piano-scripts"
        ],
        "html": [
            "\"Piano\"",
            "\"theme_name\":\"Piano\"",
            "piano-theme",
            "data-piano",
            "class=\"piano\"",
            "data-theme-name=\"Piano\"",
            "theme-piano",
            "id=\"piano\""
        ],
        "paths": [
            "/assets/piano",
            "/assets/piano",
            "/t/piano/assets/",
            "/cdn/shop/t/piano/assets/",
            "/piano/assets/",
            "/assets/theme-piano"
        ]
    },
    "Pinnacle": {
        "css": [
            "pinnacle-theme",
            "pinnacle__",
            "pinnacle-",
            "pinnacle-header",
            "pinnacle",
            "pinnacle",
            "theme-pinnacle",
            ".pinnacle",
            "#pinnacle"
        ],
        "js": [
            "pinnacle.js",
            "pinnacle.theme.js",
            "pinnacle.min.js",
            "theme-pinnacle.js",
            "pinnacle.js",
            "window.Pinnacle",
            "pinnacle-scripts"
        ],
        "html": [
            "\"Pinnacle\"",
            "\"theme_name\":\"Pinnacle\"",
            "pinnacle-theme",
            "data-pinnacle",
            "class=\"pinnacle\"",
            "data-theme-name=\"Pinnacle\"",
            "theme-pinnacle",
            "id=\"pinnacle\""
        ],
        "paths": [
            "/assets/pinnacle",
            "/assets/pinnacle",
            "/t/pinnacle/assets/",
            "/cdn/shop/t/pinnacle/assets/",
            "/pinnacle/assets/",
            "/assets/theme-pinnacle"
        ]
    },
    "Pipeline": {
        "css": [
            "pipeline-theme",
            "pipeline__",
            "pipeline-",
            "pipeline-header",
            "pipeline",
            "pipeline",
            "theme-pipeline",
            ".pipeline",
            "#pipeline"
        ],
        "js": [
            "pipeline.js",
            "pipeline.theme.js",
            "pipeline.min.js",
            "theme-pipeline.js",
            "pipeline.js",
            "window.Pipeline",
            "pipeline-scripts"
        ],
        "html": [
            "\"Pipeline\"",
            "\"theme_name\":\"Pipeline\"",
            "pipeline-theme",
            "data-pipeline",
            "class=\"pipeline\"",
            "data-theme-name=\"Pipeline\"",
            "theme-pipeline",
            "id=\"pipeline\""
        ],
        "paths": [
            "/assets/pipeline",
            "/assets/pipeline",
            "/t/pipeline/assets/",
            "/cdn/shop/t/pipeline/assets/",
            "/pipeline/assets/",
            "/assets/theme-pipeline"
        ]
    },
    "Pitch": {
        "css": [
            "pitch-theme",
            "pitch__",
            "pitch-",
            "pitch-header",
            "pitch",
            "pitch",
            "theme-pitch",
            ".pitch",
            "#pitch"
        ],
        "js": [
            "pitch.js",
            "pitch.theme.js",
            "pitch.min.js",
            "theme-pitch.js",
            "pitch.js",
            "window.Pitch",
            "pitch-scripts"
        ],
        "html": [
            "\"Pitch\"",
            "\"theme_name\":\"Pitch\"",
            "pitch-theme",
            "data-pitch",
            "class=\"pitch\"",
            "data-theme-name=\"Pitch\"",
            "theme-pitch",
            "id=\"pitch\""
        ],
        "paths": [
            "/assets/pitch",
            "/assets/pitch",
            "/t/pitch/assets/",
            "/cdn/shop/t/pitch/assets/",
            "/pitch/assets/",
            "/assets/theme-pitch"
        ]
    },
    "Polyform": {
        "css": [
            "polyform-theme",
            "polyform__",
            "polyform-",
            "polyform-header",
            "polyform",
            "polyform",
            "theme-polyform",
            ".polyform",
            "#polyform"
        ],
        "js": [
            "polyform.js",
            "polyform.theme.js",
            "polyform.min.js",
            "theme-polyform.js",
            "polyform.js",
            "window.Polyform",
            "polyform-scripts"
        ],
        "html": [
            "\"Polyform\"",
            "\"theme_name\":\"Polyform\"",
            "polyform-theme",
            "data-polyform",
            "class=\"polyform\"",
            "data-theme-name=\"Polyform\"",
            "theme-polyform",
            "id=\"polyform\""
        ],
        "paths": [
            "/assets/polyform",
            "/assets/polyform",
            "/t/polyform/assets/",
            "/cdn/shop/t/polyform/assets/",
            "/polyform/assets/",
            "/assets/theme-polyform"
        ]
    },
    "Portland": {
        "css": [
            "portland-theme",
            "portland__",
            "portland-",
            "portland-header",
            "portland",
            "portland",
            "theme-portland",
            ".portland",
            "#portland"
        ],
        "js": [
            "portland.js",
            "portland.theme.js",
            "portland.min.js",
            "theme-portland.js",
            "portland.js",
            "window.Portland",
            "portland-scripts"
        ],
        "html": [
            "\"Portland\"",
            "\"theme_name\":\"Portland\"",
            "portland-theme",
            "data-portland",
            "class=\"portland\"",
            "data-theme-name=\"Portland\"",
            "theme-portland",
            "id=\"portland\""
        ],
        "paths": [
            "/assets/portland",
            "/assets/portland",
            "/t/portland/assets/",
            "/cdn/shop/t/portland/assets/",
            "/portland/assets/",
            "/assets/theme-portland"
        ]
    },
    "Praise": {
        "css": [
            "praise-theme",
            "praise__",
            "praise-",
            "praise-header",
            "praise",
            "praise",
            "theme-praise",
            ".praise",
            "#praise"
        ],
        "js": [
            "praise.js",
            "praise.theme.js",
            "praise.min.js",
            "theme-praise.js",
            "praise.js",
            "window.Praise",
            "praise-scripts"
        ],
        "html": [
            "\"Praise\"",
            "\"theme_name\":\"Praise\"",
            "praise-theme",
            "data-praise",
            "class=\"praise\"",
            "data-theme-name=\"Praise\"",
            "theme-praise",
            "id=\"praise\""
        ],
        "paths": [
            "/assets/praise",
            "/assets/praise",
            "/t/praise/assets/",
            "/cdn/shop/t/praise/assets/",
            "/praise/assets/",
            "/assets/theme-praise"
        ]
    },
    "Prestige": {
        "css": [
            "prestige-theme",
            "prestige__",
            "prestige-",
            "prestige-header",
            "prestige",
            "prestige",
            "theme-prestige",
            ".prestige",
            "#prestige"
        ],
        "js": [
            "prestige.js",
            "prestige.theme.js",
            "prestige.min.js",
            "theme-prestige.js",
            "prestige.js",
            "window.Prestige",
            "prestige-scripts"
        ],
        "html": [
            "\"Prestige\"",
            "\"theme_name\":\"Prestige\"",
            "prestige-theme",
            "data-prestige",
            "class=\"prestige\"",
            "data-theme-name=\"Prestige\"",
            "theme-prestige",
            "id=\"prestige\""
        ],
        "paths": [
            "/assets/prestige",
            "/assets/prestige",
            "/t/prestige/assets/",
            "/cdn/shop/t/prestige/assets/",
            "/prestige/assets/",
            "/assets/theme-prestige"
        ]
    },
    "Primavera": {
        "css": [
            "primavera-theme",
            "primavera__",
            "primavera-",
            "primavera-header",
            "primavera",
            "primavera",
            "theme-primavera",
            ".primavera",
            "#primavera"
        ],
        "js": [
            "primavera.js",
            "primavera.theme.js",
            "primavera.min.js",
            "theme-primavera.js",
            "primavera.js",
            "window.Primavera",
            "primavera-scripts"
        ],
        "html": [
            "\"Primavera\"",
            "\"theme_name\":\"Primavera\"",
            "primavera-theme",
            "data-primavera",
            "class=\"primavera\"",
            "data-theme-name=\"Primavera\"",
            "theme-primavera",
            "id=\"primavera\""
        ],
        "paths": [
            "/assets/primavera",
            "/assets/primavera",
            "/t/primavera/assets/",
            "/cdn/shop/t/primavera/assets/",
            "/primavera/assets/",
            "/assets/theme-primavera"
        ]
    },
    "Providence": {
        "css": [
            "providence-theme",
            "providence__",
            "providence-",
            "providence-header",
            "providence",
            "providence",
            "theme-providence",
            ".providence",
            "#providence"
        ],
        "js": [
            "providence.js",
            "providence.theme.js",
            "providence.min.js",
            "theme-providence.js",
            "providence.js",
            "window.Providence",
            "providence-scripts"
        ],
        "html": [
            "\"Providence\"",
            "\"theme_name\":\"Providence\"",
            "providence-theme",
            "data-providence",
            "class=\"providence\"",
            "data-theme-name=\"Providence\"",
            "theme-providence",
            "id=\"providence\""
        ],
        "paths": [
            "/assets/providence",
            "/assets/providence",
            "/t/providence/assets/",
            "/cdn/shop/t/providence/assets/",
            "/providence/assets/",
            "/assets/theme-providence"
        ]
    },
    "Publisher": {
        "css": [
            "publisher-theme",
            "publisher__",
            "publisher-",
            "publisher-header",
            "publisher",
            "publisher",
            "theme-publisher",
            ".publisher",
            "#publisher"
        ],
        "js": [
            "publisher.js",
            "publisher.theme.js",
            "publisher.min.js",
            "theme-publisher.js",
            "publisher.js",
            "window.Publisher",
            "publisher-scripts"
        ],
        "html": [
            "\"Publisher\"",
            "\"theme_name\":\"Publisher\"",
            "publisher-theme",
            "data-publisher",
            "class=\"publisher\"",
            "data-theme-name=\"Publisher\"",
            "theme-publisher",
            "id=\"publisher\""
        ],
        "paths": [
            "/assets/publisher",
            "/assets/publisher",
            "/t/publisher/assets/",
            "/cdn/shop/t/publisher/assets/",
            "/publisher/assets/",
            "/assets/theme-publisher"
        ]
    },
    "Purely": {
        "css": [
            "purely-theme",
            "purely__",
            "purely-",
            "purely-header",
            "purely",
            "purely",
            "theme-purely",
            ".purely",
            "#purely"
        ],
        "js": [
            "purely.js",
            "purely.theme.js",
            "purely.min.js",
            "theme-purely.js",
            "purely.js",
            "window.Purely",
            "purely-scripts"
        ],
        "html": [
            "\"Purely\"",
            "\"theme_name\":\"Purely\"",
            "purely-theme",
            "data-purely",
            "class=\"purely\"",
            "data-theme-name=\"Purely\"",
            "theme-purely",
            "id=\"purely\""
        ],
        "paths": [
            "/assets/purely",
            "/assets/purely",
            "/t/purely/assets/",
            "/cdn/shop/t/purely/assets/",
            "/purely/assets/",
            "/assets/theme-purely"
        ]
    },
    "Pursuit": {
        "css": [
            "pursuit-theme",
            "pursuit__",
            "pursuit-",
            "pursuit-header",
            "pursuit",
            "pursuit",
            "theme-pursuit",
            ".pursuit",
            "#pursuit"
        ],
        "js": [
            "pursuit.js",
            "pursuit.theme.js",
            "pursuit.min.js",
            "theme-pursuit.js",
            "pursuit.js",
            "window.Pursuit",
            "pursuit-scripts"
        ],
        "html": [
            "\"Pursuit\"",
            "\"theme_name\":\"Pursuit\"",
            "pursuit-theme",
            "data-pursuit",
            "class=\"pursuit\"",
            "data-theme-name=\"Pursuit\"",
            "theme-pursuit",
            "id=\"pursuit\""
        ],
        "paths": [
            "/assets/pursuit",
            "/assets/pursuit",
            "/t/pursuit/assets/",
            "/cdn/shop/t/pursuit/assets/",
            "/pursuit/assets/",
            "/assets/theme-pursuit"
        ]
    },
    "Reach": {
        "css": [
            "reach-theme",
            "reach__",
            "reach-",
            "reach-header",
            "reach",
            "reach",
            "theme-reach",
            ".reach",
            "#reach"
        ],
        "js": [
            "reach.js",
            "reach.theme.js",
            "reach.min.js",
            "theme-reach.js",
            "reach.js",
            "window.Reach",
            "reach-scripts"
        ],
        "html": [
            "\"Reach\"",
            "\"theme_name\":\"Reach\"",
            "reach-theme",
            "data-reach",
            "class=\"reach\"",
            "data-theme-name=\"Reach\"",
            "theme-reach",
            "id=\"reach\""
        ],
        "paths": [
            "/assets/reach",
            "/assets/reach",
            "/t/reach/assets/",
            "/cdn/shop/t/reach/assets/",
            "/reach/assets/",
            "/assets/theme-reach"
        ]
    },
    "Redefine": {
        "css": [
            "redefine-theme",
            "redefine__",
            "redefine-",
            "redefine-header",
            "redefine",
            "redefine",
            "theme-redefine",
            ".redefine",
            "#redefine"
        ],
        "js": [
            "redefine.js",
            "redefine.theme.js",
            "redefine.min.js",
            "theme-redefine.js",
            "redefine.js",
            "window.Redefine",
            "redefine-scripts"
        ],
        "html": [
            "\"Redefine\"",
            "\"theme_name\":\"Redefine\"",
            "redefine-theme",
            "data-redefine",
            "class=\"redefine\"",
            "data-theme-name=\"Redefine\"",
            "theme-redefine",
            "id=\"redefine\""
        ],
        "paths": [
            "/assets/redefine",
            "/assets/redefine",
            "/t/redefine/assets/",
            "/cdn/shop/t/redefine/assets/",
            "/redefine/assets/",
            "/assets/theme-redefine"
        ]
    },
    "Refine": {
        "css": [
            "refine-theme",
            "refine__",
            "refine-",
            "refine-header",
            "refine",
            "refine",
            "theme-refine",
            ".refine",
            "#refine"
        ],
        "js": [
            "refine.js",
            "refine.theme.js",
            "refine.min.js",
            "theme-refine.js",
            "refine.js",
            "window.Refine",
            "refine-scripts"
        ],
        "html": [
            "\"Refine\"",
            "\"theme_name\":\"Refine\"",
            "refine-theme",
            "data-refine",
            "class=\"refine\"",
            "data-theme-name=\"Refine\"",
            "theme-refine",
            "id=\"refine\""
        ],
        "paths": [
            "/assets/refine",
            "/assets/refine",
            "/t/refine/assets/",
            "/cdn/shop/t/refine/assets/",
            "/refine/assets/",
            "/assets/theme-refine"
        ]
    },
    "Reformation": {
        "css": [
            "reformation-theme",
            "reformation__",
            "reformation-",
            "reformation-header",
            "reformation",
            "reformation",
            "theme-reformation",
            ".reformation",
            "#reformation"
        ],
        "js": [
            "reformation.js",
            "reformation.theme.js",
            "reformation.min.js",
            "theme-reformation.js",
            "reformation.js",
            "window.Reformation",
            "reformation-scripts"
        ],
        "html": [
            "\"Reformation\"",
            "\"theme_name\":\"Reformation\"",
            "reformation-theme",
            "data-reformation",
            "class=\"reformation\"",
            "data-theme-name=\"Reformation\"",
            "theme-reformation",
            "id=\"reformation\""
        ],
        "paths": [
            "/assets/reformation",
            "/assets/reformation",
            "/t/reformation/assets/",
            "/cdn/shop/t/reformation/assets/",
            "/reformation/assets/",
            "/assets/theme-reformation"
        ]
    },
    "Refresh": {
        "css": [
            "refresh-theme",
            "refresh__",
            "refresh-",
            "refresh-header",
            "refresh",
            "refresh",
            "theme-refresh",
            ".refresh",
            "#refresh"
        ],
        "js": [
            "refresh.js",
            "refresh.theme.js",
            "refresh.min.js",
            "theme-refresh.js",
            "refresh.js",
            "window.Refresh",
            "refresh-scripts"
        ],
        "html": [
            "\"Refresh\"",
            "\"theme_name\":\"Refresh\"",
            "refresh-theme",
            "data-refresh",
            "class=\"refresh\"",
            "data-theme-name=\"Refresh\"",
            "theme-refresh",
            "id=\"refresh\""
        ],
        "paths": [
            "/assets/refresh",
            "/assets/refresh",
            "/t/refresh/assets/",
            "/cdn/shop/t/refresh/assets/",
            "/refresh/assets/",
            "/assets/theme-refresh"
        ]
    },
    "Relax": {
        "css": [
            "relax-theme",
            "relax__",
            "relax-",
            "relax-header",
            "relax",
            "relax",
            "theme-relax",
            ".relax",
            "#relax"
        ],
        "js": [
            "relax.js",
            "relax.theme.js",
            "relax.min.js",
            "theme-relax.js",
            "relax.js",
            "window.Relax",
            "relax-scripts"
        ],
        "html": [
            "\"Relax\"",
            "\"theme_name\":\"Relax\"",
            "relax-theme",
            "data-relax",
            "class=\"relax\"",
            "data-theme-name=\"Relax\"",
            "theme-relax",
            "id=\"relax\""
        ],
        "paths": [
            "/assets/relax",
            "/assets/relax",
            "/t/relax/assets/",
            "/cdn/shop/t/relax/assets/",
            "/relax/assets/",
            "/assets/theme-relax"
        ]
    },
    "Release": {
        "css": [
            "release-theme",
            "release__",
            "release-",
            "release-header",
            "release",
            "release",
            "theme-release",
            ".release",
            "#release"
        ],
        "js": [
            "release.js",
            "release.theme.js",
            "release.min.js",
            "theme-release.js",
            "release.js",
            "window.Release",
            "release-scripts"
        ],
        "html": [
            "\"Release\"",
            "\"theme_name\":\"Release\"",
            "release-theme",
            "data-release",
            "class=\"release\"",
            "data-theme-name=\"Release\"",
            "theme-release",
            "id=\"release\""
        ],
        "paths": [
            "/assets/release",
            "/assets/release",
            "/t/release/assets/",
            "/cdn/shop/t/release/assets/",
            "/release/assets/",
            "/assets/theme-release"
        ]
    },
    "Responsive": {
        "css": [
            "responsive-theme",
            "responsive__",
            "responsive-",
            "responsive-header",
            "responsive",
            "responsive",
            "theme-responsive",
            ".responsive",
            "#responsive"
        ],
        "js": [
            "responsive.js",
            "responsive.theme.js",
            "responsive.min.js",
            "theme-responsive.js",
            "responsive.js",
            "window.Responsive",
            "responsive-scripts"
        ],
        "html": [
            "\"Responsive\"",
            "\"theme_name\":\"Responsive\"",
            "responsive-theme",
            "data-responsive",
            "class=\"responsive\"",
            "data-theme-name=\"Responsive\"",
            "theme-responsive",
            "id=\"responsive\""
        ],
        "paths": [
            "/assets/responsive",
            "/assets/responsive",
            "/t/responsive/assets/",
            "/cdn/shop/t/responsive/assets/",
            "/responsive/assets/",
            "/assets/theme-responsive"
        ]
    },
    "Retina": {
        "css": [
            "retina-theme",
            "retina__",
            "retina-",
            "retina-header",
            "retina",
            "retina",
            "theme-retina",
            ".retina",
            "#retina"
        ],
        "js": [
            "retina.js",
            "retina.theme.js",
            "retina.min.js",
            "theme-retina.js",
            "retina.js",
            "window.Retina",
            "retina-scripts"
        ],
        "html": [
            "\"Retina\"",
            "\"theme_name\":\"Retina\"",
            "retina-theme",
            "data-retina",
            "class=\"retina\"",
            "data-theme-name=\"Retina\"",
            "theme-retina",
            "id=\"retina\""
        ],
        "paths": [
            "/assets/retina",
            "/assets/retina",
            "/t/retina/assets/",
            "/cdn/shop/t/retina/assets/",
            "/retina/assets/",
            "/assets/theme-retina"
        ]
    },
    "Retro": {
        "css": [
            "retro-theme",
            "retro__",
            "retro-",
            "retro-header",
            "retro",
            "retro",
            "theme-retro",
            ".retro",
            "#retro"
        ],
        "js": [
            "retro.js",
            "retro.theme.js",
            "retro.min.js",
            "theme-retro.js",
            "retro.js",
            "window.Retro",
            "retro-scripts"
        ],
        "html": [
            "\"Retro\"",
            "\"theme_name\":\"Retro\"",
            "retro-theme",
            "data-retro",
            "class=\"retro\"",
            "data-theme-name=\"Retro\"",
            "theme-retro",
            "id=\"retro\""
        ],
        "paths": [
            "/assets/retro",
            "/assets/retro",
            "/t/retro/assets/",
            "/cdn/shop/t/retro/assets/",
            "/retro/assets/",
            "/assets/theme-retro"
        ]
    },
    "Ride": {
        "css": [
            "ride-theme",
            "ride__",
            "ride-",
            "ride-header",
            "ride",
            "ride",
            "theme-ride",
            ".ride",
            "#ride"
        ],
        "js": [
            "ride.js",
            "ride.theme.js",
            "ride.min.js",
            "theme-ride.js",
            "ride.js",
            "window.Ride",
            "ride-scripts"
        ],
        "html": [
            "\"Ride\"",
            "\"theme_name\":\"Ride\"",
            "ride-theme",
            "data-ride",
            "class=\"ride\"",
            "data-theme-name=\"Ride\"",
            "theme-ride",
            "id=\"ride\""
        ],
        "paths": [
            "/assets/ride",
            "/assets/ride",
            "/t/ride/assets/",
            "/cdn/shop/t/ride/assets/",
            "/ride/assets/",
            "/assets/theme-ride"
        ]
    },
    "Ritual": {
        "css": [
            "ritual-theme",
            "ritual__",
            "ritual-",
            "ritual-header",
            "ritual",
            "ritual",
            "theme-ritual",
            ".ritual",
            "#ritual"
        ],
        "js": [
            "ritual.js",
            "ritual.theme.js",
            "ritual.min.js",
            "theme-ritual.js",
            "ritual.js",
            "window.Ritual",
            "ritual-scripts"
        ],
        "html": [
            "\"Ritual\"",
            "\"theme_name\":\"Ritual\"",
            "ritual-theme",
            "data-ritual",
            "class=\"ritual\"",
            "data-theme-name=\"Ritual\"",
            "theme-ritual",
            "id=\"ritual\""
        ],
        "paths": [
            "/assets/ritual",
            "/assets/ritual",
            "/t/ritual/assets/",
            "/cdn/shop/t/ritual/assets/",
            "/ritual/assets/",
            "/assets/theme-ritual"
        ]
    },
    "Roam": {
        "css": [
            "roam-theme",
            "roam__",
            "roam-",
            "roam-header",
            "roam",
            "roam",
            "theme-roam",
            ".roam",
            "#roam"
        ],
        "js": [
            "roam.js",
            "roam.theme.js",
            "roam.min.js",
            "theme-roam.js",
            "roam.js",
            "window.Roam",
            "roam-scripts"
        ],
        "html": [
            "\"Roam\"",
            "\"theme_name\":\"Roam\"",
            "roam-theme",
            "data-roam",
            "class=\"roam\"",
            "data-theme-name=\"Roam\"",
            "theme-roam",
            "id=\"roam\""
        ],
        "paths": [
            "/assets/roam",
            "/assets/roam",
            "/t/roam/assets/",
            "/cdn/shop/t/roam/assets/",
            "/roam/assets/",
            "/assets/theme-roam"
        ]
    },
    "Sahara": {
        "css": [
            "sahara-theme",
            "sahara__",
            "sahara-",
            "sahara-header",
            "sahara",
            "sahara",
            "theme-sahara",
            ".sahara",
            "#sahara"
        ],
        "js": [
            "sahara.js",
            "sahara.theme.js",
            "sahara.min.js",
            "theme-sahara.js",
            "sahara.js",
            "window.Sahara",
            "sahara-scripts"
        ],
        "html": [
            "\"Sahara\"",
            "\"theme_name\":\"Sahara\"",
            "sahara-theme",
            "data-sahara",
            "class=\"sahara\"",
            "data-theme-name=\"Sahara\"",
            "theme-sahara",
            "id=\"sahara\""
        ],
        "paths": [
            "/assets/sahara",
            "/assets/sahara",
            "/t/sahara/assets/",
            "/cdn/shop/t/sahara/assets/",
            "/sahara/assets/",
            "/assets/theme-sahara"
        ]
    },
    "Sampo": {
        "css": [
            "sampo-theme",
            "sampo__",
            "sampo-",
            "sampo-header",
            "sampo",
            "sampo",
            "theme-sampo",
            ".sampo",
            "#sampo"
        ],
        "js": [
            "sampo.js",
            "sampo.theme.js",
            "sampo.min.js",
            "theme-sampo.js",
            "sampo.js",
            "window.Sampo",
            "sampo-scripts"
        ],
        "html": [
            "\"Sampo\"",
            "\"theme_name\":\"Sampo\"",
            "sampo-theme",
            "data-sampo",
            "class=\"sampo\"",
            "data-theme-name=\"Sampo\"",
            "theme-sampo",
            "id=\"sampo\""
        ],
        "paths": [
            "/assets/sampo",
            "/assets/sampo",
            "/t/sampo/assets/",
            "/cdn/shop/t/sampo/assets/",
            "/sampo/assets/",
            "/assets/theme-sampo"
        ]
    },
    "San Francisco": {
        "css": [
            "san francisco-theme",
            "san francisco__",
            "san francisco-",
            "san francisco-header",
            "san francisco",
            "sanfrancisco",
            "theme-san francisco",
            ".san francisco",
            "#san francisco"
        ],
        "js": [
            "san francisco.js",
            "san francisco.theme.js",
            "san francisco.min.js",
            "theme-san francisco.js",
            "sanfrancisco.js",
            "window.San Francisco",
            "san francisco-scripts"
        ],
        "html": [
            "\"San Francisco\"",
            "\"theme_name\":\"San Francisco\"",
            "san francisco-theme",
            "data-san francisco",
            "class=\"san francisco\"",
            "data-theme-name=\"San Francisco\"",
            "theme-san francisco",
            "id=\"san francisco\""
        ],
        "paths": [
            "/assets/san francisco",
            "/assets/sanfrancisco",
            "/t/san francisco/assets/",
            "/cdn/shop/t/san francisco/assets/",
            "/san francisco/assets/",
            "/assets/theme-san francisco"
        ]
    },
    "Satoshi": {
        "css": [
            "satoshi-theme",
            "satoshi__",
            "satoshi-",
            "satoshi-header",
            "satoshi",
            "satoshi",
            "theme-satoshi",
            ".satoshi",
            "#satoshi"
        ],
        "js": [
            "satoshi.js",
            "satoshi.theme.js",
            "satoshi.min.js",
            "theme-satoshi.js",
            "satoshi.js",
            "window.Satoshi",
            "satoshi-scripts"
        ],
        "html": [
            "\"Satoshi\"",
            "\"theme_name\":\"Satoshi\"",
            "satoshi-theme",
            "data-satoshi",
            "class=\"satoshi\"",
            "data-theme-name=\"Satoshi\"",
            "theme-satoshi",
            "id=\"satoshi\""
        ],
        "paths": [
            "/assets/satoshi",
            "/assets/satoshi",
            "/t/satoshi/assets/",
            "/cdn/shop/t/satoshi/assets/",
            "/satoshi/assets/",
            "/assets/theme-satoshi"
        ]
    },
    "Savor": {
        "css": [
            "savor-theme",
            "savor__",
            "savor-",
            "savor-header",
            "savor",
            "savor",
            "theme-savor",
            ".savor",
            "#savor"
        ],
        "js": [
            "savor.js",
            "savor.theme.js",
            "savor.min.js",
            "theme-savor.js",
            "savor.js",
            "window.Savor",
            "savor-scripts"
        ],
        "html": [
            "\"Savor\"",
            "\"theme_name\":\"Savor\"",
            "savor-theme",
            "data-savor",
            "class=\"savor\"",
            "data-theme-name=\"Savor\"",
            "theme-savor",
            "id=\"savor\""
        ],
        "paths": [
            "/assets/savor",
            "/assets/savor",
            "/t/savor/assets/",
            "/cdn/shop/t/savor/assets/",
            "/savor/assets/",
            "/assets/theme-savor"
        ]
    },
    "Select": {
        "css": [
            "select-theme",
            "select__",
            "select-",
            "select-header",
            "select",
            "select",
            "theme-select",
            ".select",
            "#select"
        ],
        "js": [
            "select.js",
            "select.theme.js",
            "select.min.js",
            "theme-select.js",
            "select.js",
            "window.Select",
            "select-scripts"
        ],
        "html": [
            "\"Select\"",
            "\"theme_name\":\"Select\"",
            "select-theme",
            "data-select",
            "class=\"select\"",
            "data-theme-name=\"Select\"",
            "theme-select",
            "id=\"select\""
        ],
        "paths": [
            "/assets/select",
            "/assets/select",
            "/t/select/assets/",
            "/cdn/shop/t/select/assets/",
            "/select/assets/",
            "/assets/theme-select"
        ]
    },
    "Sense": {
        "css": [
            "sense-theme",
            "sense__",
            "sense-",
            "sense-header",
            "sense",
            "sense",
            "theme-sense",
            ".sense",
            "#sense"
        ],
        "js": [
            "sense.js",
            "sense.theme.js",
            "sense.min.js",
            "theme-sense.js",
            "sense.js",
            "window.Sense",
            "sense-scripts"
        ],
        "html": [
            "\"Sense\"",
            "\"theme_name\":\"Sense\"",
            "sense-theme",
            "data-sense",
            "class=\"sense\"",
            "data-theme-name=\"Sense\"",
            "theme-sense",
            "id=\"sense\""
        ],
        "paths": [
            "/assets/sense",
            "/assets/sense",
            "/t/sense/assets/",
            "/cdn/shop/t/sense/assets/",
            "/sense/assets/",
            "/assets/theme-sense"
        ]
    },
    "Shapes": {
        "css": [
            "shapes-theme",
            "shapes__",
            "shapes-",
            "shapes-header",
            "shapes",
            "shapes",
            "theme-shapes",
            ".shapes",
            "#shapes"
        ],
        "js": [
            "shapes.js",
            "shapes.theme.js",
            "shapes.min.js",
            "theme-shapes.js",
            "shapes.js",
            "window.Shapes",
            "shapes-scripts"
        ],
        "html": [
            "\"Shapes\"",
            "\"theme_name\":\"Shapes\"",
            "shapes-theme",
            "data-shapes",
            "class=\"shapes\"",
            "data-theme-name=\"Shapes\"",
            "theme-shapes",
            "id=\"shapes\""
        ],
        "paths": [
            "/assets/shapes",
            "/assets/shapes",
            "/t/shapes/assets/",
            "/cdn/shop/t/shapes/assets/",
            "/shapes/assets/",
            "/assets/theme-shapes"
        ]
    },
    "Shark": {
        "css": [
            "shark-theme",
            "shark__",
            "shark-",
            "shark-header",
            "shark",
            "shark",
            "theme-shark",
            ".shark",
            "#shark"
        ],
        "js": [
            "shark.js",
            "shark.theme.js",
            "shark.min.js",
            "theme-shark.js",
            "shark.js",
            "window.Shark",
            "shark-scripts"
        ],
        "html": [
            "\"Shark\"",
            "\"theme_name\":\"Shark\"",
            "shark-theme",
            "data-shark",
            "class=\"shark\"",
            "data-theme-name=\"Shark\"",
            "theme-shark",
            "id=\"shark\""
        ],
        "paths": [
            "/assets/shark",
            "/assets/shark",
            "/t/shark/assets/",
            "/cdn/shop/t/shark/assets/",
            "/shark/assets/",
            "/assets/theme-shark"
        ]
    },
    "Shine": {
        "css": [
            "shine-theme",
            "shine__",
            "shine-",
            "shine-header",
            "shine",
            "shine",
            "theme-shine",
            ".shine",
            "#shine"
        ],
        "js": [
            "shine.js",
            "shine.theme.js",
            "shine.min.js",
            "theme-shine.js",
            "shine.js",
            "window.Shine",
            "shine-scripts"
        ],
        "html": [
            "\"Shine\"",
            "\"theme_name\":\"Shine\"",
            "shine-theme",
            "data-shine",
            "class=\"shine\"",
            "data-theme-name=\"Shine\"",
            "theme-shine",
            "id=\"shine\""
        ],
        "paths": [
            "/assets/shine",
            "/assets/shine",
            "/t/shine/assets/",
            "/cdn/shop/t/shine/assets/",
            "/shine/assets/",
            "/assets/theme-shine"
        ]
    },
    "Showcase": {
        "css": [
            "showcase-theme",
            "showcase__",
            "showcase-",
            "showcase-header",
            "showcase",
            "showcase",
            "theme-showcase",
            ".showcase",
            "#showcase"
        ],
        "js": [
            "showcase.js",
            "showcase.theme.js",
            "showcase.min.js",
            "theme-showcase.js",
            "showcase.js",
            "window.Showcase",
            "showcase-scripts"
        ],
        "html": [
            "\"Showcase\"",
            "\"theme_name\":\"Showcase\"",
            "showcase-theme",
            "data-showcase",
            "class=\"showcase\"",
            "data-theme-name=\"Showcase\"",
            "theme-showcase",
            "id=\"showcase\""
        ],
        "paths": [
            "/assets/showcase",
            "/assets/showcase",
            "/t/showcase/assets/",
            "/cdn/shop/t/showcase/assets/",
            "/showcase/assets/",
            "/assets/theme-showcase"
        ]
    },
    "ShowTime": {
        "css": [
            "showtime-theme",
            "showtime__",
            "showtime-",
            "showtime-header",
            "showtime",
            "showtime",
            "theme-showtime",
            ".showtime",
            "#showtime"
        ],
        "js": [
            "showtime.js",
            "showtime.theme.js",
            "showtime.min.js",
            "theme-showtime.js",
            "showtime.js",
            "window.ShowTime",
            "showtime-scripts"
        ],
        "html": [
            "\"ShowTime\"",
            "\"theme_name\":\"ShowTime\"",
            "showtime-theme",
            "data-showtime",
            "class=\"showtime\"",
            "data-theme-name=\"ShowTime\"",
            "theme-showtime",
            "id=\"showtime\""
        ],
        "paths": [
            "/assets/showtime",
            "/assets/showtime",
            "/t/showtime/assets/",
            "/cdn/shop/t/showtime/assets/",
            "/showtime/assets/",
            "/assets/theme-showtime"
        ]
    },
    "Simple": {
        "css": [
            "simple-theme",
            "simple__",
            "simple-",
            "simple-header",
            "simple",
            "simple",
            "theme-simple",
            ".simple",
            "#simple"
        ],
        "js": [
            "simple.js",
            "simple.theme.js",
            "simple.min.js",
            "theme-simple.js",
            "simple.js",
            "window.Simple",
            "simple-scripts"
        ],
        "html": [
            "\"Simple\"",
            "\"theme_name\":\"Simple\"",
            "simple-theme",
            "data-simple",
            "class=\"simple\"",
            "data-theme-name=\"Simple\"",
            "theme-simple",
            "id=\"simple\""
        ],
        "paths": [
            "/assets/simple",
            "/assets/simple",
            "/t/simple/assets/",
            "/cdn/shop/t/simple/assets/",
            "/simple/assets/",
            "/assets/theme-simple"
        ]
    },
    "Sitar": {
        "css": [
            "sitar-theme",
            "sitar__",
            "sitar-",
            "sitar-header",
            "sitar",
            "sitar",
            "theme-sitar",
            ".sitar",
            "#sitar"
        ],
        "js": [
            "sitar.js",
            "sitar.theme.js",
            "sitar.min.js",
            "theme-sitar.js",
            "sitar.js",
            "window.Sitar",
            "sitar-scripts"
        ],
        "html": [
            "\"Sitar\"",
            "\"theme_name\":\"Sitar\"",
            "sitar-theme",
            "data-sitar",
            "class=\"sitar\"",
            "data-theme-name=\"Sitar\"",
            "theme-sitar",
            "id=\"sitar\""
        ],
        "paths": [
            "/assets/sitar",
            "/assets/sitar",
            "/t/sitar/assets/",
            "/cdn/shop/t/sitar/assets/",
            "/sitar/assets/",
            "/assets/theme-sitar"
        ]
    },
    "Sleek": {
        "css": [
            "sleek-theme",
            "sleek__",
            "sleek-",
            "sleek-header",
            "sleek",
            "sleek",
            "theme-sleek",
            ".sleek",
            "#sleek"
        ],
        "js": [
            "sleek.js",
            "sleek.theme.js",
            "sleek.min.js",
            "theme-sleek.js",
            "sleek.js",
            "window.Sleek",
            "sleek-scripts"
        ],
        "html": [
            "\"Sleek\"",
            "\"theme_name\":\"Sleek\"",
            "sleek-theme",
            "data-sleek",
            "class=\"sleek\"",
            "data-theme-name=\"Sleek\"",
            "theme-sleek",
            "id=\"sleek\""
        ],
        "paths": [
            "/assets/sleek",
            "/assets/sleek",
            "/t/sleek/assets/",
            "/cdn/shop/t/sleek/assets/",
            "/sleek/assets/",
            "/assets/theme-sleek"
        ]
    },
    "Soul": {
        "css": [
            "soul-theme",
            "soul__",
            "soul-",
            "soul-header",
            "soul",
            "soul",
            "theme-soul",
            ".soul",
            "#soul"
        ],
        "js": [
            "soul.js",
            "soul.theme.js",
            "soul.min.js",
            "theme-soul.js",
            "soul.js",
            "window.Soul",
            "soul-scripts"
        ],
        "html": [
            "\"Soul\"",
            "\"theme_name\":\"Soul\"",
            "soul-theme",
            "data-soul",
            "class=\"soul\"",
            "data-theme-name=\"Soul\"",
            "theme-soul",
            "id=\"soul\""
        ],
        "paths": [
            "/assets/soul",
            "/assets/soul",
            "/t/soul/assets/",
            "/cdn/shop/t/soul/assets/",
            "/soul/assets/",
            "/assets/theme-soul"
        ]
    },
    "Space": {
        "css": [
            "space-theme",
            "space__",
            "space-",
            "space-header",
            "space",
            "space",
            "theme-space",
            ".space",
            "#space"
        ],
        "js": [
            "space.js",
            "space.theme.js",
            "space.min.js",
            "theme-space.js",
            "space.js",
            "window.Space",
            "space-scripts"
        ],
        "html": [
            "\"Space\"",
            "\"theme_name\":\"Space\"",
            "space-theme",
            "data-space",
            "class=\"space\"",
            "data-theme-name=\"Space\"",
            "theme-space",
            "id=\"space\""
        ],
        "paths": [
            "/assets/space",
            "/assets/space",
            "/t/space/assets/",
            "/cdn/shop/t/space/assets/",
            "/space/assets/",
            "/assets/theme-space"
        ]
    },
    "Spark": {
        "css": [
            "spark-theme",
            "spark__",
            "spark-",
            "spark-header",
            "spark",
            "spark",
            "theme-spark",
            ".spark",
            "#spark"
        ],
        "js": [
            "spark.js",
            "spark.theme.js",
            "spark.min.js",
            "theme-spark.js",
            "spark.js",
            "window.Spark",
            "spark-scripts"
        ],
        "html": [
            "\"Spark\"",
            "\"theme_name\":\"Spark\"",
            "spark-theme",
            "data-spark",
            "class=\"spark\"",
            "data-theme-name=\"Spark\"",
            "theme-spark",
            "id=\"spark\""
        ],
        "paths": [
            "/assets/spark",
            "/assets/spark",
            "/t/spark/assets/",
            "/cdn/shop/t/spark/assets/",
            "/spark/assets/",
            "/assets/theme-spark"
        ]
    },
    "Split": {
        "css": [
            "split-theme",
            "split__",
            "split-",
            "split-header",
            "split",
            "split",
            "theme-split",
            ".split",
            "#split"
        ],
        "js": [
            "split.js",
            "split.theme.js",
            "split.min.js",
            "theme-split.js",
            "split.js",
            "window.Split",
            "split-scripts"
        ],
        "html": [
            "\"Split\"",
            "\"theme_name\":\"Split\"",
            "split-theme",
            "data-split",
            "class=\"split\"",
            "data-theme-name=\"Split\"",
            "theme-split",
            "id=\"split\""
        ],
        "paths": [
            "/assets/split",
            "/assets/split",
            "/t/split/assets/",
            "/cdn/shop/t/split/assets/",
            "/split/assets/",
            "/assets/theme-split"
        ]
    },
    "Starlite": {
        "css": [
            "starlite-theme",
            "starlite__",
            "starlite-",
            "starlite-header",
            "starlite",
            "starlite",
            "theme-starlite",
            ".starlite",
            "#starlite"
        ],
        "js": [
            "starlite.js",
            "starlite.theme.js",
            "starlite.min.js",
            "theme-starlite.js",
            "starlite.js",
            "window.Starlite",
            "starlite-scripts"
        ],
        "html": [
            "\"Starlite\"",
            "\"theme_name\":\"Starlite\"",
            "starlite-theme",
            "data-starlite",
            "class=\"starlite\"",
            "data-theme-name=\"Starlite\"",
            "theme-starlite",
            "id=\"starlite\""
        ],
        "paths": [
            "/assets/starlite",
            "/assets/starlite",
            "/t/starlite/assets/",
            "/cdn/shop/t/starlite/assets/",
            "/starlite/assets/",
            "/assets/theme-starlite"
        ]
    },
    "Startup": {
        "css": [
            "startup-theme",
            "startup__",
            "startup-",
            "startup-header",
            "startup",
            "startup",
            "theme-startup",
            ".startup",
            "#startup"
        ],
        "js": [
            "startup.js",
            "startup.theme.js",
            "startup.min.js",
            "theme-startup.js",
            "startup.js",
            "window.Startup",
            "startup-scripts"
        ],
        "html": [
            "\"Startup\"",
            "\"theme_name\":\"Startup\"",
            "startup-theme",
            "data-startup",
            "class=\"startup\"",
            "data-theme-name=\"Startup\"",
            "theme-startup",
            "id=\"startup\""
        ],
        "paths": [
            "/assets/startup",
            "/assets/startup",
            "/t/startup/assets/",
            "/cdn/shop/t/startup/assets/",
            "/startup/assets/",
            "/assets/theme-startup"
        ]
    },
    "Stiletto": {
        "css": [
            "stiletto-theme",
            "stiletto__",
            "stiletto-",
            "stiletto-header",
            "stiletto",
            "stiletto",
            "theme-stiletto",
            ".stiletto",
            "#stiletto"
        ],
        "js": [
            "stiletto.js",
            "stiletto.theme.js",
            "stiletto.min.js",
            "theme-stiletto.js",
            "stiletto.js",
            "window.Stiletto",
            "stiletto-scripts"
        ],
        "html": [
            "\"Stiletto\"",
            "\"theme_name\":\"Stiletto\"",
            "stiletto-theme",
            "data-stiletto",
            "class=\"stiletto\"",
            "data-theme-name=\"Stiletto\"",
            "theme-stiletto",
            "id=\"stiletto\""
        ],
        "paths": [
            "/assets/stiletto",
            "/assets/stiletto",
            "/t/stiletto/assets/",
            "/cdn/shop/t/stiletto/assets/",
            "/stiletto/assets/",
            "/assets/theme-stiletto"
        ]
    },
    "Stockholm": {
        "css": [
            "stockholm-theme",
            "stockholm__",
            "stockholm-",
            "stockholm-header",
            "stockholm",
            "stockholm",
            "theme-stockholm",
            ".stockholm",
            "#stockholm"
        ],
        "js": [
            "stockholm.js",
            "stockholm.theme.js",
            "stockholm.min.js",
            "theme-stockholm.js",
            "stockholm.js",
            "window.Stockholm",
            "stockholm-scripts"
        ],
        "html": [
            "\"Stockholm\"",
            "\"theme_name\":\"Stockholm\"",
            "stockholm-theme",
            "data-stockholm",
            "class=\"stockholm\"",
            "data-theme-name=\"Stockholm\"",
            "theme-stockholm",
            "id=\"stockholm\""
        ],
        "paths": [
            "/assets/stockholm",
            "/assets/stockholm",
            "/t/stockholm/assets/",
            "/cdn/shop/t/stockholm/assets/",
            "/stockholm/assets/",
            "/assets/theme-stockholm"
        ]
    },
    "Stockmart": {
        "css": [
            "stockmart-theme",
            "stockmart__",
            "stockmart-",
            "stockmart-header",
            "stockmart",
            "stockmart",
            "theme-stockmart",
            ".stockmart",
            "#stockmart"
        ],
        "js": [
            "stockmart.js",
            "stockmart.theme.js",
            "stockmart.min.js",
            "theme-stockmart.js",
            "stockmart.js",
            "window.Stockmart",
            "stockmart-scripts"
        ],
        "html": [
            "\"Stockmart\"",
            "\"theme_name\":\"Stockmart\"",
            "stockmart-theme",
            "data-stockmart",
            "class=\"stockmart\"",
            "data-theme-name=\"Stockmart\"",
            "theme-stockmart",
            "id=\"stockmart\""
        ],
        "paths": [
            "/assets/stockmart",
            "/assets/stockmart",
            "/t/stockmart/assets/",
            "/cdn/shop/t/stockmart/assets/",
            "/stockmart/assets/",
            "/assets/theme-stockmart"
        ]
    },
    "Story": {
        "css": [
            "story-theme",
            "story__",
            "story-",
            "story-header",
            "story",
            "story",
            "theme-story",
            ".story",
            "#story"
        ],
        "js": [
            "story.js",
            "story.theme.js",
            "story.min.js",
            "theme-story.js",
            "story.js",
            "window.Story",
            "story-scripts"
        ],
        "html": [
            "\"Story\"",
            "\"theme_name\":\"Story\"",
            "story-theme",
            "data-story",
            "class=\"story\"",
            "data-theme-name=\"Story\"",
            "theme-story",
            "id=\"story\""
        ],
        "paths": [
            "/assets/story",
            "/assets/story",
            "/t/story/assets/",
            "/cdn/shop/t/story/assets/",
            "/story/assets/",
            "/assets/theme-story"
        ]
    },
    "Streamline": {
        "css": [
            "streamline-theme",
            "streamline__",
            "streamline-",
            "streamline-header",
            "streamline",
            "streamline",
            "theme-streamline",
            ".streamline",
            "#streamline"
        ],
        "js": [
            "streamline.js",
            "streamline.theme.js",
            "streamline.min.js",
            "theme-streamline.js",
            "streamline.js",
            "window.Streamline",
            "streamline-scripts"
        ],
        "html": [
            "\"Streamline\"",
            "\"theme_name\":\"Streamline\"",
            "streamline-theme",
            "data-streamline",
            "class=\"streamline\"",
            "data-theme-name=\"Streamline\"",
            "theme-streamline",
            "id=\"streamline\""
        ],
        "paths": [
            "/assets/streamline",
            "/assets/streamline",
            "/t/streamline/assets/",
            "/cdn/shop/t/streamline/assets/",
            "/streamline/assets/",
            "/assets/theme-streamline"
        ]
    },
    "Stretch": {
        "css": [
            "stretch-theme",
            "stretch__",
            "stretch-",
            "stretch-header",
            "stretch",
            "stretch",
            "theme-stretch",
            ".stretch",
            "#stretch"
        ],
        "js": [
            "stretch.js",
            "stretch.theme.js",
            "stretch.min.js",
            "theme-stretch.js",
            "stretch.js",
            "window.Stretch",
            "stretch-scripts"
        ],
        "html": [
            "\"Stretch\"",
            "\"theme_name\":\"Stretch\"",
            "stretch-theme",
            "data-stretch",
            "class=\"stretch\"",
            "data-theme-name=\"Stretch\"",
            "theme-stretch",
            "id=\"stretch\""
        ],
        "paths": [
            "/assets/stretch",
            "/assets/stretch",
            "/t/stretch/assets/",
            "/cdn/shop/t/stretch/assets/",
            "/stretch/assets/",
            "/assets/theme-stretch"
        ]
    },
    "Strong": {
        "css": [
            "strong-theme",
            "strong__",
            "strong-",
            "strong-header",
            "strong",
            "strong",
            "theme-strong",
            ".strong",
            "#strong"
        ],
        "js": [
            "strong.js",
            "strong.theme.js",
            "strong.min.js",
            "theme-strong.js",
            "strong.js",
            "window.Strong",
            "strong-scripts"
        ],
        "html": [
            "\"Strong\"",
            "\"theme_name\":\"Strong\"",
            "strong-theme",
            "data-strong",
            "class=\"strong\"",
            "data-theme-name=\"Strong\"",
            "theme-strong",
            "id=\"strong\""
        ],
        "paths": [
            "/assets/strong",
            "/assets/strong",
            "/t/strong/assets/",
            "/cdn/shop/t/strong/assets/",
            "/strong/assets/",
            "/assets/theme-strong"
        ]
    },
    "Studio": {
        "css": [
            "studio-theme",
            "studio__",
            "studio-",
            "studio-header",
            "studio",
            "studio",
            "theme-studio",
            ".studio",
            "#studio"
        ],
        "js": [
            "studio.js",
            "studio.theme.js",
            "studio.min.js",
            "theme-studio.js",
            "studio.js",
            "window.Studio",
            "studio-scripts"
        ],
        "html": [
            "\"Studio\"",
            "\"theme_name\":\"Studio\"",
            "studio-theme",
            "data-studio",
            "class=\"studio\"",
            "data-theme-name=\"Studio\"",
            "theme-studio",
            "id=\"studio\""
        ],
        "paths": [
            "/assets/studio",
            "/assets/studio",
            "/t/studio/assets/",
            "/cdn/shop/t/studio/assets/",
            "/studio/assets/",
            "/assets/theme-studio"
        ]
    },
    "StyleScape": {
        "css": [
            "stylescape-theme",
            "stylescape__",
            "stylescape-",
            "stylescape-header",
            "stylescape",
            "stylescape",
            "theme-stylescape",
            ".stylescape",
            "#stylescape"
        ],
        "js": [
            "stylescape.js",
            "stylescape.theme.js",
            "stylescape.min.js",
            "theme-stylescape.js",
            "stylescape.js",
            "window.StyleScape",
            "stylescape-scripts"
        ],
        "html": [
            "\"StyleScape\"",
            "\"theme_name\":\"StyleScape\"",
            "stylescape-theme",
            "data-stylescape",
            "class=\"stylescape\"",
            "data-theme-name=\"StyleScape\"",
            "theme-stylescape",
            "id=\"stylescape\""
        ],
        "paths": [
            "/assets/stylescape",
            "/assets/stylescape",
            "/t/stylescape/assets/",
            "/cdn/shop/t/stylescape/assets/",
            "/stylescape/assets/",
            "/assets/theme-stylescape"
        ]
    },
    "Sunrise": {
        "css": [
            "sunrise-theme",
            "sunrise__",
            "sunrise-",
            "sunrise-header",
            "sunrise",
            "sunrise",
            "theme-sunrise",
            ".sunrise",
            "#sunrise"
        ],
        "js": [
            "sunrise.js",
            "sunrise.theme.js",
            "sunrise.min.js",
            "theme-sunrise.js",
            "sunrise.js",
            "window.Sunrise",
            "sunrise-scripts"
        ],
        "html": [
            "\"Sunrise\"",
            "\"theme_name\":\"Sunrise\"",
            "sunrise-theme",
            "data-sunrise",
            "class=\"sunrise\"",
            "data-theme-name=\"Sunrise\"",
            "theme-sunrise",
            "id=\"sunrise\""
        ],
        "paths": [
            "/assets/sunrise",
            "/assets/sunrise",
            "/t/sunrise/assets/",
            "/cdn/shop/t/sunrise/assets/",
            "/sunrise/assets/",
            "/assets/theme-sunrise"
        ]
    },
    "Supply": {
        "css": [
            "supply-theme",
            "supply__",
            "supply-",
            "supply-header",
            "supply",
            "supply",
            "theme-supply",
            ".supply",
            "#supply"
        ],
        "js": [
            "supply.js",
            "supply.theme.js",
            "supply.min.js",
            "theme-supply.js",
            "supply.js",
            "window.Supply",
            "supply-scripts"
        ],
        "html": [
            "\"Supply\"",
            "\"theme_name\":\"Supply\"",
            "supply-theme",
            "data-supply",
            "class=\"supply\"",
            "data-theme-name=\"Supply\"",
            "theme-supply",
            "id=\"supply\""
        ],
        "paths": [
            "/assets/supply",
            "/assets/supply",
            "/t/supply/assets/",
            "/cdn/shop/t/supply/assets/",
            "/supply/assets/",
            "/assets/theme-supply"
        ]
    },
    "Swipe": {
        "css": [
            "swipe-theme",
            "swipe__",
            "swipe-",
            "swipe-header",
            "swipe",
            "swipe",
            "theme-swipe",
            ".swipe",
            "#swipe"
        ],
        "js": [
            "swipe.js",
            "swipe.theme.js",
            "swipe.min.js",
            "theme-swipe.js",
            "swipe.js",
            "window.Swipe",
            "swipe-scripts"
        ],
        "html": [
            "\"Swipe\"",
            "\"theme_name\":\"Swipe\"",
            "swipe-theme",
            "data-swipe",
            "class=\"swipe\"",
            "data-theme-name=\"Swipe\"",
            "theme-swipe",
            "id=\"swipe\""
        ],
        "paths": [
            "/assets/swipe",
            "/assets/swipe",
            "/t/swipe/assets/",
            "/cdn/shop/t/swipe/assets/",
            "/swipe/assets/",
            "/assets/theme-swipe"
        ]
    },
    "Swiss": {
        "css": [
            "swiss-theme",
            "swiss__",
            "swiss-",
            "swiss-header",
            "swiss",
            "swiss",
            "theme-swiss",
            ".swiss",
            "#swiss"
        ],
        "js": [
            "swiss.js",
            "swiss.theme.js",
            "swiss.min.js",
            "theme-swiss.js",
            "swiss.js",
            "window.Swiss",
            "swiss-scripts"
        ],
        "html": [
            "\"Swiss\"",
            "\"theme_name\":\"Swiss\"",
            "swiss-theme",
            "data-swiss",
            "class=\"swiss\"",
            "data-theme-name=\"Swiss\"",
            "theme-swiss",
            "id=\"swiss\""
        ],
        "paths": [
            "/assets/swiss",
            "/assets/swiss",
            "/t/swiss/assets/",
            "/cdn/shop/t/swiss/assets/",
            "/swiss/assets/",
            "/assets/theme-swiss"
        ]
    },
    "Sydney": {
        "css": [
            "sydney-theme",
            "sydney__",
            "sydney-",
            "sydney-header",
            "sydney",
            "sydney",
            "theme-sydney",
            ".sydney",
            "#sydney"
        ],
        "js": [
            "sydney.js",
            "sydney.theme.js",
            "sydney.min.js",
            "theme-sydney.js",
            "sydney.js",
            "window.Sydney",
            "sydney-scripts"
        ],
        "html": [
            "\"Sydney\"",
            "\"theme_name\":\"Sydney\"",
            "sydney-theme",
            "data-sydney",
            "class=\"sydney\"",
            "data-theme-name=\"Sydney\"",
            "theme-sydney",
            "id=\"sydney\""
        ],
        "paths": [
            "/assets/sydney",
            "/assets/sydney",
            "/t/sydney/assets/",
            "/cdn/shop/t/sydney/assets/",
            "/sydney/assets/",
            "/assets/theme-sydney"
        ]
    },
    "Symmetry": {
        "css": [
            "symmetry-theme",
            "symmetry__",
            "symmetry-",
            "symmetry-header",
            "symmetry",
            "symmetry",
            "theme-symmetry",
            ".symmetry",
            "#symmetry"
        ],
        "js": [
            "symmetry.js",
            "symmetry.theme.js",
            "symmetry.min.js",
            "theme-symmetry.js",
            "symmetry.js",
            "window.Symmetry",
            "symmetry-scripts"
        ],
        "html": [
            "\"Symmetry\"",
            "\"theme_name\":\"Symmetry\"",
            "symmetry-theme",
            "data-symmetry",
            "class=\"symmetry\"",
            "data-theme-name=\"Symmetry\"",
            "theme-symmetry",
            "id=\"symmetry\""
        ],
        "paths": [
            "/assets/symmetry",
            "/assets/symmetry",
            "/t/symmetry/assets/",
            "/cdn/shop/t/symmetry/assets/",
            "/symmetry/assets/",
            "/assets/theme-symmetry"
        ]
    },
    "Taiga": {
        "css": [
            "taiga-theme",
            "taiga__",
            "taiga-",
            "taiga-header",
            "taiga",
            "taiga",
            "theme-taiga",
            ".taiga",
            "#taiga"
        ],
        "js": [
            "taiga.js",
            "taiga.theme.js",
            "taiga.min.js",
            "theme-taiga.js",
            "taiga.js",
            "window.Taiga",
            "taiga-scripts"
        ],
        "html": [
            "\"Taiga\"",
            "\"theme_name\":\"Taiga\"",
            "taiga-theme",
            "data-taiga",
            "class=\"taiga\"",
            "data-theme-name=\"Taiga\"",
            "theme-taiga",
            "id=\"taiga\""
        ],
        "paths": [
            "/assets/taiga",
            "/assets/taiga",
            "/t/taiga/assets/",
            "/cdn/shop/t/taiga/assets/",
            "/taiga/assets/",
            "/assets/theme-taiga"
        ]
    },
    "Tailor": {
        "css": [
            "tailor-theme",
            "tailor__",
            "tailor-",
            "tailor-header",
            "tailor",
            "tailor",
            "theme-tailor",
            ".tailor",
            "#tailor"
        ],
        "js": [
            "tailor.js",
            "tailor.theme.js",
            "tailor.min.js",
            "theme-tailor.js",
            "tailor.js",
            "window.Tailor",
            "tailor-scripts"
        ],
        "html": [
            "\"Tailor\"",
            "\"theme_name\":\"Tailor\"",
            "tailor-theme",
            "data-tailor",
            "class=\"tailor\"",
            "data-theme-name=\"Tailor\"",
            "theme-tailor",
            "id=\"tailor\""
        ],
        "paths": [
            "/assets/tailor",
            "/assets/tailor",
            "/t/tailor/assets/",
            "/cdn/shop/t/tailor/assets/",
            "/tailor/assets/",
            "/assets/theme-tailor"
        ]
    },
    "Takeout": {
        "css": [
            "takeout-theme",
            "takeout__",
            "takeout-",
            "takeout-header",
            "takeout",
            "takeout",
            "theme-takeout",
            ".takeout",
            "#takeout"
        ],
        "js": [
            "takeout.js",
            "takeout.theme.js",
            "takeout.min.js",
            "theme-takeout.js",
            "takeout.js",
            "window.Takeout",
            "takeout-scripts"
        ],
        "html": [
            "\"Takeout\"",
            "\"theme_name\":\"Takeout\"",
            "takeout-theme",
            "data-takeout",
            "class=\"takeout\"",
            "data-theme-name=\"Takeout\"",
            "theme-takeout",
            "id=\"takeout\""
        ],
        "paths": [
            "/assets/takeout",
            "/assets/takeout",
            "/t/takeout/assets/",
            "/cdn/shop/t/takeout/assets/",
            "/takeout/assets/",
            "/assets/theme-takeout"
        ]
    },
    "Taste": {
        "css": [
            "taste-theme",
            "taste__",
            "taste-",
            "taste-header",
            "taste",
            "taste",
            "theme-taste",
            ".taste",
            "#taste"
        ],
        "js": [
            "taste.js",
            "taste.theme.js",
            "taste.min.js",
            "theme-taste.js",
            "taste.js",
            "window.Taste",
            "taste-scripts"
        ],
        "html": [
            "\"Taste\"",
            "\"theme_name\":\"Taste\"",
            "taste-theme",
            "data-taste",
            "class=\"taste\"",
            "data-theme-name=\"Taste\"",
            "theme-taste",
            "id=\"taste\""
        ],
        "paths": [
            "/assets/taste",
            "/assets/taste",
            "/t/taste/assets/",
            "/cdn/shop/t/taste/assets/",
            "/taste/assets/",
            "/assets/theme-taste"
        ]
    },
    "Testament": {
        "css": [
            "testament-theme",
            "testament__",
            "testament-",
            "testament-header",
            "testament",
            "testament",
            "theme-testament",
            ".testament",
            "#testament"
        ],
        "js": [
            "testament.js",
            "testament.theme.js",
            "testament.min.js",
            "theme-testament.js",
            "testament.js",
            "window.Testament",
            "testament-scripts"
        ],
        "html": [
            "\"Testament\"",
            "\"theme_name\":\"Testament\"",
            "testament-theme",
            "data-testament",
            "class=\"testament\"",
            "data-theme-name=\"Testament\"",
            "theme-testament",
            "id=\"testament\""
        ],
        "paths": [
            "/assets/testament",
            "/assets/testament",
            "/t/testament/assets/",
            "/cdn/shop/t/testament/assets/",
            "/testament/assets/",
            "/assets/theme-testament"
        ]
    },
    "Tinker": {
        "css": [
            "tinker-theme",
            "tinker__",
            "tinker-",
            "tinker-header",
            "tinker",
            "tinker",
            "theme-tinker",
            ".tinker",
            "#tinker"
        ],
        "js": [
            "tinker.js",
            "tinker.theme.js",
            "tinker.min.js",
            "theme-tinker.js",
            "tinker.js",
            "window.Tinker",
            "tinker-scripts"
        ],
        "html": [
            "\"Tinker\"",
            "\"theme_name\":\"Tinker\"",
            "tinker-theme",
            "data-tinker",
            "class=\"tinker\"",
            "data-theme-name=\"Tinker\"",
            "theme-tinker",
            "id=\"tinker\""
        ],
        "paths": [
            "/assets/tinker",
            "/assets/tinker",
            "/t/tinker/assets/",
            "/cdn/shop/t/tinker/assets/",
            "/tinker/assets/",
            "/assets/theme-tinker"
        ]
    },
    "Tokyo": {
        "css": [
            "tokyo-theme",
            "tokyo__",
            "tokyo-",
            "tokyo-header",
            "tokyo",
            "tokyo",
            "theme-tokyo",
            ".tokyo",
            "#tokyo"
        ],
        "js": [
            "tokyo.js",
            "tokyo.theme.js",
            "tokyo.min.js",
            "theme-tokyo.js",
            "tokyo.js",
            "window.Tokyo",
            "tokyo-scripts"
        ],
        "html": [
            "\"Tokyo\"",
            "\"theme_name\":\"Tokyo\"",
            "tokyo-theme",
            "data-tokyo",
            "class=\"tokyo\"",
            "data-theme-name=\"Tokyo\"",
            "theme-tokyo",
            "id=\"tokyo\""
        ],
        "paths": [
            "/assets/tokyo",
            "/assets/tokyo",
            "/t/tokyo/assets/",
            "/cdn/shop/t/tokyo/assets/",
            "/tokyo/assets/",
            "/assets/theme-tokyo"
        ]
    },
    "Toyo": {
        "css": [
            "toyo-theme",
            "toyo__",
            "toyo-",
            "toyo-header",
            "toyo",
            "toyo",
            "theme-toyo",
            ".toyo",
            "#toyo"
        ],
        "js": [
            "toyo.js",
            "toyo.theme.js",
            "toyo.min.js",
            "theme-toyo.js",
            "toyo.js",
            "window.Toyo",
            "toyo-scripts"
        ],
        "html": [
            "\"Toyo\"",
            "\"theme_name\":\"Toyo\"",
            "toyo-theme",
            "data-toyo",
            "class=\"toyo\"",
            "data-theme-name=\"Toyo\"",
            "theme-toyo",
            "id=\"toyo\""
        ],
        "paths": [
            "/assets/toyo",
            "/assets/toyo",
            "/t/toyo/assets/",
            "/cdn/shop/t/toyo/assets/",
            "/toyo/assets/",
            "/assets/theme-toyo"
        ]
    },
    "Trade": {
        "css": [
            "trade-theme",
            "trade__",
            "trade-",
            "trade-header",
            "trade",
            "trade",
            "theme-trade",
            ".trade",
            "#trade"
        ],
        "js": [
            "trade.js",
            "trade.theme.js",
            "trade.min.js",
            "theme-trade.js",
            "trade.js",
            "window.Trade",
            "trade-scripts"
        ],
        "html": [
            "\"Trade\"",
            "\"theme_name\":\"Trade\"",
            "trade-theme",
            "data-trade",
            "class=\"trade\"",
            "data-theme-name=\"Trade\"",
            "theme-trade",
            "id=\"trade\""
        ],
        "paths": [
            "/assets/trade",
            "/assets/trade",
            "/t/trade/assets/",
            "/cdn/shop/t/trade/assets/",
            "/trade/assets/",
            "/assets/theme-trade"
        ]
    },
    "Ultra": {
        "css": [
            "ultra-theme",
            "ultra__",
            "ultra-",
            "ultra-header",
            "ultra",
            "ultra",
            "theme-ultra",
            ".ultra",
            "#ultra"
        ],
        "js": [
            "ultra.js",
            "ultra.theme.js",
            "ultra.min.js",
            "theme-ultra.js",
            "ultra.js",
            "window.Ultra",
            "ultra-scripts"
        ],
        "html": [
            "\"Ultra\"",
            "\"theme_name\":\"Ultra\"",
            "ultra-theme",
            "data-ultra",
            "class=\"ultra\"",
            "data-theme-name=\"Ultra\"",
            "theme-ultra",
            "id=\"ultra\""
        ],
        "paths": [
            "/assets/ultra",
            "/assets/ultra",
            "/t/ultra/assets/",
            "/cdn/shop/t/ultra/assets/",
            "/ultra/assets/",
            "/assets/theme-ultra"
        ]
    },
    "Unicorn": {
        "css": [
            "unicorn-theme",
            "unicorn__",
            "unicorn-",
            "unicorn-header",
            "unicorn",
            "unicorn",
            "theme-unicorn",
            ".unicorn",
            "#unicorn"
        ],
        "js": [
            "unicorn.js",
            "unicorn.theme.js",
            "unicorn.min.js",
            "theme-unicorn.js",
            "unicorn.js",
            "window.Unicorn",
            "unicorn-scripts"
        ],
        "html": [
            "\"Unicorn\"",
            "\"theme_name\":\"Unicorn\"",
            "unicorn-theme",
            "data-unicorn",
            "class=\"unicorn\"",
            "data-theme-name=\"Unicorn\"",
            "theme-unicorn",
            "id=\"unicorn\""
        ],
        "paths": [
            "/assets/unicorn",
            "/assets/unicorn",
            "/t/unicorn/assets/",
            "/cdn/shop/t/unicorn/assets/",
            "/unicorn/assets/",
            "/assets/theme-unicorn"
        ]
    },
    "Upscale": {
        "css": [
            "upscale-theme",
            "upscale__",
            "upscale-",
            "upscale-header",
            "upscale",
            "upscale",
            "theme-upscale",
            ".upscale",
            "#upscale"
        ],
        "js": [
            "upscale.js",
            "upscale.theme.js",
            "upscale.min.js",
            "theme-upscale.js",
            "upscale.js",
            "window.Upscale",
            "upscale-scripts"
        ],
        "html": [
            "\"Upscale\"",
            "\"theme_name\":\"Upscale\"",
            "upscale-theme",
            "data-upscale",
            "class=\"upscale\"",
            "data-theme-name=\"Upscale\"",
            "theme-upscale",
            "id=\"upscale\""
        ],
        "paths": [
            "/assets/upscale",
            "/assets/upscale",
            "/t/upscale/assets/",
            "/cdn/shop/t/upscale/assets/",
            "/upscale/assets/",
            "/assets/theme-upscale"
        ]
    },
    "Urban": {
        "css": [
            "urban-theme",
            "urban__",
            "urban-",
            "urban-header",
            "urban",
            "urban",
            "theme-urban",
            ".urban",
            "#urban"
        ],
        "js": [
            "urban.js",
            "urban.theme.js",
            "urban.min.js",
            "theme-urban.js",
            "urban.js",
            "window.Urban",
            "urban-scripts"
        ],
        "html": [
            "\"Urban\"",
            "\"theme_name\":\"Urban\"",
            "urban-theme",
            "data-urban",
            "class=\"urban\"",
            "data-theme-name=\"Urban\"",
            "theme-urban",
            "id=\"urban\""
        ],
        "paths": [
            "/assets/urban",
            "/assets/urban",
            "/t/urban/assets/",
            "/cdn/shop/t/urban/assets/",
            "/urban/assets/",
            "/assets/theme-urban"
        ]
    },
    "Urge": {
        "css": [
            "urge-theme",
            "urge__",
            "urge-",
            "urge-header",
            "urge",
            "urge",
            "theme-urge",
            ".urge",
            "#urge"
        ],
        "js": [
            "urge.js",
            "urge.theme.js",
            "urge.min.js",
            "theme-urge.js",
            "urge.js",
            "window.Urge",
            "urge-scripts"
        ],
        "html": [
            "\"Urge\"",
            "\"theme_name\":\"Urge\"",
            "urge-theme",
            "data-urge",
            "class=\"urge\"",
            "data-theme-name=\"Urge\"",
            "theme-urge",
            "id=\"urge\""
        ],
        "paths": [
            "/assets/urge",
            "/assets/urge",
            "/t/urge/assets/",
            "/cdn/shop/t/urge/assets/",
            "/urge/assets/",
            "/assets/theme-urge"
        ]
    },
    "Vantage": {
        "css": [
            "vantage-theme",
            "vantage__",
            "vantage-",
            "vantage-header",
            "vantage",
            "vantage",
            "theme-vantage",
            ".vantage",
            "#vantage"
        ],
        "js": [
            "vantage.js",
            "vantage.theme.js",
            "vantage.min.js",
            "theme-vantage.js",
            "vantage.js",
            "window.Vantage",
            "vantage-scripts"
        ],
        "html": [
            "\"Vantage\"",
            "\"theme_name\":\"Vantage\"",
            "vantage-theme",
            "data-vantage",
            "class=\"vantage\"",
            "data-theme-name=\"Vantage\"",
            "theme-vantage",
            "id=\"vantage\""
        ],
        "paths": [
            "/assets/vantage",
            "/assets/vantage",
            "/t/vantage/assets/",
            "/cdn/shop/t/vantage/assets/",
            "/vantage/assets/",
            "/assets/theme-vantage"
        ]
    },
    "Veena": {
        "css": [
            "veena-theme",
            "veena__",
            "veena-",
            "veena-header",
            "veena",
            "veena",
            "theme-veena",
            ".veena",
            "#veena"
        ],
        "js": [
            "veena.js",
            "veena.theme.js",
            "veena.min.js",
            "theme-veena.js",
            "veena.js",
            "window.Veena",
            "veena-scripts"
        ],
        "html": [
            "\"Veena\"",
            "\"theme_name\":\"Veena\"",
            "veena-theme",
            "data-veena",
            "class=\"veena\"",
            "data-theme-name=\"Veena\"",
            "theme-veena",
            "id=\"veena\""
        ],
        "paths": [
            "/assets/veena",
            "/assets/veena",
            "/t/veena/assets/",
            "/cdn/shop/t/veena/assets/",
            "/veena/assets/",
            "/assets/theme-veena"
        ]
    },
    "Venture": {
        "css": [
            "venture-theme",
            "venture__",
            "venture-",
            "venture-header",
            "venture",
            "venture",
            "theme-venture",
            ".venture",
            "#venture"
        ],
        "js": [
            "venture.js",
            "venture.theme.js",
            "venture.min.js",
            "theme-venture.js",
            "venture.js",
            "window.Venture",
            "venture-scripts"
        ],
        "html": [
            "\"Venture\"",
            "\"theme_name\":\"Venture\"",
            "venture-theme",
            "data-venture",
            "class=\"venture\"",
            "data-theme-name=\"Venture\"",
            "theme-venture",
            "id=\"venture\""
        ],
        "paths": [
            "/assets/venture",
            "/assets/venture",
            "/t/venture/assets/",
            "/cdn/shop/t/venture/assets/",
            "/venture/assets/",
            "/assets/theme-venture"
        ]
    },
    "Venue": {
        "css": [
            "venue-theme",
            "venue__",
            "venue-",
            "venue-header",
            "venue",
            "venue",
            "theme-venue",
            ".venue",
            "#venue"
        ],
        "js": [
            "venue.js",
            "venue.theme.js",
            "venue.min.js",
            "theme-venue.js",
            "venue.js",
            "window.Venue",
            "venue-scripts"
        ],
        "html": [
            "\"Venue\"",
            "\"theme_name\":\"Venue\"",
            "venue-theme",
            "data-venue",
            "class=\"venue\"",
            "data-theme-name=\"Venue\"",
            "theme-venue",
            "id=\"venue\""
        ],
        "paths": [
            "/assets/venue",
            "/assets/venue",
            "/t/venue/assets/",
            "/cdn/shop/t/venue/assets/",
            "/venue/assets/",
            "/assets/theme-venue"
        ]
    },
    "Vessel": {
        "css": [
            "vessel-theme",
            "vessel__",
            "vessel-",
            "vessel-header",
            "vessel",
            "vessel",
            "theme-vessel",
            ".vessel",
            "#vessel"
        ],
        "js": [
            "vessel.js",
            "vessel.theme.js",
            "vessel.min.js",
            "theme-vessel.js",
            "vessel.js",
            "window.Vessel",
            "vessel-scripts"
        ],
        "html": [
            "\"Vessel\"",
            "\"theme_name\":\"Vessel\"",
            "vessel-theme",
            "data-vessel",
            "class=\"vessel\"",
            "data-theme-name=\"Vessel\"",
            "theme-vessel",
            "id=\"vessel\""
        ],
        "paths": [
            "/assets/vessel",
            "/assets/vessel",
            "/t/vessel/assets/",
            "/cdn/shop/t/vessel/assets/",
            "/vessel/assets/",
            "/assets/theme-vessel"
        ]
    },
    "Vincent": {
        "css": [
            "vincent-theme",
            "vincent__",
            "vincent-",
            "vincent-header",
            "vincent",
            "vincent",
            "theme-vincent",
            ".vincent",
            "#vincent"
        ],
        "js": [
            "vincent.js",
            "vincent.theme.js",
            "vincent.min.js",
            "theme-vincent.js",
            "vincent.js",
            "window.Vincent",
            "vincent-scripts"
        ],
        "html": [
            "\"Vincent\"",
            "\"theme_name\":\"Vincent\"",
            "vincent-theme",
            "data-vincent",
            "class=\"vincent\"",
            "data-theme-name=\"Vincent\"",
            "theme-vincent",
            "id=\"vincent\""
        ],
        "paths": [
            "/assets/vincent",
            "/assets/vincent",
            "/t/vincent/assets/",
            "/cdn/shop/t/vincent/assets/",
            "/vincent/assets/",
            "/assets/theme-vincent"
        ]
    },
    "Viola": {
        "css": [
            "viola-theme",
            "viola__",
            "viola-",
            "viola-header",
            "viola",
            "viola",
            "theme-viola",
            ".viola",
            "#viola"
        ],
        "js": [
            "viola.js",
            "viola.theme.js",
            "viola.min.js",
            "theme-viola.js",
            "viola.js",
            "window.Viola",
            "viola-scripts"
        ],
        "html": [
            "\"Viola\"",
            "\"theme_name\":\"Viola\"",
            "viola-theme",
            "data-viola",
            "class=\"viola\"",
            "data-theme-name=\"Viola\"",
            "theme-viola",
            "id=\"viola\""
        ],
        "paths": [
            "/assets/viola",
            "/assets/viola",
            "/t/viola/assets/",
            "/cdn/shop/t/viola/assets/",
            "/viola/assets/",
            "/assets/theme-viola"
        ]
    },
    "Vision": {
        "css": [
            "vision-theme",
            "vision__",
            "vision-",
            "vision-header",
            "vision",
            "vision",
            "theme-vision",
            ".vision",
            "#vision"
        ],
        "js": [
            "vision.js",
            "vision.theme.js",
            "vision.min.js",
            "theme-vision.js",
            "vision.js",
            "window.Vision",
            "vision-scripts"
        ],
        "html": [
            "\"Vision\"",
            "\"theme_name\":\"Vision\"",
            "vision-theme",
            "data-vision",
            "class=\"vision\"",
            "data-theme-name=\"Vision\"",
            "theme-vision",
            "id=\"vision\""
        ],
        "paths": [
            "/assets/vision",
            "/assets/vision",
            "/t/vision/assets/",
            "/cdn/shop/t/vision/assets/",
            "/vision/assets/",
            "/assets/theme-vision"
        ]
    },
    "Vivid": {
        "css": [
            "vivid-theme",
            "vivid__",
            "vivid-",
            "vivid-header",
            "vivid",
            "vivid",
            "theme-vivid",
            ".vivid",
            "#vivid"
        ],
        "js": [
            "vivid.js",
            "vivid.theme.js",
            "vivid.min.js",
            "theme-vivid.js",
            "vivid.js",
            "window.Vivid",
            "vivid-scripts"
        ],
        "html": [
            "\"Vivid\"",
            "\"theme_name\":\"Vivid\"",
            "vivid-theme",
            "data-vivid",
            "class=\"vivid\"",
            "data-theme-name=\"Vivid\"",
            "theme-vivid",
            "id=\"vivid\""
        ],
        "paths": [
            "/assets/vivid",
            "/assets/vivid",
            "/t/vivid/assets/",
            "/cdn/shop/t/vivid/assets/",
            "/vivid/assets/",
            "/assets/theme-vivid"
        ]
    },
    "Vogue": {
        "css": [
            "vogue-theme",
            "vogue__",
            "vogue-",
            "vogue-header",
            "vogue",
            "vogue",
            "theme-vogue",
            ".vogue",
            "#vogue"
        ],
        "js": [
            "vogue.js",
            "vogue.theme.js",
            "vogue.min.js",
            "theme-vogue.js",
            "vogue.js",
            "window.Vogue",
            "vogue-scripts"
        ],
        "html": [
            "\"Vogue\"",
            "\"theme_name\":\"Vogue\"",
            "vogue-theme",
            "data-vogue",
            "class=\"vogue\"",
            "data-theme-name=\"Vogue\"",
            "theme-vogue",
            "id=\"vogue\""
        ],
        "paths": [
            "/assets/vogue",
            "/assets/vogue",
            "/t/vogue/assets/",
            "/cdn/shop/t/vogue/assets/",
            "/vogue/assets/",
            "/assets/theme-vogue"
        ]
    },
    "Volume": {
        "css": [
            "volume-theme",
            "volume__",
            "volume-",
            "volume-header",
            "volume",
            "volume",
            "theme-volume",
            ".volume",
            "#volume"
        ],
        "js": [
            "volume.js",
            "volume.theme.js",
            "volume.min.js",
            "theme-volume.js",
            "volume.js",
            "window.Volume",
            "volume-scripts"
        ],
        "html": [
            "\"Volume\"",
            "\"theme_name\":\"Volume\"",
            "volume-theme",
            "data-volume",
            "class=\"volume\"",
            "data-theme-name=\"Volume\"",
            "theme-volume",
            "id=\"volume\""
        ],
        "paths": [
            "/assets/volume",
            "/assets/volume",
            "/t/volume/assets/",
            "/cdn/shop/t/volume/assets/",
            "/volume/assets/",
            "/assets/theme-volume"
        ]
    },
    "Warehouse": {
        "css": [
            "warehouse-theme",
            "warehouse__",
            "warehouse-",
            "warehouse-header",
            "warehouse",
            "warehouse",
            "theme-warehouse",
            ".warehouse",
            "#warehouse"
        ],
        "js": [
            "warehouse.js",
            "warehouse.theme.js",
            "warehouse.min.js",
            "theme-warehouse.js",
            "warehouse.js",
            "window.Warehouse",
            "warehouse-scripts"
        ],
        "html": [
            "\"Warehouse\"",
            "\"theme_name\":\"Warehouse\"",
            "warehouse-theme",
            "data-warehouse",
            "class=\"warehouse\"",
            "data-theme-name=\"Warehouse\"",
            "theme-warehouse",
            "id=\"warehouse\""
        ],
        "paths": [
            "/assets/warehouse",
            "/assets/warehouse",
            "/t/warehouse/assets/",
            "/cdn/shop/t/warehouse/assets/",
            "/warehouse/assets/",
            "/assets/theme-warehouse"
        ]
    },
    "Whisk": {
        "css": [
            "whisk-theme",
            "whisk__",
            "whisk-",
            "whisk-header",
            "whisk",
            "whisk",
            "theme-whisk",
            ".whisk",
            "#whisk"
        ],
        "js": [
            "whisk.js",
            "whisk.theme.js",
            "whisk.min.js",
            "theme-whisk.js",
            "whisk.js",
            "window.Whisk",
            "whisk-scripts"
        ],
        "html": [
            "\"Whisk\"",
            "\"theme_name\":\"Whisk\"",
            "whisk-theme",
            "data-whisk",
            "class=\"whisk\"",
            "data-theme-name=\"Whisk\"",
            "theme-whisk",
            "id=\"whisk\""
        ],
        "paths": [
            "/assets/whisk",
            "/assets/whisk",
            "/t/whisk/assets/",
            "/cdn/shop/t/whisk/assets/",
            "/whisk/assets/",
            "/assets/theme-whisk"
        ]
    },
    "Wonder": {
        "css": [
            "wonder-theme",
            "wonder__",
            "wonder-",
            "wonder-header",
            "wonder",
            "wonder",
            "theme-wonder",
            ".wonder",
            "#wonder"
        ],
        "js": [
            "wonder.js",
            "wonder.theme.js",
            "wonder.min.js",
            "theme-wonder.js",
            "wonder.js",
            "window.Wonder",
            "wonder-scripts"
        ],
        "html": [
            "\"Wonder\"",
            "\"theme_name\":\"Wonder\"",
            "wonder-theme",
            "data-wonder",
            "class=\"wonder\"",
            "data-theme-name=\"Wonder\"",
            "theme-wonder",
            "id=\"wonder\""
        ],
        "paths": [
            "/assets/wonder",
            "/assets/wonder",
            "/t/wonder/assets/",
            "/cdn/shop/t/wonder/assets/",
            "/wonder/assets/",
            "/assets/theme-wonder"
        ]
    },
    "Woodstock": {
        "css": [
            "woodstock-theme",
            "woodstock__",
            "woodstock-",
            "woodstock-header",
            "woodstock",
            "woodstock",
            "theme-woodstock",
            ".woodstock",
            "#woodstock"
        ],
        "js": [
            "woodstock.js",
            "woodstock.theme.js",
            "woodstock.min.js",
            "theme-woodstock.js",
            "woodstock.js",
            "window.Woodstock",
            "woodstock-scripts"
        ],
        "html": [
            "\"Woodstock\"",
            "\"theme_name\":\"Woodstock\"",
            "woodstock-theme",
            "data-woodstock",
            "class=\"woodstock\"",
            "data-theme-name=\"Woodstock\"",
            "theme-woodstock",
            "id=\"woodstock\""
        ],
        "paths": [
            "/assets/woodstock",
            "/assets/woodstock",
            "/t/woodstock/assets/",
            "/cdn/shop/t/woodstock/assets/",
            "/woodstock/assets/",
            "/assets/theme-woodstock"
        ]
    },
    "Xclusive": {
        "css": [
            "xclusive-theme",
            "xclusive__",
            "xclusive-",
            "xclusive-header",
            "xclusive",
            "xclusive",
            "theme-xclusive",
            ".xclusive",
            "#xclusive"
        ],
        "js": [
            "xclusive.js",
            "xclusive.theme.js",
            "xclusive.min.js",
            "theme-xclusive.js",
            "xclusive.js",
            "window.Xclusive",
            "xclusive-scripts"
        ],
        "html": [
            "\"Xclusive\"",
            "\"theme_name\":\"Xclusive\"",
            "xclusive-theme",
            "data-xclusive",
            "class=\"xclusive\"",
            "data-theme-name=\"Xclusive\"",
            "theme-xclusive",
            "id=\"xclusive\""
        ],
        "paths": [
            "/assets/xclusive",
            "/assets/xclusive",
            "/t/xclusive/assets/",
            "/cdn/shop/t/xclusive/assets/",
            "/xclusive/assets/",
            "/assets/theme-xclusive"
        ]
    },
    "Xtra": {
        "css": [
            "xtra-theme",
            "xtra__",
            "xtra-",
            "xtra-header",
            "xtra",
            "xtra",
            "theme-xtra",
            ".xtra",
            "#xtra"
        ],
        "js": [
            "xtra.js",
            "xtra.theme.js",
            "xtra.min.js",
            "theme-xtra.js",
            "xtra.js",
            "window.Xtra",
            "xtra-scripts"
        ],
        "html": [
            "\"Xtra\"",
            "\"theme_name\":\"Xtra\"",
            "xtra-theme",
            "data-xtra",
            "class=\"xtra\"",
            "data-theme-name=\"Xtra\"",
            "theme-xtra",
            "id=\"xtra\""
        ],
        "paths": [
            "/assets/xtra",
            "/assets/xtra",
            "/t/xtra/assets/",
            "/cdn/shop/t/xtra/assets/",
            "/xtra/assets/",
            "/assets/theme-xtra"
        ]
    },
    "Yuva": {
        "css": [
            "yuva-theme",
            "yuva__",
            "yuva-",
            "yuva-header",
            "yuva",
            "yuva",
            "theme-yuva",
            ".yuva",
            "#yuva"
        ],
        "js": [
            "yuva.js",
            "yuva.theme.js",
            "yuva.min.js",
            "theme-yuva.js",
            "yuva.js",
            "window.Yuva",
            "yuva-scripts"
        ],
        "html": [
            "\"Yuva\"",
            "\"theme_name\":\"Yuva\"",
            "yuva-theme",
            "data-yuva",
            "class=\"yuva\"",
            "data-theme-name=\"Yuva\"",
            "theme-yuva",
            "id=\"yuva\""
        ],
        "paths": [
            "/assets/yuva",
            "/assets/yuva",
            "/t/yuva/assets/",
            "/cdn/shop/t/yuva/assets/",
            "/yuva/assets/",
            "/assets/theme-yuva"
        ]
    },
    "Zero": {
        "css": [
            "zero-theme",
            "zero__",
            "zero-",
            "zero-header",
            "zero",
            "zero",
            "theme-zero",
            ".zero",
            "#zero"
        ],
        "js": [
            "zero.js",
            "zero.theme.js",
            "zero.min.js",
            "theme-zero.js",
            "zero.js",
            "window.Zero",
            "zero-scripts"
        ],
        "html": [
            "\"Zero\"",
            "\"theme_name\":\"Zero\"",
            "zero-theme",
            "data-zero",
            "class=\"zero\"",
            "data-theme-name=\"Zero\"",
            "theme-zero",
            "id=\"zero\""
        ],
        "paths": [
            "/assets/zero",
            "/assets/zero",
            "/t/zero/assets/",
            "/cdn/shop/t/zero/assets/",
            "/zero/assets/",
            "/assets/theme-zero"
        ]
    },
    "Zest": {
        "css": [
            "zest-theme",
            "zest__",
            "zest-",
            "zest-header",
            "zest",
            "zest",
            "theme-zest",
            ".zest",
            "#zest"
        ],
        "js": [
            "zest.js",
            "zest.theme.js",
            "zest.min.js",
            "theme-zest.js",
            "zest.js",
            "window.Zest",
            "zest-scripts"
        ],
        "html": [
            "\"Zest\"",
            "\"theme_name\":\"Zest\"",
            "zest-theme",
            "data-zest",
            "class=\"zest\"",
            "data-theme-name=\"Zest\"",
            "theme-zest",
            "id=\"zest\""
        ],
        "paths": [
            "/assets/zest",
            "/assets/zest",
            "/t/zest/assets/",
            "/cdn/shop/t/zest/assets/",
            "/zest/assets/",
            "/assets/theme-zest"
        ]
    },
    "Zora": {
        "css": [
            "zora-theme",
            "zora__",
            "zora-",
            "zora-header",
            "zora",
            "zora",
            "theme-zora",
            ".zora",
            "#zora"
        ],
        "js": [
            "zora.js",
            "zora.theme.js",
            "zora.min.js",
            "theme-zora.js",
            "zora.js",
            "window.Zora",
            "zora-scripts"
        ],
        "html": [
            "\"Zora\"",
            "\"theme_name\":\"Zora\"",
            "zora-theme",
            "data-zora",
            "class=\"zora\"",
            "data-theme-name=\"Zora\"",
            "theme-zora",
            "id=\"zora\""
        ],
        "paths": [
            "/assets/zora",
            "/assets/zora",
            "/t/zora/assets/",
            "/cdn/shop/t/zora/assets/",
            "/zora/assets/",
            "/assets/theme-zora"
        ]
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
