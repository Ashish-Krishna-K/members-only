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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteMessage = exports.getDeleteMessage = exports.postCreateMessage = exports.getCreateMessage = exports.getIndex = void 0;
const messageModels_1 = __importDefault(require("../models/messageModels"));
const express_validator_1 = require("express-validator");
// Index controller for home page
const getIndex = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMessages = yield messageModels_1.default.find().populate('createdBy', 'firstName lastName').exec();
        res.render('index', {
            title: 'Home',
            messages: allMessages,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.getIndex = getIndex;
// Add a new message - GET route controller
const getCreateMessage = (req, res) => {
    // The user is not currently logged in, redirect to login page.
    if (typeof req.user === 'undefined')
        res.redirect('/users/login');
    res.render('messagesForm', {
        title: 'Add a message',
    });
};
exports.getCreateMessage = getCreateMessage;
// Add a new message - POST route controller
exports.postCreateMessage = [
    (0, express_validator_1.body)('title').trim().notEmpty().withMessage('Title is required').escape(),
    (0, express_validator_1.body)('text').trim().notEmpty().withMessage('Text is required').escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // The user is not currently logged in, redirect to login page.
        if (typeof req.user === 'undefined')
            res.redirect('/users/login');
        const errors = (0, express_validator_1.validationResult)(req);
        const formData = {
            title: req.body.title,
            text: req.body.text,
        };
        if (!errors.isEmpty()) {
            // errors are present
            res.render('messagesForm', {
                title: 'Add a message',
                formData,
                errors: errors.array(),
            });
        }
        else {
            // no errors, update database
            try {
                const message = new messageModels_1.default({
                    _title: formData.title,
                    text: formData.text,
                    createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                });
                yield message.save();
                res.redirect('/');
            }
            catch (error) {
                return next(error);
            }
        }
    }),
];
// Delete a message - GET route controller
const getDeleteMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield messageModels_1.default.findById(req.params.id).populate('createdBy', 'firstName lastName').exec();
        if (!message) {
            // message not found, nothing to delete, simply redirect user to home page.
            res.redirect('/');
        }
        res.render('messageDelete', {
            title: 'Delete Message',
            message,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.getDeleteMessage = getDeleteMessage;
// Delete a message - POST route controller
const postDeleteMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield messageModels_1.default.findByIdAndDelete(req.body.id).exec();
        // In case we were not able to find the message then there's nothing to delete.
        res.redirect('/');
    }
    catch (error) {
        return next(error);
    }
});
exports.postDeleteMessage = postDeleteMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL21lc3NhZ2VzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0RUFBOEM7QUFDOUMseURBQTJEO0FBRTNELGlDQUFpQztBQUMxQixNQUFNLFFBQVEsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ2hGLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLHVCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEtBQUssRUFBRSxNQUFNO1lBQ2IsUUFBUSxFQUFFLFdBQVc7U0FDdEIsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFWVyxRQUFBLFFBQVEsWUFVbkI7QUFFRiwyQ0FBMkM7QUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUM5RCwrREFBK0Q7SUFDL0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssV0FBVztRQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7UUFDekIsS0FBSyxFQUFFLGVBQWU7S0FDdkIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBTlcsUUFBQSxnQkFBZ0Isb0JBTTNCO0FBRUYsNENBQTRDO0FBQy9CLFFBQUEsaUJBQWlCLEdBQUc7SUFDL0IsSUFBQSx3QkFBSSxFQUFDLE9B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