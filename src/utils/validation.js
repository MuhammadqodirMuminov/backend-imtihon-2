import Joi from 'joi';

export const LoginSchema = Joi.object({
	username: Joi.string().min(2).max(32).pattern(new RegExp('^[a-z0-9]{3,30}$')).required(),
	password: Joi.string().min(5).max(100).required(),
});

export const EventSchema = Joi.object({
	event_date: Joi.date().required(),
	event_time: Joi.string().required(),
	image: Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required(),
	category: Joi.string().required(),
	subcategory: Joi.string().required(),
	event_activity: Joi.string().required(),
	link: Joi.string().min(2).max(1000).required(),
	author: Joi.string().min(2).max(32).pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
	author_job: Joi.string().required(),
	author_phone: Joi.string().required(),
	event_name: Joi.string().required(),
	event_description: Joi.string().required(),
});
