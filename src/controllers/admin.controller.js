import {
	addToAccepted,
	addToIgnored,
	getAccepted,
	getIgnored,
	getPendingEvents,
	get_admin,
} from '../model/admin.model.js';
import { BadRequest, InternalServerError, NotFountError } from '../utils/errors.js';
import jwt from '../utils/jwt.js';

const POST_LOGIN = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const admin = await get_admin();

		const checkAdmin = admin.find(
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
			data: checkAdmin,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const GET_PENDING = async (req, res, next) => {
	try {
		const pending = await getPendingEvents();

		res.status(200).json({
			status: 200,
			message: 'all events',
			data: pending.reverse(),
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const POST_PENDING = async (req, res, next) => {
	try {
		const toAccepted = await addToAccepted(req.params);

		if (toAccepted.length == 0) {
			next(new BadRequest(400, 'This Id has no event.'));
		}

		res.status(200).json({
			status: 200,
			message: 'Event accepted by admin',
			data: toAccepted[0],
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const DELETE_PENDING = async (req, res, next) => {
	try {
		const toIgnored = await addToIgnored(req.params);

		if (toIgnored.length == 0) next(new BadRequest(400, 'This id has already managed.'));

		res.status(200).json({
			status: 200,
			message: 'Event ignored by admin',
			data: toIgnored,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const GET_ACCEPTED = async (req, res, next) => {
	try {
		const accepted = await getAccepted();

		res.status(200).json({
			status: 200,
			message: 'all accepted events ',
			data: accepted,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const GET_IGNORED = async (req, res, next) => {
	try {
		const ignored = await getIgnored();

		res.status(200).json({
			status: 200,
			message: 'all ignored events ',
			data: ignored,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

export default { POST_LOGIN, GET_ACCEPTED, GET_PENDING, POST_PENDING, DELETE_PENDING, GET_IGNORED };
