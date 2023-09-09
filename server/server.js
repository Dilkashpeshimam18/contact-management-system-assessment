const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose=require('mongoose')
const contactRoutes = require('./routes/contact')

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to DB'))
    .catch((err) => { console.error(err); });

app.use('/contacts', contactRoutes)

app.listen(PORT, () => {
    console.log('Server running!')
})