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
// a deserialize function for passportjs
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
// authentication function for passport
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
// Signup form - GET route controller
const getSignup = (req, res) => {
    res.render('signupForm', {
        title: 'Sign up',
    });
};
exports.getSignup = getSignup;
// Signup form - POST route controller
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
        // ensuring that password and confirm password fields matches
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
            // errors exist
            res.render('signupForm', {
                title: 'Sign up',
                formData,
                errors: errors.array(),
            });
        }
        else {
            // errors doesn't exist
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
const getMembershipSignup = (req, res) => {
    if (typeof req.user === 'undefined')
        res.redirect('/users/login');
    res.render('memberSignupForm', {
        title: 'Become a member',
    });
};
exports.getMembershipSignup = getMembershipSignup;
exports.postMembershipSignup = [
    (0, express_validator_1.body)('passphrase')
        .trim()
        .notEmpty()
        .withMessage('Passphrase is required.')
        .custom((input) => input === process.env.MEMBERSHIP_SECRET)
        .withMessage('Wrong passphrase!')
        .escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (typeof req.user === 'undefined')
            res.redirect('/users/login');
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render('memberSignupForm', {
                title: 'Become a member',
                errors: errors.array(),
            });
        }
        else {
            try {
                const user = yield userModels_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).exec();
                if (user) {
                    user.isMember = true;
                    yield user.save();
                }
                res.redirect('/');
            }
            catch (error) {
                return next(error);
            }
        }
    }),
];
const getAdminSignup = (req, res) => {
    if (typeof req.user === 'undefined')
        res.redirect('/users/login');
    res.render('adminSignupForm', {
        title: 'Become Admin',
    });
};
exports.getAdminSignup = getAdminSignup;
exports.postAdminSignup = [
    (0, express_validator_1.body)('passphrase')
        .trim()
        .notEmpty()
        .withMessage('Passphrase is required.')
        .custom((input) => input === process.env.ADMIN_SECRET)
        .withMessage('Wrong passphrase!')
        .escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (typeof req.user === 'undefined')
            res.redirect('/users/login');
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render('adminSignupForm', {
                title: 'Become Admin',
                errors: errors.array(),
            });
        }
        else {
            try {
                const user = yield userModels_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.id).exec();
                if (user) {
                    user.isMember = true;
                    user.isAdmin = true;
                    yield user.save();
                }
                res.redirect('/');
            }
            catch (error) {
                return next(error);
            }
        }
    }),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3VzZXJzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBMkQ7QUFDM0Qsc0VBQXdDO0FBQ3hDLHVDQUF5QztBQUV6Qyx3REFBa0Q7QUFVbEQsd0NBQXdDO0FBQ2pDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBTyxFQUFVLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzFFLElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbEI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFQVyxRQUFBLG1CQUFtQix1QkFPOUI7QUFFRix1Q0FBdUM7QUFDaEMsTUFBTSxnQkFBZ0IsR0FBbUIsQ0FBTyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzlFLElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLG9CQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNwRSxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUEsa0JBQU8sRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUss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