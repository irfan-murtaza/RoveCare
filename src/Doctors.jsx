const Doctors = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="width70 marginleft30">
          <div class="row flexprop">
            <div class="img-stylee">
              <img
                class="rounded doctor-listing-picture mp-event-listing-doctor-picture doctor-img-style"
                src="https://q4q4u7z4.stackpathcdn.com/assets/doctors/5396/dr-umer-mushtaq-dermatologist-lahore_170X170.jpg"
                alt="Dermatologist in Lahore - Dr. Umer Mushtaq"
                width="170"
                data-width="170"
                height="170"
                data-height="170"
                data-on-error-src="https://h7u5d3a4.stackpathcdn.com/assets/images/doctor-photo-male.png"
              />
            </div>
            <div class=" doctordetails">
              <h2 class="font-size-md text-accent font-weight-bold mb-0  text-decor">
                Mustafa
              </h2>
              <p class="mb-0 font-size-sm product-meta d-md-block d-none">
                MBBS, FCPS (Dermatology), CAAAM ( USA )
              </p>
              <p class="product-meta d-block font-size-sm mb-0">
                Dermatologist
              </p>
              <p class="font-size-sm mb-0">15 year Experience</p>
              <p class="mb-0 font-size-md  px-1">Satisfaction 96%</p>
            </div>
          </div>

          <div class="row mnegv">
            <div class="addressdetails shadowww">
              <p className="paragraphStyle mtopp padleft">
                Chughtai Medical Center
              </p>
              <div class="d-flex top-margin-6 padleft">
                <label class="font-weight-bold" className="paragraphStyle">
                  Location:
                </label>
                <p class="product-meta d-block pb-1 mb-0 font-size-sm mx-2">
                  194 DD Phase 4 Commercial...
                </p>
              </div>
              <div class="d-flex top-margin-neg padleft">
                <label class="font-weight-bold" className="paragraphStyle">
                  Fee:{" "}
                </label>
                <p class="font-size-sm mx-2 priceStyle">
                  <span>Rs. 2,000</span>
                </p>
              </div>
              <div class="d-flex top-margin-15 padleft">
                <label class="font-weight-bold" className="paragraphStyle">
                  Days:{" "}
                </label>
                <p class="mx-2 font-size-sm text-dark mb-0">
                  Mon, Tue, Wed, Thu, Fri, Sat
                </p>
              </div>
              <div class="d-flex top-margin-neg padleft">
                <label class="font-weight-bold" className="paragraphStyle">
                  Timing:{" "}
                </label>
                <p class="mx-2 font-size-sm text-dark pbottom">
                  06:00 PM - 09:00 PM
                </p>
              </div>
            </div>
          </div>
          <div class="row top-margin-30">
            <div class="col-md-4"></div>
            <div class="col-md-8 pbottom mnegv">
              <button class="btn btn-primary btn-block mb-2 d-sm-block d-none  bookappointmentButton ">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
