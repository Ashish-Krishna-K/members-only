"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = require("../controllers/messagesController");
const router = express_1.default.Router();
router.get('/', messagesController_1.getIndex);
router.get('/:id/delete', messagesController_1.getDeleteMessage);
router.post('/:id/delete', messagesController_1.postDeleteMessage);
router.get('/create', messagesController_1.getCreateMessage);
router.post('/create', messagesController_1.postCreateMessage);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL21lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDBFQU0yQztBQUMzQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDZCQUFRLENBQUMsQ0FBQztBQUUxQixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxxQ0FBZ0IsQ0FBQyxDQUFDO0FBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLHNDQUFpQixDQUFDLENBQUM7QUFFOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUscUNBQWdCLENBQUMsQ0FBQztBQUV4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQ0FBaUIsQ0FBQyxDQUFDO0FBRTFDLGtCQUFlLE1BQU0sQ0FBQyJ9