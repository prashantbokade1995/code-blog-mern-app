import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Paper } from '@mui/material'
import BlogForm from '../components/BlogForm';


const BlogEditPage = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState({});
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);


  const fetchBlogDetailsPage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/blog/${blogId}`)
      const blogData = response.data;
      setBlogData(blogData);

    } catch (error) {
      // console.log(error)
      toast.error(error?.response?.data || "Error occured");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogDetailsPage()
  }, []);

  const editBlogPost = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/blog/${blogId}`, data);
      navigate(`/blog/${response.data._id}/details`)
      toast.success("Blog updated successfully");

    } catch (error) {

      toast.error(error?.response?.data || "Error occured");
    }
    setLoading(false);
  };


  return (
    <>
      <Paper variant='outlined' style={ { padding: 24 } }>
        <BlogForm onSubmit={ editBlogPost } data={ blogData } loading={ loading } />
      </Paper>
    </>
  )
}
export default BlogEditPage
