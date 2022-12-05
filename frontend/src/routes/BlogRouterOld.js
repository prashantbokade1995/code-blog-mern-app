

import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BlogCreatePage from '../pages/BlogCreatePage';
import BlogDetailsPage from '../pages/BlogDetailsPage';
import BlogEditPage from '../pages/BlogEditPage';
import BlogListPage from '../pages/BlogListPage';
import BlogErrorPage from '../pages/BlogErrorPage';



const BlogRoutes = () => {
return (
  <>
  <BrowserRouter>
  <Routes>
      <Route path='/' element={<Navigate to="/blog/list"/>}/>
      <Route path="/blog/list" element={<BlogListPage/>}/>
      <Route path="/blog/:blogId/details" element={<BlogDetailsPage/>}/>
      <Route path="/blog/:blogId/edit" element={<BlogEditPage/>}/>
      <Route path="/blog/create" element={<BlogCreatePage/>}/>
      <Route path='*' element={<BlogErrorPage/>}/>
  </Routes>
</BrowserRouter>
  </>
)
}

export default BlogRoutes


