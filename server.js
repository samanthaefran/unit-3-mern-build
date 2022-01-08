//    DEPENDENCIES

// get .env variables
require('dotenv').config();

// pull PORT form .env, give default value of 3001
const { PORT = 3001 } = process.env
// const PORT  = process.env || 3001 ** alternate way to write **

// import express from 'express'
const express = require('express')

// create application object
const app = express()

//      ROUTES

// create test route -- this is great for future practice.
app.get('/', (req, res) => {
  res.send('hello world')
})


// listeners 
app.listen(PORT, () => console.log(`${PORT}`))