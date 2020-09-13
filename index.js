const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const user = require("./routes/user");
const stories = require("./routes/stories");

const app = express();
app.use(cors());

//body parser for middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DB config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

//Server routes
app.use("/api/user", user);
app.use("/api/stories", stories);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
