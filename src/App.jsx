import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import DocLogin from "./pages/DocLogin";
import PatientLogin from "./pages/PatientLogin";
import DocHome from "./pages/DocHome";
import PatientHome from "./pages/PatientHome";
import DocFeed from "./pages/DocFeed";
import DocPatient from "./pages/DocPatient";
import Diagnosis from "./pages/Diagnosis";
import Calendar from "./pages/Calendar";
import Inbox from "./pages/Inbox";
import PatientInbox from "./pages/PatientInbox";
import DocProfile from "./pages/DocProfile";
import PatientReport from "./pages/PatientReport";
import AI from '../src/components/AI'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/doclogin" element={<DocLogin />} />
          <Route path="/patientlogin" element={<PatientLogin />} />
          <Route path="/dochome" element={<DocHome />} />
          <Route path="/patienthome" element={<PatientHome />} />
          <Route path="/docfeed" element={<DocFeed />} />
          <Route path="/docpatient" element={<DocPatient />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/patientinbox" element={<PatientInbox />} />
          <Route path="/patientreport" element={<PatientReport />} />
          <Route path="/docprofile" element={<DocProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
