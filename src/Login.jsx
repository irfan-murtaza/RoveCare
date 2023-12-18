const Login = () => {
  return (
    <div className="login-style">
      <div class="row text-alig">
        <h1> Login</h1>
      </div>

      <div class="row username-style">
        <div class="col-md-6 place ">
          <hr className="border" />
        </div>
        <div class="col-md-8  ">
          <b className="fontsize">User Name*</b>

          <input type="text" id="user_name" className="input-style4" />
        </div>
        <div class="col-md-8  ">
          <b className="fontsize2">Password*</b>

          <input type="password" id="password" className="input-style4" />
        </div>
        <div class="place">
          <button class="btn btn-primary  login-bstyle" type="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
