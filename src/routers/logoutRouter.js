const express = require('express');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    if (req.session.username) {
      req.session.destroy();
      res.clearCookie('Sessions');
      res.redirect('/');
    }
    res.redirect('/signin');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
