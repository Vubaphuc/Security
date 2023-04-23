import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateRoutes from './components/PrivateRoutes'
import BlogList from './page/blog/BlogList'
import OwnBlog from './page/blog/OwnBlog'
import BlogDetails from './page/blog/BlogDetails'
import BlogCreate from './page/blog/BlogCreate'
import LoginPage from './page/login/LoginPAge'

function App() {
  

  return (
    <>
      <Routes>
        {/* nếu đường dẫn có admin thì đưa tới trang Layout */}
        <Route path='/admin' element={<Layout />}>
          <Route path='login' element={<LoginPage />} />
         {/* khi đưa tới trang layout thì kiểm tra xem họ có quyền vào không */}
          <Route element={<PrivateRoutes />}>

            <Route path='blogs'>
                <Route index element={<BlogList />} />
                <Route path='own-blogs' element={<OwnBlog />} />
                <Route path=':blogId' element={<BlogDetails />} />
                <Route path='create' element={<BlogCreate />} />
            </Route>

          </Route>

        </Route>

      </Routes>
    </>
  )
}

export default App
