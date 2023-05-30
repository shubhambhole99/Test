const express = require("express")
const app = express()
const config = require('./config/config')
const userRoutes = require('./routes/userRoutes')
// swagger
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const { specs } = require('./swagger')
// port
const port = config.port || 5000
// database
require("./database/db")

// express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// main route
app.use('/', userRoutes)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

