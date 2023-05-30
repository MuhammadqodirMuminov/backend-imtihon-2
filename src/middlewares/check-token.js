import jwt from '../utils/jwt.js';
import { read } from '../utils/model.js';

export default (req, res, next) => {
	const users = read('users');

	try {
		const { token } = req.headers;

		if (!token ) {
			
			throw new Error('token required');

		} else {
			const { userId } = jwt.verify(token);
			req.user = userId;
			next();
		}
	} catch (error) {
		return next(error);
	}
};
