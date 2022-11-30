module.exports = function isAuth(req, res, next) {
  if (req.session && !req.session.username) {
    return res.redirect('/');
  }
  return next();
};
