import { Router } from 'express';
import {
  postCustomer,
  getCustomers,
  putCustomer,
  deleteCustomerHandler,
} from '../controllers/customers.controller.js';

const router = Router();

router.post('/api/customers', postCustomer);

router.get('/api/customers', getCustomers);

router.put('/api/customers/:id', putCustomer);

router.delete('/api/customers/:id', deleteCustomerHandler);

export default router;