import "./App.css";
import Layout from "./components/layout";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Box } from "@mui/material";
import Personal from "./pages/Personal";
import PostNote from "./pages/PostNote";

function App() {
  return (
    <>
      <Layout />
      <Box width="100%">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="postNote" element={<PostNote />} />
          <Route path="personal" element={<Personal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
