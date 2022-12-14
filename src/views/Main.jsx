/* eslint-disable max-len */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
const React = require('react');
const Layout = require('./Layout');

module.exports = function Main({
  userName, allPosts, likes, userId,
}) {
  const newLikes = likes.map((like) => ({ userId: like.dataValues.userId, postId: like.dataValues.postId }));
  const likeOrNot = allPosts.map((post) => {
    const postLikes = newLikes.filter((like) => like.postId === post.dataValues.id);
    if (postLikes.some((like) => like.userId === userId)) return true;
    return false;
  });

  console.log('likeornot==============', likeOrNot);

  return (
    <Layout userName={userName}>
      <script defer src="/js/addPost.js" />
      <script defer src="/js/likes.js" />
      <link rel="stylesheet" href="/styles/style.css" type="text/css" />
      {userName ? (
        <div className="container">

          <h2> Добавление поста </h2>

          <form id="addUser" method="post" action="/" className="mainForm addUser">

            <div className="mb-3">
              <label className="did-floating-label">Ссылка на картинку в формате URL</label>
              <input type="url" required className="form-control" id="exampleInputUsername" name="url" placeholder="Вставьте ссылку" />
            </div>

            <div className="mb-3">
              <label className="did-floating-label">Пост</label>
              <textarea type="text" required className="form-control" id="exampleInputUsername" name="post" placeholder="Текст поста" />
            </div>

            <button type="button" className="btn floating-button add" id="add">Добавить</button>
          </form>
          <hr />

        </div>
      ) : (
        <div><h5>Для добавления постов необходимо зарегистрироваться и авторизоваться</h5></div>
      )}
      <div className="container">
        <hr />
        <h4> Список постов </h4>
        <div className="container2">
          {allPosts?.map((post, idx) => (
            <div id={`${post.id}`} className="post">
              <img src={`${post.url}`} alt="photo loaded" />
              <p>
                {post.userName}
                {' '}
                пишет:
              </p>
              <p>
                {post.post}
              </p>
              <p>
                Дата создания:
                {' '}
                {post.createdAt.toLocaleDateString()}
              </p>
              {userName ? (
                <div>
                  <button id={`${post.id}`} type="submit" name="update-like" className="heart" disabled={likeOrNot[idx]}>❤</button>
                  <p id={`post-like-${post.id}`} className="heartValue" name="liked">
                    {(likes.filter((elt) => elt.dataValues.postId === post.id)).length}
                    {' '}
                    лайков
                  </p>
                </div>
              ) : (

                <p id={`${post.id}`} className="heartValue" name="liked">
                  {(likes.filter((elt) => elt.postId === post.id)).length}
                  {' '}
                  лайков
                </p>
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
