// Create test-db.js function temporarily
const { getClient } = require('./db');

exports.handler = async () => {
  const client = await getClient();
  try {
    const res = await client.query('SELECT NOW()');
    return {
      statusCode: 200,
      body: JSON.stringify({ time: res.rows[0].now })
    };
  } finally {
    await client.end();
  }
};