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
