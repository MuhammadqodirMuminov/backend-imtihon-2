import { resolve } from 'path';
import { AllEvents, CreateEvent, findById, updateById, writeView } from '../model/user.model.js';
import { InternalServerError } from '../utils/errors.js';

const GET = async (req, res, next) => {
	try {
		const events = await AllEvents();

		res.status(200).json({
			status: 200,
			message: 'all events',
			data: events,
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const POST_EVENT = async (req, res, next) => {
	try {
		const { image } = req.files;
		const eventImage = Date.now() + image.name.replace(/\s/g, '');

		const event = await CreateEvent(req.body, eventImage);

		image.mv(resolve('public', 'uploads', eventImage));

		res.status(201).json({
			status: 201,
			message: 'New event created.',
			data: event[0],
		});
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

const GET_PAGE = async (req, res, next) => {
	try {
		let accepted = await AllEvents();

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

const GET_DETAIL = async (req, res, next) => {
	try {
		const ip = req.ip;
		const { id } = req.params;
		const userAgent = req.get('user-agent');

		const WriteView = await writeView(id, userAgent, ip);

		if (WriteView.length == 0) {
			const getAcceptedById = await findById(id);
			return res.status(200).json({
				status: 200,
				message: `Events detail - page`,
				data: getAcceptedById[0],
			});
		} else {
			const updatedEvent = await updateById(id);

			return res.status(200).json({
				status: 200,
				message: `Events detail - page`,
				data: updatedEvent[0],
			});
		}
	} catch (error) {
		next(new InternalServerError(500, error.message));
	}
};

export default { GET, POST_EVENT, GET_PAGE, GET_DETAIL };
