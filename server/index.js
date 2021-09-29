const express = require("express");
const notes = require("./routes/notes");
const mongoose = require("mongoose");
const app = express();
const users = require("./routes/users");
const auth = require("./routes/auth");
const cors = require("cors");
const xss = require("xss-clean");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost/notedown")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(xss());
//Allow cross-origin requests for trusted origins
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));

//Parse the body of the request to JSON using a middleware express.json()
app.use(express.json());

app.use("/api/notes", notes);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("NoteDown API");
});

//PORT
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
