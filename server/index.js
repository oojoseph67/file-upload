require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

{
  /**SWAGGER UI */
}

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

{
  /**SWAGGER UI */
}

// route imports
const productRouter = require('./routes')

// connectDB
const connectDB = require("./db");

// authentication middleware
// const authenticateUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(
  cors({
    origin: "*", // or '*' to allow all origins
  })
);
app.use(express.json()); // this gives us access to all the data in req body
app.use(fileUpload({ useTempFiles: true }))
app.use(express.static('../client'))

// extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);

app.use(helmet());
app.use(xss());

// routes
app.get("/", (req, res) => {
  res.send('<h1>FILE-UPLOAD API</h1><a href="/api/docs">DOCUMENTATION </a>');
});

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/v1/", productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

{
  /** PATH UPDATE FOR SWAGGER API */
}

//  /user/{id}:
//     parameters:
//       - in: path
//         name: id
//         schema:
//           type: integer
//         required: true
//         description: The user ID

// render.com
// https://app.apimatic.io/dashboard
// https://editor.swagger.io/
// https://swagger.io/docs/specification/describing-parameters/
// https://console.cloudinary.com/