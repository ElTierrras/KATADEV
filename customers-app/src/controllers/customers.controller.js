import {
  createCustomer,
  listCustomers,
  findCustomerByEmail,
} from '../repositories/customers.repository.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function postCustomer(req, res, next) {
  try {
    const { name, email } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'El campo "name" es requerido.' });
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'El campo "email" es requerido y debe ser válido.' });
    }

    const existing = await findCustomerByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Ya existe un cliente con ese email.' });
    }

    const customer = await createCustomer({ name: name.trim(), email: email.trim() });
    return res.status(201).json(customer);
  } catch (err) {
    return next(err);
  }
}

export async function getCustomers(req, res, next) {
  try {
    const customers = await listCustomers();
    return res.status(200).json(customers);
  } catch (err) {
    return next(err);
  }
}
