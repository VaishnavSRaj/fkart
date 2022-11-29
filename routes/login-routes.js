const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");





router.get("/", loginController.checkforlogin);

router.get("/login", loginController.login);


// router.get("/home", loginController.home);

router.get("/category", loginController.category);

router.get("/wishlist", loginController.wishlist);

router.get("/contactus", loginController.contactus);

router.get("/otp", loginController.otp);

router.get("/userhome", loginController.userhome);

router.get("/logout", loginController.logout);

router.post("/validate", loginController.loginValidation);

router.post("/otp", loginController.otpFn);

router.post("/verifyOtp", loginController.verifyOtp);

router.get("/mobnum", loginController.mobnum);

router.get("/add-to-cart/:id", loginController.addToCart);

router.get("/userprofile",loginController.userProfile)

router.get("/cart", loginController.getCartProducts);

router.get("/getCartProducts",loginController.getCartProducts)

router.get("/productDetails", loginController.productDetails)

router.get("/removeCartItems/:id", loginController.removeCartItems)

router.post("/checkout", loginController.checkout)

// router.post("/placeOrder", loginController.placeOrder)

router.post('/changequantity', loginController.changeQuantity)

router.get('/orderSuccess',loginController.OrderSuccess)

router.get('/orders',loginController.orderManagement)

router.get("/add-to-wishlist/:id", loginController.addToWishlist);

router.get("/get-wishlist-items",loginController.getWishList)

// router.get("/cancelOrder",loginController.cancelOrder)

router.post("/payment",loginController.payment)

router.post("/verifypayment",loginController.verifypayment)

router.post("/applyoffer",loginController.offerApply)

router.get('/mensOnly',loginController.mensOnly);

router.get('/womensOnly',loginController.womensOnly);

router.get('/kidsOnly',loginController.kidsOnly);

router.get('/editprofile',loginController.editUser)

router.post('/editprofile',loginController.editprofile)

router.post('/search',loginController.search)

router.get('/cancelorder',loginController.cancelOrder)

router.get('/showcoupon',loginController.showcoupon)



router.get('/logout',loginController.logout)













module.exports = router;
