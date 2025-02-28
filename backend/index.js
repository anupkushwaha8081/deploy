// const express = require("express");
// const app = express();

// app.use(express.json())

// const fileUpload = require("express-fileupload");
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "/tmp/",
//   // createParentPath: true,
// }));


// const dotenv = require("dotenv")
// dotenv.config();

// const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow your frontend to make requests
//   methods: ['GET', 'POST',"PUT",], // Allow specific methods
//   credentials: true, // Allow cookies if needed
// }));


// const cookieParser = require("cookie-parser");
// app.use(cookieParser());




// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // Connect to the database
// const db = require("./config/database");
// db.connect();

// //connect to path
// const path = require('path')
// const _dirname = path.resolve();

// // cloud se connect kro 
// const cloudinary = require("./config/cloudinary");
// cloudinary.cloudinaryConnect();


// const path = require("path");
// const _dirname = path.resolve();


// // Link to user routes (you can uncomment this once the routes are set up)
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/v1", userRoutes);

// // Link to company routes (you can uncomment this once the routes are set up)
// const companyRoutes = require("./routes/companyRoutes");
// app.use("/api/v1/company", companyRoutes);

// app.use(express.static(path.join(_dirname,"/frontend/dist")));
//  app.get("*",(_,res)=>{
//     res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
//  })



// // Set up the port from environment variable or default to 7000
// const PORT = process.env.PORT || 7000;


// // Start the server
// app.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// });








const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileUpload = require("express-fileupload");
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Connect to the database
const db = require("./config/database");
db.connect();

// Cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Set up path for serving frontend files
const path = require('path');
const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Link to user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", userRoutes);

// Link to company routes
const companyRoutes = require("./routes/companyRoutes");
app.use("/api/v1/company", companyRoutes);

// Set up the port
const PORT = process.env.PORT || 7000;

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
