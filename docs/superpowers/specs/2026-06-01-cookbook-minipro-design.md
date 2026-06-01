# 菜谱小程序前端设计

## 概述

将 `test/` 目录下的 React 19 + Tailwind CSS 4 原型代码迁移为微信小程序，使用 Taro 3 跨端框架。目标：以最小改动量将 1200 行 React 代码转为可运行的微信小程序。

## 技术栈

- **框架**: Taro 3.x
- **UI 层**: React 18
- **UI 组件库**: NutUI 4.x (京东移动端组件库)
- **样式**: SCSS Modules (样式隔离) + Design Tokens
- **语言**: TypeScript 5.x
- **图标**: NutUI Icons (替代 lucide-react)
- **后端**: cookbook-server FastAPI (已实现)

## 项目结构

```
cookbook-minipro/
├── src/
│   ├── app.tsx              # App 入口
│   ├── app.scss             # 全局样式
│   ├── app.config.ts        # 页面路由 + TabBar 配置
│   ├── types/
│   │   └── index.ts         # 从 test/src/types.ts 复制
│   ├── data/
│   │   └── index.ts         # 从 test/src/data.ts 复制 (mock 数据过渡用)
│   ├── styles/
│   │   ├── tokens.scss      # Design Tokens (色值/字号/间距/圆角/阴影)
│   │   └── global.scss      # 全局 reset + 通用工具类
│   ├── components/
│   │   ├── BottomNav/       # 底部导航栏 (index.tsx + .module.scss)
│   │   ├── RecipeCard/      # 菜品卡片 (支持瀑布流/网格/排名编号)
│   │   ├── StarRating/      # 星级评分 (可交互打分 + 只读展示)
│   │   └── SearchBar/       # 搜索输入框
│   ├── pages/
│   │   ├── home/            # 首页 — 排行榜 + 最新上传
│   │   ├── all-recipes/     # 全部菜品 — 瀑布流 + 分类筛选
│   │   ├── recipe-detail/   # 菜品详情 + 评分弹窗 + 建议弹窗
│   │   ├── upload/          # 菜品上传 — 表单 + 步骤编辑器
│   │   ├── profile/         # 个人中心 — 统计数据 + 菜单
│   │   ├── my-uploads/      # 我的上传列表
│   │   ├── my-favorites/    # 我的收藏列表
│   │   └── my-suggestions/  # 我的建议列表
│   └── services/
│       └── api.ts           # API 封装层 (Taro.request)
└── project.config.json      # 微信小程序配置
```

## 路由设计

- **TabBar**: 首页、全部菜品、上传、个人中心 (4 个主 tab)
- **子页面**: 菜品详情、我的上传、我的收藏、我的建议 (navigateTo)
- **页面参数**: 通过 `Taro.useRouter().params` 获取，替换 React 的 useState 导航
- **导航 API**: `Taro.navigateTo` / `Taro.navigateBack` / `Taro.switchTab` / `Taro.redirectTo`

## Design Tokens

从 `test/stitch_/fresh_harvest_narrative/DESIGN.md` 1:1 映射到 `tokens.scss`:

