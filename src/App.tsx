import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { menuList } from "./utils/menuData";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Home />} index /> */}
          {menuList.map(({ path, element }, i) => {
            return (
              <Route key={path} path={path} element={element} index={i === 0} />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
