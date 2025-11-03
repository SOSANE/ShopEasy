import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";
import Footer from "./composantes/footer/Footer"; 

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <RouteList />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;