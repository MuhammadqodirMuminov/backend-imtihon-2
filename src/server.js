import { config } from 'dotenv';
import express from 'express';

import { PORT } from './config.js';

config();

const app = express();

app.listen(PORT, () => console.log(`server has been started at ${PORT}`));