- **Colors**: 50+ 色值 (primary #52c41a, surface #fbf8fd, 完整 Material Design 3 调色板)
- **Typography**: 7 级字号 (display-lg: 30px → label-md: 12px)
- **Spacing**: 4px 基准系统 (unit/stack-sm/stack-md/stack-lg/margin-page/gutter-card)
- **Border Radius**: sm 4px / DEFAULT 8px / lg 12px / xl 16px / full 1000px
- **Shadows**: card 0-4-12 / fab 0-8-20 / nav 0_-4_20

字体回退: Google Fonts 不可用 → 使用系统字体栈 `system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`

## 组件树

### 全局复用组件
| 组件 | 来源 | 功能 |
|------|------|------|
| BottomNav | 从 React 版 BottomNav.tsx | TabBar 底部导航 (中间突出上传按钮) |
| RecipeCard | 从 React 版 RecipeCard.tsx | 菜品卡片 (瀑布流/网格两种布局) |
| StarRating | 新组件 | 星级评分 (可交互 + 只读) |
| SearchBar | 从 HomeScreen 提取 | 搜索输入框 |

### 页面内组件 (不复用)
| 组件 | 页面 | 说明 |
|------|------|------|
| CategoryTabs | home / all-recipes | 横向滚动分类标签 |
| ReviewModal | recipe-detail | 评分弹窗 (星级 + 文本 + 匿名开关) |
| IngredientList | recipe-detail | 食材清单 |
| StepList | recipe-detail | 制作步骤 |

## 数据层

### API 封装 (services/api.ts)
- 基础函数 `request<T>(path, opts)` 自动附加 JWT token
- `Taro.request` 封装，统一处理 token 读取、错误拦截
- `Taro.uploadFile` 处理图片上传 (multipart/form-data)
- 微信登录 token 通过 `Taro.setStorageSync` 持久化

### 页面 → API 映射
| 页面 | API |
|------|-----|
| 首页排行榜 | `GET /dishes?sort=rating` |
| 首页最新 | `GET /dishes?sort=latest` |
| 全部菜品 | `GET /dishes?category_id=&keyword=` |
| 菜品详情 | `GET /dishes/:id` |
| 评分 | `POST /dishes/:id/ratings` |
| 建议 | `POST /dishes/:id/suggestions` |
| 上传 | `POST /upload/image` + `POST /dishes` |
| 个人中心 | `GET /users/me/stats` |
| 我的上传/评分/建议 | `GET /users/me/dishes` 等 |

## 迁移对照

### 可直接复用 (约 60% 代码量)
- TypeScript 类型定义 (types.ts) — 直接复制
- React Hooks 逻辑 (useState/useEffect) — 语法相同
- JSX 结构骨架 — 只换标签名
- Mock 数据 (data.ts) — 开发期过渡

### 需要转换 (约 40% 代码量)
| React 写法 | Taro 写法 | 说明 |
|------------|----------|------|
| `<div> <span> <p>` | `<View> <Text>` | 系统标签替换 |
| `<img src={url}>` | `<Image src={url}>` | Image 组件 |
| `<input> <textarea>` | `<Input> <Textarea>` | 表单组件 |
| `className="flex flex-col"` | `className={styles.xxx}` | SCSS Module |
| `lucide-react` 图标 | NutUI Icon 组件 | 图标库替换 |
| `useState` 路由 | `Taro.navigateTo` | 页面导航 |
| `onClick={() => setScreen(x)}` | `Taro.navigateTo({url})` | 事件处理 |
| Google Fonts | 系统字体回退 | 字体方案 |
| `backdrop-blur` | 半透明纯色替代 | CSS 兼容 |

## 风险与对策

| 风险 | 对策 |
|------|------|
| CSS backdrop-blur 小程序不支持 | 用 opacity + 纯色背景替代 |
| NutUI 与 React 版本兼容 | Taro 默认 React 18，NutUI 4.x 已验证 |
| CSS column-count 瀑布流表现 | 优先 CSS，不行改用 JS 分两列渲染 |
| 小程序无 HTML5 Drag API | 步骤排序用上移/下移按钮(首版) |
| 图片上传超限 | wx.compressImage 压缩 + 客户端大小检查 |
| 微信登录域名白名单 | 开发期用 dev code，上线前配置合法域名 |

## 迁移顺序

1. 项目脚手架 (Taro init + SCSS + types/data 复制 + tokens.scss)
2. 全局组件 (BottomNav + RecipeCard + StarRating + SearchBar)
3. 首页 (排行榜 + 最新上传)
4. 全部菜品 (瀑布流 + 分类筛选)
5. 菜品详情 (详情 + 评分弹窗 + 建议弹窗)
6. 个人中心 (统计数据 + 菜单)
7. 上传页面 (表单 + 步骤编辑器 + 草稿)
8. 子页面 (我的上传 + 我的收藏 + 我的建议)
9. 微信登录集成
10. API 对接 + 真机测试

## 不做的事情
- 客户端数据缓存 (首版用 onShow 刷新)
- 离线支持
- 拖拽排序 (用上下箭头按钮替代)
- 动画/过度效果 (首版实现核心功能)
