# 微信小程序开发提示词：小圈子菜谱共享平台

## 一、项目概述
设计并开发一个**单一群组私密共享的菜品记录微信小程序**，面向家人、朋友等小圈子用户，用于沉淀和分享家常菜谱、烹饪经验。所有登录用户均可贡献内容，但不可篡改他人作品，通过评分和建议系统促进交流，用排行榜增加互动趣味性。

**技术说明**：前端独立开发，后端接口已由开发者自行实现，只需按照标准RESTful API规范进行对接。

## 二、核心权限规则
- 所有通过微信登录的用户自动加入唯一的群组
- 所有用户权限一致：可上传菜品、对菜品评分、撰写做菜建议
- 严格权限隔离：用户只能编辑和删除自己上传的菜品、自己的评分和建议，**绝对不可操作他人的任何内容**

## 三、页面结构与功能详情

### 1. 首页（简约清新风格，AI优化布局）
- **顶部区域**：搜索框（支持按菜品名称模糊搜索）+ 分类筛选栏（横向滚动，点击筛选对应分类菜品）
- **核心区域**：
  - 排行榜模块（置顶展示）：
    - 顶部有三个标签页：总榜、本周热门、本月热门
    - 每个标签页按菜品**平均星级从高到低**排序
    - 排行榜条目显示：排名数字、菜品封面图、菜品名称、平均星级（星星图标）、评分人数
  - 最新上传模块：展示最近上传的菜品列表，卡片式布局，显示菜品封面、名称、上传者昵称、上传时间
- **底部导航栏**：首页、上传菜品、个人中心

### 2. 菜品详情页（AI优化布局顺序）
- 顶部：菜品高清封面图（全屏宽度）
- 基本信息区：菜品名称、上传者头像昵称、上传时间
- 评分与操作区：
  - 显示当前菜品平均星级和总评分人数
  - 醒目的"我要评分"按钮（点击弹出1-5星评分弹窗，支持只打分不写评论）
  - 醒目的"我要写建议"按钮（点击弹出建议输入框）
- 元数据区：烹饪时长、难度等级（简单/中等/困难）、菜品分类、适合人群
- 食材清单区：
  - 分栏展示食材名称和用量
  - **特殊交互**：点击任意食材名称，自动跳转到搜索结果页，显示所有包含该食材的菜品
- 制作步骤区：
  - 步骤按序号排列，每个步骤包含文字说明和对应图片
  - **特殊交互**：上传时支持拖拽调整步骤顺序
- 小贴士区：展示上传者填写的烹饪技巧和注意事项
- 营养信息区：展示上传者填写的营养成分信息
- 底部评论区：
  - 分两个标签页：所有评分、所有做菜建议
  - 每条记录显示用户头像、昵称、评分星级/建议内容、提交时间
  - 用户可以看到自己的历史评分和建议，并可点击编辑（编辑后覆盖原有记录）

### 3. 菜品上传页
- 分步骤引导式上传，表单清晰易懂
- 必填项：菜品名称、封面图上传、食材清单、制作步骤、烹饪时长、难度等级
- 可选项：菜品分类（下拉选择）、适合人群、小贴士、营养信息
- **特殊交互**：
  - 食材清单支持快速添加常用食材（预设常用食材按钮，点击自动填入）
  - 制作步骤支持添加多个步骤，每个步骤可上传一张图片
  - 步骤支持拖拽调整顺序
  - 支持保存草稿，下次进入可继续编辑

### 4. 个人中心页
- 顶部：用户头像、昵称
- 功能卡片区（三个并列卡片）：
  - 我上传的菜品：显示数量，点击进入列表页
  - 我评分过的菜品：显示数量，点击进入列表页
  - 我写过的建议：显示数量，点击进入列表页
- 底部：设置、关于我们、退出登录

## 四、视觉设计要求
- **整体风格**：简约清新风，干净明亮，突出食物本身的美感
- **主色调**：推荐使用柔和的绿色系（代表健康、自然）或暖橙色系（代表温暖、食欲）
- **辅助色**：白色、浅灰色作为背景，少量高饱和度颜色用于强调按钮和重要信息
- **字体**：使用微信小程序默认字体，字号层级清晰，易读性优先
- **图标**：使用线性图标，风格统一，简洁易懂
- **布局**：留白充足，避免信息过载，卡片式设计区分不同功能模块

