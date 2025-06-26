import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
import { Signup } from "./pages/auth/Signup";
import { Home } from "./pages/Home";
import { Signin } from "./pages/auth/Signin";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Toaster richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Signin />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
