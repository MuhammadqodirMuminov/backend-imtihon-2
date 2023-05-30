import { resolve } from 'path';
import { InternalServerError } from '../utils/errors.js';
import { read, write } from '../utils/model.js';

const GET = (req, res, next) => {
	try {
		const events = read('events').reverse().slice(0, 9)

		const acceptedEvents = events.filter(event => event.status == 'accapted')

		res.status(200).json({
			status: 200,
			message: 'all events',
			data: acceptedEvents,
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

export default { GET, POST_EVENT };
