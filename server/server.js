const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const contactRoutes = require('./routes/contact')

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

app.use('/contacts', contactRoutes)

app.listen(PORT, () => {
    console.log('Server running!')
})