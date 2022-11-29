const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.use(express.urlencoded({ extended: true }));

router.get("/adminlogin", adminController.adminlogin);

router.get("/products", adminController.products);

router.get("/addproduct", adminController.addproduct);

router.get("/admin", adminController.admin);

router.get("/dashboard", adminController.dashboard);

router.get("/productlist", adminController.productlist);

router.get("/delete-product/:id", adminController.deleteProduct);

router.get("/active-product/:id", adminController.activeProduct);

router.get("/userlist", adminController.userlist);

router.post("/addproduct", adminController.addproductfn);

router.post("/admin", adminController.adminValidation);

router.get("/edit-product/:id", adminController.editProduct);

router.get("/block-user/:id",adminController.blockUser)

router.get("/unblock-user/:id",adminController.unblockUser)

router.post("/edit-product/:id",adminController.editProductFn);

// router.post("/add-coupon",adminController.addCoupon)

router.get("/Coupon",adminController.coupon)

// router.get('/coupons',adminController.getCouponDetails)

// router.get("/delete-coupon/:id",adminController.deleteCoupon)

router.get("/addCategory",adminController.addCategory)

router.post("/addCategory",adminController.postCategory)

router.get("/addSubCategory",adminController.addSubCategory)

router.post("/addSubCategory",adminController.postSubCategory)

router.get("/adminOrders",adminController.adminOrders)

router.get('/orderPacking',adminController.orderpacking)

router.get('/orderShipped',adminController.orderShipped)

router.get('/orderDelivered',adminController.orderDelivered)

router.get('/salesReport',adminController.salesReport)

module.exports = router;
