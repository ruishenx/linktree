# 海纳百川导航站

这是一个纯前端静态导航站，入口为 `index.html`。页面不依赖 CDN、远程视频或 jQuery，站点信息集中维护在 `site-data.js`。

## 项目结构

- `index.html`：首页和单页应用入口。
- `style.css`：Notion 风格界面、响应式侧栏、顶部工具栏、footer、首页书本网格、非首页主题背景、瀑布流布局和 light / dark 主题。
- `app.js`：侧栏折叠、分组折叠、首页书本网格、页面背景标记、页面渲染、主题切换、瀑布框批量展开/收缩和瀑布流列布局。
- `site-data.js`：首页书本图片、页面、分类、链接、图片路径、状态说明和 SVG 图标的集中维护文件。
- `assets/logo/`：`logo.png`、`logo-transparent.png`、`favicon.ico`。
- `assets/sites/img/`：网站分类图片资源。
- `assets/developers/img/`：Community 图片资源。
- `assets/accounts/img/`：社交媒体图片资源。

## 维护方式

新增链接时，先把图片放到对应资源目录，再编辑 `site-data.js` 中对应页面的 `sections` 数组：

```js
{
  "id": "tools",
  "title": "工具",
  "icon": "<svg ...></svg>",
  "items": [
    {
      "title": "Example",
      "url": "https://example.com/",
      "status": "NoGFW",
      "image": "assets/sites/img/it/tools/example.png",
      "svg": ""
    }
  ]
}
```

没有图片但需要使用图标时，把 SVG 字符串放在 `svg` 字段中。侧栏和页头图标在对应页面的 `icon` 字段维护；每个分类瀑布框的图标在对应 `section.icon` 字段维护。

首页书本网格的数据维护在 `site-data.js` 的 `home.books` 数组中。每一项对应首页上的一本书，后续替换封面时修改对应项的 `image` 即可：

```js
{
  "title": "Book 01",
  "image": "https://example.com/book-cover.jpg"
}
```

## 行为说明

- 首页使用 `dist` 模板改造后的响应式书本网格，书本封面链接从 `site-data.js` 读取，背景会跟随 light / dark 主题切换。
- 首页以外的页面会根据当前页面主题显示轻量 CSS 背景；背景只使用本地可渲染的渐变和网格，不依赖大尺寸图片资源，并随 light / dark 主题切换。
- 左侧侧栏支持整体折叠；展开宽度超过视口 30% 时会自动折叠。
- 底部 footer 固定显示，层级高于左侧边栏。
- 主页面和侧栏各自滚动，长页面不会带动侧栏滚动。
- light / dark 按钮位于页面右上角，只显示 sun / moon 图标。
- light / dark 按钮左侧提供一键展开/收缩当前页面全部瀑布框的按钮。
- mobile 端的侧栏打开按钮位于页面左上角。
- 左侧分组和内容瀑布框都支持折叠。
- 瀑布框按“从左到右、从上到下”的顺序分配到列中：`1 2 3 4 / 5 6 7 8`。
- 刷新页面后，瀑布框默认全部收缩。
- 每个瀑布框展开后都有最大高度，内容超出时在瀑布框内部独立滚动。
- 链接条目取消旧版按钮，点击标题会在新标签页打开网址。
- 文件和文件夹名已统一为小写字母开头。

## 性能与可用性

- 页面不依赖 CDN 脚本、远程样式库或 jQuery，核心渲染只需要本地 `index.html`、`style.css`、`site-data.js` 和 `app.js`。
- 首页书本封面可能使用远程图片链接；远程图片失败或加载较慢时，会显示本地 CSS 生成的封面占位，不影响首页布局。
- 首页封面和条目图标使用浏览器懒加载与异步解码，降低首屏请求量和图片解码阻塞。
- 内容瀑布框默认收缩，内部条目会在展开时再渲染，避免首屏一次性创建大量 DOM 和触发大量图片请求。
- 新增资源时优先使用本地小体积图片或内联 SVG；大尺寸 PNG/JPG/GIF 会增加等待时间，且不利于弱网环境。
- 若新增第三方资源，优先确认不依赖需要 VPN 才能稳定访问的 CDN 或对象存储；必要时提供本地 fallback。
