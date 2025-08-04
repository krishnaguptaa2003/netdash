const { getClient } = require('./db');

exports.handler = async () => {
  const client = await getClient();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        reset_token VARCHAR(255),
        reset_token_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    return { statusCode: 200, body: 'Tables created' };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  } finally {
    await client.end();
  }
};