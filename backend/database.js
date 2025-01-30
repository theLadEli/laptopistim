import dotenv from "dotenv";
dotenv.config();
import knex  from 'knex';

const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD
} = process.env;

const db = knex({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: 5432,
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        ssl: { rejectUnauthorized: false },
    },
});

export default db;