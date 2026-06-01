# 菜品小程序服务端设计

## 概述

一个面向小群体共享的菜品记录小程序后端。用户可通过微信登录，记录菜品制作步骤流程，浏览他人菜品并评分、提建议。

## 技术栈

- **框架**: FastAPI (Python 3.12+)
- **ORM**: SQLAlchemy 2.0 (异步)
- **迁移**: Alembic
- **数据库**: PostgreSQL 16
- **认证**: 微信登录 (openid → JWT)
- **文件存储**: 本地存储 (预留 OSS 扩展)

## 架构

```
客户端（小程序）→ FastAPI → PostgreSQL
                      ↑
                 Alembic (迁移)
                 SQLAlchemy 2.0 (ORM)
```

分层结构：

```
app/
├── api/v1/       # 路由层 - HTTP 请求/响应
├── models/       # 数据模型层 - SQLAlchemy 表定义
├── schemas/      # Pydantic 模型 - 请求/响应校验
├── services/     # 业务逻辑层
├── core/         # 配置、安全、依赖注入
└── migrations/   # Alembic 迁移脚本
```

## 数据库表设计（7 张表）

### users
| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | UUID | PK | 主键 |
| openid | VARCHAR(128) | UNIQUE, NOT NULL, INDEX | 微信 openid |
| nickname | VARCHAR(64) | NOT NULL | 昵称 |
| avatar_url | VARCHAR(512) | 可空 | 头像地址 |
| role | VARCHAR(16) | NOT NULL, DEFAULT 'user' | user / admin |
| created_at | TIMESTAMP | NOT NULL | |
| updated_at | TIMESTAMP | NOT NULL | |

### categories
| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | INTEGER | PK, 自增 | 主键 |
| name | VARCHAR(32) | UNIQUE, NOT NULL | 分类名 |
| icon | VARCHAR(64) | 可空 | 图标标识 |
| sort_order | INTEGER | NOT NULL, DEFAULT 0 | 排序 |
| created_at | TIMESTAMP | NOT NULL | |

### dishes
| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | UUID | PK | 主键 |
| name | VARCHAR(128) | NOT NULL | 菜品名 |
| cover | VARCHAR(512) | 可空 | 封面图 |
| description | TEXT | 可空 | 简介 |
| category_id | INTEGER | FK→categories, NOT NULL | 分类 |
| cooking_time | INTEGER | 可空 | 烹饪时长(分钟) |
| difficulty | SMALLINT | 可空, CHECK 1-3 | 1简单 2中等 3困难 |
| servings | INTEGER | 可空 | 份量 |
| tips | TEXT | 可空 | 小贴士 |
| author_id | UUID | FK→users, NOT NULL | 创建者 |
| status | VARCHAR(16) | NOT NULL, DEFAULT 'published' | published / draft |
| avg_rating | NUMERIC(2,1) | DEFAULT 0.0 | 平均评分(冗余) |
| created_at | TIMESTAMP | NOT NULL | |
| updated_at | TIMESTAMP | NOT NULL | |

### ingredients
| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | UUID | PK | |
| dish_id | UUID | FK→dishes, NOT NULL, ON DELETE CASCADE | |
| name | VARCHAR(64) | NOT NULL | 食材名 |
| amount | NUMERIC(8,2) | NOT NULL | 用量 |
| unit | VARCHAR(16) | NOT NULL | 克/毫升/个 |
| sort_order | INTEGER | NOT NULL, DEFAULT 0 | 排序 |

### steps
| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | UUID | PK | |
| dish_id | UUID | FK→dishes, NOT NULL, ON DELETE CASCADE | |
| step_number | INTEGER | NOT NULL | 步骤序号 |
| description | TEXT | NOT NULL | 步骤说明 |
| image | VARCHAR(512) | 可空 | 步骤配图 |
| duration | INTEGER | 可空 | 该步骤耗时(分钟) |
| created_at | TIMESTAMP | NOT NULL | |

UNIQUE(dish_id, step_number)

### ratings
| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | UUID | PK | |
| dish_id | UUID | FK→dishes, NOT NULL, ON DELETE CASCADE | |
| user_id | UUID | FK→users, NOT NULL | |
| stars | SMALLINT | NOT NULL, CHECK 1-5 | 1-5星 |
| created_at | TIMESTAMP | NOT NULL | |

UNIQUE(dish_id, user_id) — 每个用户每个菜品只能评分一次

### suggestions
| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | UUID | PK | |
| dish_id | UUID | FK→dishes, NOT NULL, ON DELETE CASCADE | |
| user_id | UUID | FK→users, NOT NULL | |
| content | TEXT | NOT NULL | 建议内容 |
| created_at | TIMESTAMP | NOT NULL | |

## API 接口

### 统一响应格式
```json
{ "code": 200, "message": "ok", "data": { ... } }
{ "code": 200, "message": "ok", "data": { "items": [...], "total": 42, "page": 1, "page_size": 20 } }
{ "code": 401, "message": "未登录", "data": null }
```

### 端点

**认证 & 用户**
- POST `/api/auth/wechat-login` — 微信登录
- GET `/api/users/me` — 当前用户信息
- PUT `/api/users/me` — 更新昵称/头像
- GET `/api/users/:id` — 查看其他用户

**菜品**
- GET `/api/dishes` — 列表 (分页/分类/难度/搜索)
- GET `/api/dishes/:id` — 详情 (含步骤/食材/评分)
- POST `/api/dishes` — 新增 (需登录)
- PUT `/api/dishes/:id` — 编辑 (仅作者)
- DELETE `/api/dishes/:id` — 删除 (仅作者)

**分类**
- GET `/api/categories` — 全部分类

**评分**
- POST `/api/dishes/:id/ratings` — 评分 (需登录)
- PUT `/api/dishes/:id/ratings` — 修改评分 (需登录)

**建议**
- POST `/api/dishes/:id/suggestions` — 提建议 (需登录)

## 项目结构

```
cookbook-server/
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py        # pydantic-settings
│   │   ├── security.py      # JWT
│   │   └── deps.py           # get_db, get_current_user
│   ├── models/
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── dish.py
│   │   ├── ingredient.py
│   │   ├── step.py
│   │   ├── rating.py
│   │   └── suggestion.py
│   ├── schemas/
│   │   ├── common.py
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── dish.py
│   │   ├── rating.py
│   │   └── suggestion.py
│   ├── api/v1/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── dishes.py
│   │   ├── categories.py
│   │   ├── ratings.py
│   │   └── suggestions.py
│   └── services/
│       ├── user.py
│       ├── dish.py
│       ├── category.py
│       ├── rating.py
│       └── suggestion.py
├── alembic/
├── tests/
├── requirements.txt
├── pyproject.toml
├── .env.example
└── README.md
```

## 约束与规则

- 所有写操作需 JWT 认证
- 用户只能编辑/删除自己的菜品
- 评分后更新 dishes.avg_rating 冗余字段
- 菜品支持 draft/published 状态，列表只展示 published
- 食材和步骤在创建/更新菜品时整体替换（原子操作）
