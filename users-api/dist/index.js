"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _controllers = require("./controllers");

var _expressCallback = _interopRequireDefault(require("./express-callback"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const apiRoot = process && process.env && process.env.BASE_URL || "http://localhost:3000/";
const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use((_, res, next) => {
  res.set({
    Tk: '!'
  });
  next();
}); // Set roots here for each of the controllers listed above

if ((process && process.env && process.env.DM_ENV || undefined) === 'dev') {
  // Listen for requests
  app.listen(3000, () => {
    console.log('Server is listening to port 3000');
  });
}

var _default = app;
exports.default = _default;