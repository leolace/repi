pnpm install
systemctl start postgresql

PGPASSWORD=postgres psql -U postgres -d repi -f ./packages/server/src/database/users.sql

pnpm --filter server run dev &

pnpm --filter client run build
pnpm --filter client run start