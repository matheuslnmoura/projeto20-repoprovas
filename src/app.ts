import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routers/masterRouter.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.use(router);
app.use(errorHandlingMiddleware);

export default app;