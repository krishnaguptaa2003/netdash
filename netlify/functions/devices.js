const mysql = require('mysql2/promise');
const pool = mysql.createPool(process.env.DATABASE_URL);
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  // Verify JWT
  const token = event.headers.authorization?.split(' ')[1];
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const connection = await pool.getConnection();

    if (event.httpMethod === 'GET') {
      // Get all devices for user
      const [devices] = await connection.execute(
        'SELECT * FROM devices WHERE user_id = ?',
        [userId]
      );
      connection.release();
      return { statusCode: 200, body: JSON.stringify(devices) };
    }
    else if (event.httpMethod === 'POST') {
      // Add new device
      const { plant, department, ip_address } = JSON.parse(event.body);
      const [result] = await connection.execute(
        'INSERT INTO devices (plant, department, ip_address, user_id) VALUES (?, ?, ?, ?)',
        [plant, department, ip_address, userId]
      );
      connection.release();
      return { statusCode: 201, body: JSON.stringify({ id: result.insertId }) };
    }
    else if (event.httpMethod === 'PUT') {
      // Update device
      const { id, plant, department, ip_address } = JSON.parse(event.body);
      await connection.execute(
        'UPDATE devices SET plant = ?, department = ?, ip_address = ? WHERE id = ? AND user_id = ?',
        [plant, department, ip_address, id, userId]
      );
      connection.release();
      return { statusCode: 200, body: JSON.stringify({ message: 'Device updated' }) };
    }
    else if (event.httpMethod === 'DELETE') {
      // Delete device
      const { id } = JSON.parse(event.body);
      await connection.execute(
        'DELETE FROM devices WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      connection.release();
      return { statusCode: 200, body: JSON.stringify({ message: 'Device deleted' }) };
    }

    connection.release();
    return { statusCode: 405, body: 'Method Not Allowed' };
  } catch (error) {
    console.error('Error:', error);
    if (error.name === 'JsonWebTokenError') {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid token' }) };
    }
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};