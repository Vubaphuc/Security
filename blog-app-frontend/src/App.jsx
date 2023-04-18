

import './App.css'
import { Routes, Route } from "react-router-dom"
import Layout from './components/layout/Layout'
import HomePage from './pages/home/HomePage'
import SearchPage from './pages/search/SearchPage'
import CategoryList from './pages/category/CategoryList'
import CategoryDetail from './pages/category/CategoryDetail'
import BlogDetail from './pages/blog/BlogDetail'
import NotFound from './pages/not-found/NotFound'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='categories'>
            <Route index element={<CategoryList />}/>
            <Route path=':categoryName' element={<CategoryDetail />}/>
          </Route>
          <Route path="blog/:blogId/:blogSlug" element={<BlogDetail />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
