const React = require('react');

module.exports = function Layout({ children, userName }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />
        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossOrigin="anonymous" />
        <title>Study yourself</title>
      </head>

      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Посты</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Главная</a>
                </li>
                {userName ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/#">
                        Hey,
                        {' '}
                        {userName}
                        {' '}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="/allPosts">Личный кабинет</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/logout">Logout</a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/signup">Регистрация</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/signin">Авторизация</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <body>
        {children}
      </body>
    </html>
  );
};
