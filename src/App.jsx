import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewSpy from './pages/NewSpy';
import SpyDetail from "./pages/SpyDetail";
import EditSpy from "./pages/EditSpy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<NewSpy />} />
      <Route path="/detail/:id" element={<SpyDetail />} />
      <Route path="/edit/:id" element={<EditSpy />} />
    </Routes>
  );
}

export default App;
