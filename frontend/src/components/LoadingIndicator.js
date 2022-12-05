import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const LoadingIndicator = () => {
  return (
    <>
      <Box sx={ { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }>
        <CircularProgress />
      </Box>
    </>
  )
}

export default LoadingIndicator
