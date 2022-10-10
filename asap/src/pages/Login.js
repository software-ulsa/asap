import React, { useState } from 'react';
import swal from 'sweetalert';

async function loginUser(credentials) {
  return fetch('https://juresca-api.com/users/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'no-cors',
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login() {
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      correo,
      password
    });
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('correo', JSON.stringify(response['correo']));
        window.location.href = "/account";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  }
  return (
  <div className="main-wrapper">
        <div
          className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
          style={{
            background: "url(assets/images/big/auth-bg2.jpg) no-repeat center center",
            backgroundSize: "cover",
          }}
        >
          <div className="auth-box row">
            <div
              className="col-lg-7 col-md-5 modal-bg-img"
              style={{ backgroundImage: "url(assets/images/users/1.jpg)" }}
            ></div>
            <div className="col-lg-5 col-md-7 bg-white">
              <div className="p-3">
                <div className="text-center">
                  <img src="assets/images/log-in.png" alt="wrapkit" />
                </div>
                <h2 className="mt-3 text-center">Inicio de sesión</h2>
                <p className="text-center">
                Ingrese su dirección de correo electrónico y contraseña para acceder al panel de administración.
                </p>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="uname">
                          Correo electrónico
                        </label>
                        <input
                          className="form-control"
                          id="correo"
                          type="text"
                          placeholder="ingrese su correo electrónico"
                          onChange={e => setCorreo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="pwd">
                          Contraseña
                        </label>
                        <input
                          className="form-control"
                          id="password"
                          type="password"
                          placeholder="ingrese su contraseña"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 text-center">
                      <button type="submit" className="btn btn-block btn-dark">
                      Iniciar sesión
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
