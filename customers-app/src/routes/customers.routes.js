import { Router } from 'express';
import { postCustomer, getCustomers } from '../controllers/customers.controller.js';

const router = Router();

router.post('/api/customers', postCustomer);

router.get('/api/customers', getCustomers);

export default router;
