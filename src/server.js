import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';

import { PORT } from './config.js';

import adminRouter from './routes/admin.routes.js';
import errorController from './controllers/error.controller.js';

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use(errorController.errorHandler)

app.listen(PORT, () => console.log(`server has been started at ${PORT}`));
