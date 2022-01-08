//                                              DEPENDENCIES

// get .env variables
require('dotenv').config()

// pull PORT form .env, give default value of 3001
const { PORT = 3001, DATABASE_URL } = process.env
// const PORT  = process.env || 3001 ** alternate way to write **

// import express from 'express'
const express = require('express')

// create application object
const app = express()

// import mongoose
const mongoose = require('mongoose')

// import middleware... req => middleware => route => res
const cors = require('cors')
const morgan = require('morgan') 

//                                      --  DATABASE CONNECTION --

// establish connection
mongoose.connect(DATABASE_URL)

// connection Events
mongoose.connection
  .on("open", () => console.log("open"))
  .on("close", () => console.log("close"))
  .on("error", (error) => console.log(error))
  //                                             --  MODELS --
  const PeopleSchema = new mongoose.Schema ( {
    name: String,
    image: String,
    title: String,
  })

  const People = mongoose.model("People", PeopleSchema)

  //                                            -- MIDDLEWARE --
  app.use(cors()) // to prevent cors errors, opens access to all data
  app.use(morgan("dev")) //logging
  app.use(express.json()) // parse json bodies 

  //                                             --  ROUTES --

// create test route -- this is great for future practice.
app.get('/', (req, res) => {
  res.send('hello world')
})

// people index route
// async/await - there is a promise running "under the hood" and the function waits until that promise is fulfilled before running???
app.get('/people', async(req, res) =>{
  try{
    res.json(await People.find({})) // waits until the app finds all the people in the array before sending the response
  } catch(error) {
    res.status(400).json(error)
  }
})
// people create route
app.post("/people", async (req, res) => {
  try {
    res.json(await People.create(req.body))
  } catch(error) {
    res.status(400).json(error)
  }
})

// people delete route
app.delete('/people/:id', async (req, res) =>{
  try {
    res.json(await People.findByIdAndDelete(req.params.id));
  } catch(error) {
    res.status(400).json(error)
  }
});

// people update route
app.put('/people/:id', async (req, res) => {
  try {
    res.json(await People.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch(error) {
    res.status(400).json(error)
  }
})


//                                               LISTENER
app.listen(PORT, () => console.log(`${PORT}`))