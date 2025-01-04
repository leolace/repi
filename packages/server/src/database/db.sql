CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id char(36) NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    class VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS republicas (
    id char(36) NOT NULL PRIMARY KEY REFERENCES users(id),
    class VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS bixos (
    id char(36) NOT NULL PRIMARY KEY REFERENCES users(id),
    class VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
	id char(36) not null primary key,
	name text not null unique
);

CREATE TABLE IF NOT EXISTS user_tag (
	user_id char(36) not null references users(id) on delete cascade,
	tag_id char(36) not null references tags(id) on delete cascade,
	primary key (user_id, tag_id)
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
	user_id CHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	token TEXT NOT NULL
);