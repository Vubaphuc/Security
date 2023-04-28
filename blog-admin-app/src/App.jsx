import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoutes from "./components/PrivateRoutes";
import BlogList from "./page/blog/BlogList";
import OwnBlog from "./page/blog/OwnBlog";
import BlogDetails from "./page/blog/BlogDetails";
import BlogCreate from "./page/blog/BlogCreate";
import LoginPage from "./page/login/LoginPAge";
import AuthorizeRoutes from "./components/AuthorizeRoutes";
import NotFound from "./page/notfound/NotFound";
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Layout />}>
            <Route path="blogs">
              <Route element={<AuthorizeRoutes requireRoles={["ADMIN"]} />}>
                <Route index element={<BlogList />} />
              </Route>

              <Route
                element={<AuthorizeRoutes requireRoles={["ADMIN", "AUTHOR"]} />}
              >
                <Route path="own-blogs" element={<OwnBlog />} />
                <Route path=":blogId" element={<BlogDetails />} />
                <Route path="create" element={<BlogCreate />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="admin/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      
    </>
  );
}

export default App;
