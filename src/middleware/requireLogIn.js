module.exports = async (request, response, next) => {
  if (!request.currentUser) {
    response.json({ success: false, payload: 'Forbidden' });
  }

  await next();
};
