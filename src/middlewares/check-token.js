import { AuthorizationError, ForBiddenError, InternalServerError } from '../utils/errors.js';
import jwt from '../utils/jwt.js';
import { read } from '../utils/model.js';

export default (req, res, next) => {
	const admin = read('admin');

	try {
		const { token } = req.headers;

		if (!token) {
			next(new AuthorizationError(400, 'token required'));
		} else {
			const { username, id, password } = jwt.verify(token);
			const checkAdmin = admin.find(
				a => a.id == id && a.username == username && a.password == password
			);

			if (!checkAdmin) {
				return next(new ForBiddenError(400, 'token does not much'));
			}
			req.user = id;
			next();
		}
	} catch (error) {
		return next(new InternalServerError(500, error.message));
	}
};
