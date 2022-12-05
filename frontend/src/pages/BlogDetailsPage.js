import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material'
import { Box, Stack } from '@mui/system'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { toast } from 'react-toastify'
import { APP_ROUTE } from '../routes/BlogRoutes'
import LoadingIndicator from '../components/LoadingIndicator'

const BlogDetailsPage = () => {
  const { blogId } = useParams()
  const [loading, setLoading] = useState(true)
  const [blogData, setBlogData] = useState({})
  const [isDeleteDalogOpen, setIsDeleteDalogOpen] = useState(false)
  const navigate = useNavigate()

  const fetchBlogDetailsPage = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/blog/${blogId}`)
      const blogData = response.data
      blogData.createdAt = new Date(blogData.createdAt).toDateString()
      blogData.updatedAt = new Date(blogData.updatedAt).toDateString()
      setBlogData(response.data)
    } catch (error) {
      // console.error(error);
      toast.error(error?.response?.data || 'Error occured')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogDetailsPage()
  }, [])

  const handleBlogDelete = async () => {
    setLoading(true)
    try {
      await axios.delete(`/api/blog/${blogId}`)
      toast.success('Blog deleted Successfully')
      navigate(APP_ROUTE.BLOG_LIST)
    } catch (error) {
      // console.error(error);
      toast.error(error, 'Error occured')
    }
    setLoading(false)
  }
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title=<Typography variant="h3">{ blogData.title }</Typography>
          action={
            <Stack direction="row" spacing={ 2 }>
              <Button
                variant="outlined"
                onClick={ () => navigate(`/blog/${blogId}/edit`) }
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={ () => setIsDeleteDalogOpen(true) }
              >
                Delete
              </Button>
            </Stack>
          }
          subheader={
            <Box style={ { marginTop: 15 } }>
              <Typography>Created: { blogData.createdAt }</Typography>
              <Typography>Updated: { blogData.updatedAt }</Typography>
              <Typography>3 min read</Typography>
            </Box>
          }
        />
        <CardContent style={ { overflow: 'auto' } }>
          <Box>
            <Typography variant="h5">
              <strong>Description</strong>
            </Typography>
            <Typography>{ blogData.description }</Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Box>
            <Divider style={ { marginBlock: 15 } } />
            <Typography variant="h5">
              <strong>Markdown</strong>
            </Typography>
            <ReactMarkdown
              rehypePlugins={ [rehypeRaw] }
              components={ {
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={ String(children).replace(/\n$/, '') }
                      style={ docco }
                      language={ match[1] }
                      PreTag="div"
                      { ...props }
                    />
                  ) : (
                    <code className={ className } { ...props }>
                      { children }
                    </code>
                  )
                },
              } }
            >
              { blogData.markdown }
            </ReactMarkdown>
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={ isDeleteDalogOpen }
        onClose={ () => setIsDeleteDalogOpen(false) }
      >
        <DialogTitle>Delete Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure Delete This Blog?, if you Deleting this blog it will be
            Remove permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => setIsDeleteDalogOpen(false) }>Cancle</Button>
          <Button autoFocus onClick={ handleBlogDelete }>
            { ' ' }
            Delete{ ' ' }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BlogDetailsPage
