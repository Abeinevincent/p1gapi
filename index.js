// Initialise the app as an express app
const express = require("express");
const app = express();

// Import all dependencies and dev-dependencies
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const path = require("path");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// Import all routes
const AuthRoute = require("./routes/auth/admin/auth");
const FarmerAuth = require("./routes/auth/farmer/auth");
const BuyerAuth = require("./routes/auth/buyer/auth");
const BuyerRoute = require("./routes/users/buyer");
const FarmerRoute = require("./routes/users/farmer");
const FarmerProduceRoute = require("./routes/farmerproduce/FarmerProduce");
const AllProduceRoute = require("./routes/farmerproduce/AllProduce");
const VisitorsRoute = require("./routes/users/visitor");
const RatingsRoute = require("./routes/farmerrating/farmerrating");
const NotificationsRoute = require("./routes/notifications/notifications");
const FarmerSpecificsRoute = require("./routes/farmerspecifics/farmerspecifics");
const CartRoute = require("./routes/cart/cart");
const BidRoute = require("./routes/notifications/biditem");
const InserminateRoute = require("./routes/inserminate");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected to the backend successfully");
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use(errors.notFound);
// app.use(errors.generalErrorHandler);

// Upload image to s3 bucket
let s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
  } else {
    try {
      return res
        .status(200)
        .json({ message: "File uploaded successfully", file: req.file });
    } catch (error) {
      return console.error(error);
    }
  }
});

// Retrieve image from the s3 bucket
async function getImage(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const data = await s3.getObject(params).promise();
  return data.Body;
}

app.use("/image/:key", async (req, res) => {
  const image = await getImage(process.env.S3_BUCKET_NAME, req.params.key);
  res.status(200).json(image);
});

app.use("/api/auth/admin", AuthRoute);
app.use("/api/auth/farmer", FarmerAuth);
app.use("/api/auth/buyer", BuyerAuth);
app.use("/api/users/buyer", BuyerRoute);
app.use("/api/users/farmer", FarmerRoute);
app.use("/api/farmerproduce", FarmerProduceRoute);
app.use("/api/allproduce", AllProduceRoute);
app.use("/api/visitors", VisitorsRoute);
app.use("/api/ratings", RatingsRoute);
app.use("/api/cart", CartRoute);
app.use("/api/notifications", NotificationsRoute);
app.use("/api/farmerspecifics", FarmerSpecificsRoute);
app.use("/api/biditem", BidRoute);
app.use("/api/inserminate", InserminateRoute);

// Start the backend server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is listening at port ${PORT}`);
});
