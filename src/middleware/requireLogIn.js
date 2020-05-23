module.exports = async (request, response, next) => {
  if (!request.currentUser) {
    return response.status(401).json({ success: false, payload: 'LogIn is required' });
  }

  await next();
};
