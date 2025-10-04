import {Router} from 'express';
import { searchWithAi } from '../controllers/ai.controller.js';

let aiRouter = Router();


aiRouter.post("/search",searchWithAi);

export default aiRouter;