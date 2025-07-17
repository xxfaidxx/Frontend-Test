import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Ideas from "./components/Ideas";

function App() {
  return (
    <Router>
      <Header />
      <Ideas />
    </Router>
  );
}

export default App;
