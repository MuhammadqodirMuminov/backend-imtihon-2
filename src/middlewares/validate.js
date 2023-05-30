import { BadRequest, InternalServerError } from '../utils/errors.js';
import { EventSchema, LoginSchema } from '../utils/validation.js';

export default (req, res, next) => {
	try {
		if (req.url == '/login' && req.method == 'POST') {
			console.log(req.url, req.method);
			const { error } = LoginSchema.validate(req.body);

			if (error) next(new BadRequest(400, error.message));
		}

		if (req.url == '/add-event' && req.method == 'POST') {
			const { error } = EventSchema.validate({ image: req.files?.image?.name, ...req.body });

			if (error) next(new BadRequest(400, error.message));
		}

		next();
		// if (req.url == '/admin/videos' && req.method == 'POST') {
		// 	const { title } = req.body;
		// 	const { video } = req.files;

		// 	const { error } = VideoSchema.validate({
		// 		title: req.body.title,
		// 		video: video.video,
		// 		size: video.size,
		// 	});

		
	} catch (error) {
		return next(new InternalServerError(500, error.message));
	}
};
