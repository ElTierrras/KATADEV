export function errorHandler(err, req, res, next) {
  console.error('Error no controlado:', err.message);
  res.status(500).json({ message: 'Error interno del servidor' });
}
