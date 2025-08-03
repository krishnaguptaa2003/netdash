const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const pool = mysql.createPool(process.env.DATABASE_URL);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { email } = JSON.parse(event.body);

    try {
      const connection = await pool.getConnection();
      const [users] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Email not found' }) };
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      await connection.execute(
        'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
        [resetToken, resetTokenExpiry, email]
      );

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
      await transporter.sendMail({
        from: `"Scrpcy Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Password Reset Instructions',
        html: `
          <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
          <p>This link expires in 1 hour.</p>
        `
      });

      connection.release();
      return { statusCode: 200, body: JSON.stringify({ message: 'Reset email sent' }) };
    } catch (error) {
      console.error('Error:', error);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to process request' }) };
    }
  }
  else if (event.httpMethod === 'PUT') {
    const { token, newPassword } = JSON.parse(event.body);

    try {
      const connection = await pool.getConnection();
      const [users] = await connection.execute(
        'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
        [token]
      );

      if (users.length === 0) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid or expired token' }) };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await connection.execute(
        'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?',
        [hashedPassword, token]
      );

      connection.release();
      return { statusCode: 200, body: JSON.stringify({ message: 'Password updated successfully' }) };
    } catch (error) {
      console.error('Error:', error);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to reset password' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};