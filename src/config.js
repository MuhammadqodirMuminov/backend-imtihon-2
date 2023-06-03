import 'dotenv/config';

const PORT = process.env.PORT | 3000;
const SECRET = 'olma';

const pgConfig = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
};

export { PORT, SECRET, pgConfig};
