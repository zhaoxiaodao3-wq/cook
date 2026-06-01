"""One-time script to create all tables in PostgreSQL. Run: python init_db.py"""
import psycopg2

# Replace password if you set a different one during install
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    user="postgres",
    password="postgres",
    dbname="cookbook",
)
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    openid VARCHAR(128) UNIQUE NOT NULL,
    nickname VARCHAR(64) NOT NULL,
    avatar_url VARCHAR(512),
    role VARCHAR(16) NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
""")

cur.execute("CREATE INDEX IF NOT EXISTS idx_users_openid ON users(openid)")

cur.execute("""
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) UNIQUE NOT NULL,
    icon VARCHAR(64),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS dishes (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    cover VARCHAR(512),
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    cooking_time INTEGER,
    difficulty SMALLINT CHECK (difficulty >= 1 AND difficulty <= 3),
    servings INTEGER,
    tips TEXT,
    author_id VARCHAR(36) NOT NULL REFERENCES users(id),
    status VARCHAR(16) NOT NULL DEFAULT 'published',
    avg_rating NUMERIC(2,1) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS ingredients (
    id VARCHAR(36) PRIMARY KEY,
    dish_id VARCHAR(36) NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
    name VARCHAR(64) NOT NULL,
    amount NUMERIC(8,2) NOT NULL,
    unit VARCHAR(16) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
)
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS steps (
    id VARCHAR(36) PRIMARY KEY,
    dish_id VARCHAR(36) NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(512),
    duration INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(dish_id, step_number)
)
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS ratings (
    id VARCHAR(36) PRIMARY KEY,
    dish_id VARCHAR(36) NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    stars SMALLINT NOT NULL CHECK (stars >= 1 AND stars <= 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(dish_id, user_id)
)
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS suggestions (
    id VARCHAR(36) PRIMARY KEY,
    dish_id VARCHAR(36) NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
""")

conn.commit()
cur.close()
conn.close()
print("建表完成！7 张表已成功创建。")
