import Joi from 'joi';

export const LoginSchema = Joi.object({
	username: Joi.string().min(2).max(32).pattern(new RegExp('^[a-z0-9]{3,30}$')).required(),
	password: Joi.string().min(5).max(100).required(),
});

export const EventSchema = Joi.object({
	event_date: Joi.string()
		.pattern(new RegExp('^(20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'))
		.required()
		.error(new Error('wrong year or month')),
	event_time: Joi.string()
		.pattern(new RegExp('^(0[9]|1[0-9]|2[0-3]):[0-5][0-9]$'))
		.required()
		.error(new Error('Soat 9:30 dan keyingi vaqtlarga tadbirlar qoyishingiz mumkin')),
	image: Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required(),
	category: Joi.string().required(),
	subcategory: Joi.string().required(),
	event_activity: Joi.string().required(),
	link: Joi.string()
		.pattern(new RegExp('^(http|https)'))
		.min(2)
		.max(400)
		.required()
		.error(new Error('Invalid event link .')),
	author: Joi.string().min(2).max(32).pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
	author_job: Joi.string().required(),
	author_phone: Joi.string()
		.min(2)
		.max(12)
		.pattern(new RegExp('^998'))
		.required()
		.error(new Error('phone is start with 998')),
	event_name: Joi.string().required(),
	event_description: Joi.string().required(),
});
