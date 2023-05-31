import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';

const router = Router();

const swaggerDocs = swaggerJSDoc({
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Swagger news events website ! 3x',
			version: '1.0.0',
			description: 'This rest apis for you pessa site.',
		},
		components: {
			securitySchemes: {
				Bearer: {
					type: 'apiKey',
					name: 'token',
					in: 'header',
				},
			},
		},
		servers: [
			{
				url: 'http://localhost:3000',
			},
		],
		tags: [
			{
				name: 'users',
				description: 'Get all users events and manage them.',
			},
			{
				name: 'admin',
				description: 'Logs user into the system',
			},
		],
	},

	apis: [
		`${process.cwd()}/src/swagger/components/*yaml`,
		`${process.cwd()}/src/swagger/docs/*yaml`,
	],
});

router.use('/', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));

export default router;
