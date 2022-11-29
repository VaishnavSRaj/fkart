const express = require("express");
const app = express();
const twilio = require("twilio");
const session = require("express-session");
const fileUpload = require('express-fileupload');
const { connectToDb, getDb } = require("./config/dbconnection");
const AdminRouter = require("./routes/Admin-routes");

const loginRouter = require("./routes/login-routes");

const signupRouter = require("./routes/signup-routes");

require('dotenv').config()






let db;
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
    db = getDb();
  }
});

app.use(
  session({
    secret: "key",
    cookie: { key: "secret", maxAge: 86400000 },
    resave: true,
    saveUninitialized: true
  })
);





app.use(function (req, res, next) {
  res.set(
    "cache-control",
    "no-cache , no-store,must-revalidate,max-stale=0,post-check=0,pre-checked=0"
  );
  next();
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());


app.use(express.urlencoded({ extended: true }));

app.use(AdminRouter);
app.use(loginRouter);
app.use(signupRouter);


const port = 3000;

app.use((req, res) => {
  res.status(404).render("404");
})



//otp verification




