import { BadRequest, InternalServerError, NotFountError } from '../utils/errors.js';
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

const GET_PENDING = (req, res, next) => {
	try {
		const events = read('events')
			.reverse()
			.filter(event => event.status == 'pending');

		res.status(200).json({
			status: 200,
			message: 'all events',
			data: events,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const POST_PENDING = (req, res, next) => {
	try {
		const events = read('events');
		const accepted = read('accepted');
		const { id } = req.params;

		let newAccaptedEvents = events.find(event => event.event_id == id);

		if (!newAccaptedEvents) next(new BadRequest(400, 'This id has no event.'));

		const filteredEvents = events.filter(event => event.event_id != id);

		newAccaptedEvents.status = 'accepted';

		// write('events', filteredEvents);
		accepted.push(newAccaptedEvents);
		// write('accepted', accepted);

		res.status(200).json({
			status: 200,
			message: 'Event accepted by admin',
			data: newAccaptedEvents,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const GET_ACCEPTED = (req, res, next) => {
	try {
		const events = read('accepted');

		res.status(200).json({
			status: 200,
			message: 'all accepted events ',
			data: events,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

export default { POST_LOGIN, GET_ACCEPTED, GET_PENDING, POST_PENDING };
