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
exports.postAdminSignup = exports.getAdminSignup = exports.postMembershipSignup = exports.getMembershipSignup = exports.postLogout = exports.getLogout = exports.postLogin = exports.getLogin = exports.postSignup = exports.getSignup = exports.authenticateUser = exports.deserializeFunction = void 0;
const express_validator_1 = require("express-validator");
const userModels_1 = __importDefault(require("../models/userModels"));
const bcryptjs_1 = require("bcryptjs");
const passport_1 = __importDefault(require("passport"));
const deserializeFunction = (id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
exports.deserializeFunction = deserializeFunction;
const authenticateUser = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels_1.default.findOne({ email: email }).exec();
        if (!user)
            return done(null, false, { message: 'Email not found' });
        const matchPassword = yield (0, bcryptjs_1.compare)(password, user.hashedPassword);
        if (!matchPassword)
            return done(null, false, { message: 'Incorrect Password' });
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
});
exports.authenticateUser = authenticateUser;
const getSignup = (req, res) => {
    res.render('signupForm', {
        title: 'Sign up',
    });
};
exports.getSignup = getSignup;
exports.postSignup = [
    (0, express_validator_1.body)('firstName').trim().notEmpty().withMessage('First name is required').escape(),
    (0, express_validator_1.body)('lastName').trim().notEmpty().withMessage('Last name is required').escape(),
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be of format you@email.com')
        .escape(),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long')
        .matches(/[a-z]+/g)
        .withMessage('Password must have atleast 1 lowercase character')
        .matches(/[A-Z]+/g)
        .withMessage('Password must have atleast 1 uppercase character')
        .matches(/[0-9]+/g)
        .withMessage('Password must have atleast 1 numerical digit')
        .matches(/[!@#$%^&*\-_+=|\\:;"'<,>.?/]+/g)
        .withMessage('Password must have atleast 1 special character')
        .escape(),
    (0, express_validator_1.body)('confirmPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long')
        .matches(/[a-z]+/g)
        .withMessage('Password must have atleast 1 lowercase character')
        .matches(/[A-Z]+/g)
        .withMessage('Password must have atleast 1 uppercase character')
        .matches(/[0-9]+/g)
        .withMessage('Password must have atleast 1 numerical digit')
        .matches(/[!@#$%^&*\-_+=|\\:;"'<,>.?/]+/g)
        .withMessage('Password must have atleast 1 special character')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match')
        .escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        };
        if (!errors.isEmpty()) {
            res.render('signupForm', {
                title: 'Sign up',
                formData,
                errors: errors.array(),
            });
        }
        else {
            try {
                const hashedPassword = yield (0, bcryptjs_1.hash)(formData.password, 16);
                const user = new userModels_1.default({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    hashedPassword,
                });
                yield user.save();
                res.redirect('/');
            }
            catch (error) {
                return next(error);
            }
        }
    }),
];
const getLogin = (req, res) => {
    res.render('loginForm', {
        title: 'Login',
        errors: req.session.messages,
    });
};
exports.getLogin = getLogin;
exports.postLogin = [
    (0, express_validator_1.body)('email').trim().notEmpty().withMessage('Email is needed').escape(),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('Password is needed').escape(),
    passport_1.default.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureMessage: true,
    }),
];
const getLogout = (req, res) => {
    res.render('logoutForm', {
        title: 'Logout',
    });
};
exports.getLogout = getLogout;
const postLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect('/');
    });
});
exports.postLogout = postLogout;
const getMembershipSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Not yet implemented');
    next('error');
});
exports.getMembershipSignup = getMembershipSignup;
const postMembershipSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Not yet implemented');
    next('error');
});
exports.postMembershipSignup = postMembershipSignup;
const getAdminSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Not yet implemented');
    next('error');
});
exports.getAdminSignup = getAdminSignup;
const postAdminSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Not yet implemented');
    next('error');
});
exports.postAdminSignup = postAdminSignup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3VzZXJzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBMkQ7QUFDM0Qsc0VBQXdDO0FBQ3hDLHVDQUF5QztBQUV6Qyx3REFBa0Q7QUFRM0MsTUFBTSxtQkFBbUIsR0FBRyxDQUFPLEVBQVUsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDMUUsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNsQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUEsQ0FBQztBQVBXLFFBQUEsbUJBQW1CLHVCQU85QjtBQUVLLE1BQU0sZ0JBQWdCLEdBQW1CLENBQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM5RSxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFBLGtCQUFPLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsb0JBQW9C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