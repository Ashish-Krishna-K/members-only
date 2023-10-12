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
require("dotenv/config.js");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const index_js_1 = __importDefault(require("./routes/index.js"));
const messages_js_1 = __importDefault(require("./routes/messages.js"));
const users_js_1 = __importDefault(require("./routes/users.js"));
const usersController_js_1 = require("./controllers/usersController.js");
const app = (0, express_1.default)();
mongoose_1.default.set('strictQuery', false);
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.MONGODB_URI) {
                yield mongoose_1.default.connect(process.env.MONGODB_URI);
            }
            else {
                throw new Error('A URI to the database is not found. Please add a URI to the MONGODB_URI environment variable');
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
connectToDb();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
}, usersController_js_1.authenticateUser));
passport_1.default.serializeUser((user, done) => done(null, user.id));
passport_1.default.deserializeUser(usersController_js_1.deserializeFunction);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use('/', index_js_1.default);
app.use('/messages', messages_js_1.default);
app.use('/users', users_js_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDRCQUEwQjtBQUMxQiw4REFBeUQ7QUFDekQsc0RBQStEO0FBQy9ELGdEQUF3QjtBQUN4QixrRUFBeUM7QUFDekMsb0RBQTRCO0FBQzVCLHdEQUFnQztBQUNoQyxzRUFBc0M7QUFDdEMsd0RBQWdDO0FBQ2hDLG1EQUEyRDtBQUUzRCxpRUFBNEM7QUFDNUMsdUVBQWtEO0FBQ2xELGlFQUE0QztBQUM1Qyx5RUFBeUY7QUFVekYsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFdEIsa0JBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRW5DLFNBQWUsV0FBVzs7UUFDeEIsSUFBSTtZQUNGLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Z0JBQzNCLE1BQU0sa0JBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDhGQUE4RixDQUFDLENBQUM7YUFDakg7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUM7Q0FBQTtBQUVELFdBQVcsRUFBRSxDQUFDO0FBRWQsb0JBQW9CO0FBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDaEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHlCQUFPLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxD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