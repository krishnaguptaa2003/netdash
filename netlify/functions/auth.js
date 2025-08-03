const { getClient } = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { action, name, email, password } = JSON.parse(event.body);
  const client = await getClient();

  try {
    if (action === 'signup') {
      // Check if user exists
      const userCheck = await client.query(
        'SELECT id FROM users WHERE email = $1', 
        [email]
      );

      if (userCheck.rows.length > 0) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Email already exists' }) };
      }

      // Hash password and create OTP
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Create user
      const newUser = await client.query(
        `INSERT INTO users (name, email, password_hash, otp) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, name, email, is_verified`,
        [name, email, hashedPassword, otp]
      );

      // Send verification email
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Verify Your Scrpcy Account',
        html: `
          <h2>Welcome to Scrpcy!</h2>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        `
      });

      return { 
        statusCode: 200, 
        body: JSON.stringify({ 
          message: 'Verification email sent',
          user: newUser.rows[0]
        }) 
      };
    }
    else if (action === 'login') {
      const userResult = await client.query(
        `SELECT id, name, email, password_hash, is_verified 
         FROM users WHERE email = $1`, 
        [email]
      );

      if (userResult.rows.length === 0) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
      }

      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
      }

      if (!user.is_verified) {
        return { statusCode: 403, body: JSON.stringify({ error: 'Email not verified' }) };
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          token, 
          user: { 
            id: user.id, 
            name: user.name,
            email: user.email 
          } 
        })
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) };
  } catch (error) {
    console.error('Database error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  } finally {
    await client.end();
  }
};