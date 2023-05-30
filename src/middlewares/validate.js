import { BadRequest, InternalServerError } from '../utils/errors.js';
import { LoginSchema } from '../utils/validation.js';

export default (req, res, next) => {
	try {
		if (req.url == '/login' && req.method == 'POST') {

			console.log(req.url, req.method);
			const { error } = LoginSchema.validate(req.body);

			if (error) next(new BadRequest(400, error.message));
		}
		next();

		// if (req.url == '/register' && req.method == 'POST') {
		// 	const { error } = RegisterSchema.validate({ avatar: req.files.avatar.name, ...req.body });

		// 	if (error) next(new BadRequest(400, error.message));
		// }

		// if (req.url == '/admin/videos' && req.method == 'POST') {
		// 	const { title } = req.body;
		// 	const { video } = req.files;

		// 	const { error } = VideoSchema.validate({
		// 		title: req.body.title,
		// 		video: video.video,
		// 		size: video.size,
		// 	});

		// 	if (error) next(new BadRequest(400, error.message));
		// }
	} catch (error) {
		return next(new InternalServerError(500, error.message));
	}
};
