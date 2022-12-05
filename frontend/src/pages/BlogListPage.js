import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTE } from '../routes/BlogRoutes';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from '@mui/system';
import LoadingIndicator from '../components/LoadingIndicator';
import { toast } from 'react-toastify';

const BlogListPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);


  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/blog/");
      const allBlogs = response.data;
      setAllBlogs(allBlogs);
      // const allBlog  = []
      // setAllBlogs([])
    } catch (error) {
      // console.error(error);
      toast.error(error?.response?.data || "Error occured");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleReadMoreClick = (blogId) => {
    const url = APP_ROUTE.BLOG_DETAILS.replace(":blogId", blogId)
    navigate(url)
  }

  const handleCreateBlog = () => {
    navigate(APP_ROUTE.BLOG_CREATE);
  }

  if (loading) {
    return <LoadingIndicator />;
  }


  return (
    <>
      <Grid container spacing={ 3 } >
        <Grid item xs={ 12 } display="flex" justifyContent="space-between">
          <Typography variant='h4'><b>List of Blogs</b></Typography>
          <Button variant="contained" startIcon={ <AddCircleIcon /> } onClick={ handleCreateBlog }>Create New Blogs </Button>
        </Grid>

        { (!allBlogs || allBlogs.length === 0) && (
          <Box style={ {
            display: "flex",
            height: "300px",
            width: "100%",
            justifyContent: "center", alignItems: "center",
          } }>
            <Typography variant='h3' textAlign="center"><i>No Blogs Available Here Create New Blogs</i></Typography>
          </Box>

        ) }


        { !(!allBlogs || allBlogs.length === 0) &&
          allBlogs.map((blog, index) => (
            <Grid item key={ index } lg={ 4 } md={ 6 } xs={ 12 }>
              <Card variant="outlined">
                <CardHeader
                  title={ blog.title }
                  subheader={ new Date(blog.createdAt).toDateString() } />
                <CardContent>{ blog.description }</CardContent>
                <CardActions style={ {
                  display: "flex", justifyContent: "space-between", padding: 16,
                } }>
                  <Typography>3 min read</Typography>
                  <Button size="small" endIcon={ <SendIcon /> }
                    onClick={ () => handleReadMoreClick(blog._id) }
                  >Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          )) }
      </Grid>

    </>
  )
}

export default BlogListPage
