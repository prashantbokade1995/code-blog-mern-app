import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTE } from '../routes/BlogRoutes';



const AppBars = () => {
  const navigate = useNavigate();

  const handleHomePageClick = () => {
    navigate(APP_ROUTE.BLOG_LIST);
  };

  return (
    <>
      <Box sx={ { flexGrow: 1 } }>
        <AppBar position='sticky'>
          <Toolbar>
            <Button onClick={ handleHomePageClick } variant="h6" startIcon={ <BookTwoToneIcon /> }>
              <Typography variant="h6">
                Bloging App
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default AppBars
