require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

//connect to DB
connectDB();

//start server
app.listen(PORT, () => {
  console.log(`server listeing on ${PORT}`);
});
