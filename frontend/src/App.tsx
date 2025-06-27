import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
import { Signup } from "./pages/auth/Signup";
import { Home } from "./pages/Home";
import { Signin } from "./pages/auth/Signin";
import { CreateBlog } from "./pages/blogCreate&Update/CreateBlog";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/blog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
