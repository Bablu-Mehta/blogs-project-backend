const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

//rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

//routes
// app.use("/api/posts");
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
