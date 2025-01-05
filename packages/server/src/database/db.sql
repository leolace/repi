CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    class VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS republicas (
    id UUID NOT NULL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) UNIQUE,
    class VARCHAR(15) NOT NULL,
    image_url TEXT,
    rental_value DECIMAL(10, 2) DEFAULT 0.00,
    occupants_count INTEGER DEFAULT 0,
    posts_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bixos (
    id UUID NOT NULL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    class VARCHAR(15) NOT NULL,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS tags (
	id UUID NOT NULL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_tag (
	user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, tag_id)
);

INSERT INTO tags (id, name)
VALUES (uuid_generate_v4(), 'ACADEMIA')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tags (id, name)
VALUES (uuid_generate_v4(), 'SUPERMERCADO')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tags (id, name)
VALUES (uuid_generate_v4(), 'PARQUE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tags (id, name)
VALUES (uuid_generate_v4(), 'VIDEOGAME')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tags (id, name)
VALUES (uuid_generate_v4(), 'SALA_DE_ESTUDOS')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tags (id, name)
VALUES (uuid_generate_v4(), 'STREAMINGS')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tags (id, name)
VALUES (uuid_generate_v4(), 'PETS')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS sessions (
	id TEXT NOT NULL PRIMARY KEY,
	user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	token TEXT NOT NULL
);