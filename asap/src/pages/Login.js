import React from "react";

export default function Login() {
  return (
    <>
      <div className="main-wrapper">
        {/* ============================================================== */}
        {/* Preloader - style you can find in spinners.css */}
        {/* ============================================================== */}
        {/* <div className="preloader">
          <div className="lds-ripple">
            <div className="lds-pos" />
            <div className="lds-pos" />
          </div>
        </div> */}
        {/* ============================================================== */}
        {/* Preloader - style you can find in spinners.css */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* Login box.scss */}
        {/* ============================================================== */}
        <div
          className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
          style={{
            background: "url(assets/images/img1.jpg) no-repeat center center",
          }}
        >
          <div className="auth-box row">
            <div
              className="col-lg-7 col-md-5 modal-bg-img"
              style={{ backgroundImage: "url(assets/images/img1.jpg)" }}
            ></div>
            <div className="col-lg-5 col-md-7 bg-white">
              <div className="p-3">
                <div className="text-center">
                  <img src="assets/images/big/icon.png" alt="wrapkit" />
                </div>
                <h2 className="mt-3 text-center">Sign In</h2>
                <p className="text-center">
                  Enter your email address and password to access admin panel.
                </p>
                <form className="mt-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="uname">
                          Username
                        </label>
                        <input
                          className="form-control"
                          id="uname"
                          type="text"
                          placeholder="enter your username"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="pwd">
                          Password
                        </label>
                        <input
                          className="form-control"
                          id="pwd"
                          type="password"
                          placeholder="enter your password"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 text-center">
                      <button type="submit" className="btn btn-block btn-dark">
                        Sign In
                      </button>
                    </div>
                    <div className="col-lg-12 text-center mt-5">
                      Don't have an account?{" "}
                      <a href="#" className="text-danger">
                        Sign Up
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
        {/* Login box.scss */}
        {/* ============================================================== */}
      </div>
    </>
  );
}
