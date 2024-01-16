const Router = require("express");
const UserController = require("../controllers/userController");
const router = new Router();
const { body } = require("express-validator");
const authMIddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/", authMIddleware, userController.getAll);
router.post("/user/validate_pass", authMIddleware, userController.validatePassword);
router.post("/user/change_data", authMIddleware, userController.changeData);
router.post("/user/change_pass", authMIddleware, userController.changePass);

module.exports = router;
