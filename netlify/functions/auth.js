const { getClient } = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { action, name, email, password, confirmPassword } = JSON.parse(event.body);
  const client = await getClient();

  try {
    if (action === 'signup') {
      // Password validation
      if (password !== confirmPassword) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Passwords do not match' }) };
      }

      // Check if user exists
      const userCheck = await client.query('SELECT id FROM users WHERE email = $1', [email]);
      if (userCheck.rows.length > 0) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Email already exists' }) };
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const { rows } = await client.query(
        `INSERT INTO users (name, email, password_hash) 
         VALUES ($1, $2, $3) 
         RETURNING id, name, email, is_verified`,
        [name, email, hashedPassword]
      );

      return { 
        statusCode: 200, 
        body: JSON.stringify({ 
          user: rows[0],
          message: 'Signup successful' 
        }) 
      };
    }
    else if (action === 'login') {
      const { rows } = await client.query(
        `SELECT id, name, email, password_hash, is_verified 
         FROM users WHERE email = $1`, 
        [email]
      );

      if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password_hash))) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
      }

      const token = jwt.sign(
        { userId: rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          token,
          user: {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email
          }
        })
      };
    }
    
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  } finally {
    await client.end();
  }
};