const router = require("express").Router()
const activateController = require("../controllers/activate-controller")
const authController = require("../controllers/auth-controller")
const isAuth = require("../middlewares/isAuth")

router.post("/send-otp",authController.sendOtp)
router.post("/verify-otp",authController.verifyOtp)
router.post("/activate",isAuth, activateController.activate)
router.get("/refresh", authController.refresh)

module.exports = router