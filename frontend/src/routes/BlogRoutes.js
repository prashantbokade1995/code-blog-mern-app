import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import BlogCreatePage from '../pages/BlogCreatePage';
import BlogDetailsPage from '../pages/BlogDetailsPage';
import BlogEditPage from '../pages/BlogEditPage';
import BlogListPage from '../pages/BlogListPage';
import BlogErrorPage from '../pages/BlogErrorPage';

export const APP_ROUTE = {
  HOME: "/",
  BLOG_LIST: "/blog/list",
  BLOG_CREATE: "/blog/create",
  BLOG_EDIT: "/blog/:blogId/edit",
  BLOG_DETAILS: "/blog/:blogId/details",
}

const BlogRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={ APP_ROUTE.HOME } element={ <Navigate to={ APP_ROUTE.BLOG_LIST } /> } />
        <Route path={ APP_ROUTE.BLOG_LIST } element={ <BlogListPage /> } />
        <Route path={ APP_ROUTE.BLOG_DETAILS } element={ <BlogDetailsPage /> } />
        <Route path={ APP_ROUTE.BLOG_EDIT } element={ <BlogEditPage /> } />
        <Route path={ APP_ROUTE.BLOG_CREATE } element={ <BlogCreatePage /> } />
        <Route path='*' element={ <BlogErrorPage /> } />
      </Routes>
    </>
  )
}

export default BlogRoutes
