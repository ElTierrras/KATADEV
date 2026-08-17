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

export async function findCustomerByEmail(email) {
  const result = await pool.query('SELECT id FROM customers WHERE email = $1', [email]);
  return result.rows[0] || null;
}
