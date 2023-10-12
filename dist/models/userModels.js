"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const helpers_1 = require("../helpers");
const Schema = mongoose_1.default.Schema;
const UsersSchema = new Schema({
    firstName: { type: String, lowercase: true, required: true },
    lastName: { type: String, lowercase: true, required: true },
    email: { type: String, lowercase: true, required: true },
    hashedPassword: { type: String, required: true },
    isMember: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
});
UsersSchema.virtual('fullName').get(function () {
    return `${(0, helpers_1.capitalize)(this.firstName)} ${(0, helpers_1.capitalize)(this.lastName)}`;
});
UsersSchema.virtual('url').get(function () {
    return `/users/${this.id}`;
});
exports.default = mongoose_1.default.model('Users', UsersSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlck1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlck1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUEwRDtBQUMxRCx3Q0FBd0M7QUFFeEMsTUFBTSxNQUFNLEdBQUcsa0JBQVEsQ0FBQyxNQUFNLENBQUM7QUFFL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDN0IsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDNUQsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDM0QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDeEQsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ2hELFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtJQUMzQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7Q0FDM0MsQ0FBQyxDQUFDO0FBRUgsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDbEMsT0FBTyxHQUFHLElBQUEsb0JBQVUsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBQSxvQkFBVSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDO0FBRUgsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDN0IsT0FBTyxVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQztBQU9ILGtCQUFlLGtCQUFRLENBQUMsS0FBSyxDQUFhLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyJ9