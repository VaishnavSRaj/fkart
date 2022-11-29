const express = require("express");
const app = express()
const { connectToDb, getDb } = require("../config/dbconnection");
const objectId = require("mongodb").ObjectId;
const fileUpload = require('express-fileupload');
const { response } = require("express");
const { all } = require("../routes/Admin-routes");


app.use(fileUpload())


let db;
connectToDb(() => {
  db = getDb();
});

//admin validation and login

const adminValidation = (req, res) => {
  return new Promise(async(resolve,reject)=>{
    let jan =await db.collection('orders').find({ month: 0 }).count()
    let feb =await db.collection('orders').find({ month: 1 }).count()
    let march =await db.collection('orders').find({ month: 2 }).count()
    let april =await db.collection('orders').find({ month: 3 }).count()
    let may =await db.collection('orders').find({ month: 4 }).count()
    let june =await db.collection('orders').find({ month: 5 }).count()
    let july =await db.collection('orders').find({ month: 6 }).count()
    let aug = await db.collection('orders').find({ month: 7 }).count()
    let sept =await db.collection('orders').find({ month: 8 }).count()
    let oct = await db.collection('orders').find({ month: 9 }).count()
    let nov =await db.collection('orders').find({ month: 10 }).count()
    let dec =await db.collection('orders').find({ month: 11}).count()
    let totalOrders = await db.collection('orders').find().count()
    let totalProducts = await db.collection('products').find().count()
    
    let { addemail, addpass } = req.body;
  console.log("validating login");
  console.log(req.body);
  if (addemail == "" || addpass == "") {
    res.render("adminlogin2", { Message: "Input field cannot be empty*" });
  } else if (addemail) {
    password = addpass;
    Email = addemail;
   await db.collection("Admin")
      .findOne({ Email: addemail })
      .then((ress) => {
        console.log("checking exist");
        let data = ress;
        let passcheck = data.Password;

        console.log(passcheck);

        if (addpass == passcheck) {
          console.log("loggedin3 ");
          res.render("adminDashboard",{jan,feb,march,april,may,june,july,aug,sept,oct,nov,dec,totalOrders,totalProducts});
        } else {
          res.render("adminlogin2", {
            Message: "Please Check Your Password",
            title: "password",
          });
        }
        console.log("loggedin2");
      })
      .catch((rej) => {
        console.log("user doesn't exist");
        res.render("login", { title: "user doesn't exists" });
      });
  }
  })
  
};

const adminlogin = (req, res) => {
  res.render("adminlogin");
};

//Rendering Products

const products = (req, res) => {
  if(req.session.user){
    const userId = req.session.user._id
  const products = [];
  db.collection("products")
    .find()
    .forEach((Name) => products.push(Name))
    .then(() => {
      db.collection("cart")
        .findOne({ user: objectId(userId) })
        .then((resolve) => {
          console.log(resolve, 'this is redllk')
          res.render("products", {name : req.session.user.firstname, products, cart: resolve , id : req.session.user._id});
        })
      
    })
    .catch(() => {
      console.log("failed to load");
    });
  }else{
    db.collection('products').find().toArray().then((products)=>{
      console.log("nnnj0")
      const cart = null
      res.render("products", { products, cart});
    })
  }
  
  
};

const addproduct = (req, res) => {
  return new Promise(async(resolve,reject)=>{
    let category = await db.collection('category').find().toArray()
    let subcategory = await db.collection('subcategory').find().toArray()

    console.log(category)
    console.log(subcategory)
    if(category){
      res.render("addProduct",{category,subcategory});
    }else{
      res.render("addProduct");
    }
  })
};

