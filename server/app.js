const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();
 let cache = {};
require("dotenv").config();
app.use(morgan('dev'));
app.get('/', async (req,res) => {
  const { i,t } = req.query;
     if (!i && !t) {
      return res.status(400).json({ error: "Missing query parameter" });
     }
   const key = i ? `i=${i}` : `t=${t}`; 
    if (cache[key]) {
        return res.status(200).json(cache[key]);
    };
    let apiUrl = `http://www.omdbapi.com`;
     if (i) {
      apiUrl += `/?i=${i}`;
      apiUrl += `&apikey=${process.env.API_KEY}`;
      console.log(apiUrl);
    };
    if (t) {
      apiUrl += `/?t=${t}`;
      apiUrl += `&apikey=${process.env.API_KEY}`;
       console.log(apiUrl);
    };
    const response = await axios.get(apiUrl);
    const data = response.data;

     cache[key] = data;
     return res.status(200).json(data)
});
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;