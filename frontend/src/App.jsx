import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Layout from "./components/Layout";
import RHF from "./pages/RHF";
import UploadPDF from "./pages/UploadPDF";
import Editor from "./pages/Editor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<LandingPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} /> */}
            <Route path="upload-pdf" element={<UploadPDF />} />
            <Route path="editor" element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
