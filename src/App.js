import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Ideas from "./pages/Ideas";
import Work from "./pages/Work";
import About from "./pages/Abouts";
import Services from "./pages/Service";
import Careers from "./pages/Career";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <div className="pt-24 p-10 text-center">
              <h1 className="text-4xl font-bold">
                Selamat Datang di Frontend Test ini
              </h1>
            </div>
          }
        />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  );
}

export default App;
