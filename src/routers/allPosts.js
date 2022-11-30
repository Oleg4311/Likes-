const express = require('express');

const router = express.Router();
const renderTemplate = require('../lib/renderTemplate');
const AllPosts = require('../views/AllElems');
const { User, Post } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const userName = req.session?.user.name;
    const userId = req.session?.user.id;
    const allPosts = await Post.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    renderTemplate(AllPosts, { userName, allPosts }, res);
  } catch (error) {
    console.log('Error ==>', error);
  }
});

router.post('/', async (req, res) => {
  const userName = req.session.user.name;
  const userId = req.session.user.id;
  const { url, post } = req.body;
  try {
    if (url !== '' && post !== '') {
      const newPost = await Post.create({
        url, post, userName, userId,
      });
      const { id } = newPost;
      const time = newPost.createdAt.toLocaleDateString();
      res.json({
        url, post, id, userName, time, posts: 'OK',
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log('Error ==>', error);
  }
});

router.delete('/:postId', async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.postId } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:postId/update', async (req, res) => {
  try {
    const newPost = await Post.update(
      { url: req.body.url, post: req.body.post },
      { where: { id: req.params.postId } },
    );

    res.json(newPost);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
