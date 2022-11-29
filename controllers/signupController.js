const express = require("express");
const app = express();
const { connectToDb, getDb } = require("../config/dbconnection");






let db;
connectToDb(() => {
  db = getDb();
});

const signupValidation = (req, res) => {
  console.log("phone number here");
  console.log(req.body.phonenumber);
  var emails = req.body.email;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // res.render('sign-up',{value:'success'});
  if (
    req.body.firstname == "" ||
    req.body.lastname == "" ||
    req.body.email == "" ||
    req.body.passone == "" ||
    req.body.passtwo == "" ||
    req.body.phonenumber == ""
  ) {
    console.log("input box empty");
    res.render("signUp", {
      Message: "Input box cannot be empty",
      title: "Login",
    });
  } else if (!emails.match(re)) {
    res.render("signUp", { email: "Please enter a valid email" });
  } else if (req.body.passone != req.body.passtwo) {
    res.render("signUp", { Message: "Passwords must be the same" });
  } else {
    // checking for exist
    db.collection("userdata")
      .findOne({ email: emails }) //checking email is exist in the document
      .then((resolve) => {
        console.log(resolve, "this is the resolve");
        if (resolve.email == emails) {
          //if exists

          res.render("signUp", { Message: "This email is already exists" });
        }
      })
      .catch((rej) => {
        // if doesn't  exists
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let password = req.body.passone;
        let phonenumber = req.body.phonenumber;
        console.log(password);
        console.log("sign-up completed");
        db.collection("userdata")
          .insertOne({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phonenumber: phonenumber,
          })
          .then((result) => {
            res.render("signUp", { Message: "successfull" });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({ error: "Could not create a 1 new document" });
          });
      });
  }
};

const signup = (req, res) => {
  res.render("signUp");
};

module.exports = {
  signupValidation,
  signup,
};
