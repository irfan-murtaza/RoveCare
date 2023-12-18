const Signup = () => {
  return (
    <div className="signup-style">
      <div class="conatiner">
        <div class="row">
          <div class="col-8">
            <h1 className="place"> Sign Up</h1>
          </div>
        </div>

        <div class="row  margin-shit">
          <div class="col-8">
            <hr className="line-sty" />
          </div>
          <div class="col-8">
            <b className="myfont">User Name*</b>
          </div>
          <div class="col-8">
            <input type="text" id="user_name" className="myinput-style" />
          </div>
          <div class="col-8">
            <b className="myfont">First Name*</b>
          </div>
          <div class="col-8">
            <input type="text" id="fname" className="myinput-style" />
          </div>
          <div class="col-8">
            <b className="myfont">Last Name*</b>
          </div>
          <div class="col-8">
            <input type="text" id="lname" className="myinput-style" />
          </div>
          <div class="col-8">
            <b className="myfont">Phone*</b>
          </div>
          <div class="col-8">
            <input type="number" id="phone" className="myinput2" />
          </div>
          <div class="col-8">
            <b className="myfont">Email*</b>
          </div>
          <div class="col-8">
            <input type="email" id="email" className="myinput2" />
          </div>
          <div class="col-8">
            <b className="myfont">Street Address*</b>
          </div>
          <div class="col-8">
            <input type="text" id="s_address" className="myinput2" />
          </div>
          <div class="col-8">
            <b className="myfont">Town / City*</b>
          </div>
          <div class="col-8">
            <input type="text" id="city" className="myinput2" />
          </div>
          <div class="col-8">
            <b className="myfont">Country / Region*</b>
          </div>
          <div class="col-8">
            <select id="country" name="country" class="form-contro margin-80">
              <option value="Pakistan">Pakistan</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Åland Islands">Åland Islands</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>

              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
            </select>
          </div>
          <div class="col-8">
            <b className="myfont">State / Province*</b>
          </div>
          <div class="col-8">
            <select
              id="province"
              name="province"
              class="form-control margin-80"
            >
              <option value="Punjba">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Islamabad">Islamabad Capital Territory</option>
              <option value="Gilgit">Gilgit</option>
            </select>
          </div>
          <div class="col-8">
            <b className="myfont">Upload Profile Picture</b>
          </div>
          <div class="col-8">
            <input type="file"></input>
            <button> Upload</button>
          </div>

          <div class="col-8">
            <div class="check flexp">
              <div>
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />

                <label class="form-check-label" for="exampleCheck1">
                  Are You Doctor ?{" "}
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  class="form-check-input patient"
                  id="exampleCheck1"
                />

                <label class="form-check-label" for="exampleCheck1">
                  Are You Patient?{" "}
                </label>
              </div>
            </div>
          </div>

          <div class="place">
            <button class="btn btn-primary  lastbutton" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
