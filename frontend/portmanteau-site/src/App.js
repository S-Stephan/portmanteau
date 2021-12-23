import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

//pages
import HomePage from "./pages/HomePage";
import CapsuleListPage from "./pages/CapsuleListPage";
import CapsuleDetailPage from "./pages/CapsuleDetailPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ModifyCapsulePage from "./pages/ModifyCapsulePage";
import DeleteCapsulePage from "./pages/DeleteCapsulePage";
import ModifyItemPage from "./pages/ModifyItemPage";
import DeleteItemPage from "./pages/DeleteItemPage";

function App() {
  const [url, setUrl] = useState([])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/capsule-list/" element={<CapsuleListPage />} />
          <Route exact path="/capsule-list/:capsuleID" element={<CapsuleDetailPage />} />
          <Route exact path="/capsule-list/:capsuleID/item-detail/:itemID" element={<ItemDetailPage url={url}/>} />
          <Route exact path="/capsule-list/create" element={<ModifyCapsulePage />} />
          <Route exact path="/capsule-list/:capsuleID/update" element={<ModifyCapsulePage />} />
          <Route exact path="/capsule-list/:capsuleID/delete" element={<DeleteCapsulePage />} />
          <Route exact path="/capsule-list/:capsuleID/item-detail/create" element={<ModifyItemPage url={url} setUrl={setUrl}/>} />
          <Route exact path="/capsule-list/:capsuleID/item-detail/:itemID/update" element={<ModifyItemPage />} />
          <Route exact path="/capsule-list/:capsuleID/item-detail/:itemID/delete" element={<DeleteItemPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
