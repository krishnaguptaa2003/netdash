const { Client } = require('pg');

const getClient = async () => {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });
  
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

module.exports = { getClient };