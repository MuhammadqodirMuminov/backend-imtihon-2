import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import { join, resolve } from 'path';

import { PORT } from './config.js';

import errorController from './controllers/error.controller.js';
import adminRouter from './routes/admin.routes.js';
import userRouter from './routes/user.routes.js';
import swaggerRouter from './swagger.js';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(resolve(), 'public', 'uploads')));

app.use('/admin', adminRouter);
app.use(userRouter);
app.use(errorController.errorHandler);

app.use('/api-docs', swaggerRouter);

app.listen(PORT, () => console.log(`server has been started at ${PORT}`));
