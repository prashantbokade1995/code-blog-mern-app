
import { Container } from '@mui/system';
import React from 'react';
import BlogRoutes from '../routes/BlogRoutes';
import './App.css';
import AppBars from './AppBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AppBars />
      <Container style={ { paddingBlock: "20px" } }>
        <BlogRoutes />
      </Container>
      <ToastContainer autoClose={ 4000 } />
    </>
  );
}

export default App;
