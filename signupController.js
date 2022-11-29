const { render } = require("ejs");
var {connectToDb,getDb} = require('../config/connection')

let db;
connectToDb(() =>{
    db = getDb()
})

//signup

const signupPage = (req ,res) => {
    res.render('sign-up',{title:'Signup' , link:'login'})
}

//sign-up validation

const signupValidation = (req ,res) =>{

    var emails = req.body.email;
    const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // res.render('sign-up',{value:'success'});
    if(req.body.firstname==""||req.body.lastname==""||req.body.email==""||req.body.passone==""||req.body.passtwo==""){
        console.log('input box empty');
        res.render('sign-up',{passtwo:'Input box cannot be empty',title:'Login'})

    }else if (!emails.match(re)) {
        res.render('sign-up',{email:'Please enter a valid email'});        
    }else if(req.body.passone!=req.body.passtwo){
        res.render('sign-up',{passtwo:'Passwords must be the same'}); 
    }else{
        
    // checking for exist
    db.collection('users')
    .findOne({email:emails})
    .then ((resolve) => {
        console.log(resolve ,'this is the resolve')
        if(resolve.email == emails){
            //if exists

            res.render('sign-up',{passtwo:'This email is already exists'}); 
        }

    })
    .catch((rej) => {

        // if doesn't  exists
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let password = req.body.passone
        console.log('sign-up completed')
        db.collection('users')
        .insertOne({firstname:firstname , lastname:lastname , email:email , password:password})
        .then(result => {
            res.render('sign-up',{title:'Signup',value:'success',link:'Login'})
        }).catch(err =>{
            res.status(500).json({error:"Could not create a 1 new document"})
        })
    })  
    };

};
module.exports = {
    signupPage,
    signupValidation
}