import pg from 'pg';
import { pgConfig } from '../config.js';
import { InternalServerError } from '../utils/errors.js';

const pool = new pg.Pool(pgConfig);

const fetchData = async (SQL, params = []) => {
	const client = await pool.connect();
	try {
		const data = await pool.query(SQL, params);
		return data.rows;
	} catch (error) {
		new InternalServerError(500, error.message);
	} finally {
		client.release();
	}
};

export default {
	fetchData,
};