const admin = (req, res) => {
  return new Promise(async(resolve,reject)=>{
    let jan =await db.collection('orders').find({ month: 0 }).count()
    let feb =await db.collection('orders').find({ month: 1 }).count()
    let march =await db.collection('orders').find({ month: 2 }).count()
    let april =await db.collection('orders').find({ month: 3 }).count()
    let may =await db.collection('orders').find({ month: 4 }).count()
    let june =await db.collection('orders').find({ month: 5 }).count()
    let july =await db.collection('orders').find({ month: 6 }).count()
    let aug = await db.collection('orders').find({ month: 7 }).count()
    let sept =await db.collection('orders').find({ month: 8 }).count()
    let oct = await db.collection('orders').find({ month: 9 }).count()
    let nov =await db.collection('orders').find({ month: 10 }).count()
    let dec =await db.collection('orders').find({ month: 11}).count()
    console.log(oct,nov,dec);
    // res.render("adminDashboard",{jan,feb,march,april,may,june,july,aug,sept,oct,nov,dec});
    res.render("adminlogin2",{jan,feb,march,april,may,june,july,aug,sept,oct,nov,dec});

  })
};

const dashboard = (req, res) => {
  return new Promise(async(resolve,reject)=>{
    let jan =await db.collection('orders').find({ month: 0 }).count()
    let feb =await db.collection('orders').find({ month: 1 }).count()
    let march =await db.collection('orders').find({ month: 2 }).count()
    let april =await db.collection('orders').find({ month: 3 }).count()
    let may =await db.collection('orders').find({ month: 4 }).count()
    let june =await db.collection('orders').find({ month: 5 }).count()
    let july =await db.collection('orders').find({ month: 6 }).count()
    let aug = await db.collection('orders').find({ month: 7 }).count()
    let sept =await db.collection('orders').find({ month: 8 }).count()
    let oct = await db.collection('orders').find({ month: 9 }).count()
    let nov =await db.collection('orders').find({ month: 10 }).count()
    let dec =await db.collection('orders').find({ month: 11}).count()
    console.log(oct,nov,dec);
    res.render("adminDashboard",{jan,feb,march,april,may,june,july,aug,sept,oct,nov,dec});
  })

};

//Adding Products

const addproductfn = (req, res) => {
  console.log(req.body);
  let image1 = req.files.image1;
  db.collection("products").insertOne(req.body).then((response) => {
    console.log(response);
    let id = response.insertedId;
    image1.mv("./public/product-images/" + id + ".jpg");
    console.log(response);
    res.redirect("addProduct");
  });
};

//User List

const userlist = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.collection("userdata").find().toArray();
    res.render("userlist", { user });
  });
};

//Product List

const productlist = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let product = await db.collection("products").find().toArray();

    res.render("productList", { product });
  })
  
  
};

//Delete Product

const deleteProduct = (req, res) => {
  let productId = req.params.id;
  console.log(productId);
  db.collection("products")
    .updateOne({ _id: objectId(productId) }, { $set: { status: false } })
    .then((response) => {
      console.log(response);
      if (response) {
        res.redirect("/productlist");
      }
    });
};

//active Product

const activeProduct = (req, res) => {
  let productId = req.params.id;
  console.log(productId);
  db.collection("products")
    .updateOne({ _id: objectId(productId) }, { $set: { status: true } })
    .then((response) => {
      console.log(response);
      if (response) {
        res.redirect("/productlist");
      }
    })
};

const editProduct = (req, res) => {
  let id = req.params.id;

      return new Promise(async(resolve,reject)=>{
        try{
            let products =await db.collection('products').findOne({ _id: objectId(id) })

    let category = await db.collection('category').find().toArray()
    let subcategory = await db.collection('subcategory').find().toArray()
    console.log(products);
    res.render("Edit-Product", { products ,category,subcategory});
        }catch(err){
          res.redirect("/404")
        }

  })

  

 
  // db.collection('products').findOne({ _id: objectId(id) }).then((products) => {
  //   console.log("Suii pro");
    
  //   res.render("Edit-Product", { products });
  // })
};


const blockUser = (req, res) => {
  console.log("blocking working")
  let id = req.params.id
  db.collection('userdata').updateOne({ _id: objectId(id) }, { $set: { blocked: true } }).then((response) => {
    console.log(response);
    res.redirect("/userlist")
  })
}


const unblockUser = (req, res) => {
  console.log("Unblocking working")
  let id = req.params.id
  console.log(id);
  db.collection('userdata').updateOne({ _id: objectId(id) }, { $set: { blocked: false } }).then((response) => {
    console.log(response);
    res.redirect("/userlist")
  })
}


