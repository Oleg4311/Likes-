const express = require('express');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');

const SignUp = require('../views/SignUp');

const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    renderTemplate(SignUp, {}, res);
  } catch (error) {
    console.log('Ошибка', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name, password, passwordAgain, email,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      const newUser = await User.create({
        name, password: hashedPassword, email, passwordAgain,
      });
      // req.session.username = newUser.name;
      // req.session.user = {
      //   id: newUser.id,
      //   name: newUser.name,
      // };
      res.redirect('/');
    } else {
      // alert('Такой пользователь уже существует!');
      res.json({ error: 'Такой пользователь уже зарегистрирован!' });
    }
  } catch (error) {
    console.log('Ошибка', error);
  }
});

module.exports = router;
