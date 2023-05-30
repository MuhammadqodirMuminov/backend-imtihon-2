import { InternalServerError } from "../utils/errors";

export default (req, res, next) => {
	try {
		const { token } = req.headers;

		if (token != 'null') {
			return res.status(200).json({ status: 200, message: 'Token exist' });
		} else {
			return res.status(400).json({ status: 400, message: 'Token do not exist' });
		}
	} catch (error) {
		return next(new InternalServerError(500, error.message));
	}
};
