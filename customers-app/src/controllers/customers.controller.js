import {
  createCustomer,
  listCustomers,
  findCustomerByEmail,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
} from '../repositories/customers.repository.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

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

export async function putCustomer(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: 'El "id" debe ser un entero positivo.' });
    }

    const { name, email } = req.body || {};
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'El campo "name" es requerido.' });
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'El campo "email" es requerido y debe ser válido.' });
    }

    const existing = await findCustomerById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    const emailTaken = await findCustomerByEmail(email, id);
    if (emailTaken) {
      return res.status(409).json({ message: 'Ya existe otro cliente con ese email.' });
    }

    const customer = await updateCustomer(id, { name: name.trim(), email: email.trim() });
    return res.status(200).json(customer);
  } catch (err) {
    return next(err);
  }
}

export async function deleteCustomerHandler(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: 'El "id" debe ser un entero positivo.' });
    }

    const deleted = await deleteCustomer(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    return res.status(200).json(deleted);
  } catch (err) {
    return next(err);
  }
}