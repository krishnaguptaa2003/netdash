exports.handler = async (event) => {
  // This is a client-side operation - just return success
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Logged out successfully' }),
    headers: {
      'Set-Cookie': 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure'
    }
  };
};