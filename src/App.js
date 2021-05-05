import "bulma/css/bulma.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Router } from "./Router";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router></Router>
    </div>
  );
}

export default App;
