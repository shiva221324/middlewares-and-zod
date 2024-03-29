const express = require("express");
const app = express();
const path = require("path");
// to add inbuilt middleware we use app.use(middleware)

// it is used to add req.body as json data
app.use(express.json());

// To increase the security of your application,
// consider using middleware such as ‘helmet’ to set security-related HTTP headers

const helmet = require("helmet");
app.use(helmet());

//It is middleware to server the static files
//app.use(express.static("public"));
//console.log(path.join(__dirname, "public"));

//app.use("/static", express.static("public"));

const port = 8080;
app.listen(port, () => {
  console.log("backend connected");
});
// app.get("/", (req, res) => {
//   res.send("hai hello namaste");
// });

//another way without using static
// we have to provide complete path to use this way
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
