// 统一配置：修改下方内容并保存即可，无需编译。
// 保留 window.SITE_CONFIG = 和结尾分号。支持 JavaScript 注释及末尾逗号。
window.SITE_CONFIG = {
  "page": {
    "language": "zh",
    "title": "睿深的电子记忆 - Ruishen's Digital Brain",
    "author": "睿深 Ruishen",
    "description": "睿深的电子记忆 - Ruishen's Digital Brain",
    "themeColor": "#000000",
    "favicon": {
      "source": "builtin:01bdd6TPB.png",
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path fill=\"#78b857\" d=\"M16 1 29 8.5v15L16 31 3 23.5v-15Z\"/><path fill=\"#111\" d=\"M10 8h3v13h9v3H10Z\"/></svg>"
    }
  },
  "fonts": {
    "body": {
      "family": "EB Garamond",
      "source": "builtin:garamond.ttf",
      "format": "truetype",
      "fallback": "Georgia, serif"
    },
    "icons": {
      "family": "FontAwesome",
      "source": "builtin:fontawesome.woff",
      "format": "woff"
    }
  },
  "navigation": {
    "label": "Main navigation",
    "gridLabel": "Hexagonal navigation and interactive effects",
    "items": [
      {
        "id": "hmcc",
        "text": "人类核心元能力 HMCC",
        "hoverText": null,
        "url": "./er/dist/index.html",
        "position": [
          1,
          1
        ],
        "side": 3,
        "icon": {
          "source": "builtin:1.png",
          "width": 128,
          "height": 128,
          "opacity": 1
        },
        "colors": {
          "burst": "hsl(1 58% 54%)",
          "hover": "hsl(1 58% 27%)",
          "menu": "hsl(1 46.400000000000006% 27%)",
          "letter": "hsl(1 28% 50%)"
        }
      },
      {
        "id": "salus",
        "text": "安全与健康 Salus",
        "hoverText": null,
        "url": "./index.html",
        "position": [
          1,
          0
        ],
        "side": 2,
        "icon": {
          "source": "builtin:2.png",
          "width": 150,
          "height": 150,
          "opacity": 1
        },
        "colors": {
          "burst": "hsl(26 78% 56%)",
          "hover": "hsl(26 78% 28%)",
          "menu": "hsl(26 62.400000000000006% 28%)",
          "letter": "hsl(26 48% 50%)"
        }
      },
      {
        "id": "education",
        "text": "教育 Education",
        "hoverText": null,
        "url": "./index.html",
        "position": [
          1,
          -1
        ],
        "side": 1,
        "icon": {
          "source": "builtin:3.png",
          "width": 150,
          "height": 150,
          "opacity": 1
        },
        "colors": {
          "burst": "hsl(39 87% 62%)",
          "hover": "hsl(39 87% 31%)",
          "menu": "hsl(39 69.60000000000001% 31%)",
          "letter": "hsl(39 57% 50%)"
        }
      },
      {
        "id": "social science",
        "text": "社会科学 Social Science",
        "hoverText": null,
        "url": "./index.html",
        "position": [
          0,
          -1
        ],
        "side": 0,
        "icon": {
          "source": "builtin:4.png",
          "width": 150,
          "height": 150,
          "opacity": 1
        },
        "colors": {
          "burst": "hsl(99 40% 53%)",
          "hover": "hsl(99 40% 26.5%)",
          "menu": "hsl(99 32% 26.5%)",
          "letter": "hsl(99 10% 50%)"
        }
      },
      {
        "id": "operations",
        "text": "组织运营 Operations",
        "hoverText": null,
        "url": "./index.html",
        "position": [
          -1,
          0
        ],
        "side": 5,
        "icon": {
          "source": "builtin:5.png",
          "width": 150,
          "height": 150,
          "opacity": 1
        },
        "colors": {
          "burst": "hsl(203 64% 54%)",
          "hover": "hsl(203 64% 27%)",
          "menu": "hsl(203 51.2% 27%)",
          "letter": "hsl(203 34% 50%)"
        }
      },
      {
        "id": "philosophy",
        "text": "哲学 Philosophy",
        "hoverText": null,
        "url": "./index.html",
        "position": [
          0,
          1
        ],
        "side": 4,
        "icon": {
          "source": "builtin:6.png",
          "width": 150,
          "height": 150,
          "opacity": 1
        },
        "colors": {
          "burst": "hsl(293 36% 41%)",
          "hover": "hsl(293 36% 20.5%)",
          "menu": "hsl(293 28.8% 20.5%)",
          "letter": "hsl(293 6% 50%)"
        }
      }
    ]
  },
  "footer": {
    "label": "Contact and social links",
    "links": [
      {
        "label": "Email Lawrence Kesteloot",
        "url": "./index.html",
        "icon": {
          "glyph": "",
          "source": null
        }
      },
      {
        "label": "LinkedIn",
        "url": "./index.html",
        "icon": {
          "glyph": "",
          "source": null
        }
      },
      {
        "label": "Twitter",
        "url": "./index.html",
        "icon": {
          "glyph": "",
          "source": null
        }
      },
      {
        "label": "GitHub",
        "url": "https://github.com/ruishenx",
        "icon": {
          "glyph": "",
          "source": null
        }
      }
    ]
  },
  "layout": {
    "hexagonWidth": 200,
    "gap": 10,
    "gridSize": 2048,
    "perspective": 1000,
    "mobileBreakpoint": 900,
    "compactBreakpoint": 1401,
    "compactScale": 0.8,
    "desktopMinHeight": 601,
    "compactMinHeight": 481,
    "phoneBreakpoint": 520,
    "backgroundFadeRadius": 800,
    "outerGray": 26,
    "centerGray": 42
  },
  "style": {
    "page-background": "#000",
    "grid-background": "#111",
    "tile-fallback": "#222",
    "text-color": "#ccc",
    "control-focus-color": "#3a3a3a",
    "footer-color": "#666",
    "footer-hover-color": "#ddd",
    "footer-mobile-color": "#bbb",
    "focus-ring-color": "#ccc",
    "body-font-size": "22px",
    "body-line-height": "1.4",
    "menu-font-size": "35px",
    "title-font-size": "50px",
    "menu-gap": "10px",
    "menu-padding": "10px",
    "title-padding": "20px",
    "card-padding": "20px",
    "card-radius": "3px",
    "menu-icon-size": "2em",
    "footer-font-size": "22px",
    "footer-line-height": "1.4",
    "footer-gap": "10px",
    "footer-left": "15px",
    "footer-bottom": "10px",
    "footer-mobile-gap": "30px",
    "footer-mobile-padding": "20px 0 50px",
    "phone-title-font-size": "clamp(30px, 8.5vw, 44px)",
    "phone-title-padding": "20px 0",
    "phone-card-height": "106px",
    "phone-card-padding": "16px",
    "phone-icon-width": "44px",
    "phone-icon-height": "56px",
    "phone-menu-font-size": "clamp(25px, 7vw, 32px)",
    "phone-footer-padding": "25px 0 40px",
    "focus-ring-width": "2px",
    "focus-ring-offset": "-4px",
    "tile-color-transition": "200ms",
    "tile-transform-transition": "500ms",
    "footer-transition": "200ms"
  },
  "hover": {
    "letterDelay": 80,
    "strokeDelayPerUnit": 2,
    "strokeDuration": 50,
    "fadeDuration": 1000,
    "blur": 20,
    "glow": 4,
    "scale": 0.8,
    "curveRadius": 500,
    "topOffset": 30,
    "bottomOffset": -60,
    "fontSize": 64,
    "strokeWidth": 1,
    "referenceOutlines": {
      "source": "builtin:reference-outlines",
      "fontFamily": "EB Garamond",
      "labels": [
        "writings",
        "programming",
        "projects",
        "oscar",
        "puzzles",
        "recipes"
      ],
      "fontSource": "builtin:garamond.ttf"
    },
    "viewportPadding": 8
  },
  "effects": {
    "controls": [
      {
        "type": "shimmer",
        "label": "Color shimmer",
        "position": [
          -1,
          -1
        ]
      },
      {
        "type": "snake",
        "label": "Light trails — hold to draw",
        "position": [
          -2,
          0
        ]
      },
      {
        "type": "flip",
        "label": "Wave flip",
        "position": [
          -1,
          1
        ]
      },
      {
        "type": "rotate",
        "label": "Hexagon rotation",
        "position": [
          2,
          1
        ]
      },
      {
        "type": "c64",
        "label": "Radial color burst",
        "position": [
          2,
          -1
        ]
      },
      {
        "type": "gravity",
        "label": "Honeycomb gravity well",
        "position": [
          2,
          0
        ]
      }
    ],
    "shimmer": {
      "hueRange": [
        0,
        360
      ],
      "saturation": 20,
      "lightness": 10,
      "scale": 0.95,
      "duration": 1000,
      "stagger": 5
    },
    "flip": {
      "hueRange": [
        0,
        720
      ],
      "saturation": 20,
      "lightness": 30,
      "depth": 100,
      "duration": 300,
      "spread": 1000
    },
    "rotate": {
      "hueRange": [
        0,
        360
      ],
      "saturation": 20,
      "lightness": 15,
      "scale": 0.95,
      "angle": 60,
      "duration": 500,
      "stagger": 20
    },
    "c64": {
      "background": "#F3EDD7",
      "duration": 1500,
      "spread": 2000
    },
    "snake": {
      "width": 4,
      "glowColor": "#fff",
      "glow": 4,
      "hueStart": 0,
      "hueSpeed": 0.1,
      "saturation": 100,
      "headLightness": 90,
      "tailLightness": 50,
      "lightnessDecay": 2,
      "speedRange": [
        0.1,
        0.5
      ],
      "tailLength": 100,
      "emissionsPerSecond": 23,
      "maxTrails": 60
    },
    "gravity": {
      "radius": 1050,
      "falloff": 370,
      "spreadRadius": 900,
      "spread": 160,
      "depth": 240,
      "pull": 0.04,
      "dim": 0.2,
      "duration": 1700,
      "edgeLight": "#bfc4ca",
      "edgeDark": "#000",
      "edgeWidth": 2,
      "edgeBaseOpacity": 0.15,
      "edgeStrengthOpacity": 0.65
    },
    "reducedMotion": {
      "color": "#555",
      "duration": 200
    }
  }
};
