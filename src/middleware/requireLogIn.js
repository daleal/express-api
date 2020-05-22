module.exports = async (request, response, next) => {
  if (!request.currentUser) {
    return response.json({ success: false, payload: 'Forbidden' });
  }

  await next();
};
