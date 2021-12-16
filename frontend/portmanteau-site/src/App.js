import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage";
import CapsuleListPage from "./pages/CapsuleListPage";
import CapsuleDetailPage from "./pages/CapsuleDetailPage";
import ItemDetailPage from "./pages/ItemDetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/capsule-list" element={<CapsuleListPage />} />
          <Route exact path="/capsule-list/:capsuleID" element={<CapsuleDetailPage />} />
          <Route exact path="/capsule-list/:capsuleID/item-detail/:itemID" element={<ItemDetailPage />} />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