const editProductFn = (req, res) => {
  console.log("Edit Fn Working")
  let id = req.params.id;
  console.log(id);
  console.log(req.body);
  db.collection('products').updateOne({ _id: objectId(id) }, {
    $set: {
      Name: req.body.Name,
      Stocks: req.body.Stocks,
      newPrice: req.body.newPrice,
      description: req.body.description
    }
  }).then((response) => {
    console.log(response);
    res.redirect('/productList')
  })

}



const coupon=(req,res)=>{
  res.render("Coupon")
}


// const addCoupon = (req, res) => {
//   let couponData = req.body;

//   db.collection('coupon').insertOne(couponData).then((response) => {

//     console.log(response);
//     res.redirect("/admin/add-coupen")

//   })
// }






// const getCouponDetails = (req, res) => {

//   let couponDetails = db.collection('coupon').find().toArray()
//   resolve(couponDetails);
//   console.log("coupon dta here")
//   console.log(coupenDetails)
//   res.render('admin/coupon', { admin: true, couponDetails })
// }






// const deleteCoupon = (req, res) => {
//   let couponId = req.params.id;
//   console.log(coupenId)
//   db.collection('coupon').deleteOne({ _id: objectId(couponId) }).then((response) => {
//     console.log(response)
//   })
//   res.redirect("/admin/coupons");
// }

const addCategory=(req,res)=>{
  res.render("addCategory")
}

const postCategory=(req,res)=>{
  let category=req.body.category
  db.collection("category").insertOne({maincategory: category }).then((response) => {
    console.log(response);
    if (response){
      res.redirect("addCategory")
    }
 console.log(req.body.category);})
}

const addSubCategory=(req,res)=>{
  res.render("addSubCategory")
}

const postSubCategory=(req,res)=>{
  let subcategory=req.body.subcategory
  db.collection("subcategory").insertOne({sub: subcategory }).then((response) => {
    console.log(response);
    if (response){
      res.redirect("addSubCategory")
    }
 console.log(req.body.subcategory);})
}


const adminOrders=(req,res)=>{
  return new Promise(async (resolve, reject) => {
    let allOrders = await db.collection('orders').find().toArray()
    resolve(allOrders);
    console.log('orders here',allOrders);
    res.render('adminOrders', {allOrders})
})
}


const orderpacking=(req,res)=>{
  const orderId = req.query.id
  console.log("order id here",orderId);
  return new Promise(async(resolve, reject) => {
   let response=await db.collection('orders').updateOne({ _id: objectId(orderId) }, { $set: { status: 'Packing' } })
   res.redirect('adminOrders')
})
}

const orderShipped=(req,res)=>{
  const orderId = req.query.id
  console.log("order id here",orderId);
  return new Promise(async(resolve, reject) => {
   let response=await db.collection('orders').updateOne({ _id: objectId(orderId) }, { $set: { status: 'Shipped' } })
   res.redirect('adminOrders')
})
}



const orderDelivered=(req,res)=>{
  const orderId = req.query.id
  console.log("order id here",orderId);
  return new Promise(async(resolve, reject) => {
   let response=await db.collection('orders').updateOne({ _id: objectId(orderId) }, { $set: { status: 'Delivered' } })
   res.redirect('adminOrders')
})
}

const salesReport=(req,res)=>{
  return new Promise(async (resolve, reject) => {
    let allOrders = await db.collection('orders').aggregate([{
        $lookup: {
            from: 'userdata',
            localField: 'userId',
            foreignField: '_id',
            as: 'users'
        }
    },
    {
        $lookup: {
            from: 'products',
            localField: 'products.item',
            foreignField: '_id',
            as: 'product'
        }
    }
    ]).toArray()
    resolve(allOrders);
    console.log('suiii')
    console.log(allOrders)
    res.render('salesReport', {allOrders})
})
}









module.exports = {
  adminValidation,
  adminlogin,
  products,
  addproduct,
  admin,
  dashboard,
  addproductfn,
  userlist,
  productlist,
  deleteProduct,
  editProduct,
  blockUser,
  unblockUser,
  editProductFn,
  activeProduct,
  coupon,
  addCategory,
  postCategory,
  addSubCategory,
  postSubCategory,
  adminOrders,
  orderpacking,
  orderShipped,
  orderDelivered,
  salesReport
};
