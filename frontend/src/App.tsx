import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/AdminRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
