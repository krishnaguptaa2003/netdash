// In your auth.js, add this at the VERY TOP to debug:
console.log("ENV VARIABLES:", {
  JWT_SECRET: process.env.JWT_SECRET ? "Exists" : "MISSING",
  NODE_ENV: process.env.NODE_ENV
});

const { getClient } = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  const jsonResponse = (status, body) => ({
    statusCode: status,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

  try {
    if (event.httpMethod !== 'POST') {
      return jsonResponse(405, { error: 'Method Not Allowed' });
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return jsonResponse(400, { error: 'Invalid JSON' });
    }

    const client = await getClient();
    
    if (body.action === 'signup') {
      // [Previous validation checks...]

      // After successful user creation:
      const { rows } = await client.query(
        `INSERT INTO users (name, email, password_hash) 
         VALUES ($1, $2, $3) 
         RETURNING id, name, email`,
        [body.name, body.email, hashedPassword]
      );

      // Generate JWT token
      const token = jwt.sign(
        { userId: rows[0].id, email: rows[0].email },
        process.env.JWT_SECRET, // Make sure this matches your Netlify variable
        { expiresIn: '24h' }
      );

      return jsonResponse(200, { 
        user: rows[0],
        token // Send token to client
      });
    }

    // Add login logic here if needed
    return jsonResponse(400, { error: 'Invalid action' });

  } catch (error) {
    console.error('SERVER ERROR:', error);
    return jsonResponse(500, { 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};