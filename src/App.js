import CrudApp from "./components/CrudApp";
import React from "react";
import CrudApi from "./components/CrudApi";
function App() {
  return (
  <div>
    <h2>EjercicioCRUD API</h2>
    <CrudApi/>
    <hr />
    <CrudApp/>
  </div>
    )
}

export default App;
