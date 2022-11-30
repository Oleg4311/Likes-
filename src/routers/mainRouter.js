const express = require('express');

const router = express.Router();
const renderTemplate = require('../lib/renderTemplate');
const Main = require('../views/Main');
const { User, Post, Like } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const userName = req.session?.username;
    const userId = req.session.user?.id;
    const allPosts = await Post.findAll({ where: {}, order: [['createdAt', 'DESC']] }, { raw: true });
    // const likedPosts = await Post.findAll({ where: {} }, { raw: true });
    // console.log('allPosts', allPosts);
    // console.log('likedPosts', likedPosts);
    const likes = await Like.findAll();
    renderTemplate(Main, {
      userName, allPosts, likes, userId,
    }, res);
  } catch (error) {
    console.log('Error ==>', error);
  }
});

router.post('/', async (req, res) => {
  const userName = req.session.user.name;
  const userId = req.session.user.id;
  const likes = await Like.findAll();
  const { url, post } = req.body;
  try {
    if (url !== '' && post !== '') {
      const newPost = await Post.create({
        url, post, userName, userId,
      });
      const { id } = newPost;
      const postLike = likes.filter((elt) => elt.dataValues.postId === id);
      const like = postLike.length;
      const time = newPost.createdAt.toLocaleDateString();
      res.json({
        url, post, id, userName, time, like, posts: 'OK',
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log('Error ==>', error);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session?.user.id;
    const addLike = await Like.create({ userId, postId: id });
    const likes1 = await Like.findAll({ where: { postId: id } });
    const likes2 = likes1.length;
    res.json({ likes: likes2, id });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
