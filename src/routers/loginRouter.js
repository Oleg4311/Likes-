// const express = require('express');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');

const SignIn = require('../views/SignIn');

const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    renderTemplate(SignIn, {}, res);
  } catch (error) {
    console.log('Ошибка', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { password, email } = req.body;
    let user = null;
    if (req.body.email) {
      user = await User.findOne({ where: { email } });
    }
    if (user) {
      const isUserAuth = await bcrypt.compare(password, user.password);
      if (isUserAuth) {
        req.session.username = user.name;
        req.session.user = {
          id: user.id,
          name: user.name,
        };
        res.redirect('/');
      } else {
        res.json({ error: 'Неправильный пароль' });
      }
    } else {
      res.json({ error: 'Нет такого email' });
    }
  } catch (error) {
    console.log('Ошибка', error);
  }
});

module.exports = router;
