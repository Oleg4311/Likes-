const React = require('react');
const Layout = require('./Layout');

module.exports = function allPosts({ userName, allPosts }) {
  return (
    <Layout userName={userName}>
      <link rel="stylesheet" href="/styles/style.css" type="text/css" />
      <script defer src="/js/addUserPost.js" />
      <script defer src="/js/deletePost.js" />
      <script defer src="/js/update.js" />
      {userName ? (
        <div className="container">

          <h2> Добавление поста </h2>

          <form id="addUser" method="post" action="/allPosts" className="mainForm addUser">

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
          {allPosts?.map((post) => (
            <div data-post-id={`${post.id}`} id={`${post.id}`} className="post">
              <img id={`post-photo-${post.id}`} src={`${post.url}`} alt="photo loaded" />
              <p>
                {post.userName}
                {' '}
                пишет:
              </p>
              <p id={`post-text-${post.id}`}>
                {post.post}
              </p>
              <p>
                Дата создания:
                {' '}
                {post.createdAt.toLocaleDateString()}
              </p>
              <button id={post.id} type="button" name="remove-post" className="btn btn-danger">
                Удалить
              </button>
              <button id={`button-edit-${post.id}`} type="button" name="update-post" className="btn btn-success">
                Редактировать
              </button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
