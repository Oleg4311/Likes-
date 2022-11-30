const React = require('react');

const Layout = require('./Layout');

function SignIn() {
  return (
    <Layout>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Авторизация</h2>
                    <form method="POST" action="/signin">
                      <div className="phone-email">
                        <div className="form-outline mb-4 divMail">
                          <label className="form-label" htmlFor="form3Example3cg">Email адрес:</label>
                          <input type="email" required name="email" id="form3Example3cg" className="form-control form-control-lg" />
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4cdg">Пароль:</label>
                        <input type="password" required name="password" id="form3Example4cdg" className="form-control form-control-lg" />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Войти
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}

module.exports = SignIn;
