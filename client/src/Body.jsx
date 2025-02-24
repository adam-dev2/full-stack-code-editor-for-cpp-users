import React from 'react'
import { Box, Container } from '@mui/material'
import Maincard from './Maincard'
import Board from './Board'
import Navbar from './Navbar'

const Body = () => {
  return (
    <>
    <Navbar />
    <Box alignContent='center'  sx={{backgroundColor: 'rgba(16,27,35,255)', paddingLeft: {xs: 0, sm: 0, md: 20}, paddingRight: {xs: 0, sm: 0, md: 20}, paddingTop: 5}}>
        <Maincard/>
        <Board/>
    </Box>
    </>
  )
}

export default Body