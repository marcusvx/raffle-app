import "bulma/css/bulma.min.css";
import { Navbar, Heading } from "react-bulma-components";
import { NumbersTable } from "./components/NumbersTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar fixed="top" color="primary">
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <Heading className="has-text-white">Rifa Online</Heading>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
      <div>
        <NumbersTable></NumbersTable>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
