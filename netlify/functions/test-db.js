const { Client } = require('pg');

exports.handler = async (event) => {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW() as current_time');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Database connection successful",
        time: result.rows[0].current_time
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Database connection failed",
        details: error.message
      })
    };
  } finally {
    await client.end();
  }
};