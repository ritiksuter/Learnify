import {Router} from 'express';
import { createOrder, verifyPayment } from '../controllers/order.controller.js';

let paymentRouter = Router();

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify-payment", verifyPayment);

export default paymentRouter;