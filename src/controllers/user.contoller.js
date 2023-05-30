import { resolve } from 'path';
import { BadRequest, InternalServerError } from '../utils/errors.js';
import { read, write } from '../utils/model.js';

const GET = (req, res, next) => {
	try {
		const accepted = read('accepted').reverse().slice(0, 9);

		res.status(200).json({
			status: 200,
			message: 'all events',
			data: accepted,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const POST_EVENT = (req, res, next) => {
	const events = read('events');
	try {
		const {
			event_date,
			event_time,
			category,
			subcategory,
			event_activity,
			link,
			author,
			author_job,
			author_phone,
			event_name,
			event_description,
		} = req.body;

		const { image } = req.files;
		const eventImage = Date.now() + image.name.replace(/\s/g, '');

		const newEvent = {
			event_id: events.at(-1).event_id + 1 || 1,
			event_name,
			event_description,
			event_date,
			event_time,
			image: eventImage,
			event_activity,
			event_link: link,
			author,
			author_job,
			author_phone,
			category,
			subcategory,
			status: 'pending',
			view_count: 0,
		};

		image.mv(resolve('public', 'uploads', eventImage));

		events.push(newEvent);

		write('events', events);

		res.status(201).json({
			status: 201,
			message: 'New event created.',
			data: newEvent,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const GET_PAGE = (req, res, next) => {
	try {
		let accepted = read('accepted');
		const { page, date, subCategory, category, activity, name } = req.query;

		if (page) {
			accepted = accepted.slice((page - 1) * 9, page * 9);
		}

		if (date) {
			accepted = accepted.filter(a => a.event_date == date);
		}

		if (subCategory) {
			accepted = accepted.filter(a => a.subcategory == subCategory);
		}

		if (category) {
			accepted = accepted.filter(a => a.category == category);
		}

		if (activity) {
			accepted = accepted.filter(a => a.event_activity == activity);
		}

		if (name) {
			accepted = accepted.filter(a => a.author == name);
		}

		res.status(200).json({
			status: 200,
			message: `Events ${page ? page : ''} - page`,
			data: accepted,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const GET_DETAIL = (req, res, next) => {
	try {
		const ip = req.ip;
		const userAgent = req.get('user-agent');
		const users = read('viewpage');

		const { id } = req.params;
		const accepted = read('accepted');
		let eventDetail = accepted.find(event => event.event_id == id);

		if (!eventDetail) {
			return next(new BadRequest(400, 'This id has no event.'));
		}

		const existViewer = users.find(u => u.ip == ip && u.userAgent == userAgent && u.id == id);
		const eventUpdate = accepted.filter(a => a.event_id != id);

		if (!existViewer) {
			const newViewer = { id, ip, userAgent };
			users.push(newViewer);
			write('viewpage', users);

			eventDetail.view_count = eventDetail.view_count + 1;
			eventUpdate.push(eventDetail);
			write('accepted', eventUpdate);
		}

		res.status(200).json({
			status: 200,
			message: `Events detail - page`,
			data: eventDetail,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

export default { GET, POST_EVENT, GET_PAGE, GET_DETAIL };
