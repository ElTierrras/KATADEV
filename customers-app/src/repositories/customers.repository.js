import pool from '../db/pool.js';

export async function createCustomer({ name, email }) {
  const result = await pool.query(
    'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
    [name, email]
  );
  return result.rows[0];
}

export async function listCustomers() {
  const result = await pool.query(
    'SELECT id, name, email, created_at FROM customers ORDER BY created_at DESC'
  );
  return result.rows;
}

export async function findCustomerByEmail(email, excludeId = null) {
  if (excludeId) {
    const result = await pool.query(
      'SELECT id FROM customers WHERE email = $1 AND id != $2',
      [email, excludeId]
    );
    return result.rows[0] || null;
  }
  const result = await pool.query('SELECT id FROM customers WHERE email = $1', [email]);
  return result.rows[0] || null;
}

export async function findCustomerById(id) {
  const result = await pool.query(
    'SELECT id, name, email, created_at FROM customers WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function updateCustomer(id, { name, email }) {
  const result = await pool.query(
    'UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
    [name, email, id]
  );
  return result.rows[0] || null;
}

export async function deleteCustomer(id) {
  const result = await pool.query(
    'DELETE FROM customers WHERE id = $1 RETURNING id, name, email, created_at',
    [id]
  );
  return result.rows[0] || null;
}