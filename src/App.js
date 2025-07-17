import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import IdeasList from "./components/List";

function App() {
  return (
    <Router>
      <Header />
      <IdeasList />
    </Router>
  );
}

export default App;
