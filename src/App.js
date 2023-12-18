import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/signup";

import DoctorDashboard from "./Components/doctorDashboard";
import PatientDashboard from "./Components/patientDashboard";
import LabDashboard from "./Components/labDashboard";
import AdminDashboard from "./Components/adminDashboard";
import UpdateProfile from "./Components/updateProfile";
import ResetPassword from "./Components/resetPassword";
import AddTest from "./Components/addTest";
import ViewMyTest from "./Components/viewmyTests";
import EditTest from "./Components/editTest";
import ViewReviews from "./Components/viewReviews";
import ViewDocs from "./Components/viewDocs";
import ViewPats from "./Components/viewPats";
import ViewLabs from "./Components/viewLabs";
import ViewLabsPat from "./Components/viewLabspat";
import ViewDocsPat from "./Components/viewDocspat";
import Addreview from "./Components/addReview";
import FixAppoint from "./Components/addAppoint";
import ViewAppoints from "./Components/viewAppoints";
import UpdateaptProfile from "./Components/updateapProfile";
import Diagnose from "./Components/diagnose";
import UpdateProfileDoc from "./Components/updatedocprofile";
import AddSlots from "./Components/AddSlots";
import Homee from "./Home";
import UploadImage from "./UploadImage";

import DocAppoinmentDetail from "./Components/DocAppoinmentDetail";
import AddReviewByPatient from "./Components/AddReviewByPatient";
import MedicalHistoryPatient from "./Components/MedicalHistoryPatient";
import MyHistory from "./Components/viewmyHistory";
import SugLabProfile from "./Components/suggestedlabprofile";
import MyAppointsLab from "./Components/myappointslab";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Homee />} />
        </Routes>
        <Routes>
          <Route path="/test" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Routes>
        <Routes>
          <Route path="/medicaldetail" element={<MedicalHistoryPatient />} />
        </Routes>
        <Routes>
          <Route path="/patient" element={<PatientDashboard />} />
        </Routes>
        <Routes>
          <Route path="/lab" element={<LabDashboard />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Routes>
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
        <Routes>
          <Route path="/updateprofiledoc" element={<UpdateProfileDoc />} />
        </Routes>
        <Routes>
          <Route path="/editprofile" element={<UpdateaptProfile />} />
        </Routes>
        <Routes>
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
        <Routes>
          <Route path="/addtest" element={<AddTest />} />
        </Routes>
        <Routes>
          <Route path="/viewtests" element={<ViewMyTest />} />
        </Routes>
        <Routes>
          <Route path="/edittest" element={<EditTest />} />
        </Routes>
        <Routes>
          <Route path="/viewreviews" element={<ViewReviews />} />
        </Routes>
        <Routes>
          <Route path="/seedocs" element={<ViewDocs />} />
        </Routes>
        <Routes>
          <Route path="/seepats" element={<ViewPats />} />
        </Routes>
        <Routes>
          <Route path="/seelabs" element={<ViewLabs />} />
        </Routes>
        <Routes>
          <Route path="/seelabspat" element={<ViewLabsPat />} />
        </Routes>
        <Routes>
          <Route path="/seedocspat" element={<ViewDocsPat />} />
        </Routes>
        <Routes>
          <Route path="/addreview" element={<Addreview />} />
        </Routes>
        <Routes>
          <Route path="/fixappoint" element={<FixAppoint />} />
        </Routes>
        <Routes>
          <Route path="/viewappointments" element={<ViewAppoints />} />
        </Routes>
        <Routes>
          <Route path="/diagnose" element={<Diagnose />} />
        </Routes>
        <Routes>
          <Route path="/addslot" element={<AddSlots />} />
        </Routes>
        <Routes>
          <Route path="/docappoinment" element={<DocAppoinmentDetail />} />
        </Routes>
        <Routes>
          <Route path="/reviewbypatient" element={<AddReviewByPatient />} />
        </Routes>
        <Routes>
          <Route path="/myhistory" element={<MyHistory />} />
        </Routes>
        <Routes>
          <Route path="/suggestedlab" element={<SugLabProfile />} />
        </Routes>
        <Routes>
          <Route path="/myappointslab" element={<MyAppointsLab />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
