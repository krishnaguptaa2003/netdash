const mysql = require('mysql2/promise');
const pool = mysql.createPool(process.env.DATABASE_URL);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, otp } = JSON.parse(event.body);

  try {
    const connection = await pool.getConnection();
    
    // Check if OTP matches and is not expired (10 minutes)
    const [users] = await connection.execute(
      `SELECT * FROM users 
       WHERE email = ? AND otp = ? 
       AND otp_created_at > NOW() - INTERVAL 10 MINUTE`,
      [email, otp]
    );

    if (users.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid or expired OTP' }) };
    }

    // Mark user as verified
    await connection.execute(
      'UPDATE users SET is_verified = TRUE, otp = NULL WHERE email = ?',
      [email]
    );

    connection.release();
    return { statusCode: 200, body: JSON.stringify({ message: 'Email verified successfully' }) };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};