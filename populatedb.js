"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config.js");
var mongoose_1 = require("mongoose");
var userModels_1 = require("./src/models/userModels");
var messageModels_1 = require("./src/models/messageModels");
mongoose_1.default.set('strictQuery', false);
function connectToDb() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!process.env.MONGODB_URI) return [3 /*break*/, 2];
                    console.log('connecting to db...');
                    return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGODB_URI)];
                case 1:
                    _a.sent();
                    console.log('connected to db');
                    return [3 /*break*/, 3];
                case 2: throw new Error('A URI to the database is not found. Please add a URI to the MONGODB_URI environment variable');
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var guestUser = new userModels_1.default({
    firstName: 'guest',
    lastName: 'user',
    email: 'guest.user@email.com',
    hashedPassword: 'password',
});
var memberUser = new userModels_1.default({
    firstName: 'member',
    lastName: 'user',
    email: 'member.user@email.com',
    hashedPassword: 'password',
    isMember: true,
});
var adminUser = new userModels_1.default({
    firstName: 'admin',
    lastName: 'user',
    email: 'admin.user@email.com',
    hashedPassword: 'password',
    isMember: true,
    isAdmin: true,
});
var addToDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var guest, guestMessage, member, memberMessage, admin, adminMessage, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, guestUser.save()];
            case 1:
                guest = _a.sent();
                console.log('guest created');
                guestMessage = new messageModels_1.default({
                    _title: 'Message from guest',
                    text: 'This is a test',
                    createdBy: guest.id,
                });
                guestMessage.save();
                console.log('added a message from guest');
                return [4 /*yield*/, memberUser.save()];
            case 2:
                member = _a.sent();
                memberMessage = new messageModels_1.default({
                    _title: 'Message from member',
                    text: 'This is a test',
                    createdBy: member.id,
                });
                console.log('member created');
                memberMessage.save();
                console.log('added a message from member');
                return [4 /*yield*/, adminUser.save()];
            case 3:
                admin = _a.sent();
                console.log('admin created');
                adminMessage = new messageModels_1.default({
                    _title: 'Message from admin',
                    text: 'This is a test',
                    createdBy: admin.id,
                });
                adminMessage.save();
                console.log('added a message from admin');
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
connectToDb();
addToDb();
