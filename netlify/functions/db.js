const { Client } = require('pg');

// Database connection helper
const getClient = async () => {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  await client.connect();
  return client;
};

module.exports = { getClient };