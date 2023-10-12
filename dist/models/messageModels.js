"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const helpers_1 = require("../helpers");
const Schema = mongoose_1.default.Schema;
const MessagesSchema = new Schema({
    _title: { type: String, lowercase: true, required: true },
    text: { type: String, lowercase: true, required: true },
    timeStamp: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
});
MessagesSchema.virtual('title').get(function () {
    return this._title.split(' ').map(helpers_1.capitalize).join();
});
MessagesSchema.virtual('url').get(function () {
    return `/users/${this.id}`;
});
exports.default = mongoose_1.default.model('Messages', MessagesSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvbWVzc2FnZU1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUEwRDtBQUMxRCx3Q0FBd0M7QUFFeEMsTUFBTSxNQUFNLEdBQUcsa0JBQVEsQ0FBQyxNQUFNLENBQUM7QUFFL0IsTUFBTSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDaEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDekQsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdkQsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUM1QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0NBQ3pFLENBQUMsQ0FBQztBQUVILGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2xDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLG9CQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2hDLE9BQU8sVUFBVSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFPSCxrQkFBZSxrQkFBUSxDQUFDLEtBQUssQ0FBZ0IsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDIn0=