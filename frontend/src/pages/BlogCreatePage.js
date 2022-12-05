import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from "axios";
import BlogForm from '../components/BlogForm';
import { Paper } from '@mui/material'
import { toast } from 'react-toastify';




const BlogCreatePage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const createBlogPost = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/blog", data);
      toast.success("Blog created successfully");
      navigate(`/blog/${response.data._id}/details`);

    } catch (error) {
      toast.error(error?.response?.data || "Error occured");
    };
    setLoading(false);
  };


  return (
    <>
      <Paper variant='outlined' style={ { padding: 24 } }>
        <BlogForm onSubmit={ createBlogPost } loading={ loading } />
      </Paper>
    </>
  )
}

export default BlogCreatePage
