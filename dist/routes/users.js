"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
router.get('/signup', usersController_1.getSignup);
router.post('/signup', usersController_1.postSignup);
router.get('/login', usersController_1.getLogin);
router.post('/login', usersController_1.postLogin);
router.get('/logout', usersController_1.getLogout);
router.post('/logout', usersController_1.postLogout);
router.get('/membersignup', usersController_1.getMembershipSignup);
router.post('/membersignup', usersController_1.postMembershipSignup);
router.get('/adminsignup', usersController_1.getAdminSignup);
router.post('/adminsignup', usersController_1.postAdminSignup);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL3VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLG9FQVd3QztBQUN4QyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLDJCQUFTLENBQUMsQ0FBQztBQUVqQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw0QkFBVSxDQUFDLENBQUM7QUFFbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsMEJBQVEsQ0FBQyxDQUFDO0FBRS9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLDJCQUFTLENBQUMsQ0FBQztBQUVqQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNEJBQVUsQ0FBQyxDQUFDO0FBRW5DLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLHFDQUFtQixDQUFDLENBQUM7QUFFakQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsc0NBQW9CLENBQUMsQ0FBQztBQUVuRCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxnQ0FBYyxDQUFDLENBQUM7QUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsaUNBQWUsQ0FBQyxDQUFDO0FBRTdDLGtCQUFlLE1BQU0sQ0FBQyJ9