## 五、交互设计要求
- 所有按钮点击有明确的反馈效果（颜色变化、轻微缩放）
- 页面跳转使用微信小程序默认的滑动动画
- 加载状态显示友好的加载动画
- 表单提交有验证提示，错误信息清晰明确
- 长列表支持下拉刷新和上拉加载更多
- 图片支持点击放大查看

## 六、特殊功能与细节
1. 评分系统：每个用户对同一菜品可无限次打分，每次打分覆盖上次记录，平均星级实时更新
2. 建议系统：每个用户对同一菜品可无限次写建议，每次编辑覆盖上次记录
3. 搜索功能：支持按菜品名称模糊搜索，搜索结果按相关度排序
4. 筛选功能：支持按菜品分类筛选，筛选结果可与搜索结果叠加
5. 数据缓存：缓存首页和个人中心的常用数据，提升加载速度
6. 错误处理：网络请求失败时显示友好的错误提示和重试按钮

## 七、后端接口规范

### 通用说明

- **Base URL**: `https://api.example.com/api/v1`
- **请求头**: 除登录接口外，所有接口需携带 `Authorization: Bearer {access_token}`
- **通用响应格式**:

```json
{
  "code": 200,
  "message": "ok",
  "data": {}
}
```

- **通用分页响应格式**:

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    "items": [],
    "total": 100,
    "page": 1,
    "page_size": 20
  }
}
```

- **分页参数**: 列表接口统一使用 `page`（页码，默认1）和 `page_size`（每页数量，默认20，最大100）

---

### 1. 认证模块

#### 1.1 微信登录

| 方法 | 路径 |
|------|------|
| POST | `/auth/wechat-login` |

**请求体**:
```json
{
  "code": "微信小程序 wx.login() 返回的 code"
}
```

**响应 data**:
```json
{
  "access_token": "jwt_token_string",
  "token_type": "bearer",
  "user": {
    "id": "用户ID",
    "nickname": "微信用户",
    "avatar_url": "头像地址",
    "role": "member",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 2. 用户模块

#### 2.1 获取当前用户信息

| 方法 | 路径 |
|------|------|
| GET | `/users/me` |

**响应 data**:
```json
{
  "id": "用户ID",
  "nickname": "昵称",
  "avatar_url": "头像地址",
  "role": "member",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### 2.2 更新用户信息

| 方法 | 路径 |
|------|------|
| PUT | `/users/me` |

**请求体**:
```json
{
  "nickname": "新昵称",
  "avatar_url": "新头像地址"
}
```

#### 2.3 查看用户主页

| 方法 | 路径 |
|------|------|
| GET | `/users/{user_id}` |

#### 2.4 个人中心统计数据 `🆕 需新增`

| 方法 | 路径 |
|------|------|
| GET | `/users/me/stats` |

**响应 data**:
```json
{
  "dish_count": 12,
  "rated_count": 35,
  "suggestion_count": 8
}
```

#### 2.5 我上传的菜品列表 `🆕 需新增`

| 方法 | 路径 |
|------|------|
| GET | `/users/me/dishes` |

**请求参数**: `page`, `page_size`

**响应 data** (分页):
```json
{
  "items": [
    {
      "id": "菜品ID",
      "name": "菜品名称",
      "cover": "封面图URL",
      "category_id": 1,
      "cooking_time": 30,
      "difficulty": 1,
      "avg_rating": 4.5,
      "author": { "id": "...", "nickname": "...", "avatar_url": "...", "role": "member", "created_at": "..." },
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 12,
  "page": 1,
  "page_size": 20
}
```

#### 2.6 我评分过的记录 `🆕 需新增`

| 方法 | 路径 |
|------|------|
| GET | `/users/me/ratings` |

**请求参数**: `page`, `page_size`

**响应 data** (分页):
```json
{
  "items": [
    {
      "id": "评分ID",
      "dish_id": "菜品ID",
      "dish_name": "菜品名称",
      "dish_cover": "菜品封面图",
      "stars": 4,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 35,
  "page": 1,
  "page_size": 20
}
```

#### 2.7 我写过的建议 `🆕 需新增`

| 方法 | 路径 |
|------|------|
| GET | `/users/me/suggestions` |

**请求参数**: `page`, `page_size`

**响应 data** (分页):
```json
{
  "items": [
    {
      "id": "建议ID",
      "dish_id": "菜品ID",
      "dish_name": "菜品名称",
      "dish_cover": "菜品封面图",
      "content": "建议内容",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 8,
  "page": 1,
  "page_size": 20
}
```

---

### 3. 分类模块

#### 3.1 分类列表

| 方法 | 路径 |
|------|------|
| GET | `/categories` |

**响应 data**:
```json
[
  {
    "id": 1,
    "name": "家常菜",
    "icon": "home",
    "sort_order": 1,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

### 4. 菜品模块

#### 4.1 菜品列表（首页）`⚠ 需增强排序参数`

| 方法 | 路径 |
|------|------|
| GET | `/dishes` |

**请求参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码，默认1 |
| page_size | int | 否 | 每页数量，默认20 |
| category_id | int | 否 | 分类筛选 |
| difficulty | int | 否 | 难度筛选：1简单 2中等 3困难 |
| keyword | string | 否 | 搜索关键词（匹配菜品名称和食材名称） |
| sort | string | 否 | `🆕` 排序方式：`latest`(最新) / `rating`(评分最高) / `popular_week`(本周热门) / `popular_month`(本月热门)，默认 `latest` |

**响应 data** (分页):
```json
{
  "items": [
    {
      "id": "菜品ID",
      "name": "菜品名称",
      "cover": "封面图URL",
      "category_id": 1,
      "cooking_time": 30,
      "difficulty": 1,
      "avg_rating": 4.5,
      "rating_count": 10,
      "author": {
        "id": "用户ID",
        "nickname": "昵称",
        "avatar_url": "头像地址",
        "role": "member",
        "created_at": "2024-01-01T00:00:00Z"
      },
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "page_size": 20
}
```

> **`🆕` 说明**:
> - `sort=latest`: 按 `created_at` 倒序
> - `sort=rating`: 按 `avg_rating` 倒序，平齐按 `rating_count` 倒序
> - `sort=popular_week`: 按近7天内的评分数量（或平均星级×评分数量）倒序
> - `sort=popular_month`: 按近30天内的评分数量（或平均星级×评分数量）倒序
> - `DishListOut` 需新增 `rating_count` 字段

#### 4.2 菜品详情

| 方法 | 路径 |
|------|------|
| GET | `/dishes/{dish_id}` |

**响应 data**:
```json
{
  "id": "菜品ID",
  "name": "菜品名称",
  "cover": "封面图URL",
  "description": "菜品简介",
  "category": { "id": 1, "name": "家常菜", "icon": "home", "sort_order": 1, "created_at": "..." },
  "cooking_time": 30,
  "difficulty": 1,
  "servings": 4,
  "tips": "烹饪小贴士",
  "nutrition": "🆕 营养信息",
  "suitable_for": "🆕 适合人群",
  "status": "published",
  "avg_rating": 4.5,
  "rating_count": 10,
  "author": { "id": "...", "nickname": "...", "avatar_url": "...", "role": "member", "created_at": "..." },
  "ingredients": [
    { "id": "食材ID", "name": "鸡蛋", "amount": 3.0, "unit": "个", "sort_order": 0 }
  ],
  "steps": [
    { "id": "步骤ID", "step_number": 1, "description": "打鸡蛋", "image": "步骤图URL", "duration": 5 }
  ],
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### 4.3 新增菜品

| 方法 | 路径 |
|------|------|
| POST | `/dishes` |

**请求体**:
```json
{
  "name": "菜品名称（必填）",
  "cover": "封面图URL",
  "description": "菜品简介",
  "category_id": 1,
  "cooking_time": 30,
  "difficulty": 1,
  "servings": 4,
  "tips": "烹饪小贴士",
  "nutrition": "🆕 营养信息（可选）",
  "suitable_for": "🆕 适合人群（可选）",
  "status": "published",
  "ingredients": [
    { "name": "鸡蛋", "amount": 3.0, "unit": "个", "sort_order": 0 }
  ],
  "steps": [
    { "step_number": 1, "description": "打鸡蛋", "image": "步骤图URL", "duration": 5 }
  ]
}
```

> **说明**: `status` 可设为 `"draft"` 保存草稿

#### 4.4 编辑菜品

| 方法 | 路径 |
|------|------|
| PUT | `/dishes/{dish_id}` |

**请求体**: 与新增菜品结构相同，所有字段可选（只传需要修改的字段）

**权限**: 仅菜品作者可编辑

#### 4.5 删除菜品

| 方法 | 路径 |
|------|------|
| DELETE | `/dishes/{dish_id}` |

**权限**: 仅菜品作者可删除

---

### 5. 评分模块

#### 5.1 菜品评分列表 `🆕 需新增`

| 方法 | 路径 |
|------|------|
| GET | `/dishes/{dish_id}/ratings` |

**请求参数**: `page`, `page_size`

**响应 data** (分页):
```json
{
  "items": [
    {
      "id": "评分ID",
      "dish_id": "菜品ID",
      "user": {
        "id": "用户ID",
        "nickname": "昵称",
        "avatar_url": "头像地址",
        "role": "member",
        "created_at": "2024-01-01T00:00:00Z"
      },
      "stars": 4,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "page_size": 20
}
```

#### 5.2 对菜品评分（新增/覆盖）

| 方法 | 路径 |
|------|------|
| POST | `/dishes/{dish_id}/ratings` |

**请求体**:
```json
{
  "stars": 4
}
```

> **说明**: 每次调用覆盖用户对该菜品的上一次评分（无需先删再加）。无需填写评价文字，纯打分。

#### 5.3 修改评分 `⚠ 已有但建议统一用 POST`

| 方法 | 路径 |
|------|------|
| PUT | `/dishes/{dish_id}/ratings` |

**请求体**: 同 5.2

> **说明**: 前端可统一使用 POST 实现覆盖评分，无需使用 PUT。

---

### 6. 建议模块

#### 6.1 菜品建议列表 `🆕 需新增`

| 方法 | 路径 |
|------|------|
| GET | `/dishes/{dish_id}/suggestions` |

**请求参数**: `page`, `page_size`

**响应 data** (分页):
```json
{
  "items": [
    {
      "id": "建议ID",
      "dish_id": "菜品ID",
      "user": {
        "id": "用户ID",
        "nickname": "昵称",
        "avatar_url": "头像地址",
        "role": "member",
        "created_at": "2024-01-01T00:00:00Z"
      },
      "content": "加点糖会更好吃",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "page_size": 20
}
```

#### 6.2 提交建议

| 方法 | 路径 |
|------|------|
| POST | `/dishes/{dish_id}/suggestions` |

**请求体**:
```json
{
  "content": "加点糖会更好吃"
}
```

#### 6.3 编辑建议 `🆕 需新增`

| 方法 | 路径 |
|------|------|
| PUT | `/dishes/{dish_id}/suggestions` |

**请求体**:
```json
{
  "content": "修改后的建议内容"
}
```

> **说明**: 覆盖用户对该菜品的上一次建议。权限：仅建议作者可编辑。

---

### 7. 文件上传模块 `🆕 需新增`

#### 7.1 上传图片

| 方法 | 路径 |
|------|------|
| POST | `/upload/image` |

**Content-Type**: `multipart/form-data`

**请求参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 图片文件，支持 jpg/png/webp，最大 10MB |

**响应 data**:
```json
{
  "url": "https://cdn.example.com/uploads/xxx.jpg",
  "filename": "xxx.jpg"
}
```

---

### 8. 食材搜索 🆕

#### 8.1 按食材名搜索菜品

利用现有 `GET /dishes?keyword=食材名` 接口即可，需确保后端 `keyword` 搜索范围覆盖食材名称。

> **交互说明**: 用户在菜品详情页点击食材名称 → 调用 `GET /dishes?keyword=鸡蛋` → 跳转到搜索结果页，显示所有包含该食材的菜品。

---

## 八、接口汇总清单

### 已有接口（无需变动）

| 方法 | 路径 | 用途 |
|------|------|------|
| POST | `/auth/wechat-login` | 微信登录 |
| GET | `/users/me` | 当前用户信息 |
| PUT | `/users/me` | 更新用户信息 |
| GET | `/users/{user_id}` | 查看用户主页 |
| GET | `/categories` | 分类列表 |
| GET | `/dishes/{dish_id}` | 菜品详情 |
| POST | `/dishes` | 新增菜品 |
| PUT | `/dishes/{dish_id}` | 编辑菜品 |
| DELETE | `/dishes/{dish_id}` | 删除菜品 |
| POST | `/dishes/{dish_id}/ratings` | 评分（新增/覆盖） |
| POST | `/dishes/{dish_id}/suggestions` | 提交建议 |

### 需要新增的接口

| 方法 | 路径 | 用途 | 涉及页面 |
|------|------|------|----------|
| GET | `/users/me/stats` | 个人统计数据 | 个人中心 |
| GET | `/users/me/dishes` | 我上传的菜品 | 个人中心→我的菜品列表 |
| GET | `/users/me/ratings` | 我评分过的记录 | 个人中心→我的评分列表 |
| GET | `/users/me/suggestions` | 我写过的建议 | 个人中心→我的建议列表 |
| GET | `/dishes/{dish_id}/ratings` | 菜品评分列表 | 菜品详情→所有评分 |
| GET | `/dishes/{dish_id}/suggestions` | 菜品建议列表 | 菜品详情→所有建议 |
| PUT | `/dishes/{dish_id}/suggestions` | 编辑自己的建议 | 菜品详情→我的建议编辑 |
| POST | `/upload/image` | 图片上传 | 菜品上传（封面图）、步骤配图 |

### 需要修改的已有接口

| 接口 | 修改内容 |
|------|----------|
| `GET /dishes` | 新增 `sort` 参数（`latest`/`rating`/`popular_week`/`popular_month`） |
| `GET /dishes` | `DishListOut` 新增 `rating_count` 字段 |
| `GET /dishes/{dish_id}` | `DishDetailOut` 新增 `nutrition`、`suitable_for`、`rating_count` 字段 |
| `POST /dishes` | `DishCreateIn` 新增 `nutrition`、`suitable_for` 字段 |
| `PUT /dishes/{dish_id}` | `DishUpdateIn` 新增 `nutrition`、`suitable_for` 字段 |

---

## 九、关键交互与接口对应关系

| 页面交互 | 对应接口 |
|----------|----------|
| 首页-排行榜（总榜） | `GET /dishes?sort=rating` |
| 首页-排行榜（本周热门） | `GET /dishes?sort=popular_week` |
| 首页-排行榜（本月热门） | `GET /dishes?sort=popular_month` |
| 首页-最新上传 | `GET /dishes?sort=latest` |
| 首页-分类筛选 | `GET /dishes?category_id=1` |
| 首页-搜索菜品 | `GET /dishes?keyword=关键字` |
| 菜品详情-点击食材搜索 | `GET /dishes?keyword=食材名` |
| 菜品详情-所有评分标签页 | `GET /dishes/{id}/ratings` |
| 菜品详情-所有建议标签页 | `GET /dishes/{id}/suggestions` |
| 菜品详情-我要评分 | `POST /dishes/{id}/ratings` |
| 菜品详情-我要写建议 | `POST /dishes/{id}/suggestions` |
| 菜品详情-编辑我的建议 | `PUT /dishes/{id}/suggestions` |
| 上传页-上传封面图 | `POST /upload/image` |
| 上传页-步骤配图 | `POST /upload/image` |
| 上传页-保存草稿 | `POST /dishes` (status=draft) |
| 上传页-发布菜品 | `POST /dishes` (status=published) |
| 个人中心-统计数据 | `GET /users/me/stats` |
| 个人中心-我的菜品 | `GET /users/me/dishes` |
| 个人中心-我的评分 | `GET /users/me/ratings` |
| 个人中心-我的建议 | `GET /users/me/suggestions` |