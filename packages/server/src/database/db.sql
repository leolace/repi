CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user" (
	id char(36) not null primary key,
	name text not null,
	email text not null,
	password text not null,
	class varchar(15) not null
);

CREATE TABLE IF NOT EXISTS tag (
	id char(36) not null primary key,
	name text not null
);

CREATE TABLE IF NOT EXISTS user_tag (
	user_id char(36) not null references "user"(id) on delete cascade,
	tag_id char(36) not null references tag(id) on delete cascade,
	primary key (user_id, tag_id)
);

ALTER TABLE "user"
ADD CONSTRAINT email_unique UNIQUE (email);

ALTER TABLE "tag"
ADD CONSTRAINT name_unique UNIQUE (name);

INSERT INTO tag (id, name)
VALUES (uuid_generate_v4(), 'ACADEMIA')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tag (id, name)
VALUES (uuid_generate_v4(), 'SUPERMERCADO')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tag (id, name)
VALUES (uuid_generate_v4(), 'PARQUE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tag (id, name)
VALUES (uuid_generate_v4(), 'VIDEOGAME')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tag (id, name)
VALUES (uuid_generate_v4(), 'SALA_DE_ESTUDOS')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tag (id, name)
VALUES (uuid_generate_v4(), 'STREAMINGS')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tag (id, name)
VALUES (uuid_generate_v4(), 'PETS')
ON CONFLICT (name) DO NOTHING;