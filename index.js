require("dotenv").config()
const express = require(`express`);
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 5000
const weatherurl ="http://api.weatherapi.com/v1"


app.get(`/api/hello`, async (req, res) => {
    try { 
     const clientIp = process.env.NODE_ENV = `production` ? req.headers ["x-forwarded-for"] : req.ip
     const ip = req.ip
     const visitor = req.query.visitor_name
     let name =""
     if (visitor) {
        name = visitor
     } else {
        name = "Username"
     }
    

     const response = await axios.get (`${weatherurl}/current.json?key=${process.env.WEATHER_API_KEY}&q=${clientIp}`)
     const data = response.data
     const result = {client_ip: clientIp , location: data.location.name, greeting: `Hello, ${name}!,the temperature is ${data.current.temp_c} degree celcuis in ${data.location.name}`}


     res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ stat: false, error: error, error_name: error.name})
    }

} )

app.listen(PORT, () => {
    console.log(`server is the listening on port:${PORT}.`)
})