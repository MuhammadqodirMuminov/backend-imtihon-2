import { InternalServerError, NotFountError } from '../utils/errors.js';
import jwt from '../utils/jwt.js';
import { read } from '../utils/model.js';

const POST_LOGIN = (req, res, next) => {
	try {
		const { username, password } = req.body;
		const admins = read('admin');

		const checkAdmin = admins.find(
			admin => admin.username == username && admin.password == password
		);

		if (!checkAdmin) {
			return next(new NotFountError(404, 'Username or password wrong.'));
		}

		const token = jwt.sign(checkAdmin);

		res.status(200).json({
			status: 200,
			message: 'Successfully logged in.',
			token,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

export default { POST_LOGIN };
