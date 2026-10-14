# Grocery list

Small grocery list written with NextJS + TS + PostgreSQL.

Check out: https://grocery-list.xolra0d.com/

## Running 

Build and run:

```sh
export POSTGRES_URL=...
npm i
npm run db:migrate

docker build -t grocery-list .
docker run -p 3000:3000 --env-file .env grocery-list
```
