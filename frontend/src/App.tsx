import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
import { Signup } from "./pages/auth/Signup";
import { Home } from "./pages/Home";
import { Signin } from "./pages/auth/Signin";
import { CreateBlog } from "./pages/blogCreate&Update/CreateBlog";
import { OpenBlog } from "./pages/blogCreate&Update/OpenBlog";
import { useUserStore } from "./zustand/user";

function App() {
  const { isAuthenticated } = useUserStore();

  return (
    <div>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          {isAuthenticated ? (
            <Route path="/blog" element={<CreateBlog />} />
          ) : (
            <Route path="/login" element={<Signin />} />
          )}
          {isAuthenticated ? (
            <Route path="/open-blog" element={<OpenBlog />} />
          ) : (
            <Route path="/login" element={<Signin />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
