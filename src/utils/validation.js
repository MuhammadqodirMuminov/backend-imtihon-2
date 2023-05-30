import Joi from 'joi';

export const LoginSchema = Joi.object({
	username: Joi.string().min(2).max(32).pattern(new RegExp('^[a-z0-9]{3,30}$')).required(),
	password: Joi.string().min(5).max(100).required(),
});

// export const RegisterSchema = Joi.object({
// 	username: Joi.string().min(2).max(32).pattern(new RegExp('^[a-z0-9]{3,30}$')).required(),
// 	password: Joi.string().min(8).max(100).required(),
// 	avatar: Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required(),
// });

// export const VideoSchema = Joi.object({
// 	title: Joi.string().max(35).required(),
// 	video: Joi.string().pattern(new RegExp('((mp3|mov|avi|bmp))$')).required(),
// 	size: Joi.number().required(),
// });