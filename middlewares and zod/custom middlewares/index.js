const express = require("express");
const app = express();
app.use(express.json());
app.listen(8080, () => {
  console.log("Backend is connected");
});

//ugly version

app.get("/healthcheck", (req, res) => {
  // http://localhost:8080/healthcheck?kidneyno=2
  const kidneyno = req.query.kidneyno;

  //using headers (we can use query or req.body by using post ,mmethod)
  const username = req.headers.username;
  const password = req.headers.password;

  // if we want to go checkup we must pass the following conditions
  //user checks
  //here we can use functions for reuse purpose if any route requires user checks
  if (username != "kumar" || password != "pass") {
    return res.status(404).json({
      success: false,
      message: "your details are incorrect you don't have chance to go checkup",
    });
  }
  //input  checks
  //here we can use functions for reuse purpose if any route requires input checks
  if (kidneyno != 1 && kidneyno != 2) {
    return res.status(404).json({
      success: false,
      message:
        "you should enter correct details you don't have chance to go checkup",
    });
  }

  // if both are correct we can go checkup
  // do something
  res.status(200).json({
    success: true,
    message: "checkup done",
  });
});

// middleware version
// it optimal version

const userMiddleware = (req, res, next) => {
  //we can pass data from this callback function to anothe callback function by this way (using request method)
  req.name = "venkat";
  const username = req.headers.username;
  const password = req.headers.password;
  if (username != "kumar" || password != "pass") {
    return res.status(404).json({
      success: false,
      message: "your details are incorrect you don't have chance to go checkup",
    });
  }
  // we will go to next callback function by using next method
  next();
};

const kidneyMiddleware = (req, res, next) => {
  // we can access data which were passed by previous callback function by this way
  console.log(req.name);
  const kidneyno = req.query.kidneyno;
  if (kidneyno != 1 && kidneyno != 2) {
    return res.status(404).json({
      success: false,
      message:
        "you should enter correct details you don't have chance to go checkup",
    });
  }
  next();
};

// we can give callback function as many as we requried
app.get("/healthcheck1", userMiddleware, kidneyMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "checkup done",
  });
});
