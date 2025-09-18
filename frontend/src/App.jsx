// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { changeLang } from "./redux/localizationSlice";
import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
// import LOCALIZE from "./ressources/text/localize";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";

function App() {
  // const [count, setCount] = useState(0);
  // const lang = useSelector(state => state.localization.language);
  // const dispatch = useDispatch();

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <p>Current language: {lang}</p>
      <button onClick={() => dispatch(changeLang("en"))}>Change to eng</button>
      <button onClick={() => dispatch(changeLang("fr"))}>Change to fr</button>
      <p>Output: {LOCALIZE.test}</p> */}
      <BrowserRouter>
        <RouteList />
      </BrowserRouter>
    </>
  );
}

export default App;
